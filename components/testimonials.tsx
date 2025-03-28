"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    content:
      "SynthLedger has completely transformed our development process. What used to take weeks now takes hours, and the security auditing has saved us from multiple potential vulnerabilities.",
    author: "Alex Johnson",
    role: "CTO, DeFi Protocol",
    avatar: "/placeholder.svg?height=100&width=100&text=AJ",
    company: "/placeholder.svg?height=40&width=120&text=DeFi+Co",
  },
  {
    id: 2,
    content:
      "The cross-chain deployment feature is a game-changer. We deployed our NFT marketplace across five different blockchains with minimal code changes.",
    author: "Sarah Chen",
    role: "Lead Developer, NFT Platform",
    avatar: "/placeholder.svg?height=100&width=100&text=SC",
    company: "/placeholder.svg?height=40&width=120&text=NFT+World",
  },
  {
    id: 3,
    content:
      "As someone with limited technical knowledge, the visual contract designer allowed me to create a complex DAO governance system without writing a single line of code.",
    author: "Michael Rodriguez",
    role: "Founder, Community DAO",
    avatar: "/placeholder.svg?height=100&width=100&text=MR",
    company: "/placeholder.svg?height=40&width=120&text=DAO+Hub",
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/10 to-gray-950 z-0"></div>

      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0) 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1,
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/30"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium border border-blue-700/30 mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            What Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Users</span> Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear from developers and businesses who have transformed their blockchain development process with
            SynthLedger.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* 3D Testimonial Carousel */}
          <div className="relative h-[500px] md:h-[400px]">
            <AnimatePresence mode="wait">
              {testimonials.map(
                (testimonial, index) =>
                  index === active && (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, scale: 0.9, rotateY: -30 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.9, rotateY: 30 }}
                      transition={{ duration: 0.7 }}
                      className="absolute inset-0 flex flex-col md:flex-row items-center perspective"
                    >
                      {/* Testimonial card with 3D effect */}
                      <div className="w-full md:w-3/4 bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-xl transform-style-3d hover:rotate-y-5 transition-transform duration-500 relative overflow-hidden">
                        {/* Glowing accent */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-70"></div>

                        {/* Quote icon */}
                        <div className="mb-6 relative z-10">
                          <svg className="w-12 h-12 text-blue-500/30" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8">
                          <div className="md:w-3/4">
                            <p className="text-gray-300 text-lg mb-6 relative z-10">"{testimonial.content}"</p>

                            <div className="flex items-center">
                              <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-blue-500/30">
                                <Image
                                  src={testimonial.avatar || "/placeholder.svg"}
                                  alt={testimonial.author}
                                  width={100}
                                  height={100}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-white">{testimonial.author}</div>
                                <div className="text-sm text-gray-400">{testimonial.role}</div>
                              </div>
                            </div>
                          </div>

                          <div className="md:w-1/4 flex flex-col items-center justify-center mt-6 md:mt-0">
                            <div className="w-full h-16 flex items-center justify-center mb-4">
                              <Image
                                src={testimonial.company || "/placeholder.svg"}
                                alt={`${testimonial.author}'s company`}
                                width={120}
                                height={40}
                                className="max-h-full"
                              />
                            </div>

                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className="w-5 h-5 text-yellow-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mb-16"></div>
                        <div className="absolute top-1/2 left-0 w-16 h-16 bg-cyan-500/5 rounded-full -ml-8"></div>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>

          {/* Testimonial navigation */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActive(index)}
                className={`w-12 h-3 rounded-full transition-all duration-300 ${
                  index === active ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-gray-700 hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

