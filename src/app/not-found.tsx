'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileQuestion, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] relative flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-50 rounded-full blur-[100px] animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto text-center"
      >
        {/* 404 Icon */}
        <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8 transform transition-transform hover:scale-110">
          <FileQuestion className="w-12 h-12 text-blue-500" />
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-sm mx-auto">
          Oops! The page you're looking for seems to have wandered off on its
          own adventure.
        </p>

        {/* Action Button */}
        <Button
          asChild
          size="lg"
          className="min-w-[200px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        {/* Additional Help */}
        <p className="mt-12 text-sm text-gray-500">
          Need help finding something specific?{' '}
          <Link
            href="/contact"
            className="text-blue-600 hover:text-blue-700 underline underline-offset-4"
          >
            Contact our support team
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
