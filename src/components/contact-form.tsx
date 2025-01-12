'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { UnsavedChangesWarning } from '@/components/unsaved-changes-warning';
// import { FormLabelInfo } from '@/components/ui/form-label-info';
import { contactAction } from '@/app/actions/contact-action';
import { contactSchema } from '@/lib/schema/contact-us-form';
import { useRouter } from 'next/navigation';

export default function ContactForm() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const router = useRouter();

  const isDirty = form.formState.isDirty;

  const { execute, status } = useAction(contactAction, {
    onSuccess(data) {
      if (data?.data?.success) {
        toast('Message sent successfully', {
          description: 'We will get back to you as soon as possible.',
          closeButton: true,
        });
        router.push('/thank-you');
        // form.reset();
      } else {
        toast('Failed to send message', {
          description: data?.data?.message || 'Please try again later.',
          closeButton: true,
        });
      }
    },
    onError(error) {
      console.log('error', error);
      toast('Failed to send message', {
        description: 'Please try again later or contact us via email.',
        closeButton: true,
      });
    },
  });

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    execute(values);
  }

  return (
    <UnsavedChangesWarning isDirty={isDirty}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabelInfo
                  label="Your Name"
                  required
                  tooltip="Please enter your full name"
                /> */}
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabelInfo
                  label="Email Address"
                  required
                  tooltip="We'll use this email to respond to you"
                /> */}
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabelInfo
                  label="Phone Number"
                  required
                  tooltip="Please enter your contact number"
                /> */}
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subject Field */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabelInfo
                  label="Subject"
                  required
                  tooltip="What is your message about?"
                /> */}
                <FormControl>
                  <Input
                    placeholder="Enter the subject of your message"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message Field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabelInfo
                  label="Message"
                  required
                  tooltip="Please provide details about your inquiry"
                /> */}
                <FormControl>
                  <Textarea
                    placeholder="Type your message here..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={status === 'executing'}
          >
            {status === 'executing' ? (
              <Loader2 className="animate-spin mr-2" />
            ) : null}
            Send Message
          </Button>
        </form>
      </Form>
    </UnsavedChangesWarning>
  );
}
