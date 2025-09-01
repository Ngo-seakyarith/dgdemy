'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/about', label: 'About US' },
    { href: '/learn-ai', label: 'LearnAI' },
    { href: '/contact', label: 'Contact US' },
  ];

  return (
    <html lang="en">
      <body>
        <nav className="bg-blue-600 text-white shadow-lg fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2 group">
                  <Image
                    src="/app-logo.png"
                    alt="DG Academy Logo"
                    width={40}
                    height={40}
                    className="rounded transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="text-xl font-bold transition-transform duration-300 group-hover:scale-105">DG Academy</span>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      pathname === item.href
                        ? 'bg-blue-700 text-white shadow-lg'
                        : 'hover:bg-blue-700 hover:text-white hover:shadow-md'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'animate-in fade-in slide-in-from-top duration-500'
                    }}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-white rounded-full animate-in slide-in-from-left duration-300"></div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}