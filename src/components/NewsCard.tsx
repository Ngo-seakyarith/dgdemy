'use client';

import React from 'react';
import Image from 'next/image';
import { NewsItem } from '../lib/types';
import { getCategoryById } from '../lib/categories';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NewsCardProps {
  item: NewsItem;
  onReadMore: (item: NewsItem) => void;
}

export default function NewsCard({ item, onReadMore }: NewsCardProps) {
  const [imageError, setImageError] = React.useState(false);
  const categoryInfo = getCategoryById(item.category);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-muted/50 to-muted">
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
          <Badge variant="secondary" className="flex items-center gap-1">
            <span>{categoryInfo?.icon || '📄'}</span>
            {categoryInfo?.name || item.category}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {item.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
          {item.excerpt || item.content.substring(0, 120) + '...'}
        </p>
      </CardContent>

      <CardFooter className="px-6 pb-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
          </div>
          <Button onClick={() => onReadMore(item)} size="sm">
            Read More
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
