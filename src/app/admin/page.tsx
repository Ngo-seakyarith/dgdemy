'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  useEffect(() => {
    // Check if already authenticated from localStorage
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleAuth = () => {
    console.log('Admin auth attempt:', { password: password ? '***' : '', adminPassword: ADMIN_PASSWORD ? '***' : '' });
    if (password === ADMIN_PASSWORD) {
      console.log('Admin authentication successful');
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      setMessage('');

      // Redirect to intended page or default to ai-practice
      const redirectTo = searchParams.get('redirect') || '/admin/ai-practice';
      router.push(redirectTo);
    } else {
      console.log('Admin authentication failed');
      setMessage('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    setPassword('');
    setMessage('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-black">Admin Access</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black !important"
                style={{ color: '#000000' }}
                placeholder="Enter admin password"
                onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
              />
            </div>

            {message && (
              <div className="text-red-600 text-sm">{message}</div>
            )}

            <button
              onClick={handleAuth}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Access Admin Panel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-black">AI Practice Management</h2>
            <p className="text-black mb-4">Upload and manage AI practice content</p>
            <Link
              href="/admin/ai-practice"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Manage AI Practice →
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-black">Course Catalog Management</h2>
            <p className="text-black mb-4">Upload and manage course documents</p>
            <Link
              href="/admin/course-catalog"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Manage Course Catalog →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}