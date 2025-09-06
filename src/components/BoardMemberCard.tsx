'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface BoardMember {
  name: string;
  position: string;
  experience: string[];
  qualifications: string[];
  image?: string;
}

interface BoardMemberCardProps {
  member: BoardMember;
}

export default function BoardMemberCard({ member }: BoardMemberCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 p-6 text-center bg-white">
      {/* Image */}
      <div className="relative w-30 h-30 mx-auto mb-4 bg-gray-100 rounded-full overflow-hidden">
        {member.image && !imageError ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-2xl">
            👨‍💼
          </div>
        )}
      </div>

      {/* Name */}
      <CardContent className="p-0">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>

        {/* Position */}
        <p className="text-blue-600 font-semibold text-sm">{member.position}</p>
      </CardContent>
    </Card>
  );
}
