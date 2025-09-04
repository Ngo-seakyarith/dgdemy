'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
}

interface SidebarNavigationProps {
  items: NavigationItem[];
}

export default function SidebarNavigation({ items }: SidebarNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => item.id);
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for any fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed left-4 top-23 z-40 transition-all duration-300">
      <Card className="p-2 shadow-lg bg-white/95 backdrop-blur-sm border border-gray-200">
        {/* Navigation Items */}
        <div className="space-y-1 w-48">
          {items.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => scrollToSection(item.id)}
              className={`w-full justify-start text-left transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="truncate">{item.label}</span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
