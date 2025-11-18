'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Send } from 'lucide-react'

interface Tribute {
  id: number
  name: string
  message: string
  timestamp: Date
}

export default function TributeWall() {
  const [tributes, setTributes] = useState<Tribute[]>([
    {
      id: 1,
      name: 'Rajesh Kumar',
      message: 'Thank you for fighting for equality and justice. Your legacy continues to inspire millions.',
      timestamp: new Date('2024-01-15')
    },
    {
      id: 2,
      name: 'Priya Sharma',
      message: 'Your vision of social justice and equality has shaped modern India. Forever grateful.',
      timestamp: new Date('2024-01-20')
    },
  ])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      const newTribute: Tribute = {
        id: tributes.length + 1,
        name: name.trim(),
        message: message.trim(),
        timestamp: new Date()
      }
      setTributes([newTribute, ...tributes])
      setName('')
      setMessage('')
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-lora font-bold text-slate-900 mb-4">
            Tribute Wall
          </h2>
          <p className="text-xl text-slate-600">
            Share your thoughts and pay tribute to Dr. Ambedkar's legacy
          </p>
        </div>

        {/* Submission Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your tribute message..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !message.trim()}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              {isSubmitting ? 'Submitting...' : 'Submit Tribute'}
            </button>
          </form>
        </div>

        {/* Tributes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tributes.map((tribute, index) => (
            <motion.div
              key={tribute.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {tribute.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{tribute.name}</h3>
                  <p className="text-sm text-slate-500">
                    {tribute.timestamp.toLocaleDateString()}
                  </p>
                </div>
                <Heart className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-slate-700 leading-relaxed">{tribute.message}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

