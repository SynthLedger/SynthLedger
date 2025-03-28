"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import Image from "next/image"

const agents = [
  {
    name: "Analyst Agent",
    description: "Understands user requirements and converts them into formal specifications",
    color: "from-cyan-500 to-blue-500",
    icon: "/placeholder.svg?height=60&width=60&text=A",
  },
  {
    name: "Architect Agent",
    description: "Designs smart contract structure and interaction patterns",
    color: "from-blue-500 to-indigo-500",
    icon: "/placeholder.svg?height=60&width=60&text=B",
  },
  {
    name: "Developer Agent",
    description: "Generates code that meets specifications and implements business logic",
    color: "from-indigo-500 to-purple-500",
    icon: "/placeholder.svg?height=60&width=60&text=C",
  },
  {
    name: "Auditor Agent",
    description: "Performs comprehensive security checks and identifies vulnerabilities",
    color: "from-purple-500 to-pink-500",
    icon: "/placeholder.svg?height=60&width=60&text=D",
  },
  {
    name: "Tester Agent",
    description: "Creates test cases and validates functionality and edge cases",
    color: "from-pink-500 to-red-500",
    icon: "/placeholder.svg?height=60&width=60&text=E",
  },
  {
    name: "Deployer Agent",
    description: "Handles contract deployment and cross-chain compatibility",
    color: "from-red-500 to-orange-500",
    icon: "/placeholder.svg?height=60&width=60&text=F",
  },
  {
    name: "Supervisor Agent",
    description: "Coordinates other agents and ensures quality control",
    color: "from-orange-500 to-yellow-500",
    icon: "/placeholder.svg?height=60&width=60&text=G",
  },
]

export default function Architecture() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const controls = useAnimation()
  const coreControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
      coreControls.start({
        scale: [0.8, 1.1, 1],
        rotate: [0, 10, 0],
        transition: { duration: 1.5, ease: "easeOut" },
      })
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls, coreControls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="architecture" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/10 to-gray-950 z-0"></div>

      {/* Animated circuit background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M0 80 H40 V120 H160 V40 H120 V0" stroke="rgba(59, 130, 246, 0.8)" fill="none" strokeWidth="2" />
              <path d="M200 120 H160 V160 H80 V200" stroke="rgba(59, 130, 246, 0.8)" fill="none" strokeWidth="2" />
              <path d="M120 200 V160 H200" stroke="rgba(59, 130, 246, 0.8)" fill="none" strokeWidth="2" />
              <circle cx="40" cy="80" r="5" fill="rgba(59, 130, 246, 0.8)" />
              <circle cx="160" cy="40" r="5" fill="rgba(59, 130, 246, 0.8)" />
              <circle cx="160" cy="160" r="5" fill="rgba(59, 130, 246, 0.8)" />
              <circle cx="80" cy="160" r="5" fill="rgba(59, 130, 246, 0.8)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Multi-Agent{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Architecture
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform leverages a sophisticated multi-agent system where specialized AI agents collaborate to deliver
            end-to-end smart contract automation.
          </p>
        </motion.div>

        <div className="relative h-[700px] md:h-[800px]" ref={ref}>
          {/* 3D Holographic Architecture Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Central hub with animation */}
            <motion.div
              animate={coreControls}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-sm border border-white/10 flex items-center justify-center z-20"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(6, 182, 212, 0.4)",
                    "0 0 40px rgba(6, 182, 212, 0.6)",
                    "0 0 0 rgba(6, 182, 212, 0.4)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-blue-500/50 to-cyan-500/50 flex items-center justify-center text-white font-bold text-center relative overflow-hidden"
              >
                {/* Holographic effect */}

                {/* Core content */}
                <div className="relative z-10">
                  <Image
                    src="/placeholder.svg?height=80&width=80&text=Core"
                    alt="SynthLedger Core"
                    width={80}
                    height={80}
                    className="mx-auto mb-2"
                  />
                  SynthLedger Core
                </div>

                {/* Rotating ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </motion.div>
            </motion.div>

            {/* 3D Orbital Agents */}
            <motion.div
              className="relative h-full w-full max-w-4xl max-h-[700px]"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {agents.map((agent, index) => {
                const angle = index * (360 / agents.length) * (Math.PI / 180)
                const radius = 280
                const x = radius * Math.cos(angle)
                const y = radius * Math.sin(angle)

                return (
                  <motion.div
                    key={index}
                    className="absolute top-1/2 left-1/2 w-36 md:w-40 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-4 text-center transform -translate-x-1/2 -translate-y-1/2 perspective"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotateY(${angle * 30}deg)`,
                      zIndex: 10 - Math.abs(Math.sin(angle) * 10),
                    }}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.1,
                      zIndex: 30,
                      boxShadow: "0 0 25px rgba(6, 182, 212, 0.5)",
                      borderColor: "rgba(6, 182, 212, 0.7)",
                    }}
                  >
                    <motion.div
                      className={`w-16 h-16 mx-auto rounded-full mb-3 bg-gradient-to-r ${agent.color} relative`}
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.2,
                      }}
                    >
                      <Image
                        src={agent.icon || "/placeholder.svg"}
                        alt={agent.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />

                      {/* Pulsing effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            "0 0 0 rgba(6, 182, 212, 0)",
                            "0 0 15px rgba(6, 182, 212, 0.5)",
                            "0 0 0 rgba(6, 182, 212, 0)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                      />
                    </motion.div>
                    <h3 className="text-sm font-medium text-white mb-1">{agent.name}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2">{agent.description}</p>
                  </motion.div>
                )
              })}

              {/* Connecting lines with animation */}
              {agents.map((_, index) => {
                const angle = index * (360 / agents.length) * (Math.PI / 180)
                const radius = 280
                const x = radius * Math.cos(angle)
                const y = radius * Math.sin(angle)

                return (
                  <motion.div
                    key={`line-${index}`}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <svg
                      width={radius * 2 + 100}
                      height={radius * 2 + 100}
                      viewBox={`0 0 ${radius * 2 + 100} ${radius * 2 + 100}`}
                    >
                      <defs>
                        <linearGradient id={`lineGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="4" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>

                      <motion.line
                        x1={radius + 50}
                        y1={radius + 50}
                        x2={x + radius + 50}
                        y2={y + radius + 50}
                        stroke={`url(#lineGradient-${index})`}
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        filter="url(#glow)"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                      />

                      {/* Data packet animation */}
                      <motion.circle
                        r="4"
                        fill="#06b6d4"
                        filter="url(#glow)"
                        initial={{ opacity: 0 }}
                        animate={
                          isInView
                            ? {
                                opacity: [0, 1, 0],
                                cx: [radius + 50, (x + radius + 50) * 0.75 + (radius + 50) * 0.25, x + radius + 50],
                                cy: [radius + 50, (y + radius + 50) * 0.75 + (radius + 50) * 0.25, y + radius + 50],
                              }
                            : {}
                        }
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 3,
                          delay: 1 + index * 0.5,
                        }}
                      />
                    </svg>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-8 max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            How It Works
          </h3>
          <p className="text-gray-300 mb-6">
            Our multi-agent system works collaboratively to transform your requirements into production-ready smart
            contracts:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className={`bg-gradient-to-r ${agent.color} rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5 text-white font-bold`}
                  whileHover={{ scale: 1.2 }}
                >
                  {index + 1}
                </motion.div>
                <div>
                  <h4 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors">
                    {agent.name}
                  </h4>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {agent.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

