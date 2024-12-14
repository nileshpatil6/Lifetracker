import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react'

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Github, href: '#' },
]

const footerLinks = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Demo', 'Updates']
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact']
  },
  {
    title: 'Resources',
    links: ['Blog', 'Newsletter', 'Events', 'Help center']
  },
  {
    title: 'Legal',
    links: ['Terms', 'Privacy', 'Cookies', 'Licenses']
  }
]

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Life Tracker
            </div>
            <p className="text-gray-600 mb-6">
              Transform your life with AI-powered insights and personal growth tracking.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-100 hover:text-orange-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {footerLinks.map((column, index) => (
            <div key={column.title}>
              <h3 className="font-semibold text-gray-900 mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-orange-500 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Life Tracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
