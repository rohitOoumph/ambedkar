'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { number: '1950', label: 'Constitution Adopted', suffix: '', description: 'Year the Indian Constitution came into effect' },
  { number: '470', label: 'Articles Drafted', suffix: '', description: 'Articles in the Indian Constitution' },
  { number: '141', label: 'Days to Draft', suffix: '', description: 'Time taken to create the Constitution' },
  { number: '1990', label: 'Bharat Ratna', suffix: '', description: 'Posthumously awarded India\'s highest civilian honor' },
]

export default function ImpactStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-lora font-bold mb-4">
            Impact in Numbers
          </h2>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
            The measurable legacy of Dr. Ambedkar's contributions to modern India
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat, index, isInView }: { stat: any, index: number, isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring" }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-amber-400"
      >
        {stat.number}
        {stat.suffix}
      </motion.div>
      <h3 className="text-lg md:text-xl font-semibold mb-2">{stat.label}</h3>
      <p className="text-sm md:text-base text-blue-200 opacity-90">{stat.description}</p>
    </motion.div>
  )
}

