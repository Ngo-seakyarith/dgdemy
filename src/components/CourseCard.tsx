'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Document } from '../lib/types';
import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface CourseCardProps {
  document: Document;
}

export default function CourseCard({ document }: CourseCardProps) {
  const [imageError, setImageError] = useState(false);

  // Function to handle Dropbox URLs - use as-is for previews, convert share links to raw
  const processDropboxUrl = (url: string): string => {
    if (url.includes('www.dropbox.com')) {
      // For share links, convert to raw format for direct display
      try {
        const urlObj = new URL(url);
        if (urlObj.searchParams.has('dl')) {
          urlObj.searchParams.set('raw', '1');
          urlObj.searchParams.delete('dl');
        }
        return urlObj.toString();
      } catch {
        // Fallback to simple replace if URL parsing fails
        return url.replace('&dl=0', '&raw=1').replace('?dl=0', '?raw=1');
      }
    }
    // For preview links, use as-is
    return url;
  };

  // Extract clean text preview from HTML content
  const getContentPreview = (htmlContent: string): string => {
    const cleanText = htmlContent.replace(/<[^>]*>/g, '');
    return cleanText.substring(0, 150) + (cleanText.length > 150 ? '...' : '');
  };

  const imageUrl = document.thumbnail_url ? processDropboxUrl(document.thumbnail_url) : '';

  return (
    <Card className="hover:shadow-lg transition-shadow">
      {imageUrl && !imageError && (
        <div className="w-full h-48 overflow-hidden rounded-t-lg relative">
          <Image
            src={imageUrl}
            alt={`${document.filename} thumbnail`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
            onLoad={() => console.log('✅ Image loaded successfully:', imageUrl)}
          />
        </div>
      )}
      {(!imageUrl || imageError) && (
        <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <FileText className="mx-auto h-12 w-12" />
            <p className="mt-2 text-sm">Document Preview</p>
          </div>
        </div>
      )}
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {document.filename.replace('.docx', '').replace('.doc', '')}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {getContentPreview(document.html_content)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/dashboard/professional-training/${document.id}`}>
            View Document
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
