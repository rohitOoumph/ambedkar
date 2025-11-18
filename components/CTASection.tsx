'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const ctaCards = [
    {
      icon: BookOpen,
      title: 'The Man',
      description: 'Explore his life and personality',
      href: '/the-man',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Award,
      title: 'The Mission',
      description: 'Understand his constitutional role',
      href: '/the-mission',
      gradient: 'from-amber-500 to-amber-600'
    },
    {
      icon: Users,
      title: 'The Legacy',
      description: 'Discover his lasting impact',
      href: '/the-legacy',
      gradient: 'from-green-500 to-green-600'
    },
  ]

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-lora font-bold mb-4">
            Continue the Journey
          </h2>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
            Dive deeper into the life, mission, and legacy of Dr. B.R. Ambedkar
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {ctaCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Link href={card.href}>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full group cursor-pointer">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-lora font-bold mb-2 group-hover:text-amber-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-blue-200 mb-4">{card.description}</p>
                  <div className="flex items-center text-amber-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Explore <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

