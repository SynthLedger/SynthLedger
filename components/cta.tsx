"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/20 to-gray-950 z-0"></div>

      {/* Animated background */}
      <canvas
        ref={(el) => {
          if (!el) return

          const ctx = el.getContext("2d")
          if (!ctx) return

          // Set canvas size
          const resizeCanvas = () => {
            el.width = window.innerWidth
            el.height = el.parentElement.offsetHeight
          }

          resizeCanvas()
          window.addEventListener("resize", resizeCanvas)

          // Create particles
          const particles = []
          const particleCount = 100

          for (let i = 0; i < particleCount; i++) {
            particles.push({
              x: Math.random() * el.width,
              y: Math.random() * el.height,
              radius: Math.random() * 2 + 0.5,
              color: `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.1})`,
              vx: Math.random() * 0.5 - 0.25,
              vy: Math.random() * 0.5 - 0.25,
              sinOffset: Math.random() * Math.PI * 2,
            })
          }

          // Animation loop
          let animationId
          const animate = () => {
            ctx.clearRect(0, 0, el.width, el.height)

            // Update and draw particles
            particles.forEach((particle) => {
              // Update position with sine wave motion
              particle.x += particle.vx + Math.sin(Date.now() * 0.001 + particle.sinOffset) * 0.2
              particle.y += particle.vy + Math.cos(Date.now() * 0.001 + particle.sinOffset) * 0.2

              // Wrap around edges
              if (particle.x < 0) particle.x = el.width
              if (particle.x > el.width) particle.x = 0
              if (particle.y < 0) particle.y = el.height
              if (particle.y > el.height) particle.y = 0

              // Draw particle
              ctx.beginPath()
              ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
              ctx.fillStyle = particle.color
              ctx.fill()
            })

            // Draw connections between nearby particles
            particles.forEach((p1, i) => {
              particles.slice(i + 1).forEach((p2) => {
                const dx = p1.x - p2.x
                const dy = p1.y - p2.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 100) {
                  ctx.beginPath()
                  ctx.moveTo(p1.x, p1.y)
                  ctx.lineTo(p2.x, p2.y)
                  ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`
                  ctx.stroke()
                }
              })
            })

            animationId = requestAnimationFrame(animate)
          }

          animate()

          // Cleanup
          return () => {
            window.removeEventListener("resize", resizeCanvas)
            cancelAnimationFrame(animationId)
          }
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Digital circuit pattern with animation */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
      >
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-board-cta" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M0 50 H30 M70 50 H100 M50 0 V30 M50 70 V100"
                stroke="rgba(59, 130, 246, 0.8)"
                strokeWidth="1"
                fill="none"
              />
              <circle cx="50" cy="50" r="3" fill="rgba(59, 130, 246, 0.8)" />
              <circle cx="30" cy="50" r="2" fill="rgba(59, 130, 246, 0.8)" />
              <circle cx="70" cy="50" r="2" fill="rgba(59, 130, 246, 0.8)" />
              <circle cx="50" cy="30" r="2" fill="rgba(59, 130, 246, 0.8)" />
              <circle cx="50" cy="70" r="2" fill="rgba(59, 130, 246, 0.8)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-board-cta)" />
        </svg>

        {/* Animated data streams */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0"
            style={{
              width: "1px",
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: "-100px",
            }}
            animate={{
              top: ["0%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Hexagonal grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons-cta" width="56" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
                fill="none"
                stroke="rgba(59, 130, 246, 0.5)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons-cta)" />
        </svg>
      </motion.div>

      {/* Animated glowing orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "600px",
            height: "600px",
            top: "30%",
            right: "10%",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 70%)",
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
          className="absolute rounded-full"
          style={{
            width: "400px",
            height: "400px",
            bottom: "20%",
            left: "10%",
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0) 70%)",
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
      </div>

      {/* Gradient background with enhanced effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/10 to-gray-950 z-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-gray-900/80 via-blue-900/20 to-gray-900/80 backdrop-blur-sm border border-blue-500/30 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Content side */}
              <div className="p-8 md:p-12 lg:p-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold mb-6 text-white"
                >
                  Ready to Transform Your{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                    Blockchain Development
                  </span>
                  ?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-gray-300 text-lg mb-8"
                >
                  Join thousands of developers who are building faster, more secure smart contracts with SynthLedger's
                  AI-powered platform.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300"
                  >
                    Get Started Free
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-900/20 px-8 py-6 text-lg rounded-full group"
                  >
                    <span>Schedule Demo</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-8 text-gray-400 text-sm"
                >
                  No credit card required. Free plan includes 5 contracts per month.
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-12"
                >
                  <p className="text-gray-500 text-sm mb-4">Trusted by leading blockchain companies</p>
                  <div className="flex flex-wrap gap-6 items-center">
                    {[
                      {
                        name: "Ethereum",
                        logo: (
                          <svg className="h-8 w-auto" viewBox="0 0 784.37 1277.39" xmlns="http://www.w3.org/2000/svg">
                            <g>
                              <polygon
                                fill="#343434"
                                fillRule="nonzero"
                                points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"
                              />
                              <polygon
                                fill="#8C8C8C"
                                fillRule="nonzero"
                                points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"
                              />
                              <polygon
                                fill="#3C3C3B"
                                fillRule="nonzero"
                                points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"
                              />
                              <polygon
                                fill="#8C8C8C"
                                fillRule="nonzero"
                                points="392.07,1277.38 392.07,956.52 -0,724.89"
                              />
                              <polygon
                                fill="#141414"
                                fillRule="nonzero"
                                points="392.07,882.29 784.13,650.54 392.07,472.33"
                              />
                              <polygon
                                fill="#393939"
                                fillRule="nonzero"
                                points="0,650.54 392.07,882.29 392.07,472.33"
                              />
                            </g>
                          </svg>
                        ),
                      },
                      {
                        name: "Polygon",
                        logo: (
                          <svg className="h-8 w-auto" viewBox="0 0 38.4 33.5" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill="#8247E5"
                              d="M29,10.2c-0.7-0.4-1.6-0.4-2.4,0L21,13.5l-3.8,2.1l-5.5,3.3c-0.7,0.4-1.6,0.4-2.4,0L5,16.3 c-0.7-0.4-1.2-1.2-1.2-2.1v-5c0-0.8,0.4-1.6,1.2-2.1l4.3-2.5c0.7-0.4,1.6-0.4,2.4,0L16,7.2c0.7,0.4,1.2,1.2,1.2,2.1v3.3l3.8-2.2V7 c0-0.8-0.4-1.6-1.2-2.1l-8-4.7c-0.7-0.4-1.6-0.4-2.4,0L1.2,5C0.4,5.4,0,6.2,0,7v9.4c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7 c0.7,0.4,1.6,0.4,2.4,0l5.5-3.2l3.8-2.2l5.5-3.2c0.7-0.4,1.6-0.4,2.4,0l4.3,2.5c0.7,0.4,1.2,1.2,1.2,2.1v5c0,0.8-0.4,1.6-1.2,2.1 L29,28.8c-0.7,0.4-1.6,0.4-2.4,0l-4.3-2.5c-0.7-0.4-1.2-1.2-1.2-2.1V21l-3.8,2.2v3.3c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7 c0.7,0.4,1.6,0.4,2.4,0l8.1-4.7c0.7-0.4,1.2-1.2,1.2-2.1V17c0-0.8-0.4-1.6-1.2-2.1L29,10.2z"
                            />
                          </svg>
                        ),
                      },
                      {
                        name: "Solana",
                        logo: (
                          <svg className="h-8 w-auto" viewBox="0 0 397.7 311.7" xmlns="http://www.w3.org/2000/svg">
                            <linearGradient
                              id="solana_gradient"
                              gradientUnits="userSpaceOnUse"
                              x1="360.8791"
                              y1="351.4553"
                              x2="141.213"
                              y2="-69.2936"
                              gradientTransform="matrix(1 0 0 -1 0 314)"
                            >
                              <stop offset="0" style={{ stopColor: "#00FFA3" }} />
                              <stop offset="1" style={{ stopColor: "#DC1FFF" }} />
                            </linearGradient>
                            <path
                              fill="url(#solana_gradient)"
                              d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5 c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z"
                            />
                            <path
                              fill="url(#solana_gradient)"
                              d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5 c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z"
                            />
                            <path
                              fill="url(#solana_gradient)"
                              d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4 c5.8,0,8.7-7,4.6-11.1L333.1,120.1z"
                            />
                          </svg>
                        ),
                      },
                      {
                        name: "Binance",
                        logo: (
                          <svg className="h-8 w-auto" viewBox="0 0 5120 5120" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill="#F3BA2F"
                              d="M2560,0c1414,0,2560,1146,2560,2560S3974,5120,2560,5120,0,3974,0,2560,1146,0,2560,0"
                            />
                            <path
                              fill="#FFFFFF"
                              d="M2819,2766l339,339-678,678L1560,2862l678-678,171,171-171,171-171-171L1389,2033l771-771,771,771-113,113,113,113-113,113,113,113-113,113zm-678-113l113,113-113,113-113-113zm452-452l113,113-113,113-113-113zm-226,226l113,113-113,113-113-113zm-678,678l113,113-113,113-113-113zm1130-904l113,113-113,113-113-113zm0,452l113,113-113,113-113-113z"
                            />
                            <path
                              fill="#FFFFFF"
                              d="M2560,1129l452,452-452,452-452-452zm0,1808l452,452-452,452-452-452z"
                            />
                          </svg>
                        ),
                      },
                    ].map((partner, i) => (
                      <div
                        key={i}
                        className="h-8 opacity-70 hover:opacity-100 transition-all duration-300"
                        title={partner.name}
                      >
                        {partner.logo}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Image side */}
              <div className="relative hidden lg:block">
                {/* Main image - Blockchain background */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950/20 to-gray-900">
                    {/* Blockchain grid pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="blockchain-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path
                              d="M0 20 H40 M20 0 V40"
                              stroke="rgba(59, 130, 246, 0.5)"
                              strokeWidth="0.5"
                              fill="none"
                            />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#blockchain-grid)" />
                      </svg>
                    </div>

                    {/* Hexagon nodes */}
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-md bg-blue-500/10 border border-blue-500/20"
                        style={{
                          width: Math.random() * 30 + 20,
                          height: Math.random() * 30 + 20,
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          boxShadow: [
                            "0 0 0 rgba(59, 130, 246, 0)",
                            "0 0 10px rgba(59, 130, 246, 0.5)",
                            "0 0 0 rgba(59, 130, 246, 0)",
                          ],
                        }}
                        transition={{
                          duration: Math.random() * 3 + 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
                </div>

                {/* Floating elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="relative w-3/4 max-w-md"
                  >
                    {/* Blockchain visualization */}
                    <motion.div
                      className="absolute -top-32 -right-32 w-64 h-64 opacity-40"
                      animate={
                        isInView
                          ? {
                              rotateZ: [0, 360],
                              opacity: [0.3, 0.5, 0.3],
                            }
                          : {}
                      }
                      transition={{
                        rotateZ: {
                          duration: 50,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        },
                        opacity: {
                          duration: 8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        },
                      }}
                    >
                      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" stroke="#3b82f6" strokeWidth="0.5">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <circle
                              key={i}
                              cx="50"
                              cy="50"
                              r={15 + i * 5}
                              opacity={0.8 - i * 0.1}
                              strokeDasharray={`${1 + i * 0.5} ${2 + i}`}
                            />
                          ))}
                        </g>
                      </svg>
                    </motion.div>

                    {/* 3D Blockchain Model */}
                    <motion.div
                      className="bg-gray-950/90 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4 shadow-xl mb-6 overflow-hidden"
                      animate={
                        isInView
                          ? {
                              y: [0, -10, 0],
                              rotateZ: [0, 2, 0],
                            }
                          : {}
                      }
                      transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <div className="text-xs text-gray-400 ml-2">Blockchain Visualization</div>
                      </div>

                      <div className="relative h-48 w-full">
                        {/* 3D Blockchain Visualization */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-full h-full">
                            {/* Connected blocks visualization */}
                            {Array.from({ length: 5 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 border border-blue-500/30 rounded-md p-2 w-16 h-16 flex items-center justify-center"
                                style={{ left: `${i * 20}%` }}
                                animate={{
                                  y: [0, i % 2 === 0 ? -8 : 8, 0],
                                  rotateZ: [0, i % 2 === 0 ? 5 : -5, 0],
                                  boxShadow: [
                                    "0 0 0 rgba(59, 130, 246, 0)",
                                    "0 0 20px rgba(59, 130, 246, 0.5)",
                                    "0 0 0 rgba(59, 130, 246, 0)",
                                  ],
                                }}
                                transition={{
                                  duration: 4 + i,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                                  delay: i * 0.5,
                                }}
                              >
                                <div className="text-blue-400 font-mono text-xs">{i + 1}</div>
                                <motion.div
                                  className="absolute top-1/2 right-0 w-[calc(20vw-4rem)] h-0.5 bg-gradient-to-r from-blue-500 to-blue-500/0"
                                  style={{
                                    display: i < 4 ? "block" : "none",
                                    transformOrigin: "left center",
                                  }}
                                  animate={{
                                    opacity: [0.3, 0.8, 0.3],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                    delay: i * 0.5,
                                  }}
                                />
                              </motion.div>
                            ))}

                            {/* Data transfer animations */}
                            {Array.from({ length: 4 }).map((_, i) => (
                              <motion.div
                                key={`data-${i}`}
                                className="absolute top-1/2 left-0 transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500"
                                style={{ left: `${i * 20}%` }}
                                animate={{
                                  x: ["0%", "20vw"],
                                  opacity: [0, 1, 0],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                                  delay: i * 2 + 1,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Code snippet */}
                    <motion.div
                      className="bg-gray-950/90 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4 shadow-xl mb-6"
                      animate={
                        isInView
                          ? {
                              y: [0, -10, 0],
                              rotateZ: [0, 2, 0],
                            }
                          : {}
                      }
                      transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <div className="text-xs text-gray-400 ml-2">SmartContract.sol</div>
                      </div>
                      <pre className="text-xs text-blue-400 font-mono">
                        <code>
                          {`// Generated by SynthLedger AI
contract TokenSwap {
  function swap(
      address token,
      uint256 amount
  ) external returns (bool) {
      // Secure implementation
      // with optimized gas usage
      return true;
  }
}`}
                        </code>
                      </pre>
                    </motion.div>

                    {/* Stats card */}
                    <motion.div
                      className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 bg-gray-950/90 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4 shadow-xl w-48"
                      initial={{ opacity: 0, x: "30%" }}
                      animate={
                        isInView
                          ? {
                              opacity: 1,
                              x: "25%",
                              y: ["-50%", "-55%", "-50%"],
                              rotateZ: [0, -3, 0],
                            }
                          : {}
                      }
                      transition={{
                        opacity: { duration: 0.7, delay: 0.8 },
                        x: { duration: 0.7, delay: 0.8 },
                        y: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                        rotateZ: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                    >
                      <h4 className="text-blue-400 text-sm font-medium mb-2">Performance</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Gas Usage</span>
                            <span className="text-green-400">-65%</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-green-500 to-green-400"
                              initial={{ width: 0 }}
                              animate={isInView ? { width: "35%" } : {}}
                              transition={{ duration: 1, delay: 1 }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Security</span>
                            <span className="text-green-400">A+</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-green-500 to-green-400"
                              initial={{ width: 0 }}
                              animate={isInView ? { width: "95%" } : {}}
                              transition={{ duration: 1, delay: 1.2 }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

