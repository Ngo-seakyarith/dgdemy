'use client';

import React from 'react';
import Image from 'next/image';
import { NewsItem } from '../lib/types';
import { getCategoryById } from '../lib/categories';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface NewsModalProps {
  newsItem: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsModal({ newsItem, isOpen, onClose }: NewsModalProps) {
  const categoryInfo = newsItem ? getCategoryById(newsItem.category) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold pr-8 leading-tight">
            {newsItem?.url ? (
              <a
                href={newsItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {newsItem.title}
              </a>
            ) : (
              newsItem?.title
            )}
          </DialogTitle>
        </DialogHeader>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <Badge variant="secondary" className="flex items-center gap-1">
            <span>{categoryInfo?.icon || '📄'}</span>
            {categoryInfo?.name || newsItem?.category}
          </Badge>
          <span>
            {newsItem && new Date(newsItem.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* Featured Image */}
        {newsItem?.images && newsItem.images.length > 0 && (
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
          {newsItem?.excerpt && (
            <p className="text-foreground leading-relaxed mb-6 text-lg font-medium">
              {newsItem.excerpt}
            </p>
          )}

          {newsItem?.content && newsItem.content !== newsItem.excerpt && (
            <div
              className="text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: newsItem.content }}
            />
          )}
        </div>

        {/* Tags */}
        {newsItem?.tags && newsItem.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t">
            <div className="flex flex-wrap gap-2">
              {newsItem.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer hover:bg-accent">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
