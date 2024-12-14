import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Brain, Clock, Target, Zap } from 'lucide-react'

const problems = [
  {
    icon: Clock,
    title: "Time Management Struggles",
    description: "Difficulty keeping track of daily routines and habits"
  },
  {
    icon: Target,
    title: "Goal Achievement",
    description: "Challenges in maintaining consistency and progress"
  },
  {
    icon: AlertCircle,
    title: "Lack of Insights",
    description: "Unable to identify patterns in behavior and habits"
  }
]

const solutions = [
  {
    icon: Brain,
    title: "AI-Powered Analytics",
    description: "Smart insights based on your personal data and patterns"
  },
  {
    icon: CheckCircle2,
    title: "Automated Tracking",
    description: "Effortless monitoring of your daily activities and progress"
  },
  {
    icon: Zap,
    title: "Real-time Feedback",
    description: "Instant recommendations for improvement and optimization"
  }
]

export function ProblemSolution() {
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
            Problems & Solutions
          </h2>
          <p className="text-xl text-gray-600">
            Transform your challenges into opportunities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Problems Section */}
          <div className="space-y-6">
            <motion.h3 
              className="text-2xl font-semibold mb-6 text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Common Challenges
            </motion.h3>
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <problem.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{problem.title}</h4>
                    <p className="text-gray-600">{problem.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Solutions Section */}
          <div className="space-y-6">
            <motion.h3 
              className="text-2xl font-semibold mb-6 text-gray-800"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Our Solutions
            </motion.h3>
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <solution.icon className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{solution.title}</h4>
                    <p className="text-gray-600">{solution.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
