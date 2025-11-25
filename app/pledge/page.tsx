'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText, Mail, User, CheckCircle, Loader2 } from 'lucide-react'

export default function PledgePage() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/pledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit pledge')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '' })
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const pledgePoints = [
    "We pledge to read and remember the Preamble.",
    "We pledge to uphold justice, liberty, equality, and fraternity.",
    "We pledge to respect every voice, every right, every citizen.",
    "We pledge to protect the freedoms that protect us.",
    "We pledge to build an India rooted in dignity, unity, and compassion."
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Navigation */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-6 bg-gradient-to-br from-blue-600 to-amber-600 rounded-full shadow-xl">
            <FileText className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-lora font-bold mb-6 text-slate-900">
            🇮🇳 Pledge to the Constitution of India
          </h1>

          {/* Quote */}
          <div className="max-w-3xl mx-auto">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl font-lora italic text-slate-700 mb-4 px-6 py-4 border-l-4 border-blue-600 bg-blue-50 rounded-r-lg"
            >
              "We are bound by one identity — we are Indians, today and always."
            </motion.blockquote>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-600 mt-6"
          >
            Inspired by Babasaheb's vision,<br />
            we pledge to honour the spirit of our Constitution<br />
            and uphold the values that define our nation.
          </motion.p>
        </motion.div>

        {/* Celebration Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 text-center"
        >
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-amber-600 text-white font-bold text-lg md:text-xl rounded-full shadow-lg">
            As we celebrate Samvidhan @ 76…
          </div>
        </motion.div>

        {/* Pledge Points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-6 mb-12"
        >
          {pledgePoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={mounted ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-amber-600 text-white font-bold flex items-center justify-center">
                {index + 1}
              </div>
              <p className="text-lg md:text-xl text-slate-700 font-medium leading-relaxed pt-1">
                {point}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-center space-y-4 mb-12"
        >
          <div className="space-y-3">
            <p className="text-2xl md:text-3xl font-lora font-bold text-slate-900">
              Hamara Samvidhan.
            </p>
            <p className="text-2xl md:text-3xl font-lora font-bold text-slate-900">
              Hamara Sankalp.
            </p>
            <p className="text-2xl md:text-3xl font-lora font-bold text-slate-900">
              Hamara Swabhimaan.
            </p>
          </div>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={mounted ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-slate-300" />
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-600 to-amber-600" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent via-slate-300 to-slate-300" />
        </motion.div>

        {/* Pledge Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
            <h2 className="text-3xl md:text-4xl font-lora font-bold text-center mb-2 text-slate-900">
              Take the Pledge
            </h2>
            <p className="text-center text-slate-600 mb-8">
              Fill in your details to receive your certificate of commitment
            </p>

            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Pledge Submitted!</h3>
                <p className="text-slate-600 mb-6">
                  Your certificate has been sent to your email. Please check your inbox.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Another Pledge
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
                  >
                    {errorMessage || 'An error occurred. Please try again.'}
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-amber-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Pledge & Receive Certificate</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-amber-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Return to Home</span>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}

