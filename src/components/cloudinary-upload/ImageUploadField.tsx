'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import {
  getCloudinarySignature,
  deleteCloudinaryImage,
} from '@/lib/actions/cloudinary';
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { FileRejection } from 'react-dropzone';

type UploadResult = {
  secure_url: string;
  public_id: string;
  fileName: string;
};

type UploadProgress = {
  [key: string]: number;
};

type ImageUploadFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label: string;
  description: string;
  multiple?: boolean;
  onImageUpload: (fieldName: string) => void;
  allowedFileTypes: string[];
  maxFileSize: number;
};

export default function ImageUploadField({
  form,
  name,
  label,
  description,
  multiple = true,
  onImageUpload,
  allowedFileTypes,
  maxFileSize,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [deletingImages, setDeletingImages] = useState<Set<string>>(new Set());

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach((file: FileRejection) => {
          if (file.errors.some(e => e.code === 'file-invalid-type')) {
            toast('Invalid file type', {
              description: `${file.file.name} is not an allowed file type.`,
            });
          } else if (file.errors.some(e => e.code === 'file-too-large')) {
            toast('File too large', {
              description: `${
                file.file.name
              } exceeds the maximum file size of ${
                maxFileSize / (1024 * 1024)
              }MB.`,
            });
          }
        });
        return;
      }

      setUploading(true);

      try {
        const filesToUpload = multiple ? acceptedFiles : [acceptedFiles[0]];

        const initialProgress = filesToUpload.reduce((acc, file) => {
          acc[file.name] = 0;
          return acc;
        }, {} as UploadProgress);
        setUploadProgress(initialProgress);

        const uploadPromises = filesToUpload.map(async file => {
          const { signature, timestamp, cloudName, apiKey, folder } =
            await getCloudinarySignature();

          const formData = new FormData();
          formData.append('file', file);
          formData.append('api_key', apiKey || '');
          formData.append('timestamp', timestamp?.toString() || '');
          formData.append('signature', signature || '');
          formData.append('folder', folder || '');

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData,
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onUploadProgress: (progressEvent: any) => {
                if (progressEvent.total !== undefined) {
                  const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  setUploadProgress(prev => ({
                    ...prev,
                    [file.name]: percentCompleted,
                  }));
                }
              },
            }
          );

          return { ...response.data, fileName: file.name };
        });

        const results = await Promise.all(uploadPromises);

        if (multiple) {
          const currentValue = form.getValues(name) || [];
          form.setValue(name, [...currentValue, ...results]);
        } else {
          form.setValue(name, results[0]);
        }

        setUploadProgress({});
        onImageUpload(name);
        toast('Upload successful', {
          description: `Successfully uploaded ${results.length} image(s).`,
        });
      } catch (error) {
        console.error('Upload error:', error);
        toast('Upload failed', {
          description:
            'An error occurred while uploading the image(s). Please try again.',
        });
      } finally {
        setUploading(false);
      }
    },
    [multiple, form, name, onImageUpload, maxFileSize]
  );

  const handleDelete = async (publicId: string) => {
    setDeletingImages(prev => new Set(prev).add(publicId));
    try {
      const success = await deleteCloudinaryImage(publicId);
      if (success) {
        if (multiple) {
          const currentValue = form.getValues(name) || [];
          form.setValue(
            name,
            currentValue.filter(
              (img: UploadResult) => img.public_id !== publicId
            )
          );
        } else {
          form.setValue(name, undefined);
        }
        toast('Image deleted', {
          description: 'The image has been successfully deleted.',
        });
      } else {
        toast('Deletion failed', {
          description: 'Failed to delete the image. Please try again.',
        });
      }
    } finally {
      setDeletingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(publicId);
        return newSet;
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: allowedFileTypes.reduce(
      (acc, type) => ({ ...acc, [type]: [] }),
      {}
    ),
    maxSize: maxFileSize,
  });

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div>
              <div
                {...getRootProps()}
                className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer ${
                  isDragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300'
                } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <input {...getInputProps()} disabled={uploading} />
                {uploading ? (
                  <p>Uploading in progress...</p>
                ) : isDragActive ? (
                  <p>Drop the {multiple ? 'files' : 'file'} here ...</p>
                ) : (
                  <p>
                    {multiple
                      ? "Drag 'n' drop some files here, or click to select files"
                      : "Drag 'n' drop a file here, or click to select a file"}
                  </p>
                )}
              </div>
              {Object.entries(uploadProgress).length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Uploading...</h3>
                  {Object.entries(uploadProgress).map(
                    ([fileName, progress]) => (
                      <div key={fileName} className="mb-2">
                        <div className="text-sm">{fileName}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {multiple ? (
                  field.value?.map((image: UploadResult) =>
                    image.secure_url ? (
                      <div
                        key={image.public_id}
                        className="relative aspect-square"
                      >
                        <Image
                          src={image.secure_url}
                          alt="Uploaded image"
                          fill
                          className="object-cover rounded-lg"
                        />
                        {renderDeleteButton(image)}
                      </div>
                    ) : null
                  )
                ) : field.value && field.value.secure_url ? (
                  <div
                    key={field.value.public_id}
                    className="relative aspect-square"
                  >
                    <Image
                      src={field.value.secure_url}
                      alt="Uploaded image"
                      fill
                      className="object-cover rounded-lg"
                    />
                    {renderDeleteButton(field.value)}
                  </div>
                ) : null}
              </div>
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  function renderDeleteButton(image: UploadResult) {
    return deletingImages.has(image.public_id) ? (
      <div className="absolute  inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    ) : (
      <button
        onClick={() => handleDelete(image.public_id)}
        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full  group-hover:opacity-100 transition-opacity duration-200"
        disabled={deletingImages.has(image.public_id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    );
  }
}
