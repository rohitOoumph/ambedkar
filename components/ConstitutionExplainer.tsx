'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { constitutionalRights, fundamentalDuties } from '@/lib/ambedkar-data'
import { BookOpen, Shield, ChevronDown } from 'lucide-react'

export default function ConstitutionExplainer() {
  const [activeTab, setActiveTab] = useState<'rights' | 'duties'>('rights')

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-lora font-bold text-slate-900 mb-4">
            The Constitution Framework
          </h2>
          <p className="text-xl text-slate-600">
            Understanding the rights and duties that shape our democracy
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('rights')}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === 'rights'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Shield className="inline-block mr-2 h-5 w-5" />
            Fundamental Rights
          </button>
          <button
            onClick={() => setActiveTab('duties')}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === 'duties'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="inline-block mr-2 h-5 w-5" />
            Fundamental Duties
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'rights' && (
            <motion.div
              key="rights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {constitutionalRights.map((right, index) => (
                <RightCard key={index} right={right} index={index} />
              ))}
            </motion.div>
          )}

          {activeTab === 'duties' && (
            <motion.div
              key="duties"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Fundamental Duties of Citizens
                </h3>
                <ul className="space-y-4">
                  {fundamentalDuties.map((duty, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3 text-slate-700"
                    >
                      <span className="text-blue-600 font-bold mt-1">{index + 1}.</span>
                      <span>{duty}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function RightCard({ right, index }: { right: any, index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl">{right.icon}</div>
        <div className="flex-1">
          <div className="text-sm text-blue-600 font-semibold mb-1">{right.article}</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{right.title}</h3>
        </div>
        <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-slate-600 pt-4 border-t border-slate-200"
          >
            {right.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

