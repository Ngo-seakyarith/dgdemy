'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const dashboardItems = [
  {
    title: 'Gallery',
    description: 'Showcase of projects and achievements',
    href: '/dashboard/gallery',
    icon: '🖼️'
  },
  {
    title: 'AI News',
    description: 'Latest updates and news in AI',
    href: '/dashboard/ai-news',
    icon: '📰'
  },
  {
    title: 'Professional Training',
    description: 'Training materials and course documents',
    href: '/dashboard/professional-training',
    icon: '📚'
  },
  {
    title: 'Webinar',
    description: 'Live online sessions and presentations',
    href: '/dashboard/webinar',
    icon: '🎥'
  },
  {
    title: 'Workshop',
    description: 'Interactive hands-on learning sessions',
    href: '/dashboard/workshop',
    icon: '🔧'
  },
  {
    title: 'AI Practice',
    description: 'Practice exercises and AI tools',
    href: '/dashboard/ai-practice',
    icon: '🤖'
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SHARED SIDEBAR */}
      <div className="w-80 bg-white shadow-lg fixed h-full overflow-y-auto mt-16">
        <div className="p-6">
          <nav className="space-y-2">
            {dashboardItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group ${
                  pathname === item.href ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-blue-500">
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </nav>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 ml-80 overflow-y-auto pt-16">
        {children}
      </div>
    </div>
  );
}