'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Trainer {
  name: string;
  bio: string;
  experience: string[];
  qualifications: string[];
  image?: string;
}

interface TrainerCardProps {
  trainer: Trainer;
}

export default function TrainerCard({ trainer }: TrainerCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Trainer Card */}
      <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Image Section */}
        <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {trainer.image ? (
            <Image
              src={trainer.image}
              alt={trainer.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                <span className="text-3xl text-gray-400">👨‍🏫</span>
              </div>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-gray-50"
            >
              View Profile
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {trainer.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {trainer.bio.substring(0, 100)}...
          </p>

          {/* Quick Stats */}
          <div className="flex justify-center space-x-4 mt-4 text-xs text-gray-500">
            {trainer.experience && trainer.experience.length > 0 && (
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                {trainer.experience.length} Roles
              </span>
            )}
            {trainer.qualifications && trainer.qualifications.length > 0 && (
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                {trainer.qualifications.length} Qualifications
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-gray-600 text-xl">×</span>
              </button>

              {/* Header with image and name */}
              <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative h-full flex items-end p-8">
                  <div className="flex items-end space-x-6">
                    <div className="relative w-24 h-24 bg-white rounded-full shadow-xl overflow-hidden">
                      {trainer.image ? (
                        <Image
                          src={trainer.image}
                          alt={trainer.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-3xl text-gray-400">👨‍🏫</span>
                        </div>
                      )}
                    </div>
                    <div className="text-white">
                      <h2 className="text-3xl font-bold mb-2">{trainer.name}</h2>
                      <p className="text-blue-100">Expert Trainer & Speaker</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Bio Section */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">About</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{trainer.bio}</p>
                </div>

                {/* Experience Section */}
                {trainer.experience && trainer.experience.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Experience</h3>
                    <div className="space-y-3">
                      {trainer.experience.map((exp, index) => (
                        <div key={index} className="flex items-start bg-gray-50 rounded-lg p-4">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                          <p className="text-gray-700">{exp}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Qualifications Section */}
                {trainer.qualifications && trainer.qualifications.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualifications & Certifications</h3>
                    <div className="space-y-3">
                      {trainer.qualifications.map((qual, index) => (
                        <div key={index} className="flex items-start bg-green-50 rounded-lg p-4">
                          <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                          <p className="text-gray-700">{qual}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}