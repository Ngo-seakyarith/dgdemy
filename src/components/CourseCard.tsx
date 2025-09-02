'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Document } from '../lib/types';
import { useState } from 'react';

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
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
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
        <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-2 text-sm">Document Preview</p>
          </div>
        </div>
      )}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {document.filename.replace('.docx', '').replace('.doc', '')}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {getContentPreview(document.html_content)}
          </p>
        </div>
        <Link
          href={`/dashboard/professional-training/${document.id}`}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700 transition-colors block"
        >
          View Document
        </Link>
      </div>
    </div>
  );
}
