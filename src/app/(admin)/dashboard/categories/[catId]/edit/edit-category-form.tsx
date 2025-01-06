'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { updateCategoryAction } from '@/app/actions/category-action';
import { categorySchema } from '@/lib/schema/category';
import ImageUploadField from '@/components/cloudinary-upload/ImageUploadField';
import { useCallback } from 'react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/lib/constants/upload';
import { toast } from 'sonner';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap/minimal-tiptap';
import { Textarea } from '@/components/ui/textarea';
import { FormLabelInfo } from '@/components/ui/form-label-info';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

import type { Path } from 'react-hook-form';
import { ICategory } from '@/server/db/category';
import { UnsavedChangesWarning } from '@/components/unsaved-changes-warning';

export default function EditCategoryForm({
  catId,
  category,
}: {
  catId: string;
  category: ICategory | null;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    mode: 'onBlur',
    defaultValues: {
      name: category?.name ?? '',
      heading: category?.heading ?? '',
      metaTitle: category?.metaTitle ?? '',
      metaDescription: category?.metaDescription ?? '',
      metaKeywords: category?.metaKeywords ?? '',
      description: category?.description ?? '',
      thumbnail: category?.thumbnail || {
        secure_url: '',
        public_id: '',
        fileName: '',
      },
      images: category?.images || [],
      excerpt: category?.excerpt ?? '',
    },
  });

  const isDirty = form.formState.isDirty;

  const { execute, status } = useAction(updateCategoryAction, {
    onSuccess(args) {
      if (args.data?.success) {
        toast('Category updated successfully', {
          description: args.data.message,
        });
        router.push('/dashboard/categories');
        router.refresh();
      } else {
        toast('Update failed', {
          description: args.data?.error ?? 'Failed to update category',
        });
      }
    },
    onError(error) {
      console.error('error', error);
      toast('Update failed', {
        description: 'An error occurred while updating the category',
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
    execute({ ...values, id: catId });
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
                    value="meta"
                    className="flex-1 md:flex-none data-[state=active]:bg-background"
                  >
                    SEO & Meta
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
                      name="heading"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabelInfo
                            label="Heading (H1)"
                            required
                            tooltip="Main heading that appears at the top of the destination page"
                          />
                          <FormControl>
                            <Input
                              placeholder="Enter page heading"
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

              <TabsContent value="meta" className="space-y-6">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <FormField
                      control={form.control}
                      name="metaTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabelInfo
                            label="Meta Title"
                            required
                            tooltip="Title that appears in search engine results (50-60 characters recommended)"
                          />
                          <FormControl>
                            <Input placeholder="Enter meta title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="metaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabelInfo
                            label="Meta Description"
                            required
                            tooltip="Brief description that appears in search results (150-160 characters recommended)"
                          />
                          <FormControl>
                            <Input
                              placeholder="Enter meta description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="metaKeywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabelInfo
                            label="Meta Keywords"
                            optional
                            tooltip="Add comma-separated keywords to help with SEO"
                          />
                          <FormControl>
                            <Input
                              placeholder="Enter meta keywords"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <Card>
                  <CardContent className="pt-6 space-y-6">
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
                      name="images"
                      label="Images"
                      description="Upload images (JPEG, PNG, GIF, WebP, max 5MB). At least one image is required."
                      multiple={true}
                      onImageUpload={onImageUpload}
                      allowedFileTypes={ALLOWED_FILE_TYPES}
                      maxFileSize={MAX_FILE_SIZE}
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

            <div className="sticky bottom-0 left-0 right-0 py-4 bg-background border-t mt-6">
              <div className="container flex justify-end gap-4">
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
            </div>
          </form>
        </Form>
      </div>
    </UnsavedChangesWarning>
  );
}
