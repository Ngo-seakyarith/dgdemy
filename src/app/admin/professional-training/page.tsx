'use client';

import { useState } from 'react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Upload Word Document</h1>

        <form onSubmit={handleFileUpload} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Select Word Document (.docx)
            </label>
            <input
              type="file"
              name="file"
              accept=".docx"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <p className="text-sm text-black mt-1">
              Only .docx files are supported. The document will be converted to HTML automatically.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Course Category
            </label>
            <select
              name="category"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Select a category</option>
              <option value="ai_skill">AI Skill</option>
              <option value="soft_skill">Soft Skill</option>
            </select>
            <p className="text-sm text-black mt-1">
              Choose the category for this course document.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Thumbnail Image URL (Dropbox)
            </label>
            <input
              type="url"
              name="thumbnail_url"
              placeholder="https://www.dropbox.com/s/.../image.jpg?dl=1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <p className="text-sm text-black mt-1">
              Optional: Paste the Dropbox share link for the course thumbnail image. Make sure to use the direct download link (?dl=1).
            </p>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-md ${message.includes('successfully') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/dashboard/course-catalog"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View All Documents →
          </Link>
        </div>
      </div>
    </div>
  );
}