'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { timelineEvents } from '@/lib/ambedkar-data'

export default function TimelineSection() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-lora font-bold text-center mb-16 text-slate-900">
          Journey Through Time
        </h2>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-green-500 hidden md:block" />
          
          {timelineEvents.map((event, index) => (
            <TimelineItem key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ event, index }: { event: any, index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-center mb-12 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col md:flex-row`}
    >
      <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} text-center md:text-left mb-4 md:mb-0`}>
        <div className="inline-block bg-white p-6 rounded-2xl shadow-lg border border-slate-100 w-full md:w-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{event.icon}</span>
            <div className="text-3xl font-bold text-blue-600">{event.year}</div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
          <p className="text-slate-600">{event.description}</p>
        </div>
      </div>
      
      {/* Center Dot */}
      <div className="w-full md:w-2/12 flex justify-center mb-4 md:mb-0">
        <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10" />
      </div>
      
      <div className="w-full md:w-5/12 hidden md:block" />
    </motion.div>
  )
}

