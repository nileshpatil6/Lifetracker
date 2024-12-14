import { motion } from 'framer-motion'
import { Heart, Brain, BarChart, Users } from 'lucide-react'
import { useState } from 'react'

const personas = [
  {
    icon: Heart,
    title: "Health Enthusiasts",
    description: "Track your fitness journey, nutrition, and wellness goals with precision.",
    benefits: [
      "Comprehensive health metrics tracking",
      "Personalized workout recommendations",
      "Nutrition insights and meal planning",
      "Sleep quality analysis"
    ]
  },
  {
    icon: Brain,
    title: "Personal Development",
    description: "Optimize your daily routines and habits for maximum growth.",
    benefits: [
      "Habit formation tracking",
      "Productivity metrics",
      "Goal achievement monitoring",
      "Personal growth insights"
    ]
  },
  {
    icon: BarChart,
    title: "Professionals",
    description: "Enhance your work-life balance and career progression.",
    benefits: [
      "Time management optimization",
      "Skill development tracking",
      "Work-life balance metrics",
      "Professional goal setting"
    ]
  },
  {
    icon: Users,
    title: "Caregivers",
    description: "Monitor and improve care routines for better outcomes.",
    benefits: [
      "Care schedule management",
      "Health monitoring tools",
      "Medication tracking",
      "Progress reporting"
    ]
  }
]

export function TargetAudience() {
  const [activePersona, setActivePersona] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Who Is It For?
          </h2>
          <p className="text-xl text-gray-600">
            Discover how Life Tracker can benefit you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.title}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.div
                className={`h-full bg-white p-6 rounded-2xl shadow-lg border border-gray-100 cursor-pointer 
                  ${activePersona === index ? 'ring-2 ring-orange-500' : ''}`}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActivePersona(activePersona === index ? null : index)}
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <persona.icon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{persona.title}</h3>
                <p className="text-gray-600 mb-4">{persona.description}</p>
                
                {/* Benefits list - shown when active */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: activePersona === index ? 'auto' : 0,
                    opacity: activePersona === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 mt-4 text-gray-600">
                    {persona.benefits.map((benefit, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
