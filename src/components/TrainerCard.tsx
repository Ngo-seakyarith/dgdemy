'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col items-center p-4">
      {/* Square Image Section */}
      <div className="relative w-60 h-60 bg-muted rounded-lg mb-4">
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
      <CardContent className="p-0 mb-4">
        <h3 className="text-lg font-semibold text-foreground text-center">{trainer.name}</h3>
      </CardContent>

      {/* View Profile Button */}
      <CardFooter className="p-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setImageError(false)}>
              View Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="sr-only">{trainer.name} Profile</DialogTitle>
            </DialogHeader>

            {/* Modal Content */}
            <div>
              {/* Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
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
                  <h2 className="text-2xl font-bold text-foreground">{trainer.name}</h2>
                  <p className="text-muted-foreground">Trainer & Speaker</p>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">About</h3>
                <p className="text-muted-foreground">{trainer.bio}</p>
              </div>

              {/* Experience */}
              {trainer.experience && trainer.experience.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Experience</h3>
                  <ul className="space-y-2">
                    {trainer.experience.map((exp, index) => (
                      <li key={index} className="text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Qualifications */}
              {trainer.qualifications && trainer.qualifications.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Qualifications</h3>
                  <ul className="space-y-2">
                    {trainer.qualifications.map((qual, index) => (
                      <li key={index} className="text-muted-foreground flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {qual}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}