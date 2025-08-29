'use client';

import Link from 'next/link';
import { Document } from '../lib/types';

interface CourseCardProps {
  document: Document;
}

export default function CourseCard({ document }: CourseCardProps) {
  // Extract clean text preview from HTML content
  const getContentPreview = (htmlContent: string): string => {
    const cleanText = htmlContent.replace(/<[^>]*>/g, '');
    return cleanText.substring(0, 150) + (cleanText.length > 150 ? '...' : '');
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
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
          href={`/dashboard/course-catalog/${document.id}`}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700 transition-colors block"
        >
          View Document
        </Link>
      </div>
    </div>
  );
}
