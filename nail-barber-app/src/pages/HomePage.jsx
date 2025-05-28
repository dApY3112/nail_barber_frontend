import React, { Suspense, lazy } from 'react';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import ServicesGrid from '../components/ServicesGrid';

const Testimonials = lazy(() => import('../components/Testimonials'));
const CTASection = lazy(() => import('../components/CTASection'));

export default function HomePage() {
  return (
    <main>
      {/* Hero Banner */}
      <HeroSection />

      {/* Steps to Get Started */}
      <HowItWorks />

      {/* List of Services */}
      <ServicesGrid />

      {/* Lazy Loaded Sections */}
      <Suspense fallback={<div>Loading testimonials...</div>}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<div>Loading CTA...</div>}>
        <CTASection />
      </Suspense>
    </main>
  );
}
