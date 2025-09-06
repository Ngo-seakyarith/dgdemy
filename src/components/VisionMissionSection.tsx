'use client';

import React from 'react';

export default function VisionMissionSection() {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Vision & Mission</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-lg">
            <h3 className="text-3xl font-bold text-blue-600 mb-4">Vision</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              The premier applied-AI education and innovation hub—future-proofing people and businesses with real-world AI.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 shadow-lg">
            <h3 className="text-3xl font-bold text-green-600 mb-4">Mission</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Equip people and enterprises to master and deploy applied AI—through project-based training on an AI-powered LMS—so adoption sticks, innovation accelerates, and access is open to all.
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Key Pillars</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Skills that matter</h4>
            <p className="text-gray-600">Applied AI, strategy, and business innovation.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🌉</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Bridge to industry</h4>
            <p className="text-gray-600">Practical, high-impact training and real projects.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Drive adoption</h4>
            <p className="text-gray-600">Partnerships, research, and thought leadership.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🌍</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Access for everyone</h4>
            <p className="text-gray-600">Inclusive, scalable learning experiences.</p>
          </div>
        </div>
      </div>
    </section>
  );
}