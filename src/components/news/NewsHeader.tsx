'use client';

import React from 'react';

interface NewsHeaderProps {
  title?: string;
  subtitle?: string;
  stats?: {
    total: number;
    today: number;
  };
}

export default function NewsHeader({
  title = "AI News Dashboard",
  subtitle = "Stay updated with the latest developments in Artificial Intelligence",
  stats
}: NewsHeaderProps) {
  return (
    <div className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{title}</h1>
            <p className="text-gray-600 text-lg">{subtitle}</p>
          </div>
          {stats && (
            <div className="mt-6 md:mt-0 flex space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-500">Total Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.today}</div>
                <div className="text-sm text-gray-500">Published Today</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
