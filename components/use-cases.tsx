"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Coins, Palette, Building, FileCode, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const useCases = [
  {
    icon: <Coins className="h-6 w-6" />,
    title: "DeFi Protocol Development",
    description:
      "Rapidly create secure lending, borrowing, and trading protocols with built-in security checks and capital efficiency optimizations.",
    example:
      "A lending protocol with deposits, loans, liquidations, and reward mechanisms created in hours instead of weeks.",
    image: "/placeholder.svg?height=300&width=400&text=DeFi+Protocol",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "NFT Project Launch",
    description:
      "Generate ERC-721/ERC-1155 contracts with advanced minting logic, royalty distribution, and marketplace integration.",
    example:
      "Artists can focus on creative content while the platform handles technical implementation, including Dutch auctions and reveal mechanics.",
    image: "/placeholder.svg?height=300&width=400&text=NFT+Project",
  },
  {
    icon: <Building className="h-6 w-6" />,
    title: "DAO Governance",
    description: "Create customized governance systems with proposal mechanisms, voting, and treasury management.",
    example: "Community-driven projects can implement sophisticated governance without deep technical expertise.",
    image: "/placeholder.svg?height=300&width=400&text=DAO+Governance",
  },
  {
    icon: <FileCode className="h-6 w-6" />,
    title: "Enterprise Blockchain Solutions",
    description: "Develop secure supply chain, identity, and asset tracking solutions with cross-chain compatibility.",
    example: "Businesses can implement blockchain solutions with minimal technical overhead and maximum security.",
    image: "/placeholder.svg?height=300&width=400&text=Enterprise+Solutions",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Security Auditing",
    description: "Perform comprehensive security audits on existing smart contracts to identify vulnerabilities.",
    example:
      "Projects can continuously monitor their contracts for emerging threats and receive automated remediation suggestions.",
    image: "/placeholder.svg?height=300&width=400&text=Security+Auditing",
  },
]

export default function UseCases() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="use-cases" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/10 to-gray-950 z-0"></div>

      {/* Animated background grid */}
      <div className="absolute inset-0 z-0">
        <svg className="absolute w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M100 0 L0 0 0 100" fill="none" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating elements */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Use <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Cases</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            SynthLedger empowers developers, businesses, and creators across various blockchain applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="bg-gray-900/30 backdrop-blur-sm border-gray-800 hover:border-blue-500/50 transition-all duration-300 h-full overflow-hidden group">
                {/* Image section */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={useCase.image || "/placeholder.svg"}
                    alt={useCase.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>

                  {/* Icon overlay */}
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 transform group-hover:scale-110 transition-transform duration-300">
                    {useCase.icon}
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-white group-hover:text-blue-400 transition-colors duration-300">
                    {useCase.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">{useCase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 group-hover:border-blue-500/30 transition-colors duration-300">
                    <p className="text-sm text-gray-300">
                      <span className="text-blue-400 font-medium">Example:</span> {useCase.example}
                    </p>
                  </div>

                  {/* Animated button */}
                  <motion.div
                    className="mt-4 flex justify-end"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <motion.button
                      className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 text-sm font-medium hover:bg-blue-500/20 transition-colors duration-300 flex items-center gap-2"
                      whileHover={{ x: 5 }}
                    >
                      Learn more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </motion.button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

