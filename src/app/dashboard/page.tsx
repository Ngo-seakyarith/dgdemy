'use client';

import React from 'react';
import { PageTransition, HeroSection, VisionMissionSection, AboutSection, TrainersSection, CallToAction } from '../../components';
import trainersData from '../../../DB/trainer and speaker data/editdata.json';

export default function DashboardHome() {
  const trainers = trainersData;

  return (
    <PageTransition>
      <div className="min-h-screen">
        <HeroSection />

        <VisionMissionSection />

        <AboutSection />

        <TrainersSection trainers={trainers} />

        <CallToAction />
      </div>
    </PageTransition>
  );
}