'use client';

import { useState, useEffect } from 'react';
import { WorkshopCard, LoadingSpinner } from '@/components';
import { Workshop } from '@/lib/types';

// Import workshop data
import workshopData from '../../../../DB/workshop/2311.json';

export default function WorkshopPage() {
  const [loading, setLoading] = useState(true);
  const workshops: Workshop[] = workshopData;

  useEffect(() => {
    // Simulate loading for consistency
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading workshops..." variant="minimal" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Workshops</h1>
        <p className="text-gray-600">
          Explore our collection of workshop videos and presentations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
      </div>

      {workshops.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No workshops available at the moment.</p>
        </div>
      )}
    </div>
  );
}