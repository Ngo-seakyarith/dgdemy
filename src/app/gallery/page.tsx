'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

  const dashboardItems = [
    {
      title: 'Dashboard',
      description: 'Main dashboard overview',
      href: '/',
      icon: '🏠'
    },
    {
      title: 'Professional Training',
      description: 'Comprehensive training programs for professionals',
      href: '/dashboard/training',
      icon: '🎓'
    },
    {
      title: 'Webinar',
      description: 'Live online sessions and presentations',
      href: '/dashboard/webinar',
      icon: '🎥'
    },
    {
      title: 'Workshop',
      description: 'Interactive hands-on learning sessions',
      href: '/dashboard/workshop',
      icon: '🔧'
    },
    {
      title: 'Gallery',
      description: 'Showcase of projects and achievements',
      href: '/gallery',
      icon: '🖼️'
    },
    {
      title: 'Up coming course',
      description: 'Preview of upcoming courses and programs',
      href: '/dashboard/upcoming',
      icon: '📅'
    },
    {
      title: 'AI practice',
      description: 'Practice exercises and AI tools',
      href: '/dashboard/ai-practice',
      icon: '🤖'
    },
    {
      title: 'AI News',
      description: 'Latest updates and news in AI',
      href: '/dashboard/ai-news',
      icon: '📰'
    },
    {
      title: 'Course Catalog',
      description: 'Complete list of available courses',
      href: '/dashboard/catalog',
      icon: '📚'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg fixed h-full overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
            <nav className="space-y-2">
              {dashboardItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group ${
                    item.href === '/gallery' ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500 group-hover:text-blue-500">
                      {item.description}
                    </div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Loading */}
        <div className="flex-1 ml-64 pt-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
          <nav className="space-y-2">
            {dashboardItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group ${
                  item.href === '/gallery' ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-blue-500">
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 overflow-y-auto pt-16">
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
    </div>
  );
}