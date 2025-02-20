'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Path, useForm } from 'react-hook-form';
import { z } from 'zod';
import { pageSchema } from '@/lib/schema/page';
import { createPageAction } from '@/app/actions/page-action';
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash, Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap/minimal-tiptap';
import ImageUploadField from '@/components/cloudinary-upload/ImageUploadField';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/lib/constants/upload';
import { UnsavedChangesWarning } from '@/components/unsaved-changes-warning';
import { FormLabelInfo } from '@/components/ui/form-label-info';
import slugify from 'slugify';
import type { Content } from '@tiptap/react';
import { useCallback } from 'react';

type FormData = z.infer<typeof pageSchema>;

export default function AddPageForm() {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(pageSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      hero: {
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
      sections: [],
      status: 'draft',
    },
  });

  const isDirty = form.formState.isDirty;

  const { execute, status } = useAction(createPageAction, {
    onSuccess(data) {
      if (data?.data?.success) {
        toast.success('Page created successfully', {
          description: data.data.message,
        });
        router.push('/dashboard/pages');
        router.refresh();
      } else {
        toast.error('Failed to create page', {
          description: data.data?.error || 'Something went wrong',
        });
      }
    },
    onError({ error }) {
      toast.error('Error creating page', {
        description: error.serverError || 'Something went wrong',
      });
    },
  });

  const onImageUpload = useCallback(
    (fieldName: string) => {
      form.clearErrors(fieldName as Path<FormData>);
    },
    [form]
  );

  const onSubmit = async (values: FormData) => {
    execute(values);
    form.reset();
  };

  const addSection = () => {
    const currentSections = form.getValues('sections') || [];
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
    const currentSections = form.getValues('sections') || [];
    form.setValue(
      'sections',
      currentSections.filter((_, i) => i !== index)
    );
  };

  return (
    <UnsavedChangesWarning isDirty={isDirty}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="content" className="space-y-6">
            <div className="w-full overflow-x-auto no-scrollbar pb-2">
              <TabsList className="inline-flex items-center justify-start flex-wrap space-y-1 h-auto w-full md:w-auto p-1 bg-muted">
                <TabsTrigger
                  value="content"
                  className="flex-1 md:flex-none data-[state=active]:bg-background"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="seo"
                  className="flex-1 md:flex-none data-[state=active]:bg-background"
                >
                  SEO
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabelInfo
                          label="Title"
                          required
                          tooltip="Enter the main title of the page"
                        />
                        <FormControl>
                          <Input placeholder="Enter page title" {...field} />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                          slug:{' '}
                          {slugify(field.value, {
                            lower: true,
                            remove: /[*+~.()'"!:@]/g,
                            trim: true,
                          })}
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  {/* Hero Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Hero Section</h3>

                    <FormField
                      control={form.control}
                      name="hero.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabelInfo
                            label="Hero Title"
                            required
                            tooltip="The main heading that appears in the hero section"
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
                            required
                            tooltip="The main content that appears in the hero section"
                          />
                          <FormControl>
                            <Textarea
                              placeholder="Enter hero content"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <FormLabelInfo
                        label="Hero Background Image"
                        required
                        tooltip="Upload a background image for the hero section"
                      />
                      <ImageUploadField
                        form={form}
                        name="hero.backgroundImage"
                        label="Background Image"
                        description="Upload a background image (JPEG, PNG, GIF, WebP, max 5MB)"
                        multiple={false}
                        onImageUpload={onImageUpload}
                        allowedFileTypes={ALLOWED_FILE_TYPES}
                        maxFileSize={MAX_FILE_SIZE}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="hero.ctaButton.label"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabelInfo
                              label="CTA Button Label"
                              optional
                              tooltip="The text that appears on the call-to-action button"
                            />
                            <FormControl>
                              <Input
                                placeholder="Enter button label"
                                {...field}
                              />
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
                              label="CTA Button URL"
                              optional
                              tooltip="The URL that the button links to"
                            />
                            <FormControl>
                              <Input
                                placeholder="Enter button URL"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Content Sections */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Content Sections
                      </h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addSection}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Section
                      </Button>
                    </div>

                    {form.watch('sections')?.map((section, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 space-y-4">
                          <div className="flex justify-end">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSection(index)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>

                          <FormField
                            control={form.control}
                            name={`sections.${index}.content`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabelInfo
                                  label="Content"
                                  required
                                  tooltip="The main content of this section"
                                />
                                <FormControl>
                                  <MinimalTiptapEditor
                                    value={field.value}
                                    onChange={(value: Content) => {
                                      form.setValue(
                                        `sections.${index}.content`,
                                        value?.toString() || '',
                                        { shouldDirty: true }
                                      );
                                    }}
                                    className="w-full"
                                    editorContentClassName="p-5"
                                    output="html"
                                    placeholder="Type your content here..."
                                    autofocus={false}
                                    editable={true}
                                    editorClassName="focus:outline-none"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="space-y-2">
                            <FormLabelInfo
                              label="Section Image"
                              optional
                              tooltip="Upload an image for this section"
                            />
                            <ImageUploadField
                              form={form}
                              name={`sections.${index}.image`}
                              label="Section Image"
                              description="Upload an image (JPEG, PNG, GIF, WebP, max 5MB)"
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
                                  optional
                                  tooltip="Choose whether the image appears on the left or right of the content"
                                />
                                <div className="flex items-center space-x-2">
                                  <FormControl>
                                    <Switch
                                      checked={field.value === 'right'}
                                      onCheckedChange={checked =>
                                        form.setValue(
                                          `sections.${index}.imagePosition`,
                                          checked ? 'right' : 'left',
                                          { shouldDirty: true }
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <span className="text-sm text-muted-foreground">
                                    {field.value === 'right'
                                      ? 'Right aligned'
                                      : 'Left aligned'}
                                  </span>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
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
                          <Textarea
                            placeholder="Enter meta description"
                            className="min-h-[100px]"
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
                          <Input placeholder="Enter meta keywords" {...field} />
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
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Switch
                              checked={field.value === 'published'}
                              onCheckedChange={checked =>
                                form.setValue(
                                  'status',
                                  checked ? 'published' : 'draft',
                                  { shouldDirty: true }
                                )
                              }
                            />
                          </FormControl>
                          <FormLabelInfo
                            label={
                              field.value === 'published'
                                ? 'Published'
                                : 'Draft'
                            }
                            optional
                            tooltip="Toggle between draft and published status"
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                Create Page
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </UnsavedChangesWarning>
  );
}
