'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { LoadingSpinner } from '../../../components';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [images, setImages] = useState<{[key: string]: string[]}>({
    general: [],
    games: [],
    sharing: [],
    workshops: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Load images from API route
        const response = await fetch('/api/gallery');
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else {
          console.error('Failed to load images from API');
        }
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const getFilteredImages = () => {
    if (activeCategory === 'all') {
      return Object.values(images).flat();
    }
    return images[activeCategory] || [];
  };

  const categories = [
    { key: 'all', label: 'All Images', count: Object.values(images).flat().length },
    { key: 'general', label: 'General', count: images.general.length },
    { key: 'games', label: 'Games', count: images.games.length },
    { key: 'sharing', label: 'Sharing BTS', count: images.sharing.length },
    { key: 'workshops', label: 'Workshops', count: images.workshops.length }
  ];


  if (loading) {
    return <LoadingSpinner message="Loading gallery..." />;
  }

  return (
    <div>
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gallery</h1>
            <p className="text-gray-600">Explore our collection of images from various events and activities</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === category.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getFilteredImages().map((imageUrl, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </div>
            ))}
          </div>

          {getFilteredImages().length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No images found in this category</p>
            </div>
          )}
      </div>
    </div>
);
}