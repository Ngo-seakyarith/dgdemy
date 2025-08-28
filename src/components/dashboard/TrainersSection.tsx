'use client';

import React, { useState, useEffect } from 'react';
import { TrainerCard } from '../shared';

interface Trainer {
  name: string;
  bio: string;
  experience: string[];
  qualifications: string[];
  image?: string;
}

interface TrainersSectionProps {
  title?: string;
  subtitle?: string;
  trainers: Trainer[];
}

export default function TrainersSection({
  title = "Meet Our Expert Trainers",
  subtitle = "Learn from industry leaders with decades of experience in business, technology, and education. Our expert trainers bring real-world knowledge and practical insights to every session.",
  trainers
}: TrainersSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section className={`py-20 bg-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <TrainerCard trainer={trainer} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
