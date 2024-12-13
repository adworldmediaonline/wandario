'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg animate-in fade-in-50 duration-300">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Oops! Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p className="text-sm">
            {error.message ||
              "We encountered an unexpected error. Don't worry, it's not your fault."}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button
            onClick={reset}
            variant="outline"
            size="lg"
            className="gap-2 transition-all hover:shadow-md"
          >
            <RefreshCcw className="h-4 w-4" />
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
