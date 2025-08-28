'use client';

import React from 'react';
import PageTransition from '../../components/PageTransition';
import HeroSection from '../../components/HeroSection';
import AboutSection from '../../components/AboutSection';
import TrainersSection from '../../components/TrainersSection';
import CallToAction from '../../components/CallToAction';
import trainersData from '../../../DB/trainer and speaker data/editdata.json';

export default function DashboardHome() {
  const trainers = trainersData;

  return (
    <PageTransition>
      <div className="min-h-screen">
        <HeroSection />

        <AboutSection />

        <TrainersSection trainers={trainers} />

        <CallToAction />
      </div>
    </PageTransition>
  );
}