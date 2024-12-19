'use client';

import { UseFormReturn, FieldPath, PathValue, Path } from 'react-hook-form';
import { PlusCircle, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AnimatePresence, motion } from 'framer-motion';
import { IFAQ } from '@/types';
import type { ReactElement } from 'react';

interface FAQFormFieldProps<T extends { faqs: IFAQ[] }> {
  form: UseFormReturn<T>;
}

export function FAQFormField<T extends { faqs: IFAQ[] }>({
  form,
}: FAQFormFieldProps<T>): ReactElement {
  const faqs = (form.watch('faqs' as FieldPath<T>) || []) as IFAQ[];

  const addFAQ = () => {
    form.setValue(
      'faqs' as FieldPath<T>,
      [...faqs, { question: '', answer: '' }] as PathValue<T, Path<T>>
    );
  };

  const removeFAQ = (index: number) => {
    form.setValue(
      'faqs' as FieldPath<T>,
      faqs.filter((_, i) => i !== index) as PathValue<T, Path<T>>
    );
  };

  return (
    <div className="space-y-4 relative pb-16">
      <div className="flex items-center justify-between mb-6">
        <FormLabel className="text-base font-semibold">FAQs</FormLabel>
        <span className="text-sm text-muted-foreground">
          {faqs.length} {faqs.length === 1 ? 'FAQ' : 'FAQs'}
        </span>
      </div>

      <FormField
        control={form.control}
        name={'faqs' as FieldPath<T>}
        render={() => (
          <FormItem className="space-y-4">
            <AnimatePresence mode="popLayout">
              {faqs.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardContent className="pt-6">
                      <div className="flex justify-between gap-4">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              #{index + 1}
                            </span>
                            <FormField
                              control={form.control}
                              name={`faqs.${index}.question` as FieldPath<T>}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      placeholder="Enter your question here..."
                                      className="focus-visible:ring-2"
                                      {...field}
                                      value={field.value as string}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name={`faqs.${index}.answer` as FieldPath<T>}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    placeholder="Enter your answer here..."
                                    className="min-h-[100px] resize-y focus-visible:ring-2"
                                    {...field}
                                    value={field.value as string}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors self-start"
                          onClick={() => removeFAQ(index)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove FAQ</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            {faqs.length === 0 && (
              <div className="text-center py-8 bg-muted/30 rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground mb-2">No FAQs added yet</p>
                <p className="text-sm text-muted-foreground">
                  Click the button below to add your first FAQ
                </p>
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Floating Add Button */}
      <div className="fixed bottom-6 right-6 z-50 md:absolute md:bottom-0 md:right-0">
        <Button
          type="button"
          size="lg"
          onClick={addFAQ}
          className="shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-full"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add FAQ
        </Button>
      </div>
    </div>
  );
}
