'use client';

import React from 'react';
import Image from 'next/image';
import { NewsItem } from '../lib/types';
import { getCategoryById } from '../lib/categories';

interface NewsCardProps {
  item: NewsItem;
  onReadMore: (item: NewsItem) => void;
}

export default function NewsCard({ item, onReadMore }: NewsCardProps) {
  const [imageError, setImageError] = React.useState(false);
  const categoryInfo = getCategoryById(item.category);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
        {item.images && item.images.length > 0 && !imageError ? (
          <Image
            src={item.images[0]}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">📰</div>
        )}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium rounded-full shadow-lg flex items-center gap-1">
            <span>{categoryInfo?.icon || '📄'}</span>
            {categoryInfo?.name || item.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {item.excerpt || item.content.substring(0, 120) + '...'}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
          </div>
          <button
            onClick={() => onReadMore(item)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
