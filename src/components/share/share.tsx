'use client';

import { IBlog } from '@/types';
import { useCallback } from 'react';
import { Button } from '../ui/button';
import { MotionDiv } from '../framer-motion-div/motion-div';
import { Share2 } from 'lucide-react';

interface ShareStoryProps {
  blog: IBlog;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ShareStory({ blog }: ShareStoryProps) {
  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog.heading,
          text: blog.excerpt,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        //TODO: I might want to show a toast notification here
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, [blog.heading, blog.excerpt]);
  return (
    <MotionDiv variants={item} className="flex justify-center mb-12">
      <Button
        variant="outline"
        size="lg"
        className="rounded-full"
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share Story
      </Button>
    </MotionDiv>
  );
}
