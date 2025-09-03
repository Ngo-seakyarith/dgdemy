'use client';

import React from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const clientLogos = [
  { src: '/client-log/ABA.png', alt: 'ABA' },
  { src: '/client-log/Accounting and auditing regulator.png', alt: 'Accounting and auditing regulator' },
  { src: '/client-log/Angkor Green.jpg', alt: 'Angkor Green' },
  { src: '/client-log/Food Panda.png', alt: 'Food Panda' },
  { src: '/client-log/Geolink.png', alt: 'Geolink' },
  { src: '/client-log/Kofi.png', alt: 'Kofi' },
  { src: '/client-log/Ministry of economy and finance.jpg', alt: 'Ministry of economy and finance' },
  { src: '/client-log/Poma.png', alt: 'Poma' },
  { src: '/client-log/Residence.jpg', alt: 'Residence' },
  { src: '/client-log/Samsung.png', alt: 'Samsung' },
  { src: '/client-log/Skills development fund.png', alt: 'Skills development fund' },
  { src: '/client-log/Tech Zone.png', alt: 'Tech Zone' },
  { src: '/client-log/Tigron.png', alt: 'Tigron' },
];

export default function ClientLogosMarquee() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted By
          </h3>
          <p className="text-lg text-gray-600">
            Leading organizations that trust our expertise
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <Marquee
            gradient={false}
            speed={50}
            pauseOnHover={true}
            className="py-4"
          >
            {clientLogos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center mx-8 min-w-[120px] h-16"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={64}
                  unoptimized
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}