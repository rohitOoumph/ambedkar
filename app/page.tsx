import Hero3D from '@/components/Hero3D'
import QuoteCarousel from '@/components/QuoteCarousel'
import LifeJourneyTimeline from '@/components/LifeJourneyTimeline'
import ImpactStats from '@/components/ImpactStats'
import AchievementsShowcase from '@/components/AchievementsShowcase'
import PrinciplesSection from '@/components/PrinciplesSection'
import CTASection from '@/components/CTASection'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with 3D Element */}
      <Hero3D />

      {/* Life Journey Timeline Section */}
      <LifeJourneyTimeline />

      {/* Impact Statistics */}
      <ImpactStats />

      {/* Achievements Showcase */}
      <AchievementsShowcase />

      {/* Quote Carousel */}
      <QuoteCarousel />

      {/* Core Principles */}
      <PrinciplesSection />

      {/* Call to Action */}
      <CTASection />
    </main>
  )
}