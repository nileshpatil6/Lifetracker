import { motion } from 'framer-motion'
import { Database, LineChart, Lightbulb, Rocket } from 'lucide-react'

const steps = [
  {
    icon: Database,
    title: "Data Collection",
    description: "Seamlessly gather your daily activities and habits through IoT integration",
    color: "blue"
  },
  {
    icon: LineChart,
    title: "AI Processing",
    description: "Advanced algorithms analyze your patterns and behaviors",
    color: "purple"
  },
  {
    icon: Lightbulb,
    title: "Smart Insights",
    description: "Receive personalized recommendations based on your unique data",
    color: "yellow"
  },
  {
    icon: Rocket,
    title: "Implementation",
    description: "Apply insights to transform your habits and achieve your goals",
    color: "green"
  }
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Your journey to personal transformation
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-pink-500" />

          {/* Timeline items */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className={`flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="flex-1" />
                <div className="relative flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white border-4 border-orange-500 z-10" />
                </div>
                <motion.div 
                  className="flex-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
