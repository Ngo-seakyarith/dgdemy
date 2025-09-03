'use client';

import { useEffect, useState, useCallback } from 'react';
import CourseCard from '../../../components/CourseCard';
import { Document } from '../../../lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { LoadingSpinner } from '../../../components';

export default function CourseCatalogPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai_skill' | 'soft_skill'>('all');

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'all'
        ? '/api/professional-training'
        : `/api/professional-training?category=${selectedCategory}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  if (loading) {
    return <LoadingSpinner message="Loading training documents..." variant="minimal" />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
            <div className="mt-4 text-center">
              <Button onClick={fetchDocuments} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Professional Training Courses</CardTitle>
              <CardDescription>
                Browse our collection of professional development courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={() => setSelectedCategory('all')}
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                >
                  All Courses
                </Button>
                <Button
                  onClick={() => setSelectedCategory('ai_skill')}
                  variant={selectedCategory === 'ai_skill' ? 'default' : 'outline'}
                  size="sm"
                >
                  AI Skills
                </Button>
                <Button
                  onClick={() => setSelectedCategory('soft_skill')}
                  variant={selectedCategory === 'soft_skill' ? 'default' : 'outline'}
                  size="sm"
                >
                  Soft Skills
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {documents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((document) => (
              <CourseCard key={document.id} document={document} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No courses found in this category.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}