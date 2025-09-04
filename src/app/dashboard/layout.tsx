
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaImages, FaNewspaper, FaBook, FaVideo, FaTools, FaRobot } from 'react-icons/fa';

const dashboardItems = [
  {
    title: 'Gallery',
    href: '/dashboard/gallery',
    icon: <FaImages />
  },
  {
    title: 'AI News',
    href: '/dashboard/ai-news',
    icon: <FaNewspaper />
  },
  {
    title: 'Professional Training',
    href: '/dashboard/professional-training',
    icon: <FaBook />
  },
  {
    title: 'Webinar',
    href: '/dashboard/webinar',
    icon: <FaVideo />
  },
  {
    title: 'Workshop',
    href: '/dashboard/workshop',
    icon: <FaTools />
  },
  {
    title: 'AI Practice',
    href: '/dashboard/ai-practice',
    icon: <FaRobot />
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
      <div className="min-h-screen bg-white flex">
          {/* Responsive Expanding Sidebar */}
          <div
            className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 h-auto bg-white/90 shadow-xl rounded-2xl z-20 flex flex-col items-center py-4 px-1 sm:px-2 gap-2 border border-gray-200 w-16 sm:w-20"
          >
          <nav className="flex flex-col gap-2 w-full items-center justify-center">
            {dashboardItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex min-w-0 h-12 rounded-xl px-2 transition-all duration-300 overflow-visible ${
                  pathname === item.href ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                } items-center justify-start relative`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ width: '4rem' }}
              >
                <span className="text-2xl flex-shrink-0 w-12 h-12 flex items-center justify-center mx-auto">{item.icon}</span>
                <span
                  className={`absolute left-14 top-1/2 -translate-y-1/2 bg-white rounded-xl px-3 py-2 shadow transition-all duration-300 whitespace-nowrap text-base font-medium text-gray-900 overflow-visible text-ellipsis ${
                    hoveredIndex === index ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                  style={{ minWidth: hoveredIndex === index ? '8rem' : '0', maxWidth: hoveredIndex === index ? '12rem' : '0', zIndex: 30 }}
                >
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-20 sm:ml-24 overflow-y-auto pt-16 bg-white">
          {children}
        </div>
      </div>
  );
}