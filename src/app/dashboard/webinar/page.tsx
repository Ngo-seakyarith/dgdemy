'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface WebinarData {
  images: string[];
}

export default function WebinarPage() {
  const [webinarImages, setWebinarImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebinarImages = async () => {
      try {
        const response = await fetch('/api/webinar');
        if (!response.ok) {
          throw new Error('Failed to fetch webinar images');
        }
        const data: WebinarData = await response.json();
        setWebinarImages(data.images);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWebinarImages();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading webinar images...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Webinar Images</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {webinarImages.map((url, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <Image
              src={url}
              alt={`Webinar ${index + 1}`}
              width={400}
              height={300}
              className="w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
