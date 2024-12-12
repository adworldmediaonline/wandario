'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signup } from '@/server/actions/auth';
import { Loader2 } from 'lucide-react';
import { AuthCard } from '@/components/ui/auth/auth-card';

const baseSchema = {
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  confirmPassword: z.string(),
  phone: z.string().min(10, {
    message: 'Please enter a valid phone number.',
  }),
  city: z.string().min(2, {
    message: 'City is required.',
  }),
  state: z.string().min(2, {
    message: 'State is required.',
  }),
};

const advertiserSchema = z.object({
  ...baseSchema,
  role: z.literal('advertiser'),
  companyName: z.string().min(2, {
    message: 'Company name is required.',
  }),
  gstNumber: z.string().min(15, {
    message: 'Please enter a valid GST number.',
  }),
  address: z.string().min(10, {
    message: 'Please enter a complete address.',
  }),
});

const freelancerSchema = z.object({
  ...baseSchema,
  role: z.literal('freelancer'),
});

const formSchema = z
  .discriminatedUnion('role', [advertiserSchema, freelancerSchema])
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

export default function SignUpPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const role = searchParams.get('role');

  useEffect(() => {
    if (!role || !['advertiser', 'freelancer'].includes(role)) {
      router.push('/');
    }
  }, [role, router]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      city: '',
      state: '',
      role: (role as 'advertiser' | 'freelancer') || undefined,
      ...(role === 'advertiser' && {
        companyName: '',
        gstNumber: '',
        address: '',
      }),
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      await signup(formData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred during sign up');
      }
      setIsLoading(false);
    }
  }

  if (!role || !['advertiser', 'freelancer'].includes(role)) {
    return null;
  }

  return (
    <AuthCard maxWidth="2xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Create an account
          </h2>
          <p className="text-muted-foreground">
            Sign up as {role.charAt(0).toUpperCase() + role.slice(1)}
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        disabled={isLoading}
                        className="transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        {...field}
                        disabled={isLoading}
                        className="transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+91 9876543210"
                        {...field}
                        disabled={isLoading}
                        className="transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your city"
                        {...field}
                        disabled={isLoading}
                        className="transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your state"
                        {...field}
                        disabled={isLoading}
                        className="transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {role === 'advertiser' && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your company"
                            {...field}
                            disabled={isLoading}
                            className="transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gstNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GST Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="GST number"
                            {...field}
                            disabled={isLoading}
                            className="transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        disabled={isLoading}
                        className="transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        disabled={isLoading}
                        className="transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {role === 'advertiser' && (
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Complete company address"
                        {...field}
                        disabled={isLoading}
                        className="transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              className="w-full transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </div>
              ) : (
                'Create account'
              )}
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{' '}
          </span>
          <Button
            variant="link"
            onClick={() => router.push(`/auth/signin?role=${role}`)}
            className="font-semibold hover:text-primary"
          >
            Sign in
          </Button>
        </div>
      </div>
    </AuthCard>
  );
}
