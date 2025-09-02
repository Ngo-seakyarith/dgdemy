'use client';

import { useEffect, useState } from 'react';
import { AiPractiseCard } from '@/components';
import { AiPractise } from '@/lib/types';

export default function AiPractisePage() {
  const [aiPractises, setAiPractises] = useState<AiPractise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAiPractises = async () => {
      try {
        const res = await fetch('/api/ai-practice', {
          cache: 'no-store',
        });

        if (!res.ok) throw new Error('Failed to fetch ai practise');
        const data = await res.json();
        setAiPractises(data.aiPractises || []);
      } catch (error) {
        console.error('Error fetching ai practise:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAiPractises();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading AI practices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-red-800 font-semibold">Error</h2>
            <p className="text-red-600 mt-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Practise</h1>
        <p className="text-gray-600">
          Explore our collection of AI practise videos and presentations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {aiPractises.map((aiPractise) => (
          <AiPractiseCard key={aiPractise.id} aiPractise={aiPractise} />
        ))}
      </div>

      {aiPractises.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No AI practise available at the moment.</p>
        </div>
      )}
    </div>
  );
}
