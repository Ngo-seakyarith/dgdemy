'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { NewsItem } from '../../lib/types';
import { getCategoryById } from '../../lib/categories';

interface NewsModalProps {
  newsItem: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsModal({ newsItem, isOpen, onClose }: NewsModalProps) {
  const categoryInfo = newsItem ? getCategoryById(newsItem.category) : null;
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !newsItem) return null;

  return (
    <>
      {/* Blur Background */}
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 cursor-pointer"
        onClick={() => {
          console.log('Backdrop clicked - should close modal');
          onClose();
        }}
        style={{ pointerEvents: 'auto' }}
      />

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl pointer-events-auto"
          onClick={(e) => {
            console.log('Modal content clicked - preventing close');
            e.stopPropagation();
          }}
        >
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-gray-900 pr-8 leading-tight">
                {newsItem.url ? (
                  <a
                    href={newsItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {newsItem.title}
                  </a>
                ) : (
                  newsItem.title
                )}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-3xl font-light w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Meta Information */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium flex items-center gap-1">
                <span>{categoryInfo?.icon || '📄'}</span>
                {categoryInfo?.name || newsItem.category}
              </span>
              <span>{new Date(newsItem.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>

            {/* Featured Image */}
            {newsItem.images && newsItem.images.length > 0 && (
              <div className="mb-8">
                <Image
                  src={newsItem.images[0]}
                  alt={newsItem.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-xl shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {newsItem.excerpt && (
                <p className="text-gray-700 leading-relaxed mb-6 text-lg font-medium">
                  {newsItem.excerpt}
                </p>
              )}

              {newsItem.content && newsItem.content !== newsItem.excerpt && (
                <div
                  className="text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: newsItem.content }}
                />
              )}
            </div>

            {/* Tags */}
            {newsItem.tags && newsItem.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {newsItem.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:from-blue-200 hover:to-indigo-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
