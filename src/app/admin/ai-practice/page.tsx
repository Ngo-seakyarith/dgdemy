'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export default function AdminAiPracticeUploadPage() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);
    setMessage('');

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const duration = formData.get('duration') as string;
    const thumbnailUrl = formData.get('thumbnail_url') as string;
    const youtubeUrl = formData.get('youtube_url') as string;

    if (!title || !date || !duration || !youtubeUrl) {
      setMessage('Please fill in all required fields');
      setUploading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/ai-practice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          date,
          duration,
          thumbnail_url: thumbnailUrl,
          youtube_url: youtubeUrl,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`AI Practice uploaded successfully! ID: ${result.id}`);
        // Clear the form after successful upload
        (event.target as HTMLFormElement).reset();
      } else {
        setMessage(`Upload failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Upload AI Practice</CardTitle>
            <CardDescription className="text-center">
              Add a new AI practice video to the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="Enter AI practice title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="text"
                  required
                  placeholder="e.g., 1h 30m"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail_url">Thumbnail Image URL</Label>
                <Input
                  id="thumbnail_url"
                  name="thumbnail_url"
                  type="url"
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube_url">YouTube URL *</Label>
                <Input
                  id="youtube_url"
                  name="youtube_url"
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <Button type="submit" disabled={uploading} className="w-full">
                {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {uploading ? 'Uploading...' : 'Upload AI Practice'}
              </Button>
            </form>

            {message && (
              <Alert className={`mt-6 ${message.includes('successfully') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <AlertDescription>
                  {message}
                </AlertDescription>
              </Alert>
            )}

            <div className="mt-8 text-center">
              <Button variant="link" asChild>
                <Link href="/dashboard/ai-practice">
                  View All AI Practices →
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}