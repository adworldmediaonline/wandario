'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Path, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { updateDestinationAction } from '@/app/actions/destination-action';
import { destinationSchema } from '@/lib/schema/destination';
import ImageUploadField from '@/components/cloudinary-upload/ImageUploadField';
import { useCallback } from 'react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/lib/constants/upload';
import { toast } from 'sonner';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap/minimal-tiptap';
import type { ICategory, IDestination } from '@/types';
import { Textarea } from '@/components/ui/textarea';

interface EditDestinationFormProps {
  destId: string;
  destination: IDestination | null;
  categories: ICategory[];
}

export default function EditDestinationForm({
  destId,
  destination,
  categories,
}: EditDestinationFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof destinationSchema>>({
    resolver: zodResolver(destinationSchema),
    mode: 'onBlur',
    defaultValues: {
      name: destination?.name || '',
      description: destination?.description || '',
      categoryId: destination?.categoryId || '',
      excerpt: destination?.excerpt || '',
      thumbnail: destination?.thumbnail || {
        secure_url: '',
        public_id: '',
        fileName: '',
      },
    },
  });

  const { execute, status } = useAction(updateDestinationAction, {
    onSuccess(args) {
      if (args.data?.success) {
        toast('Destination updated successfully', {
          description: args.data.message,
        });
        router.push('/dashboard/destinations');
        router.refresh();
      } else {
        toast('Update failed', {
          description: args.data?.error ?? 'Failed to update destination',
        });
      }
    },
    onError(error) {
      console.error('error', error);
      toast('Update failed', {
        description: 'An error occurred while updating the destination',
      });
    },
  });

  const onImageUpload = useCallback(
    (fieldName: string) => {
      form.clearErrors(fieldName as Path<z.infer<typeof destinationSchema>>);
    },
    [form]
  );

  function onSubmit(values: z.infer<typeof destinationSchema>) {
    execute({ ...values, id: destId });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description (max 200 characters)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  A short summary that appears in cards and previews
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <MinimalTiptapEditor
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full"
                    editorContentClassName="p-5"
                    output="html"
                    placeholder="Type your content here..."
                    editable={true}
                    editorClassName="focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ImageUploadField
            form={form}
            name="thumbnail"
            label="Thumbnail"
            description="Upload a thumbnail image (JPEG, PNG, GIF, WebP, max 5MB, optional)."
            multiple={false}
            onImageUpload={onImageUpload}
            allowedFileTypes={ALLOWED_FILE_TYPES}
            maxFileSize={MAX_FILE_SIZE}
          />

          <div className="flex gap-4">
            <Button type="submit" disabled={status === 'executing'}>
              {status === 'executing' ? (
                <Loader2 className="animate-spin mr-2" />
              ) : null}
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
