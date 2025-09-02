'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('admin_authenticated');
    const authenticated = authStatus === 'true';

    setIsAuthenticated(authenticated);
    setIsLoading(false);

    // If not authenticated and not on the main admin page, redirect to admin login
    if (!authenticated && pathname !== '/admin') {
      router.push(`/admin?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router]);

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

  // If not authenticated and not on main admin page, don't render anything (will redirect)
  if (!isAuthenticated && pathname !== '/admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <nav className="flex space-x-4">
              <a
                href="/admin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="/admin/course-catalog"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Course Catalog
              </a>
              <a
                href="/admin/ai-practice"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                AI Practice
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}