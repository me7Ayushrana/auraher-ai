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

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
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
