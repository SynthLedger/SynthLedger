"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import Logo from "./logo"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-950 border-t border-gray-900 pt-16 pb-8">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

        {/* Glowing orb */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Logo className="h-10 w-auto" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                SynthLedger
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              AI-powered smart contract automation platform for the next generation of Web3 applications. Build, audit,
              and deploy secure blockchain solutions with unprecedented speed and reliability.
            </p>
            <div className="flex space-x-5">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </motion.div>

          <div className="md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-white font-medium mb-4 text-lg">Platform</h3>
                <ul className="space-y-3">
                  {["Features", "Products", "How It Works", "Pricing", "Security"].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                    >
                      <Link
                        href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mr-2 group-hover:bg-blue-400 transition-colors"></span>
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-white font-medium mb-4 text-lg">Resources</h3>
                <ul className="space-y-3">
                  {["Documentation", "API Reference", "Tutorials", "Blog", "Community"].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                    >
                      <Link
                        href="#"
                        className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mr-2 group-hover:bg-blue-400 transition-colors"></span>
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-white font-medium mb-4 text-lg">Company</h3>
                <ul className="space-y-3">
                  {["About", "Careers", "Contact", "Privacy Policy", "Terms of Service"].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                    >
                      <Link
                        href="#"
                        className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mr-2 group-hover:bg-blue-400 transition-colors"></span>
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <motion.div
          className="border-t border-gray-900 pt-8 pb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h4 className="text-white text-lg font-medium mb-2">Stay updated with SynthLedger</h4>
                <p className="text-gray-400 text-sm">
                  Get the latest news, updates, and special offers delivered directly to your inbox.
                </p>
              </div>
              <div className="md:w-1/3 w-full">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button className="absolute right-1 top-1 bottom-1 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-md text-white font-medium">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.p
            className="text-gray-500 text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            © {new Date().getFullYear()} SynthLedger. All rights reserved.
          </motion.p>
          <motion.div
            className="mt-4 md:mt-0"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <ul className="flex space-x-6">
              <li>
                <Link href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

