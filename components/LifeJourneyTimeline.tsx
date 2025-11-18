'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { timelineEvents } from '@/lib/ambedkar-data'

export default function LifeJourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-200px" })
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll progress within the timeline section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !timelineRef.current) return

      const section = sectionRef.current
      const timeline = timelineRef.current
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const timelineTop = timeline.offsetTop - sectionTop
      const timelineHeight = timeline.offsetHeight
      const scrollY = window.scrollY + window.innerHeight / 2 // Use middle of viewport as reference
      const sectionScrollTop = sectionTop

      // Calculate progress based on viewport center position relative to timeline
      const timelineStart = sectionScrollTop + timelineTop
      const timelineEnd = timelineStart + timelineHeight

      // Calculate progress (0 to 1)
      let progress = 0
      if (scrollY >= timelineStart) {
        if (scrollY <= timelineEnd) {
          progress = (scrollY - timelineStart) / timelineHeight
        } else {
          progress = 1
        }
      }

      setScrollProgress(Math.max(0, Math.min(1, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="explore" 
      className="py-20 md:py-32 px-6 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-lora font-bold mb-4 text-slate-900">
            Life Journey
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            A timeline of key moments that shaped the extraordinary life of Dr. B.R. Ambedkar
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative">
          {/* Vertical Timeline Line - Desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 hidden md:block overflow-hidden">
            {/* Background gradient line */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-amber-500 to-green-500 opacity-30" />
            
            {/* Progress fill line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-500 via-amber-500 to-green-500 origin-top"
              style={{ 
                transformOrigin: 'top',
                scaleY: scrollProgress,
                height: '100%'
              }}
            />
          </div>
          
          {/* Mobile Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 md:hidden overflow-hidden">
            {/* Background gradient line */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-amber-500 to-green-500 opacity-30" />
            
            {/* Progress fill line */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-500 via-amber-500 to-green-500 origin-top"
              style={{ 
                transformOrigin: 'top',
                scaleY: scrollProgress,
                height: '100%'
              }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {timelineEvents.map((event, index) => (
              <TimelineItem 
                key={index} 
                event={event} 
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ 
  event, 
  index, 
  isInView 
}: { 
  event: any
  index: number
  isInView: boolean
}) {
  const itemRef = useRef(null)
  const itemInView = useInView(itemRef, { once: false, margin: "-150px" })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      animate={itemInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative flex items-center ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-row`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-20 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={itemInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          className="w-6 h-6 bg-white border-4 border-blue-600 rounded-full shadow-lg relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={itemInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.15 + 0.5 }}
            className="absolute inset-0 bg-blue-600 rounded-full"
            style={{ scale: 0.5 }}
          />
        </motion.div>
      </div>

      {/* Content Card */}
      <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${
        isLeft ? 'md:mr-auto md:pr-12 md:text-right' : 'md:ml-auto md:pl-12 md:text-left'
      } text-left`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
          animate={itemInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100 hover:shadow-2xl transition-all duration-300 group"
        >
          {/* Year Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{event.icon}</span>
            <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${
              index % 3 === 0 
                ? 'from-blue-500 to-blue-600' 
                : index % 3 === 1 
                ? 'from-amber-500 to-amber-600' 
                : 'from-green-500 to-green-600'
            } text-white font-bold text-lg shadow-lg`}>
              {event.year}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-lora font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            {event.description}
          </p>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={itemInView ? { width: '100%' } : {}}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
            className={`mt-4 h-1 bg-gradient-to-r ${
              index % 3 === 0 
                ? 'from-blue-500 to-blue-600' 
                : index % 3 === 1 
                ? 'from-amber-500 to-amber-600' 
                : 'from-green-500 to-green-600'
            } rounded-full`}
          />
        </motion.div>
      </div>

      {/* Spacer for desktop */}
      <div className="hidden md:block w-2/12" />
    </motion.div>
  )
}

