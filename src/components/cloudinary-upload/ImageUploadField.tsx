'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import {
  getCloudinarySignature,
  deleteCloudinaryImage,
} from '@/app/actions/cloudinary';
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
import { deleteImageFromBlog } from '@/app/actions/blog-action';

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
          const {
            signature,
            timestamp,
            cloudName,
            apiKey,
            folder,
            transformation,
          } = await getCloudinarySignature();

          const formData = new FormData();
          formData.append('file', file);
          formData.append('api_key', apiKey || '');
          formData.append('timestamp', timestamp?.toString() || '');
          formData.append('signature', signature || '');
          formData.append('folder', folder || '');
          formData.append('transformation', transformation);

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
          form.setValue(name, [...currentValue, ...results], {
            shouldValidate: true,
            shouldDirty: true,
          });
        } else {
          form.setValue(name, results[0], {
            shouldValidate: true,
            shouldDirty: true,
          });
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
      // Get the blog ID from the form
      const formValues = form.getValues();
      const blogId = formValues.id;

      if (!blogId) {
        // If no blogId, just update the form state (new blog case)
        if (multiple) {
          const currentValue = form.getValues(name) || [];
          form.setValue(
            name,
            currentValue.filter(
              (img: UploadResult) => img.public_id !== publicId
            ),
            {
              shouldValidate: true,
              shouldDirty: true,
            }
          );
        } else {
          form.setValue(name, undefined, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
        return;
      }

      // Delete from both Cloudinary and database
      const result = await deleteImageFromBlog({
        blogId,
        publicId,
        fieldName: name as 'images' | 'thumbnail',
      });

      if (result.success) {
        // Update form state
        if (multiple) {
          const currentValue = form.getValues(name) || [];
          form.setValue(
            name,
            currentValue.filter(
              (img: UploadResult) => img.public_id !== publicId
            ),
            {
              shouldValidate: true,
              shouldDirty: true,
            }
          );
        } else {
          form.setValue(name, undefined, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
        toast('Image deleted', {
          description: 'The image has been successfully deleted.',
        });
      } else {
        toast('Deletion failed', {
          description:
            result.error || 'Failed to delete the image. Please try again.',
        });
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast('Deletion failed', {
        description: 'An error occurred while deleting the image.',
      });
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
      render={({ field, fieldState }) => (
        <FormItem className="space-y-4">
          <FormLabel className="text-lg font-semibold tracking-tight">
            {label}
          </FormLabel>
          <FormControl>
            <div className="space-y-6">
              <div
                {...getRootProps()}
                className={`
                  relative p-10 border-2 border-dashed rounded-xl
                  transition-all duration-300 ease-in-out
                  ${
                    isDragActive
                      ? 'border-primary bg-primary/5 scale-[1.02] shadow-lg'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50/50 hover:shadow-md'
                  }
                  ${uploading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <input {...getInputProps()} disabled={uploading} />
                <div className="flex flex-col items-center justify-center gap-4">
                  <div
                    className={`
                    p-4 rounded-full transition-colors duration-200
                    ${isDragActive ? 'bg-primary/10' : 'bg-gray-50'}
                  `}
                  >
                    {uploading ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-3 border-primary border-t-transparent" />
                    ) : (
                      <svg
                        className={`w-8 h-8 transition-colors duration-200 ${
                          isDragActive ? 'text-primary' : 'text-gray-400'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-base font-medium text-gray-700">
                      {uploading ? (
                        'Upload in progress...'
                      ) : isDragActive ? (
                        <span className="text-primary font-semibold">
                          Release to upload files
                        </span>
                      ) : (
                        <>
                          <span className="text-primary font-semibold">
                            Click to browse
                          </span>
                          <span className="mx-1">or drag and drop</span>
                          {multiple ? 'your files' : 'your file'}
                        </>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      Supported formats: {allowedFileTypes.join(', ')}
                    </p>
                    <p className="text-xs text-gray-400">
                      Maximum file size: {maxFileSize / (1024 * 1024)}MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Upload Progress */}
              {Object.entries(uploadProgress).length > 0 && (
                <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-5 space-y-4 border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <div className="animate-pulse h-2 w-2 rounded-full bg-primary" />
                    Uploading files...
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(uploadProgress).map(
                      ([fileName, progress]) => (
                        <div key={fileName} className="space-y-1.5">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span className="truncate max-w-[80%]">
                              {fileName}
                            </span>
                            <span className="font-medium">{progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-300 rounded-full"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Image Preview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {multiple ? (
                  field.value?.map((image: UploadResult) =>
                    image.secure_url ? (
                      <div
                        key={image.public_id}
                        className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-200"
                      >
                        <Image
                          src={image.secure_url}
                          alt={image.fileName}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        {renderDeleteButton(image)}
                      </div>
                    ) : null
                  )
                ) : field.value?.secure_url ? (
                  <div className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-200">
                    <Image
                      src={field.value.secure_url}
                      alt={field.value.fileName}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {renderDeleteButton(field.value)}
                  </div>
                ) : null}
              </div>
            </div>
          </FormControl>
          <FormDescription className="text-sm text-gray-500">
            {description}
          </FormDescription>
          <FormMessage>
            {fieldState.error && (
              <span className="text-destructive text-sm">
                {fieldState.error.message}
              </span>
            )}
          </FormMessage>
        </FormItem>
      )}
    />
  );

  function renderDeleteButton(image: UploadResult) {
    return deletingImages.has(image.public_id) ? (
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
      </div>
    ) : (
      <button
        onClick={e => {
          e.stopPropagation();
          handleDelete(image.public_id);
        }}
        className="absolute bottom-2 right-2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 backdrop-blur-sm"
        disabled={deletingImages.has(image.public_id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
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
