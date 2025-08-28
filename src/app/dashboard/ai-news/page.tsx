'use client';

import React, { useState, useEffect, useMemo } from 'react';
import PageTransition from '../../../components/PageTransition';
import NewsHeader from '../../../components/NewsHeader';
import NewsGrid from '../../../components/NewsGrid';
import NewsModal from '../../../components/NewsModal';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyState from '../../../components/EmptyState';
import CategoryFilter from '../../../components/CategoryFilter';
import { NewsItem } from '../../../lib/types';

export default function AINewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/ai-news?limit=50');

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setNews(data.news || []);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Filter news based on selected category
  const filteredNews = useMemo(() => {
    if (!selectedCategory) return news;
    return news.filter(item => item.category === selectedCategory);
  }, [news, selectedCategory]);

  const openModal = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setIsModalOpen(false);
  };

  const handleRetry = () => {
    setError(null);
    window.location.reload();
  };

  // Calculate stats
  const stats = news.length > 0 ? {
    total: news.length,
    today: news.filter(item => {
      const today = new Date().toDateString();
      return new Date(item.publishedAt).toDateString() === today;
    }).length
  } : undefined;

  if (loading) {
    return (
      <PageTransition>
        <LoadingSpinner message="Loading AI news..." />
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <NewsHeader />
          <div className="max-w-7xl mx-auto px-6 py-12">
            <EmptyState
              title="Failed to Load News"
              message={error}
              icon="⚠️"
              action={{
                label: "Try Again",
                onClick: handleRetry
              }}
            />
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <NewsHeader stats={stats} />

          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Category Filter */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {filteredNews.length > 0 ? (
              <NewsGrid news={filteredNews} onReadMore={openModal} />
            ) : selectedCategory ? (
              <EmptyState
                title="No News Found"
                message={`No articles found in the "${selectedCategory}" category.`}
                icon="🔍"
                action={{
                  label: "Show All Categories",
                  onClick: () => setSelectedCategory(null)
                }}
              />
            ) : (
              <EmptyState
                title="No AI News Available"
                message="Check back later for the latest AI updates and news."
                icon="📰"
              />
            )}
          </div>
        </div>
      </PageTransition>

      <NewsModal
        newsItem={selectedNews}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}