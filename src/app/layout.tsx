'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/about', label: 'About US' },
    { href: '/learn-ai', label: 'LearnAI' },
    { href: '/contact', label: 'Contact US' },
  ];

  return (
    <html lang="en">
      <Head>
        <title>DG Academy - Real-world AI. Real Impact</title>
        <meta name="description" content="Real-world AI. Real Impact" />
        <meta property="og:title" content="DG Academy - Real-world AI. Real Impact" />
        <meta property="og:description" content="Real-world AI. Real Impact" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DG Academy - Real-world AI. Real Impact" />
        <meta name="twitter:description" content="Real-world AI. Real Impact" />
      </Head>
      <body>
        {!pathname.startsWith('/admin') && (
          <nav className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ease-out transform ${
            isScrolled 
              ? 'bg-white text-gray-900 shadow-2xl backdrop-blur-xl border border-white/20 rounded-2xl' 
              : 'bg-transparent text-gray-900 rounded-2xl'
          } animate-in slide-in-from-top duration-500`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
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
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        pathname === item.href
                          ? isScrolled 
                            ? 'bg-gray-100 text-gray-900 shadow-lg' 
                            : 'bg-gray-100 bg-opacity-80 text-gray-900 shadow-lg'
                          : isScrolled
                            ? 'hover:bg-gray-100 hover:text-gray-900 hover:shadow-md'
                            : 'hover:bg-gray-100 hover:bg-opacity-80 hover:text-gray-900 hover:shadow-md'
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'animate-in fade-in slide-in-from-top duration-500'
                      }}
                    >
                      {item.label}
                      {pathname === item.href && (
                        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full animate-in slide-in-from-left duration-300 ${
                          isScrolled ? 'bg-gray-900' : 'bg-gray-900'
                        }`}></div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        )}
        {children}
      </body>
    </html>
  );
}