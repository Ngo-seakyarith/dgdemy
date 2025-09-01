'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AiPractise } from '../lib/types';

interface AiPractiseCardProps {
  aiPractise: AiPractise;
}

export default function AiPractiseCard({ aiPractise }: AiPractiseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="aspect-video relative">
        <Image
          src={aiPractise.thumbnailUrl}
          alt={aiPractise.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm z-10">
          {aiPractise.duration}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {aiPractise.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>{new Date(aiPractise.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>

        <Link
          href={aiPractise.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-red-600 text-white px-4 py-2 rounded text-center hover:bg-red-700 transition-colors block"
        >
          Watch on YouTube
        </Link>
      </div>
    </div>
  );
}
