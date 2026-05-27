"use client"

import dynamic from 'next/dynamic'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { MoodTracker } from '@/components/mood-tracker'
import { PeriodTracker } from '@/components/period-tracker'
import { PregnancySection } from '@/components/pregnancy-section'
import { AIAssistant } from '@/components/ai-assistant'
import { SelfCareSection } from '@/components/self-care-section'
import { DashboardPreview } from '@/components/dashboard-preview'
import { CommunitySection } from '@/components/community-section'
import { GamificationSection } from '@/components/gamification-section'
import { Footer } from '@/components/footer'
import { FloatingHearts, FloatingPetals, AnimatedStars, AnimatedBlobs } from '@/components/floating-elements'

// Dynamically import 3D scene to avoid SSR issues
const HeroScene = dynamic(
  () => import('@/components/hero-scene').then(mod => ({ default: mod.HeroScene })),
  { ssr: false }
)

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background Effects */}
      <AnimatedBlobs />
      <AnimatedStars />
      <FloatingHearts />
      <FloatingPetals />
      
      {/* 3D Hero Background */}
      <HeroScene />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Mood Tracker Section */}
      <MoodTracker />
      
      {/* Period Tracker Section */}
      <PeriodTracker />
      
      {/* Pregnancy Section */}
      <PregnancySection />
      
      {/* AI Assistant Section */}
      <AIAssistant />
      
      {/* Self-Care Section */}
      <SelfCareSection />
      
      {/* Dashboard Preview */}
      <DashboardPreview />
      
      {/* Community Section */}
      <CommunitySection />
      
      {/* Gamification Section */}
      <GamificationSection />
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
