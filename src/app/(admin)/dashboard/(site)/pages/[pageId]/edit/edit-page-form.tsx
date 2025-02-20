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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { updatePageAction } from '@/app/actions/page-action';
import { pageSchema } from '@/lib/schema/page';
import ImageUploadField from '@/components/cloudinary-upload/ImageUploadField';
import { useCallback } from 'react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/lib/constants/upload';
import { toast } from 'sonner';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap/minimal-tiptap';
import type { IPage, ISection } from '@/types';
import { UnsavedChangesWarning } from '@/components/unsaved-changes-warning';
import { FormLabelInfo } from '@/components/ui/form-label-info';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Path } from 'react-hook-form';

interface EditPageFormProps {
  pageId: string;
  page: IPage | null;
}

export default function EditPageForm({ pageId, page }: EditPageFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof pageSchema>>({
    resolver: zodResolver(pageSchema),
    mode: 'onBlur',
    defaultValues: {
      title: page?.title || '',
      metaTitle: page?.metaTitle || '',
      metaDescription: page?.metaDescription || '',
      metaKeywords: page?.metaKeywords || '',
      hero: page?.hero || {
        title: '',
        content: '',
        backgroundImage: {
          secure_url: '',
          public_id: '',
          fileName: '',
        },
        ctaButton: {
          label: '',
          href: '',
        },
      },
      sections: page?.sections || [],
      status: page?.status || 'draft',
    },
  });

  const isDirty = form.formState.isDirty;

  const { execute, status } = useAction(updatePageAction, {
    onSuccess(data) {
      if (data?.data?.success) {
        toast.success('Page updated successfully', {
          description: data.data.message,
        });
        router.push('/dashboard/pages');
        router.refresh();
      } else {
        toast.error('Update failed', {
          description: data.data?.error ?? 'Failed to update page',
        });
      }
    },
    onError(error) {
      console.error('error', error);
      toast.error('Update failed', {
        description: 'An error occurred while updating the page',
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof pageSchema>) => {
    execute({ ...values, id: pageId });
  };

  const onImageUpload = useCallback(
    (fieldName: string) => {
      form.clearErrors(fieldName as Path<z.infer<typeof pageSchema>>);
    },
    [form]
  );

  const addSection = () => {
    const currentSections = form.getValues('sections');
    form.setValue('sections', [
      ...currentSections,
      {
        type: 'content-image',
        content: '',
        image: {
          secure_url: '',
          public_id: '',
          fileName: '',
        },
        imagePosition: 'right',
        order: currentSections.length,
      },
    ]);
  };

  const removeSection = (index: number) => {
    const currentSections = form.getValues('sections');
    const updatedSections = currentSections
      .filter((_: ISection, i: number) => i !== index)
      .map((section: ISection, i: number) => ({ ...section, order: i }));
    form.setValue('sections', updatedSections);
  };

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Page not found</p>
      </div>
    );
  }

  return (
    <UnsavedChangesWarning isDirty={isDirty}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="hero">Hero Section</TabsTrigger>
              <TabsTrigger value="content">Content Sections</TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general">
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabelInfo
                          label="Page Title"
                          required
                          tooltip="The main title of the page"
                        />
                        <FormControl>
                          <Input placeholder="Enter page title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabelInfo
                          label="Status"
                          required
                          tooltip="Control the visibility of the page"
                        />
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo">
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <FormField
                    control={form.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabelInfo
                          label="Meta Title"
                          required
                          tooltip="The title that appears in search engine results"
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
                          tooltip="A brief description of the page for search engines"
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
                          tooltip="Keywords related to the page content"
                        />
                        <FormControl>
                          <Input placeholder="Enter meta keywords" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Hero Section Tab */}
            <TabsContent value="hero">
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <FormField
                    control={form.control}
                    name="hero.title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabelInfo
                          label="Hero Title"
                          required
                          tooltip="The main heading in the hero section"
                        />
                        <FormControl>
                          <Input placeholder="Enter hero title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hero.content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabelInfo
                          label="Hero Content"
                          tooltip="Additional text content in the hero section"
                        />
                        <FormControl>
                          <MinimalTiptapEditor
                            content={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabelInfo
                      label="Hero Background"
                      required
                      tooltip="Background image for the hero section"
                    />
                    <ImageUploadField
                      form={form}
                      name="hero.backgroundImage"
                      label="Upload Background Image"
                      description="Recommended size: 1920x1080px"
                      multiple={false}
                      onImageUpload={onImageUpload}
                      allowedFileTypes={ALLOWED_FILE_TYPES}
                      maxFileSize={MAX_FILE_SIZE}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="hero.ctaButton.label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabelInfo
                          label="CTA Button Label"
                          tooltip="Text for the call-to-action button"
                        />
                        <FormControl>
                          <Input placeholder="Enter button text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hero.ctaButton.href"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabelInfo
                          label="CTA Button Link"
                          tooltip="URL for the call-to-action button"
                        />
                        <FormControl>
                          <Input placeholder="Enter button URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Sections Tab */}
            <TabsContent value="content">
              <Card>
                <CardContent className="space-y-6 pt-6">
                  <div className="flex justify-end">
                    <Button type="button" onClick={addSection}>
                      Add Section
                    </Button>
                  </div>

                  {form
                    .watch('sections')
                    .map((section: ISection, index: number) => (
                      <Card key={index}>
                        <CardContent className="space-y-4 pt-6">
                          <div className="flex justify-end">
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => removeSection(index)}
                            >
                              Remove Section
                            </Button>
                          </div>

                          <FormField
                            control={form.control}
                            name={`sections.${index}.content`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabelInfo
                                  label="Section Content"
                                  required
                                  tooltip="The main content of this section"
                                />
                                <FormControl>
                                  <MinimalTiptapEditor
                                    content={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="space-y-2">
                            <FormLabelInfo
                              label="Section Image"
                              required
                              tooltip="Image for this section"
                            />
                            <ImageUploadField
                              form={form}
                              name={`sections.${index}.image`}
                              label="Upload Section Image"
                              description="Recommended size: 800x600px"
                              multiple={false}
                              onImageUpload={onImageUpload}
                              allowedFileTypes={ALLOWED_FILE_TYPES}
                              maxFileSize={MAX_FILE_SIZE}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name={`sections.${index}.imagePosition`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabelInfo
                                  label="Image Position"
                                  required
                                  tooltip="Position of the image relative to the content"
                                />
                                <FormControl>
                                  <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...field}
                                  >
                                    <option value="left">Left</option>
                                    <option value="right">Right</option>
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="sticky bottom-0 left-0 right-0 py-4 bg-background border-t">
            <div className="container flex justify-end">
              <Button type="submit" disabled={status === 'executing'}>
                {status === 'executing' && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Page
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </UnsavedChangesWarning>
  );
}
