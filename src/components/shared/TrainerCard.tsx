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
  const [imageError, setImageError] = useState(false);

  const openModal = () => {
    setImageError(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Trainer Card */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col items-center p-4">
        {/* Square Image Section */}
        <div className="relative w-32 h-32 bg-gray-100 rounded-lg mb-4">
          {trainer.image && !imageError ? (
            <Image
              src={trainer.image}
              alt={trainer.name}
              fill
              className="object-cover rounded-lg"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-3xl">👨‍🏫</span>
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{trainer.name}</h3>

        {/* View Profile Button */}
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          View Profile
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 pb-6">
              {/* Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  {trainer.image && !imageError ? (
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <span className="text-2xl">👨‍🏫</span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{trainer.name}</h2>
                  <p className="text-gray-600">Trainer & Speaker</p>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-700">{trainer.bio}</p>
              </div>

              {/* Experience */}
              {trainer.experience && trainer.experience.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Experience</h3>
                  <ul className="space-y-2">
                    {trainer.experience.map((exp, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Qualifications */}
              {trainer.qualifications && trainer.qualifications.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Qualifications</h3>
                  <ul className="space-y-2">
                    {trainer.qualifications.map((qual, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {qual}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}