'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BookOpen, Scale, Users, Heart, Lightbulb, Shield } from 'lucide-react'

const principles = [
  {
    icon: <Scale className="h-8 w-8" />,
    title: 'Equality',
    description: 'Every individual deserves equal rights and opportunities regardless of birth or background',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: 'Education',
    description: 'Education is the most powerful tool for social transformation and empowerment',
    color: 'from-amber-500 to-amber-600'
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Justice',
    description: 'Social justice must be the foundation of any democratic society',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Fraternity',
    description: 'Unity and brotherhood among all communities is essential for national progress',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: 'Compassion',
    description: 'Empathy and care for the marginalized and oppressed drives true leadership',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: 'Rationality',
    description: 'Scientific temper and rational thinking should guide personal and social decisions',
    color: 'from-indigo-500 to-indigo-600'
  },
]

export default function PrinciplesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-lora font-bold mb-4 text-slate-900">
            Core Principles
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
            The fundamental values that guided Dr. Ambedkar's life and work
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((principle, index) => (
            <PrincipleCard key={index} principle={principle} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PrincipleCard({ principle, index, isInView }: { principle: any, index: number, isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 group cursor-pointer"
    >
      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${principle.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {principle.icon}
      </div>
      <h3 className="text-2xl font-lora font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
        {principle.title}
      </h3>
      <p className="text-slate-600 leading-relaxed">
        {principle.description}
      </p>
      <div className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r ${principle.color} rounded-full transition-all duration-500`} />
    </motion.div>
  )
}

