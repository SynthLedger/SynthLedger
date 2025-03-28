"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()
  const [isHovering, setIsHovering] = useState(false)

  // Enhanced mouse tracking for direct wave interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()

      // Calculate mouse position relative to container
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })

      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Wave animation effect with direct mouse following
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas || !containerRef.current) return
      canvas.width = containerRef.current.offsetWidth
      canvas.height = containerRef.current.offsetHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Wave parameters - increased amplitude for more dramatic effect
    const waves = [
      { y: canvas.height * 0.7, amplitude: 60, frequency: 0.008, speed: 0.02, color: "rgba(67, 97, 238, 0.4)" },
      { y: canvas.height * 0.75, amplitude: 55, frequency: 0.01, speed: 0.03, color: "rgba(58, 134, 255, 0.5)" },
      { y: canvas.height * 0.8, amplitude: 50, frequency: 0.012, speed: 0.04, color: "rgba(72, 149, 239, 0.6)" },
      { y: canvas.height * 0.85, amplitude: 45, frequency: 0.014, speed: 0.035, color: "rgba(96, 165, 250, 0.7)" },
      { y: canvas.height * 0.9, amplitude: 40, frequency: 0.016, speed: 0.025, color: "rgba(59, 130, 246, 0.8)" },
    ]

    // Channel parameters - wider to fix the gap
    const channelWidth = canvas.width * 0.4
    const channelCenterX = canvas.width / 2
    const channelStartY = canvas.height * 0.75
    const channelEndY = canvas.height

    let animationFrameId: number
    let time = 0

    // Animation function
    const animate = () => {
      time += 0.03
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw the channel first (below the waves)
      ctx.beginPath()
      ctx.moveTo(channelCenterX - channelWidth / 2, channelStartY)
      ctx.lineTo(channelCenterX - channelWidth / 2, channelEndY)
      ctx.lineTo(channelCenterX + channelWidth / 2, channelEndY)
      ctx.lineTo(channelCenterX + channelWidth / 2, channelStartY)

      // Create gradient for channel
      const channelGradient = ctx.createLinearGradient(0, channelStartY, 0, channelEndY)
      channelGradient.addColorStop(0, "rgba(59, 130, 246, 0.2)")
      channelGradient.addColorStop(1, "rgba(59, 130, 246, 0.05)")

      ctx.fillStyle = channelGradient
      ctx.fill()

      // Add glowing edges to channel
      ctx.beginPath()
      ctx.moveTo(channelCenterX - channelWidth / 2, channelStartY)
      ctx.lineTo(channelCenterX - channelWidth / 2, channelEndY)
      ctx.strokeStyle = "rgba(59, 130, 246, 0.6)"
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(channelCenterX + channelWidth / 2, channelStartY)
      ctx.lineTo(channelCenterX + channelWidth / 2, channelEndY)
      ctx.strokeStyle = "rgba(59, 130, 246, 0.6)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw each wave with enhanced effects
      waves.forEach((wave, index) => {
        ctx.beginPath()
        ctx.moveTo(0, wave.y)

        // Create wave path with more fluid movement
        for (let x = 0; x < canvas.width; x += 2) {
          // Reduced step size for smoother waves
          // Direct mouse interaction - waves follow mouse position with stronger effect
          const distanceFromMouseX = Math.abs(x - mousePosition.x)
          const distanceFromMouseY = Math.abs(wave.y - mousePosition.y)
          const distanceFromMouse = Math.sqrt(Math.pow(distanceFromMouseX, 2) + Math.pow(distanceFromMouseY, 2))

          // Calculate mouse effect - stronger when closer to mouse
          const mouseEffect =
            isHovering && distanceFromMouse < 400 && mousePosition.y > wave.y - 300
              ? 100 * Math.exp(-distanceFromMouse / 150) * Math.max(0, 1 - distanceFromMouseY / 300)
              : 0

          // Base wave with smoother pattern
          const baseWave = Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude

          // Apply stronger effect in the channel area - make it continuous
          const distanceFromCenter = Math.abs(x - channelCenterX)
          const channelEffect =
            distanceFromCenter < channelWidth / 2 ? 25 * (1 - distanceFromCenter / (channelWidth / 2)) : 0

          // Calculate final y position - waves rise up (negative y) when affected
          const y = wave.y - Math.abs(baseWave) - mouseEffect - channelEffect

          ctx.lineTo(x, y)
        }

        // Complete the wave path
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        // Fill with more vibrant gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, "rgba(67, 97, 238, 0.8)")
        gradient.addColorStop(0.3, "rgba(58, 134, 255, 0.8)")
        gradient.addColorStop(0.6, "rgba(72, 149, 239, 0.8)")
        gradient.addColorStop(1, "rgba(96, 165, 250, 0.8)")

        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw lighthouse
      const lighthouseX = canvas.width * 0.85
      const lighthouseBaseY = canvas.height * 0.75
      const lighthouseHeight = 120
      const lighthouseWidth = 40

      // Lighthouse base
      ctx.beginPath()
      ctx.moveTo(lighthouseX - lighthouseWidth / 2, lighthouseBaseY)
      ctx.lineTo(lighthouseX + lighthouseWidth / 2, lighthouseBaseY)
      ctx.lineTo(lighthouseX + lighthouseWidth / 3, lighthouseBaseY - lighthouseHeight)
      ctx.lineTo(lighthouseX - lighthouseWidth / 3, lighthouseBaseY - lighthouseHeight)
      ctx.closePath()

      // Create gradient for lighthouse
      const lighthouseGradient = ctx.createLinearGradient(
        lighthouseX - lighthouseWidth / 2,
        lighthouseBaseY,
        lighthouseX + lighthouseWidth / 2,
        lighthouseBaseY,
      )
      lighthouseGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)")
      lighthouseGradient.addColorStop(0.5, "rgba(219, 234, 254, 0.9)")
      lighthouseGradient.addColorStop(1, "rgba(255, 255, 255, 0.9)")

      ctx.fillStyle = lighthouseGradient
      ctx.fill()

      // Lighthouse stripes
      const stripeCount = 5
      const stripeHeight = lighthouseHeight / stripeCount

      for (let i = 0; i < stripeCount; i++) {
        if (i % 2 === 1) {
          const stripeY = lighthouseBaseY - i * stripeHeight
          const stripeWidthTop = lighthouseWidth * (1 - (i / stripeCount) * 0.5)
          const stripeWidthBottom = lighthouseWidth * (1 - ((i - 1) / stripeCount) * 0.5)

          ctx.beginPath()
          ctx.moveTo(lighthouseX - stripeWidthBottom / 2, stripeY)
          ctx.lineTo(lighthouseX + stripeWidthBottom / 2, stripeY)
          ctx.lineTo(lighthouseX + stripeWidthTop / 2, stripeY - stripeHeight)
          ctx.lineTo(lighthouseX - stripeWidthTop / 2, stripeY - stripeHeight)
          ctx.closePath()

          ctx.fillStyle = "rgba(59, 130, 246, 0.7)"
          ctx.fill()
        }
      }

      // Lighthouse top
      ctx.beginPath()
      ctx.arc(lighthouseX, lighthouseBaseY - lighthouseHeight, lighthouseWidth / 4, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(59, 130, 246, 0.9)"
      ctx.fill()

      // Lighthouse light beam
      ctx.beginPath()
      ctx.moveTo(lighthouseX, lighthouseBaseY - lighthouseHeight)

      // Calculate beam angle based on mouse position or time
      const beamAngle = isHovering
        ? Math.atan2(mousePosition.y - (lighthouseBaseY - lighthouseHeight), mousePosition.x - lighthouseX)
        : -Math.PI / 4 + (Math.sin(time) * Math.PI) / 6

      const beamLength = canvas.width * 0.5
      const beamEndX = lighthouseX + Math.cos(beamAngle) * beamLength
      const beamEndY = lighthouseBaseY - lighthouseHeight + Math.sin(beamAngle) * beamLength

      // Create gradient for light beam
      const beamGradient = ctx.createRadialGradient(
        lighthouseX,
        lighthouseBaseY - lighthouseHeight,
        0,
        lighthouseX,
        lighthouseBaseY - lighthouseHeight,
        beamLength,
      )
      beamGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)")
      beamGradient.addColorStop(0.1, "rgba(59, 130, 246, 0.7)")
      beamGradient.addColorStop(1, "rgba(59, 130, 246, 0)")

      ctx.lineTo(beamEndX, beamEndY)
      ctx.lineTo(
        lighthouseX + Math.cos(beamAngle + 0.2) * beamLength * 0.8,
        lighthouseBaseY - lighthouseHeight + Math.sin(beamAngle + 0.2) * beamLength * 0.8,
      )
      ctx.closePath()

      ctx.fillStyle = beamGradient
      ctx.globalAlpha = 0.7
      ctx.fill()
      ctx.globalAlpha = 1.0

      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition, isHovering])

  // Trigger initial animations
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    })
  }, [controls])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-blue-950/20 to-gray-950"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-blue-400/5 blur-3xl"></div>
      </div>

      {/* Interactive wave canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      <div className="container relative mx-auto px-4 z-10 h-screen flex flex-col">
        <div className="flex-grow flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left content - Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              className="lg:col-span-6 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-6"
              >
                <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
                  Next Generation Smart Contract Platform
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                <span className="block text-white mb-2">Automate Your</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500">
                  Blockchain Development
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0"
              >
                SynthLedger combines AI-powered multi-agent technology with blockchain infrastructure to streamline
                smart contract creation, auditing, and deployment.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-900/20 px-8 py-6 text-lg rounded-full group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="mt-12 flex items-center justify-center lg:justify-start gap-6"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">Cross-Chain</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right content - Image/Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative h-[400px] md:h-[500px] w-full">
                {/* Main illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-md">
                    {/* Glowing background */}
                    <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-xl"></div>

                    {/* Dashboard mockup */}
                    <motion.div
                      className="relative bg-gray-900/80 backdrop-blur-sm border border-blue-500/30 rounded-2xl overflow-hidden shadow-2xl"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut" }}
                    >
                      {/* Dashboard header */}
                      <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-700/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-sm text-gray-400">SynthLedger Dashboard</div>
                        <div className="w-4"></div>
                      </div>

                      {/* Dashboard content */}
                      <div className="p-6">
                        {/* Stats row */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {[
                            { label: "Contracts", value: "24" },
                            { label: "Deployed", value: "18" },
                            { label: "Audited", value: "24" },
                          ].map((stat, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                              className="bg-blue-900/20 rounded-lg p-3 text-center"
                            >
                              <div className="text-xl font-bold text-white">{stat.value}</div>
                              <div className="text-xs text-blue-300">{stat.label}</div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Contract list */}
                        <div className="space-y-3">
                          {[1, 2, 3].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                              className="bg-gray-800/50 rounded-lg p-3 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400">
                                  {i + 1}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-white">TokenSwap {i + 1}</div>
                                  <div className="text-xs text-gray-400">Deployed 2d ago</div>
                                </div>
                              </div>
                              <div className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                                Active
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Code preview */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.1, duration: 0.5 }}
                          className="mt-4 bg-gray-950 rounded-lg p-3 font-mono text-xs text-blue-300 overflow-hidden"
                        >
                          <div className="text-gray-500">// AI-Generated Smart Contract</div>
                          <div>
                            contract <span className="text-blue-400">TokenSwap</span> {"{"}
                          </div>
                          <div className="pl-4">
                            function <span className="text-green-400">swap</span>(address token) public {"{"}
                          </div>
                          <div className="pl-8">// Auto-optimized & Audited</div>
                          <div className="pl-4">{"}"}</div>
                          <div>{"}"}</div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Floating elements */}
                {[1, 2, 3, 4].map((i) => {
                  const size = 30 + i * 6
                  const top = i % 2 === 0 ? `${20 + i * 15}%` : `${60 - i * 5}%`
                  const left = i % 2 === 0 ? `${70 + i * 5}%` : `${10 + i * 5}%`

                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-blue-500/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-blue-500/30"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        top: top,
                        left: left,
                        zIndex: 5,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        x: [0, i % 2 === 0 ? 10 : -10, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 4 + i,
                        delay: i * 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="text-blue-400 text-lg font-bold">{i}</div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <p className="text-gray-400 mb-2">Scroll to explore</p>
          <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center pt-2">
            <motion.div
              animate={{ opacity: [0, 1, 0], y: [0, 5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="w-1 h-1 rounded-full bg-blue-400"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

