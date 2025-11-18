'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function InteractiveCard({ 
  title, 
  description, 
  icon,
  details,
  gradient 
}: {
  title: string
  description: string
  icon: string
  details: string[]
  gradient: string
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={`relative overflow-hidden rounded-2xl bg-white shadow-lg cursor-pointer border border-slate-100 transition-all duration-300 hover:shadow-2xl ${
        isExpanded ? 'md:col-span-2' : ''
      }`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`} />
      
      <div className="relative p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-2xl`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-600">{description}</p>
          </div>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-slate-200"
          >
            <ul className="space-y-2">
              {details.map((detail, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 text-slate-700"
                >
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{detail}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        <div className="mt-4 text-sm text-blue-600 font-semibold">
          {isExpanded ? 'Click to collapse' : 'Click to explore'}
        </div>
      </div>
    </motion.div>
  )
}

