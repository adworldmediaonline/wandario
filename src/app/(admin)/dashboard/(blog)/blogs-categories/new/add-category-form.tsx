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
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { addBlogCategoryAction } from '@/app/actions/blog-category-action';
import { blogCategorySchema } from '@/lib/schema/blog-category';
import ImageUploadField from '@/components/cloudinary-upload/ImageUploadField';
import { useCallback } from 'react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/lib/constants/upload';
import { toast } from 'sonner';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap/minimal-tiptap';
import { Textarea } from '@/components/ui/textarea';
import { UnsavedChangesWarning } from '@/components/unsaved-changes-warning';
import { FormLabelInfo } from '@/components/ui/form-label-info';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export default function AddCategoryForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof blogCategorySchema>>({
    resolver: zodResolver(blogCategorySchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
      excerpt: '',
      thumbnail: {
        secure_url: '',
        public_id: '',
        fileName: '',
      },
    },
  });

  const isDirty = form.formState.isDirty;

  const { execute, status } = useAction(addBlogCategoryAction, {
    onSuccess(data) {
      if (data?.data?.success) {
        toast('category add successful', {
          closeButton: true,
          description: 'category add successful',
        });
        router.push('/dashboard/blogs-categories');
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
      form.clearErrors(fieldName as Path<z.infer<typeof blogCategorySchema>>);
    },
    [form]
  );

  function onSubmit(values: z.infer<typeof blogCategorySchema>) {
    execute(values);
    form.reset();
  }

  return (
    <UnsavedChangesWarning isDirty={isDirty}>
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="basic" className="space-y-6">
              <div className="w-full overflow-x-auto no-scrollbar pb-2">
                <TabsList className="inline-flex items-center justify-start flex-wrap space-y-1 h-auto w-full  md:w-auto p-1 bg-muted">
                  <TabsTrigger
                    value="basic"
                    className="flex-1 md:flex-none data-[state=active]:bg-background"
                  >
                    Basic Information
                  </TabsTrigger>
                  <TabsTrigger
                    value="media"
                    className="flex-1 md:flex-none data-[state=active]:bg-background"
                  >
                    Media & Content
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    {/* Basic Information */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabelInfo
                            label="Category Name"
                            required
                            tooltip="Enter a unique name for this category"
                          />
                          <FormControl>
                            <Input
                              placeholder="Enter category name"
                              {...field}
                            />
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
                          <FormLabelInfo
                            label="Excerpt"
                            required
                            tooltip="A brief summary that appears in category listings (max 200 characters)"
                          />
                          <FormControl>
                            <Textarea
                              placeholder="Enter a brief description"
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
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    {/* Media & Content */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabelInfo
                            label="Description"
                            required
                            tooltip="Detailed description of the category. You can use formatting tools to enhance the content."
                          />
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
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Submit Button - Fixed at Bottom */}
            <div className="sticky bottom-0 left-0 right-0 py-4 bg-background border-t mt-6">
              <div className="container flex justify-end">
                <Button type="submit" disabled={status === 'executing'}>
                  {status === 'executing' ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : null}
                  Add Category
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </UnsavedChangesWarning>
  );
}
