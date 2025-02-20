'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { GripVertical, Loader2, Plus } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { updateHeaderAction } from '@/app/actions/header-action';
import { headerSchema } from '@/lib/schema/header';
import ImageUploadField from '@/components/cloudinary-upload/ImageUploadField';
import { useCallback, useState } from 'react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/lib/constants/upload';
import { toast } from 'sonner';
import { UnsavedChangesWarning } from '@/components/unsaved-changes-warning';
import { FormLabelInfo } from '@/components/ui/form-label-info';
import { Switch } from '@/components/ui/switch';
import { IHeader, IPage } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  DraggableProvided,
  DroppableProvided,
} from '@hello-pangea/dnd';
//
interface EditHeaderFormProps {
  header: IHeader | null;
  headerId: string;
  pages: IPage[];
}

interface MenuItem {
  label: string;
  href: string;
  order: number;
  isActive: boolean;
  useExistingPage: boolean;
}

export default function EditHeaderForm({
  header,
  headerId,
  pages,
}: EditHeaderFormProps) {
  const router = useRouter();

  // Add state to track dragging
  const [isDragging, setIsDragging] = useState(false);

  const form = useForm<z.infer<typeof headerSchema>>({
    resolver: zodResolver(headerSchema),
    mode: 'onBlur',
    defaultValues: {
      logo: header?.logo || undefined,
      menuItems: header?.menuItems?.sort((a, b) => a.order - b.order) || [],
      ctaButton: header?.ctaButton || {
        label: '',
        href: '',
        isActive: false,
      },
      status: header?.status || 'draft',
      type: header?.type || 'primary',
    },
  });

  const isDirty = form.formState.isDirty;

  const { execute, status } = useAction(updateHeaderAction, {
    onSuccess(data) {
      if (data?.data?.success) {
        toast.success('Header updated successfully', {
          description: data.data.message,
        });
        router.push('/dashboard/header');
        router.refresh();
      } else {
        toast.error('Failed to update header', {
          description: data?.data?.error || 'Something went wrong',
        });
      }
    },
    onError({ error }) {
      toast.error('Error updating header', {
        description: error.serverError || 'Something went wrong',
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof headerSchema>) => {
    execute({ ...values, id: headerId });
  };

  const onImageUpload = useCallback(
    (fieldName: string) => {
      form.clearErrors(fieldName as keyof z.infer<typeof headerSchema>);
    },
    [form]
  );

  const reorderMenuItems = useCallback(
    (items: MenuItem[], startIndex: number, endIndex: number) => {
      const result = Array.from(items);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result.map((item, index) => ({
        ...item,
        order: index,
      }));
    },
    []
  );

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDragEnd = (result: DropResult) => {
    setIsDragging(false);

    const { destination, source } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const currentItems = form.getValues('menuItems');
    const reorderedItems = reorderMenuItems(
      currentItems,
      source.index,
      destination.index
    );

    form.setValue('menuItems', reorderedItems, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const addMenuItem = useCallback(() => {
    const currentMenuItems = form.getValues('menuItems') || [];
    form.setValue(
      'menuItems',
      [
        ...currentMenuItems,
        {
          label: '',
          href: '',
          order: currentMenuItems.length,
          isActive: false,
          useExistingPage: true,
        },
      ],
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      }
    );
  }, [form]);

  const removeMenuItem = useCallback(
    (index: number) => {
      const currentMenuItems = form.getValues('menuItems');
      const updatedItems = currentMenuItems
        .filter((_, i) => i !== index)
        .map((item, newIndex) => ({
          ...item,
          order: newIndex,
        }));

      form.setValue('menuItems', updatedItems, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [form]
  );

  return (
    <UnsavedChangesWarning isDirty={isDirty}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Type */}

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabelInfo
                      label="Type"
                      required
                      tooltip="The type of header"
                    />
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="primary">Primary</SelectItem>
                        <SelectItem value="secondary">Secondary</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Logo */}
              <div className="space-y-2">
                <FormLabelInfo
                  label="Logo"
                  optional
                  tooltip="Upload your website logo"
                />
                <ImageUploadField
                  form={form}
                  name="logo"
                  label="Logo"
                  description="Upload a logo (JPEG, PNG, GIF, WebP, max 5MB)"
                  multiple={false}
                  onImageUpload={onImageUpload}
                  allowedFileTypes={ALLOWED_FILE_TYPES}
                  maxFileSize={MAX_FILE_SIZE}
                />
              </div>

              {/* Menu Items */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FormLabelInfo
                    label="Menu Items"
                    required
                    tooltip="Add navigation menu items"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addMenuItem}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                <DragDropContext
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                >
                  <Droppable droppableId="menu-items">
                    {(provided: DroppableProvided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-4"
                      >
                        {form.watch('menuItems')?.map((item, index) => (
                          <Draggable
                            key={`${item.label}-${index}`}
                            draggableId={`item-${index}`}
                            index={index}
                          >
                            {(provided: DraggableProvided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`flex gap-4 items-start bg-white rounded-lg border p-4 ${
                                  isDragging ? 'opacity-90' : ''
                                }`}
                              >
                                <div
                                  {...provided.dragHandleProps}
                                  className="mt-4 cursor-move"
                                >
                                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div className="grid gap-4 flex-1">
                                  <FormField
                                    control={form.control}
                                    name={`menuItems.${index}.label`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Label</FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            placeholder="Menu item label"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`menuItems.${index}.useExistingPage`}
                                    render={({ field }) => (
                                      <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                          <FormLabel>
                                            Use Existing Page
                                          </FormLabel>
                                          <FormDescription>
                                            Toggle between existing pages and
                                            custom URL
                                          </FormDescription>
                                        </div>
                                        <FormControl>
                                          <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`menuItems.${index}.href`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>URL</FormLabel>
                                        {form.watch(
                                          `menuItems.${index}.useExistingPage`
                                        ) ? (
                                          <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                          >
                                            <FormControl>
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select a page" />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              {pages.map(page => (
                                                <SelectItem
                                                  key={page._id}
                                                  value={`/${page.slug}`}
                                                >
                                                  {page.title}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        ) : (
                                          <FormControl>
                                            <Input
                                              {...field}
                                              placeholder="Enter custom URL (e.g., /about-us)"
                                            />
                                          </FormControl>
                                        )}
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`menuItems.${index}.isActive`}
                                    render={({ field }) => (
                                      <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                          <FormLabel>Active</FormLabel>
                                          <FormDescription>
                                            Show this menu item in navigation
                                          </FormDescription>
                                        </div>
                                        <FormControl>
                                          <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeMenuItem(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                <FormField
                  control={form.control}
                  name="menuItems"
                  render={() => (
                    <FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                <FormLabelInfo
                  label="Call-to-Action Button"
                  optional
                  tooltip="Add a prominent action button"
                />

                <FormField
                  control={form.control}
                  name="ctaButton.label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabelInfo
                        label="Button Label"
                        optional
                        tooltip="The text that appears on the button"
                      />
                      <FormControl>
                        <Input placeholder="Enter button label" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ctaButton.href"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabelInfo
                        label="Button URL"
                        // required
                        tooltip="The link destination for the button"
                      />
                      <FormControl>
                        <Input placeholder="Enter button URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ctaButton.isActive"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabelInfo
                          label={field.value ? 'Active' : 'Inactive'}
                          optional
                          tooltip="Toggle button visibility"
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Status */}
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
                              checked ? 'published' : 'draft'
                            )
                          }
                        />
                      </FormControl>
                      <FormLabelInfo
                        label={
                          field.value === 'published' ? 'Published' : 'Draft'
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

          <div className="sticky bottom-0 left-0 right-0 py-4 bg-background border-t">
            <div className="container flex justify-end">
              <Button type="submit" disabled={status === 'executing'}>
                {status === 'executing' && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Header
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </UnsavedChangesWarning>
  );
}
