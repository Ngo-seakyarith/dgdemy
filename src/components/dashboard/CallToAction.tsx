'use client';

import React from 'react';
import Link from 'next/link';

interface CallToActionProps {
  title?: string;
  subtitle?: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
}

export default function CallToAction({
  title = "Ready to Start Your Learning Journey?",
  subtitle = "Join thousands of professionals who have transformed their careers with DGDemy",
  primaryButton = { text: "Contact Us Today", href: "/contact" },
  secondaryButton = { text: "Explore AI Courses", href: "/learn-ai" }
}: CallToActionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-700/90"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryButton.href}
            className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {primaryButton.text}
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
          <Link
            href={secondaryButton.href}
            className="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {secondaryButton.text}
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
