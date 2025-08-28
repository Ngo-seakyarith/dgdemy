'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AINewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  category: string;
  tags: string[];
  url?: string;
}

export default function AINews() {
  const [news, setNews] = useState<AINewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAINews = async () => {
      try {
        const response = await fetch('/api/ai-news?category=ai-news&limit=10');
        if (response.ok) {
          const data = await response.json();
          setNews(data.news || []);
        }
      } catch (error) {
        console.error('Error fetching AI news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAINews();
  }, []);

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
    <div>
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI News</h1>
            <p className="text-gray-600">Stay updated with the latest developments in Artificial Intelligence</p>
          </div>
        </div>

        {/* News Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {news.length > 0 ? (
            <div className="space-y-8">
              {news.map((item) => (
                <article key={item.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition-colors"
                        >
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </h2>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mr-3">
                        {item.category}
                      </span>
                      <span>{formatDate(item.publishedAt)}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    {item.excerpt}
                  </p>

                  {item.content && item.content !== item.excerpt && (
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-600 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
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
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No AI News Available</h3>
              <p className="text-gray-500">Check back later for the latest AI updates and news.</p>
            </div>
          )}
        </div>
    </div>
  );
}