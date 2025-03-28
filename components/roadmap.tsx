"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const roadmapItems = [
  {
    quarter: "Q2 2023",
    title: "Research & Development",
    completed: true,
    items: [
      "Multi-agent architecture design",
      "AI model selection and training",
      "Initial prototype development",
      "Security framework design",
    ],
    image: "/placeholder.svg?height=300&width=400&text=Research+Development",
  },
  {
    quarter: "Q3 2023",
    title: "Alpha Release",
    completed: true,
    items: [
      "Core platform infrastructure",
      "SynthForge alpha version",
      "Limited user testing",
      "Security audit partnerships",
    ],
    image: "/placeholder.svg?height=300&width=400&text=Alpha+Release",
  },
  {
    quarter: "Q4 2023",
    title: "Beta Launch",
    completed: false,
    current: true,
    items: [
      "Public beta release",
      "AuditGuard integration",
      "Developer documentation",
      "Community building initiatives",
    ],
    image: "/placeholder.svg?height=300&width=400&text=Beta+Launch",
  },
  {
    quarter: "Q1 2024",
    title: "Platform Expansion",
    completed: false,
    items: [
      "ChainLoom cross-chain deployment",
      "OptiGas optimization engine",
      "Enterprise partnership program",
      "Advanced security features",
    ],
    image: "/placeholder.svg?height=300&width=400&text=Platform+Expansion",
  },
  {
    quarter: "Q2 2024",
    title: "Full Launch",
    completed: false,
    items: [
      "ContractVerse visual designer",
      "Marketplace for templates",
      "DAO governance implementation",
      "Premium enterprise features",
    ],
    image: "/placeholder.svg?height=300&width=400&text=Full+Launch",
  },
  {
    quarter: "Q3 2024",
    title: "Ecosystem Growth",
    completed: false,
    items: [
      "Developer grants program",
      "Educational resources",
      "Integration with major IDEs",
      "Advanced analytics dashboard",
    ],
    image: "/placeholder.svg?height=300&width=400&text=Ecosystem+Growth",
  },
]

export default function Roadmap() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/10 to-gray-950 z-0"></div>

      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        {/* Glowing orbs */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${150 + i * 50}px`,
              height: `${150 + i * 50}px`,
              bottom: `${10 + i * 20}%`,
              right: `${5 + i * 15}%`,
              background: `radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0) 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
            }}
          />
        ))}

        {/* Timeline dots */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 via-cyan-500/50 to-blue-500/20 transform -translate-x-1/2 hidden md:block"></div>
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
            Development{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Roadmap</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our strategic plan for building and expanding the SynthLedger platform.
          </p>
        </motion.div>

        <div className="relative" ref={ref}>
          <div className="space-y-24">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="relative"
              >
                <div
                  className={`flex flex-col md:flex-row items-start gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 top-0 w-10 h-10 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center transform -translate-y-1/2 md:-translate-x-1/2 z-20">
                    <motion.div
                      className={`w-6 h-6 rounded-full ${
                        item.completed
                          ? "bg-gradient-to-r from-green-400 to-emerald-500"
                          : item.current
                            ? "bg-gradient-to-r from-blue-400 to-cyan-500"
                            : "bg-gray-700"
                      }`}
                      animate={
                        item.current
                          ? {
                              boxShadow: [
                                "0 0 0 rgba(6, 182, 212, 0)",
                                "0 0 20px rgba(6, 182, 212, 0.7)",
                                "0 0 0 rgba(6, 182, 212, 0)",
                              ],
                            }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                    <div className="ml-12 md:ml-0">
                      <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/30 to-cyan-900/30 text-blue-400 text-sm font-medium border border-blue-500/30 mb-3">
                        {item.quarter}
                      </div>
                      <h3 className="text-2xl font-semibold mb-4 text-white flex items-center md:justify-start">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                          {item.title}
                        </span>
                        {item.completed && (
                          <span className="ml-2 text-emerald-500 text-sm flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Completed
                          </span>
                        )}
                        {item.current && (
                          <span className="ml-2 text-blue-400 text-sm flex items-center">
                            <motion.span
                              className="w-2 h-2 rounded-full bg-blue-400 mr-2"
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            />
                            In Progress
                          </span>
                        )}
                      </h3>
                      <ul className={`space-y-3 text-gray-400 ${index % 2 === 0 ? "md:ml-auto" : ""}`}>
                        {item.items.map((listItem, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0 ${
                                index % 2 === 0 ? "md:order-last" : ""
                              }`}
                            />
                            <span>{listItem}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Image side */}
                  <div className="w-full md:w-1/2">
                    <motion.div
                      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-lg"
                      whileHover={{
                        scale: 1.03,
                        borderColor: "rgba(6, 182, 212, 0.5)",
                        boxShadow: "0 0 30px rgba(6, 182, 212, 0.2)",
                      }}
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                        />

                        {/* Overlay with status */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/80 via-transparent to-transparent flex items-start justify-start p-4">
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.completed
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : item.current
                                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                  : "bg-gray-700/30 text-gray-400 border border-gray-600/30"
                            }`}
                          >
                            {item.completed ? "Completed" : item.current ? "In Progress" : "Upcoming"}
                          </div>
                        </div>
                      </div>
                    </motion.div>
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

