'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AiPractise } from '../lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AiPractiseCardProps {
  aiPractise: AiPractise;
}

export default function AiPractiseCard({ aiPractise }: AiPractiseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <Image
          src={aiPractise.thumbnailUrl}
          alt={aiPractise.title}
          fill
          className="object-cover"
        />
        <Badge className="absolute top-2 right-2 z-10">
          {aiPractise.duration}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {aiPractise.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>{new Date(aiPractise.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link
            href={aiPractise.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on YouTube
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
