import InteractiveCard from '@/components/InteractiveCard'
import QuoteCarousel from '@/components/QuoteCarousel'
import { achievements } from '@/lib/ambedkar-data'
import { BookOpen, Award, GraduationCap, Heart, Users, Lightbulb } from 'lucide-react'

export default function TheManPage() {
  const personalityTraits = [
    {
      title: "Intellectual Brilliance",
      description: "A scholar with multiple degrees from prestigious universities",
      icon: "🧠",
      details: [
        "Earned degrees from Columbia University and London School of Economics",
        "Proficient in multiple languages including English, Sanskrit, and Pali",
        "Authored numerous books on economics, politics, and social issues",
        "Recognized as one of India's most educated leaders of his time"
      ],
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Unwavering Principles",
      description: "Stood firm on his beliefs despite facing immense opposition",
      icon: "⚖️",
      details: [
        "Never compromised on the principles of equality and justice",
        "Resigned from cabinet when his views were not respected",
        "Converted to Buddhism as a final statement against caste system",
        "Believed in constitutional methods over violence"
      ],
      gradient: "from-amber-500 to-amber-600"
    },
    {
      title: "Compassionate Leader",
      description: "Dedicated his life to uplifting the marginalized",
      icon: "❤️",
      details: [
        "Fought for the rights of Dalits, women, and workers",
        "Established educational institutions for backward classes",
        "Worked tirelessly for social reform throughout his life",
        "Inspired millions with his vision of an egalitarian society"
      ],
      gradient: "from-red-500 to-red-600"
    },
    {
      title: "Visionary Thinker",
      description: "Ahead of his time in understanding social dynamics",
      icon: "💡",
      details: [
        "Envisioned a modern, democratic India",
        "Advocated for women's rights and education",
        "Promoted scientific temper and rational thinking",
        "Foresaw the importance of social justice in nation-building"
      ],
      gradient: "from-purple-500 to-purple-600"
    }
  ]

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-lora font-bold mb-6">
            The Man
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
            Discover the extraordinary personality, principles, and achievements of 
            Dr. Bhimrao Ramji Ambedkar
          </p>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-lora font-bold text-center mb-12 text-slate-900">
            Remarkable Achievements
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <InteractiveCard
                key={index}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                details={achievement.details}
                gradient={achievement.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Personality Traits */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-lora font-bold text-center mb-12 text-slate-900">
            Core Personality Traits
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {personalityTraits.map((trait, index) => (
              <InteractiveCard
                key={index}
                title={trait.title}
                description={trait.description}
                icon={trait.icon}
                details={trait.details}
                gradient={trait.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quotes */}
      <QuoteCarousel />
    </main>
  )
}

