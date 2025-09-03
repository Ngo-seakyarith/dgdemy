'use client';

import React from 'react';
import { NEWS_CATEGORIES } from '../lib/categories';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const allCategories = [{ id: 'all', name: 'All Categories', icon: '📋' }, ...NEWS_CATEGORIES];

  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      {allCategories.map((category) => {
        const isSelected = (category.id === 'all' && !selectedCategory) || category.id === selectedCategory;
        return (
          <Button
            key={category.id}
            onClick={() => onCategoryChange(category.id === 'all' ? null : category.id)}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            className="rounded-full flex items-center gap-2"
          >
            <span>{category.icon}</span>
            {category.name}
          </Button>
        );
      })}
    </div>
  );
}
