'use client';

import React from 'react';
import NewsCard from './NewsCard';
import { NewsItem } from '../../lib/types';

interface NewsGridProps {
  news: NewsItem[];
  onReadMore: (item: NewsItem) => void;
}

export default function NewsGrid({ news, onReadMore }: NewsGridProps) {
  if (news.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {news.map((item) => (
        <NewsCard
          key={item.id}
          item={item}
          onReadMore={onReadMore}
        />
      ))}
    </div>
  );
}
