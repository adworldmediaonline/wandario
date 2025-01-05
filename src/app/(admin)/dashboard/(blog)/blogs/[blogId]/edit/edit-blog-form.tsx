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
import { updateBlogAction } from '@/app/actions/blog-action';
import { blogSchema } from '@/lib/schema/blog';
import ImageUploadField from '@/components/cloudinary-upload/ImageUploadField';
import { useCallback } from 'react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/lib/constants/upload';
import { toast } from 'sonner';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap/minimal-tiptap';
import type { IBlog, IBlogCategory } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import { FAQFormField } from '@/components/ui/faq-form-field';
import { UnsavedChangesWarning } from '@/components/unsaved-changes-warning';
import { FormLabelInfo } from '@/components/ui/form-label-info';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

interface EditBlogFormProps {
  blogId: string;
  blog: IBlog | null;
  categories: IBlogCategory[];
}

export default function EditDestinationForm({
  blogId,
  blog,
  categories,
}: EditBlogFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    mode: 'onBlur',
    defaultValues: {
      name: blog?.name || '',
      heading: blog?.heading || '',
      metaTitle: blog?.metaTitle || '',
      metaDescription: blog?.metaDescription || '',
      metaKeywords: blog?.metaKeywords || '',
      description: blog?.description || '',
      categoryId: blog?.categoryId?._id || '',
      excerpt: blog?.excerpt || '',
      images: blog?.images || [],
      faqs: blog?.faqs || [],
      thumbnail: blog?.thumbnail || {
        secure_url: '',
        public_id: '',
        fileName: '',
      },
    },
  });

  const isDirty = form.formState.isDirty;

  const { execute, status } = useAction(updateBlogAction, {
    onSuccess(args) {
      if (args.data?.success) {
        toast('Blog updated successfully', {
          description: args.data.message,
        });
        router.push('/dashboard/blogs');
        router.refresh();
      } else {
        toast('Update failed', {
          description: args.data?.error ?? 'Failed to update blog',
        });
      }
    },
    onError(error) {
      console.error('error', error);
      toast('Update failed', {
        description: 'An error occurred while updating the blog',
      });
    },
  });

  const onImageUpload = useCallback(
    (fieldName: string) => {
      form.clearErrors(fieldName as Path<z.infer<typeof blogSchema>>);
    },
    [form]
  );

  function onSubmit(values: z.infer<typeof blogSchema>) {
    execute({ ...values, id: blogId });
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
                    value="content"
                    className="flex-1 md:flex-none data-[state=active]:bg-background"
                  >
                    Content
                  </TabsTrigger>
                  <TabsTrigger
                    value="media"
                    className="flex-1 md:flex-none data-[state=active]:bg-background"
                  >
                    Media
                  </TabsTrigger>
                  <TabsTrigger
                    value="faqs"
                    className="flex-1 md:flex-none data-[state=active]:bg-background"
                  >
                    FAQs
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabelInfo
                            label="Category"
                            required
                            tooltip="Select the category this destination belongs to"
                          />
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabelInfo
                            label="Destination Name"
                            // required
                            tooltip="Enter the full name of the destination"
                          />
                          <FormControl>
                            <Input
                              placeholder="Enter destination name"
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

              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabelInfo
                            label="Excerpt"
                            required
                            tooltip="A short summary that appears in destination cards and previews (max 200 characters)"
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
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabelInfo
                            label="Description"
                            required
                            tooltip="Detailed description of the destination. You can use formatting tools to enhance the content."
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
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <Card>
                  <CardContent className="pt-6 space-y-6">
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
                      description="Upload a thumbnail image (JPEG, PNG, GIF, WebP, max 5MB). Required."
                      multiple={false}
                      onImageUpload={onImageUpload}
                      allowedFileTypes={ALLOWED_FILE_TYPES}
                      maxFileSize={MAX_FILE_SIZE}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faqs" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <FAQFormField form={form} />
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
