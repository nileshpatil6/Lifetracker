import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-orange-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-orange-500/10 rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <TypeAnimation
            sequence={[
              'Track Your Life.',
              1000,
              'Transform Your Future.',
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
          />
        </motion.h1>

        <motion.p 
          className="text-xl text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A revolutionary personal growth engine powered by AI to help you track habits,
          achieve goals, and unlock your full potential.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
         <button
  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
  onClick={() => window.location.href = 'http://127.0.0.1:5500/auth_firebase.html'}
>
  Get Started
</button>

          <button className="bg-white text-gray-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-200">
            Learn More
          </button>
        </motion.div>
      </div>
    </div>
  )
}
