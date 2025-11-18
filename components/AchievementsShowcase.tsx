'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { achievements } from '@/lib/ambedkar-data'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function AchievementsShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)

  const nextAchievement = () => {
    setActiveIndex((prev) => (prev + 1) % achievements.length)
  }

  const prevAchievement = () => {
    setActiveIndex((prev) => (prev - 1 + achievements.length) % achievements.length)
  }

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-lora font-bold mb-4 text-slate-900">
            Remarkable Achievements
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
            Exploring the multifaceted contributions that shaped modern India
          </p>
        </motion.div>

        {/* Main Achievement Card */}
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Icon */}
              <div className={`text-8xl md:text-9xl bg-gradient-to-br ${achievements[activeIndex].gradient} p-8 rounded-3xl shadow-lg flex-shrink-0`}>
                {achievements[activeIndex].icon}
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-lora font-bold text-slate-900 mb-4">
                  {achievements[activeIndex].title}
                </h3>
                <p className="text-lg md:text-xl text-slate-600 mb-6">
                  {achievements[activeIndex].description}
                </p>
                <ul className="space-y-3">
                  {achievements[activeIndex].details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 text-slate-700"
                    >
                      <span className="text-blue-600 font-bold mt-1">✓</span>
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevAchievement}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-slate-200"
              aria-label="Previous achievement"
            >
              <ArrowLeft className="h-6 w-6 text-slate-700" />
            </button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {achievements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-blue-600'
                      : 'w-3 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to achievement ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextAchievement}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-slate-200"
              aria-label="Next achievement"
            >
              <ArrowRight className="h-6 w-6 text-slate-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

