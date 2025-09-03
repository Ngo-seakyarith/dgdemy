'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';

interface Document {
  id: number;
  filename: string;
  html_content: string;
  category: 'ai_skill' | 'soft_skill';
  uploaded_at: string;
}

// Function to extract only the Word document content from the stored HTML
function extractWordContent(htmlContent: string): string {
  // Since we're now using pure Mammoth output, just return the content as-is
  return htmlContent;
}

export default function DocumentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocument = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/professional-training/${params.id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Document not found');
        }
        throw new Error('Failed to fetch document');
      }
      const data = await response.json();
      setDocument(data.document);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      fetchDocument();
    }
  }, [params.id, fetchDocument]);

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Loading document...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="min-h-screen bg-muted/50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error || 'Document not found'}
              </AlertDescription>
            </Alert>
            <div className="mt-4 flex gap-2 justify-center">
              <Button onClick={fetchDocument} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Catalog
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="w-full px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <div className="mb-6 flex justify-start">
          <Button onClick={() => router.back()} variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course Catalog
          </Button>
        </div>

        {/* Document Content */}
        <Card>
          <CardContent className="p-6">
            {/* Add CSS for proper formatting */}
            <style dangerouslySetInnerHTML={{
              __html: `
                .document-content {
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                  line-height: 1.8;
                  color: #2d3748;
                  width: 100%;
                  padding: 20px;
                }

                /* Global counter for all numbered lists */
                .document-content {
                  counter-reset: chapter-counter;
                }

                /* Main Course Title - Hero style */
                .document-content p:first-child strong {
                  font-size: 3em !important;
                  font-weight: 900 !important;
                  color: #1a202c !important;
                  display: block;
                  text-align: center;
                  margin: 20px 0 50px 0 !important;
                  padding: 30px 20px;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white !important;
                  border-radius: 15px;
                  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                  text-transform: uppercase;
                  letter-spacing: 2px;
                  position: relative;
                }

                .document-content p:first-child strong::after {
                  content: '';
                  position: absolute;
                  bottom: -10px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 60px;
                  height: 4px;
                  background: #667eea;
                  border-radius: 2px;
                }

                /* Chapter titles - properly numbered */
                .document-content ol li strong {
                  counter-increment: chapter-counter;
                  font-size: 1.8em !important;
                  font-weight: 700 !important;
                  color: #2d3748 !important;
                  margin: 40px 0 20px 0 !important;
                  padding: 15px 0 10px 0;
                  border-bottom: 2px solid #e2e8f0;
                  display: block;
                  position: relative;
                }

                .document-content ol li strong::before {
                  content: counter(chapter-counter) ". ";
                  color: #667eea;
                  font-weight: 900;
                  font-size: 1.2em;
                }

                /* Hide the default ol/li structure since we're using custom numbering */
                .document-content ol {
                  list-style: none;
                  padding-left: 0;
                  margin: 0;
                }

                .document-content ol li {
                  margin: 0;
                  padding: 0;
                }

                /* Module headings within paragraphs */
                .document-content p strong:not(:first-child) {
                  font-size: 1.3em !important;
                  font-weight: 700 !important;
                  color: #4a5568 !important;
                  display: block;
                  margin: 35px 0 15px 0 !important;
                  padding: 10px 15px;
                  background: #f7fafc;
                  border-left: 4px solid #667eea;
                  border-radius: 0 8px 8px 0;
                }

                /* Bullet lists - improved styling */
                .document-content ul {
                  padding-left: 25px;
                  margin: 20px 0;
                  background: #f8fafc;
                  padding: 20px 25px;
                  border-radius: 8px;
                  border-left: 4px solid #e2e8f0;
                }

                .document-content ul li {
                  margin-bottom: 10px;
                  line-height: 1.7;
                  position: relative;
                  padding-left: 10px;
                }

                .document-content ul li::marker {
                  color: #667eea;
                  font-weight: bold;
                  font-size: 1.1em;
                }

                .document-content ul li:last-child {
                  margin-bottom: 0;
                }

                /* Regular paragraphs - improved readability */
                .document-content p:not(:first-child) {
                  margin-bottom: 20px;
                  line-height: 1.8;
                  color: #4a5568 !important;
                  text-align: justify;
                  padding: 0 10px;
                  font-size: 1.05em;
                }

                .document-content p:last-child {
                  margin-bottom: 0;
                }

                /* Regular bold text */
                .document-content strong:not(ol li strong):not(p:first-child strong),
                .document-content b {
                  font-weight: 600 !important;
                  color: #2d3748 !important;
                  background: linear-gradient(120deg, #667eea 0%, transparent 100%);
                  background-clip: text;
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-color: #667eea;
                  padding: 0 2px;
                }

                /* Ensure all text is visible and properly colored */
                .document-content * {
                  color: inherit;
                }

                /* Add some breathing room */
                .document-content > *:first-child {
                  margin-top: 0;
                }

                .document-content > *:last-child {
                  margin-bottom: 0;
                }
              `
            }} />
            <div
              className="document-content prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: extractWordContent(document.html_content) }}
            />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}