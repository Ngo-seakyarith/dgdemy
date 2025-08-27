'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TrainerCard from '../components/TrainerCard';
import trainersData from '../../DB/trainer and speaker data/editdata.json';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const trainers = trainersData;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show trainers section when user scrolls down past hero section
      if (scrollPosition > windowHeight * 0.5) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dashboardItems = [
    {
      title: 'Professional Training',
      description: 'Comprehensive training programs for professionals',
      href: '/dashboard/training',
      icon: '🎓'
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
      title: 'Gallery',
      description: 'Showcase of projects and achievements',
      href: '/gallery',
      icon: '🖼️'
    },
    {
      title: 'Up coming course',
      description: 'Preview of upcoming courses and programs',
      href: '/dashboard/upcoming',
      icon: '📅'
    },
    {
      title: 'AI practice',
      description: 'Practice exercises and AI tools',
      href: '/dashboard/ai-practice',
      icon: '🤖'
    },
    {
      title: 'AI News',
      description: 'Latest updates and news in AI',
      href: '/dashboard/ai-news',
      icon: '📰'
    },
    {
      title: 'Course Catalog',
      description: 'Complete list of available courses',
      href: '/dashboard/catalog',
      icon: '📚'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
          <nav className="space-y-2">
            {dashboardItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group ${
                  item.href === '/' ? 'bg-blue-50 text-blue-600' : ''
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
      <div className="flex-1 ml-64 overflow-y-auto pt-16">
        {/* Hero Section */}
        <section className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-white">
          <div className="text-center px-4">
            <div className="mb-8">
              <Image
                src="/app-logo.png"
                alt="DGDemy Logo"
                width={120}
                height={120}
                className="mx-auto rounded-lg"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to <span className="text-yellow-300">DGDemy</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your comprehensive learning platform for professional development and AI education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">About DGDemy</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide comprehensive training programs, workshops, and resources to help professionals
                advance their careers and stay ahead in the rapidly evolving world of technology and business.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Training</h3>
                <p className="text-gray-600">Comprehensive training programs designed for career advancement</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Education</h3>
                <p className="text-gray-600">Stay ahead with cutting-edge AI and machine learning courses</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Global Network</h3>
                <p className="text-gray-600">Connect with professionals and experts worldwide</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trainers Section */}
        <section className={`py-20 bg-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Trainers</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn from industry leaders with decades of experience in business, technology, and education.
                Our expert trainers bring real-world knowledge and practical insights to every session.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainers.map((trainer, index) => (
                <TrainerCard key={index} trainer={trainer} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl mb-8">
              Join thousands of professionals who have transformed their careers with DGDemy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us Today
              </Link>
              <Link
                href="/learn-ai"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Explore AI Courses
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
