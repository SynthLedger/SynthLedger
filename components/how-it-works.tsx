"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

// Update the image content for each step to replace placeholders with proper images
const steps = [
  {
    number: "01",
    title: "Define Requirements",
    description: "Describe what you want your smart contract to do in plain language or use our visual designer.",
    image: "/images/requirements-definition.png",
    imageContent: {
      type: "interface",
      elements: [
        { type: "header", text: "Contract Requirements" },
        { type: "input", label: "Contract Name", value: "TokenSwap" },
        { type: "textarea", label: "Description", value: "A contract for swapping tokens between users" },
        { type: "checkbox", label: "Include transfer functionality", checked: true },
        { type: "checkbox", label: "Include approval mechanism", checked: true },
        { type: "button", text: "Generate Contract" },
      ],
    },
    color: "from-blue-600 to-cyan-500",
    details: [
      "Natural language processing",
      "Visual interface option",
      "Template selection",
      "Requirements validation",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2">
        <path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI Generation",
    description: "Our AI system analyzes your requirements and generates optimized smart contract code.",
    image: "/images/ai-code-generation.png",
    imageContent: {
      type: "code",
      language: "solidity",
      code: `// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  contract TokenSwap {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    function swap(address token, uint256 amount) external returns (bool) {
        // Implementation details
        return true;
    }
  }`,
    },
    color: "from-cyan-500 to-teal-400",
    details: ["Multi-agent processing", "Code optimization", "Real-time preview", "Multiple language support"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2">
        <path
          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Automated Auditing",
    description: "Security vulnerabilities are automatically identified and fixed before deployment.",
    image: "/images/security-audit-process.png",
    imageContent: {
      type: "audit",
      results: [
        { severity: "high", issue: "Reentrancy vulnerability", status: "Fixed", line: 42 },
        { severity: "medium", issue: "Unchecked return value", status: "Fixed", line: 78 },
        { severity: "low", issue: "Gas optimization possible", status: "Optimized", line: 103 },
        { severity: "info", issue: "Consider using SafeMath", status: "Implemented", line: 25 },
      ],
    },
    color: "from-teal-400 to-emerald-500",
    details: ["Vulnerability scanning", "Formal verification", "Security report generation", "Automated fixes"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2">
        <path
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Testing & Validation",
    description: "Comprehensive test cases verify your contract's functionality across various scenarios.",
    image: "/images/testing-validation.png",
    imageContent: {
      type: "testing",
      results: [
        { name: "Test swap with valid parameters", status: "Passed", gas: 45000 },
        { name: "Test swap with invalid token", status: "Passed", gas: 23000 },
        { name: "Test swap with zero amount", status: "Passed", gas: 21000 },
        { name: "Test swap with insufficient balance", status: "Passed", gas: 24000 },
        { name: "Test multiple consecutive swaps", status: "Passed", gas: 120000 },
      ],
    },
    color: "from-emerald-500 to-green-500",
    details: ["Automated test cases", "Edge case detection", "Simulation environment", "Performance testing"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2">
        <path
          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Deployment",
    description: "Deploy your contract to any supported blockchain with a single click.",
    image: "/images/deployment.png",
    imageContent: {
      type: "deployment",
      networks: [
        { name: "Ethereum", status: "Deployed", address: "0x1a2b...3c4d", gas: 2500000 },
        { name: "Polygon", status: "Deployed", address: "0x5e6f...7g8h", gas: 1200000 },
        { name: "Avalanche", status: "Deployed", address: "0x9i0j...1k2l", gas: 900000 },
        { name: "Binance Smart Chain", status: "Pending", address: "...", gas: 0 },
      ],
    },
    color: "from-green-500 to-blue-600",
    details: ["Multi-chain support", "Gas optimization", "Monitoring dashboard", "Upgrade management"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2">
        <path
          d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

// Custom component to render step image content
const StepImageContent = ({ content }) => {
  if (!content) return null

  switch (content.type) {
    case "interface":
      return (
        <div className="bg-gray-900/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 w-full max-w-md mx-auto">
          <div className="text-lg font-medium text-white mb-4">
            {content.elements.find((e) => e.type === "header")?.text}
          </div>
          <div className="space-y-4">
            {content.elements
              .filter((e) => e.type !== "header")
              .map((element, idx) => (
                <div key={idx} className="flex flex-col">
                  {element.type === "input" && (
                    <>
                      <label className="text-sm text-gray-400 mb-1">{element.label}</label>
                      <div className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white">
                        {element.value}
                      </div>
                    </>
                  )}
                  {element.type === "textarea" && (
                    <>
                      <label className="text-sm text-gray-400 mb-1">{element.label}</label>
                      <div className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white min-h-[80px]">
                        {element.value}
                      </div>
                    </>
                  )}
                  {element.type === "checkbox" && (
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded border ${element.checked ? "bg-blue-500 border-blue-600" : "bg-gray-800 border-gray-700"} flex items-center justify-center mr-2`}
                      >
                        {element.checked && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <label className="text-gray-300">{element.label}</label>
                    </div>
                  )}
                  {element.type === "button" && (
                    <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                      {element.text}
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
      )

    case "code":
      return (
        <div className="bg-gray-900/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 w-full max-w-md mx-auto">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <div className="text-xs text-gray-400 ml-2">TokenSwap.sol</div>
          </div>
          <pre className="text-xs text-blue-300 font-mono overflow-auto max-h-[300px]">{content.code}</pre>
        </div>
      )

    case "audit":
      return (
        <div className="bg-gray-900/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 w-full max-w-md mx-auto">
          <div className="text-lg font-medium text-white mb-4">Security Audit Results</div>
          <div className="space-y-2">
            {content.results.map((result, idx) => (
              <div key={idx} className="flex items-start p-2 border-b border-gray-800 last:border-0">
                <div
                  className={`w-3 h-3 rounded-full mt-1 mr-2 ${
                    result.severity === "high"
                      ? "bg-red-500"
                      : result.severity === "medium"
                        ? "bg-yellow-500"
                        : result.severity === "low"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <div className="text-sm text-white">{result.issue}</div>
                  <div className="text-xs text-gray-400">Line {result.line}</div>
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded ${
                    result.status === "Fixed"
                      ? "bg-green-500/20 text-green-400"
                      : result.status === "Optimized"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {result.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case "testing":
      return (
        <div className="bg-gray-900/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 w-full max-w-md mx-auto">
          <div className="text-lg font-medium text-white mb-4">Test Results</div>
          <div className="space-y-2">
            {content.results.map((result, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 border-b border-gray-800 last:border-0">
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full mr-2 ${
                      result.status === "Passed" ? "bg-green-500" : "bg-red-500"
                    } flex items-center justify-center`}
                  >
                    {result.status === "Passed" && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="text-sm text-white">{result.name}</div>
                </div>
                <div className="text-xs text-gray-400">{result.gas} gas</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
              All Tests Passed
            </div>
          </div>
        </div>
      )

    case "deployment":
      return (
        <div className="bg-gray-900/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 w-full max-w-md mx-auto">
          <div className="text-lg font-medium text-white mb-4">Deployment Status</div>
          <div className="space-y-3">
            {content.networks.map((network, idx) => (
              <div key={idx} className="p-3 border border-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-medium">{network.name}</div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${
                      network.status === "Deployed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {network.status}
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-1">Contract Address:</div>
                <div className="text-sm text-blue-400 font-mono mb-2">{network.address}</div>
                {network.gas > 0 && (
                  <div className="text-xs text-gray-500">Gas used: {network.gas.toLocaleString()}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return null
  }
}

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeStep, setActiveStep] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Auto-advance steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden">
      {/* Futuristic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/10 to-gray-950 z-0"></div>

      {/* Animated tech background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Hexagonal grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="56" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
                fill="none"
                stroke="rgba(59, 130, 246, 0.5)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>

        {/* Animated data streams */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-b from-blue-500/0 via-blue-500/30 to-blue-500/0"
            style={{
              width: "1px",
              height: "100px",
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
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium border border-blue-700/30 mb-4">
            Simple Process
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            How{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              SynthLedger
            </span>{" "}
            Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Our streamlined process takes you from concept to deployed smart contract in just a few simple steps.
          </p>
        </motion.div>

        {/* Interactive 3D Process Flow */}
        <div className="relative max-w-7xl mx-auto" ref={ref}>
          {/* 3D Process Visualization */}
          <div className="relative h-[700px] md:h-[800px] perspective">
            {/* Central process line */}
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 z-10"
              style={{
                background: `linear-gradient(to bottom, 
                ${activeStep >= 0 ? "rgba(59, 130, 246, 0.7)" : "rgba(59, 130, 246, 0.2)"}, 
                ${activeStep >= 1 ? "rgba(6, 182, 212, 0.7)" : "rgba(6, 182, 212, 0.2)"},
                ${activeStep >= 2 ? "rgba(20, 184, 166, 0.7)" : "rgba(20, 184, 166, 0.2)"},
                ${activeStep >= 3 ? "rgba(16, 185, 129, 0.7)" : "rgba(16, 185, 129, 0.2)"},
                ${activeStep >= 4 ? "rgba(59, 130, 246, 0.7)" : "rgba(59, 130, 246, 0.2)"}
              )`,
              }}
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5 }}
            >
              {/* Animated pulse */}
              <motion.div
                className="absolute w-3 h-3 bg-blue-500 rounded-full left-1/2 transform -translate-x-1/2"
                style={{ top: `${(activeStep / (steps.length - 1)) * 100}%` }}
                animate={{
                  boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.4)", "0 0 0 10px rgba(59, 130, 246, 0)"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            </motion.div>

            {/* 3D Holographic Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative w-full max-w-5xl h-full"
                style={{
                  transform: `rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {/* Holographic container */}
                    <div className="relative w-full max-w-4xl aspect-video bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl overflow-hidden shadow-2xl">
                      {/* Holographic frame */}
                      <div className="absolute inset-0 border-2 border-blue-500/20 z-10 pointer-events-none">
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-500/50 rounded-tl-2xl"></div>
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-blue-500/50 rounded-tr-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-blue-500/50 rounded-bl-2xl"></div>
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-500/50 rounded-br-2xl"></div>
                      </div>

                      {/* Scan lines */}
                      <div className="absolute inset-0 overflow-hidden opacity-10 z-10 pointer-events-none">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div key={i} className="w-full h-px bg-blue-400" style={{ marginTop: `${i * 15}px` }}></div>
                        ))}
                      </div>

                      {/* Animated scan line */}
                      <motion.div
                        className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${steps[activeStep].color} opacity-70 z-10 pointer-events-none`}
                        animate={{
                          top: ["0%", "100%", "0%"],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 1,
                        }}
                      />

                      {/* Step content */}
                      <div className="relative z-0 w-full h-full flex flex-col md:flex-row">
                        {/* Step visualization */}
                        <div className="w-full md:w-1/2 h-full relative">
                          <div className="absolute inset-0 flex items-center justify-center p-6">
                            <StepImageContent content={steps[activeStep].imageContent} />
                          </div>

                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-gray-950/80 via-transparent to-transparent"></div>

                          {/* Step number */}
                          <div className="absolute top-4 left-4 flex items-center space-x-2">
                            <div
                              className={`w-12 h-12 rounded-full bg-gradient-to-r ${steps[activeStep].color} flex items-center justify-center text-white font-bold text-xl`}
                            >
                              {steps[activeStep].number}
                            </div>
                            <div className="text-xs text-blue-400 font-mono bg-gray-900/70 backdrop-blur-sm px-2 py-1 rounded">
                              STEP {activeStep + 1} OF {steps.length}
                            </div>
                          </div>

                          {/* Floating UI elements */}
                          <motion.div
                            className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3 z-20"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <div className="text-xs text-blue-400 font-mono">
                              {`> Executing ${steps[activeStep].title.toLowerCase()} process...`}
                              <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                              >
                                _
                              </motion.span>
                            </div>
                          </motion.div>
                        </div>

                        {/* Step details */}
                        <div className="w-full md:w-1/2 h-full bg-gray-900/70 p-8 flex flex-col justify-center">
                          <div
                            className={`w-16 h-16 rounded-xl bg-gradient-to-r ${steps[activeStep].color} flex items-center justify-center mb-6 text-white`}
                          >
                            {steps[activeStep].icon}
                          </div>

                          <h3 className="text-3xl font-bold mb-4 text-white">{steps[activeStep].title}</h3>

                          <p className="text-gray-300 text-lg mb-8">{steps[activeStep].description}</p>

                          {/* Step details */}
                          <div className="space-y-3">
                            {steps[activeStep].details.map((detail, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                className="flex items-start gap-3"
                              >
                                <div
                                  className={`w-5 h-5 rounded-full bg-gradient-to-r ${steps[activeStep].color} flex items-center justify-center flex-shrink-0 mt-1`}
                                >
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <span className="text-gray-400">{detail}</span>
                              </motion.div>
                            ))}
                          </div>

                          {/* Progress indicator */}
                          <div className="mt-auto pt-8">
                            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${steps[activeStep].color}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Step navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {steps.map((step, index) => (
              <motion.button
                key={index}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  activeStep === index
                    ? `bg-gradient-to-r ${step.color} text-white`
                    : "bg-gray-900/50 border border-gray-800 text-gray-400"
                }`}
                onClick={() => setActiveStep(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <motion.div
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Building Now
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

