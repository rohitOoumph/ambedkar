'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quotes } from '@/lib/ambedkar-data'
import { Quote } from 'lucide-react'

export default function QuoteCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-lora font-bold text-slate-900 mb-4">
            Words of Wisdom
          </h2>
          <p className="text-slate-600">Timeless quotes from Dr. Ambedkar</p>
        </div>

        <div className="relative h-64 md:h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center px-6">
                <Quote className="h-12 w-12 text-blue-600 mx-auto mb-6 opacity-50" />
                <p className="text-2xl md:text-3xl font-lora italic text-slate-800 mb-6">
                  "{quotes[currentIndex]}"
                </p>
                <div className="flex justify-center gap-2">
                  {quotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'w-8 bg-blue-600'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

