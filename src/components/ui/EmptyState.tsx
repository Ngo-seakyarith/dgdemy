'use client';

import React from 'react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  title = "No Content Available",
  message = "Check back later for updates.",
  icon = "📰",
  action
}: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="text-8xl mb-6 animate-bounce">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-500 text-lg mb-6 max-w-md mx-auto">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
