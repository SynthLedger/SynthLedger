"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Play, Pause, Maximize, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

// Add TypeScript declaration for YouTube API
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export default function Demo() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const videoRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // YouTube video URL: https://www.youtube.com/watch?v=0zGnTGRS8Ro
  const videoId = "0zGnTGRS8Ro"

  // YouTube player reference
  const [player, setPlayer] = useState(null)

  // Load YouTube API
  useEffect(() => {
    // Load the YouTube IFrame API if it's not already loaded
    if (!window.YT) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    }

    // Initialize the player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player("youtube-player", {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          mute: isMuted ? 1 : 0,
        },
        events: {
          onStateChange: (event) => {
            // Update playing state based on YouTube player state
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING)
          },
          onReady: (event) => {
            setPlayer(event.target)
          },
        },
      })
    }

    // Cleanup
    return () => {
      window.onYouTubeIframeAPIReady = null
    }
  }, [videoId, isMuted])

  // Handle video play/pause
  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo()
      } else {
        player.playVideo()
      }
    }
  }

  // Handle video mute/unmute
  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute()
      } else {
        player.mute()
      }
      setIsMuted(!isMuted)
    }
  }

  // Handle fullscreen
  const toggleFullscreen = () => {
    const iframe = document.getElementById("youtube-player")
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen()
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen()
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen()
      }
    }
  }

  // Update play state when video plays or pauses
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  // Mouse tracking for effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()

      // Calculate normalized mouse position
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Canvas animation effect
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas size
    const resizeCanvas = () => {
      if (canvas && containerRef.current) {
        canvas.width = containerRef.current.offsetWidth
        canvas.height = containerRef.current.offsetHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    const particles = []
    const particleCount = 150

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
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
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position with sine wave motion
        particle.x += particle.vx + Math.sin(Date.now() * 0.001 + particle.sinOffset) * 0.2
        particle.y += particle.vy + Math.cos(Date.now() * 0.001 + particle.sinOffset) * 0.2

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

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

      // Mouse interaction - create ripple effect
      if (isHovering && mousePosition.x !== 0 && mousePosition.y !== 0) {
        const mouseX = mousePosition.x * canvas.width + canvas.width / 2
        const mouseY = mousePosition.y * canvas.height + canvas.height / 2

        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 50, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 50)
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.2)")
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)")
        ctx.fillStyle = gradient
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [isHovering, mousePosition])

  return (
    <section
      id="demo"
      className="py-24 relative overflow-hidden"
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Canvas for particle effects */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Gradient background with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/10 to-gray-950 z-0"
        style={{
          backgroundPosition: `${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%`,
        }}
      />

      {/* Grid background with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-[url('/images/grid.png')] bg-repeat opacity-10 z-0"
        animate={{
          x: mousePosition.x * -20,
          y: mousePosition.y * -20,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium border border-blue-700/30 mb-4">
            Product Demo
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            See{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              SynthLedger
            </span>{" "}
            in Action
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Watch how our platform transforms blockchain development with AI-powered automation
          </p>
        </motion.div>

        {/* Video Player with Effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Video Container with 3D effects */}
          <motion.div
            className="relative rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 shadow-2xl"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
            }}
            whileHover={{
              boxShadow: "0 30px 60px -10px rgba(0, 0, 0, 0.3), 0 18px 36px -18px rgba(0, 0, 0, 0.33)",
            }}
          >
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
              className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-70 z-10 pointer-events-none"
              animate={{
                top: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
              }}
            />

            {/* Video Element */}
            <div className="aspect-video relative">
              <div id="youtube-player" className="w-full h-full"></div>

              {/* Video Overlay - shows when video is paused */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-transparent flex items-center justify-center cursor-pointer"
                    onClick={togglePlay}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-blue-600/90 flex items-center justify-center text-white"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(37, 99, 235, 0.9)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="h-8 w-8 ml-1" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/90 to-transparent flex items-center justify-between">
                <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600/20" onClick={togglePlay}>
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600/20" onClick={toggleMute}>
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-blue-600/20"
                    onClick={toggleFullscreen}
                  >
                    <Maximize className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating elements around the video */}
          {[1, 2, 3, 4].map((i) => {
            const size = 30 + i * 6
            const top = i % 2 === 0 ? `${20 + i * 15}%` : `${60 - i * 5}%`
            const left = i % 2 === 0 ? `${-5 + i * 2}%` : `${85 - i * 2}%`

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
        </motion.div>

        {/* Feature highlights below the video */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          {[
            {
              title: "AI-Powered Generation",
              description: "Watch how our AI transforms natural language into secure smart contracts in seconds",
            },
            {
              title: "Automated Security",
              description: "See real-time vulnerability detection and automated fixes in action",
            },
            {
              title: "Cross-Chain Deployment",
              description: "Experience seamless deployment across multiple blockchain networks",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 hover:border-blue-500/30 rounded-xl p-6 transition-all duration-300"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
                borderColor: "rgba(59, 130, 246, 0.3)",
              }}
            >
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <motion.button
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Live Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

