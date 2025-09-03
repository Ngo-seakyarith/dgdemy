'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

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
      <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
      <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto">{message}</p>
      {action && (
        <Button onClick={action.onClick} size="lg">
          {action.label}
        </Button>
      )}
    </div>
  );
}
