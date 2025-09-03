'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'overlay';
  className?: string;
  showDots?: boolean;
}

export default function LoadingSpinner({
  message = "Loading...",
  size = 'md',
  variant = 'default',
  className,
  showDots = true
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const containerClasses = {
    default: "flex items-center justify-center min-h-[60vh]",
    minimal: "flex items-center justify-center py-8",
    overlay: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
  };

  return (
    <div className={cn(containerClasses[variant], className)}>
      <div className="text-center">
        <div className="relative">
          <div className={cn(
            "animate-spin rounded-full border-2 border-muted border-t-primary mx-auto mb-4",
            sizeClasses[size]
          )} />
        </div>
        <p className="text-muted-foreground text-lg font-medium">{message}</p>
        {showDots && (
          <div className="flex justify-center mt-2 space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        )}
      </div>
    </div>
  );
}
