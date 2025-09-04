'use client';

import React from 'react';
import BoardMemberCard from './BoardMemberCard';

interface BoardMember {
  name: string;
  position: string;
  experience: string[];
  qualifications: string[];
  image?: string;
}

interface BoardMembersSectionProps {
  title?: string;
  subtitle?: string;
  members: BoardMember[];
}

export default function BoardMembersSection({
  title = "Our Board Members",
  subtitle = "Meet the visionary leaders guiding DG Academy's mission to transform education and innovation in Cambodia.",
  members
}: BoardMembersSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <BoardMemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

export type { BoardMember };
