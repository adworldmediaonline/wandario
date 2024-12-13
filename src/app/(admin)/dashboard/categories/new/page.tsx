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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { addCategoryAction } from '@/app/actions/category-action';
import { categorySchema } from '@/lib/schema/category';
import ImageUploadField from '@/components/cloudinary-upload/ImageUploadField';
import { useCallback } from 'react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/lib/constants/upload';
import { toast } from 'sonner';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap/minimal-tiptap';

export default function AddCategoryForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
      thumbnail: {
        secure_url: '',
        public_id: '',
        fileName: '',
      },
    },
  });

  const { execute, status } = useAction(addCategoryAction, {
    onSuccess(data) {
      if (data?.data?.success) {
        toast('category add successful', {
          closeButton: true,
          description: 'category add successful',
          // action: {
          //   label: 'Undo',
          //   onClick: () => console.log('Undo'),
          // },
        });
        router.push('/dashboard/categories');
      }
      if (!data?.data?.success) {
        toast('category add failed', {
          description: data?.data?.message ?? 'category add failed',
        });
      }
    },
    onError(error) {
      console.log('error', error);
      toast('category add failed', {
        closeButton: true,
        description: 'category add failed',
      });
    },
  });

  const onImageUpload = useCallback(
    (fieldName: string) => {
      form.clearErrors(fieldName as Path<z.infer<typeof categorySchema>>);
    },
    [form]
  );

  function onSubmit(values: z.infer<typeof categorySchema>) {
    execute(values);
    form.reset();
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
                <FormLabel>Category name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
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
                    autofocus={true}
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

          <Button type="submit" disabled={status === 'executing'}>
            {status === 'executing' ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Add Category'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
