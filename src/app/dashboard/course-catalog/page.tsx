'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Document {
  id: number;
  filename: string;
  uploaded_at: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents');
      const data = await response.json();

      if (response.ok) {
        setDocuments(data.documents);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Course Documents</h1>
            <p className="text-gray-600 mt-2">Browse our collection of training materials and courses</p>
          </div>
          <Link
            href="/admin/upload"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <span>📤</span>
            Upload Course Material
          </Link>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
            <button
              onClick={fetchDocuments}
              className="mt-2 text-red-600 hover:text-red-800 underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Course Grid */}
        {documents.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Course Documents Available</h2>
            <p className="text-gray-600 mb-6">Course materials will appear here once uploaded.</p>
            <Link
              href="/admin/upload"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>📤</span>
              Upload First Course
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                {/* Course Card Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">📄</div>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Course Material
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {doc.filename.replace('.docx', '')}
                  </h3>

                  {/* Course Meta */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📅</span>
                      {new Date(doc.uploaded_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📖</span>
                      Training Material
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/dashboard/documents/${doc.id}`}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block font-medium"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-500">
          <p>Course materials are automatically converted from Word documents for optimal viewing.</p>
        </div>
      </div>
    </div>
  );
}