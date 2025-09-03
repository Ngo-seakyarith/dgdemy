'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, FileText } from 'lucide-react';

export default function AdminUploadPage() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);
    setMessage('');

    const formData = new FormData(event.currentTarget);
    const file = formData.get('file') as File;

    if (!file) {
      setMessage('Please select a file');
      setUploading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/professional-training', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`File uploaded successfully! Document ID: ${result.id}`);
        // Clear the form after successful upload
        (event.target as HTMLFormElement).reset();
      } else {
        setMessage(`Upload failed: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Upload className="h-6 w-6" />
              Upload Word Document
            </CardTitle>
            <CardDescription className="text-center">
              Upload a Word document to convert it to an interactive course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFileUpload} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file">Select Word Document (.docx)</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept=".docx"
                  required
                />
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Only .docx files are supported. The document will be converted to HTML automatically.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Course Category</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai_skill">AI Skill</SelectItem>
                    <SelectItem value="soft_skill">Soft Skill</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose the category for this course document.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail_url">Thumbnail Image URL (Dropbox)</Label>
                <Input
                  id="thumbnail_url"
                  name="thumbnail_url"
                  type="url"
                  placeholder="https://www.dropbox.com/s/.../image.jpg?dl=1"
                />
                <p className="text-sm text-muted-foreground">
                  Optional: Paste the Dropbox share link for the course thumbnail image. Make sure to use the direct download link (?dl=1).
                </p>
              </div>

              <Button type="submit" disabled={uploading} className="w-full">
                {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {uploading ? 'Uploading...' : 'Upload Document'}
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
                <Link href="/dashboard/professional-training">
                  View All Documents →
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}