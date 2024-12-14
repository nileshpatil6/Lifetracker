import { Menu } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Life Tracker
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-orange-500 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-orange-500 transition-colors">How it Works</a>
            <a href="#about" className="text-gray-700 hover:text-orange-500 transition-colors">About</a>
            <button
  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
  onClick={() => window.location.href = 'http://127.0.0.1:5500/auth_firebase.html'}
>
  Get Started
</button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-orange-500 focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-md">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-orange-500 transition-colors">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-orange-500 transition-colors">How it Works</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-orange-500 transition-colors">About</a>
              <button className="w-full text-left px-3 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
