'use client'

import TimelineSection from '@/components/TimelineSection'
import TributeWall from '@/components/TributeWall'
import { motion } from 'framer-motion'
import { Globe, Heart, BookOpen, Award } from 'lucide-react'

export default function TheLegacyPage() {
  const legacyAspects = [
    {
      icon: <Globe className="h-12 w-12" />,
      title: "Global Impact",
      description: "Dr. Ambedkar's ideas on social justice and equality have influenced movements worldwide, inspiring leaders and activists across continents.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: "Social Transformation",
      description: "His work laid the foundation for affirmative action policies, reservation systems, and social justice frameworks that continue to empower millions.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <BookOpen className="h-12 w-12" />,
      title: "Educational Legacy",
      description: "Established institutions and policies that promote education among marginalized communities, creating pathways for social mobility.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: "Constitutional Democracy",
      description: "The Indian Constitution, largely his creation, remains a model for democratic governance and protection of minority rights globally.",
      color: "from-purple-500 to-purple-600"
    }
  ]

  const modernImpact = [
    "Reservation policies ensuring representation in education and employment",
    "Legal framework protecting against discrimination and untouchability",
    "Women's rights and gender equality provisions in the Constitution",
    "Labor rights and worker protection laws",
    "Religious freedom and secularism as constitutional principles",
    "Educational institutions named after him, continuing his mission"
  ]

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-lora font-bold mb-6">
            The Legacy
          </h1>
          <p className="text-xl md:text-2xl text-green-200 max-w-3xl mx-auto">
            His enduring impact on modern India and social justice movements worldwide
          </p>
        </div>
      </section>

      {/* Legacy Aspects */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-lora font-bold text-center mb-12 text-slate-900">
            Enduring Legacy
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {legacyAspects.map((aspect, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${aspect.color} p-8 rounded-2xl text-white shadow-lg hover:shadow-2xl transition-shadow`}
              >
                <div className="mb-4">{aspect.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{aspect.title}</h3>
                <p className="text-white/90 leading-relaxed">{aspect.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <TimelineSection />

      {/* Modern Impact */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-lora font-bold text-center mb-12 text-slate-900">
            Impact on Modern India
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <ul className="space-y-4">
              {modernImpact.map((impact, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 text-slate-700"
                >
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-lg pt-0.5">{impact}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tribute Wall */}
      <TributeWall />
    </main>
  )
}

