'use client'

import ConstitutionExplainer from '@/components/ConstitutionExplainer'
import { motion } from 'framer-motion'
import { FileText, Scale, Users, Book } from 'lucide-react'

export default function TheMissionPage() {
  const missionPoints = [
    {
      icon: <FileText className="h-12 w-12" />,
      title: "Constitutional Framework",
      description: "As Chairman of the Drafting Committee, Dr. Ambedkar played a pivotal role in creating the world's longest written constitution, ensuring democratic principles and fundamental rights for all citizens."
    },
    {
      icon: <Scale className="h-12 w-12" />,
      title: "Social Justice",
      description: "Championed the cause of equality, ensuring constitutional provisions against discrimination and untouchability, laying the foundation for a just society."
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Rights & Duties",
      description: "Established a balance between individual rights and collective duties, creating a framework for responsible citizenship and democratic participation."
    },
    {
      icon: <Book className="h-12 w-12" />,
      title: "Education & Empowerment",
      description: "Believed education was the key to social transformation, advocating for equal educational opportunities for all sections of society."
    }
  ]

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-lora font-bold mb-6">
            The Mission
          </h1>
          <p className="text-xl md:text-2xl text-amber-200 max-w-3xl mx-auto">
            Understanding his constitutional role and the framework of rights and duties 
            that shape modern India
          </p>
        </div>
      </section>

      {/* Mission Overview */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-lora font-bold text-center mb-12 text-slate-900">
            The Constitutional Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {missionPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-600 mb-4">{point.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{point.title}</h3>
                <p className="text-slate-600 leading-relaxed">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Constitution Explainer */}
      <ConstitutionExplainer />

      {/* Key Principles Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-lora font-bold text-center mb-12 text-slate-900">
            Key Constitutional Principles
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            {[
              "Sovereignty, Socialism, Secularism, and Democracy as core values",
              "Federal structure with a strong center",
              "Independent judiciary to protect fundamental rights",
              "Directive Principles for social and economic justice",
              "Special provisions for marginalized communities",
              "Constitutional remedies for rights enforcement"
            ].map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-lg text-slate-700 pt-1">{principle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

