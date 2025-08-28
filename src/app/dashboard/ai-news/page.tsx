'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NEWS_CATEGORIES, getCategoryById, NewsCategory } from '../../../lib/categories';

interface AINewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  category: string;
  tags: string[];
  url?: string;
  categoryInfo?: NewsCategory;
  images?: string[];
}

export default function AINews() {
  const [news, setNews] = useState<AINewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [selectedNews, setSelectedNews] = useState<AINewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAINews = async () => {
      try {
        const categoryParam = selectedCategory === 'all' ? '' : `&category=${selectedCategory}`;
        const response = await fetch(`/api/ai-news?limit=50${categoryParam}`);
        if (response.ok) {
          const data = await response.json();
          setNews(data.news || []);
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error('Error fetching AI news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAINews();
  }, [selectedCategory]);

  const openModal = (newsItem: AINewsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setIsModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI News Dashboard</h1>
          <p className="text-gray-600">Stay updated with the latest developments in Artificial Intelligence</p>

          {/* Category Filter */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
              {NEWS_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* News Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                {item.images && item.images.length > 0 ? (
                  <div className="h-48 bg-gray-200">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.style.background = '#f3f4f6';
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <div className="text-4xl">📰</div>
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        item.categoryInfo?.color || 'bg-gray-100'
                      } text-white`}
                    >
                      <span>{item.categoryInfo?.icon || '📄'}</span>
                      {item.categoryInfo?.name || item.category}
                    </span>

                    <button
                      onClick={() => openModal(item)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No AI News Available</h3>
            <p className="text-gray-500">
              {selectedCategory === 'all'
                ? 'Check back later for the latest AI updates and news.'
                : `No news available for ${NEWS_CATEGORIES.find(c => c.id === selectedCategory)?.name || selectedCategory} category.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 pr-4">
                  {selectedNews.url ? (
                    <a
                      href={selectedNews.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      {selectedNews.title}
                    </a>
                  ) : (
                    selectedNews.title
                  )}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium mr-3 flex items-center gap-1 ${
                    selectedNews.categoryInfo?.color || 'bg-gray-100'
                  } text-white`}
                >
                  <span>{selectedNews.categoryInfo?.icon || '📄'}</span>
                  {selectedNews.categoryInfo?.name || selectedNews.category}
                </span>
                <span>{formatDate(selectedNews.publishedAt)}</span>
              </div>

              {/* Full size image in modal */}
              {selectedNews.images && selectedNews.images.length > 0 && (
                <div className="mb-6">
                  <img
                    src={selectedNews.images[0]}
                    alt={selectedNews.title}
                    className="w-full max-h-96 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="prose prose-gray max-w-none">
                {/* Show excerpt if available */}
                {selectedNews.excerpt && (
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {selectedNews.excerpt}
                  </p>
                )}

                {/* Show full content if different from excerpt */}
                {selectedNews.content && selectedNews.content !== selectedNews.excerpt && (
                  <div
                    className="text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedNews.content }}
                  />
                )}
              </div>

              {selectedNews.tags && selectedNews.tags.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {selectedNews.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
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
      )}
    </div>
  );
}