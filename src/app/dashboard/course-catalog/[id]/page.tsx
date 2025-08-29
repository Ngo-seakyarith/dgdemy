'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Document {
  id: number;
  filename: string;
  html_content: string;
  uploaded_at: string;
}

export default function DocumentPage() {
  const params = useParams();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.id) {
      fetchDocument();
    }
  }, [params.id]);

  const fetchDocument = async () => {
    try {
      const response = await fetch(`/api/documents/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setDocument(data.document);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to load document');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            href="/dashboard/documents"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Course Documents
          </Link>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Document not found</p>
          <Link
            href="/dashboard/documents"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Course Documents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-8 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{document.filename}</h1>
            <p className="text-gray-600 mt-1">
              Uploaded: {new Date(document.uploaded_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/dashboard/documents"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ← All Course Documents
            </Link>
            <Link
              href="/admin/upload"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Upload New
            </Link>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: document.html_content }}
        />
      </div>
    </div>
  );
}