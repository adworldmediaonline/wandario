'use client';

import { UseFormReturn } from 'react-hook-form';
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
import { z } from 'zod';
import { destinationSchema } from '@/lib/schema/destination';

type FormData = z.infer<typeof destinationSchema>;

interface FAQFormFieldProps {
  form: UseFormReturn<FormData>;
}

export function FAQFormField({ form }: FAQFormFieldProps) {
  const faqs = form.watch('faqs') || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel className="text-base">FAQs</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            form.setValue('faqs', [...faqs, { question: '', answer: '' }]);
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add FAQ
        </Button>
      </div>

      <FormField
        control={form.control}
        name="faqs"
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
                          <FormField
                            control={form.control}
                            name={`faqs.${index}.question` as const}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your question here..."
                                    className="focus-visible:ring-2"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`faqs.${index}.answer` as const}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    placeholder="Enter your answer here..."
                                    className="min-h-[100px] resize-y focus-visible:ring-2"
                                    {...field}
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
                          className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors"
                          onClick={() => {
                            form.setValue(
                              'faqs',
                              faqs.filter((_, i) => i !== index)
                            );
                          }}
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
              <p className="text-sm text-muted-foreground text-center py-4">
                No FAQs added yet. Click &quot;Add FAQ&quot; to get started.
              </p>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
