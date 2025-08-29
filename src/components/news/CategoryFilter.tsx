'use client';

import React from 'react';
import { NEWS_CATEGORIES } from '../../lib/categories';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const allCategories = [{ id: 'all', name: 'All Categories', icon: '📋' }, ...NEWS_CATEGORIES];

  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      {allCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id === 'all' ? null : category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2 ${
            (category.id === 'all' && !selectedCategory) || category.id === selectedCategory
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-blue-300'
          }`}
        >
          <span>{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
}
