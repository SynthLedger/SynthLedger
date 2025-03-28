interface ParticleOptions {
  particles: {
    number: {
      value: number
      density: {
        enable: boolean
        value_area: number
      }
    }
    color: {
      value: string
    }
    shape: {
      type: string
      stroke: {
        width: number
        color: string
      }
    }
    opacity: {
      value: number
      random: boolean
      anim: {
        enable: boolean
        speed: number
        opacity_min: number
        sync: boolean
      }
    }
    size: {
      value: number
      random: boolean
      anim: {
        enable: boolean
        speed: number
        size_min: number
        sync: boolean
      }
    }
    line_linked: {
      enable: boolean
      distance: number
      color: string
      opacity: number
      width: number
    }
    move: {
      enable: boolean
      speed: number
      direction: string
      random: boolean
      straight: boolean
      out_mode: string
      bounce: boolean
    }
  }
  interactivity: {
    detect_on: string
    events: {
      onhover: {
        enable: boolean
        mode: string
      }
      onclick: {
        enable: boolean
        mode: string
      }
      resize: boolean
    }
    modes: {
      grab: {
        distance: number
        line_linked: {
          opacity: number
        }
      }
      bubble: {
        distance: number
        size: number
        duration: number
      }
      repulse: {
        distance: number
        duration: number
      }
      push: {
        particles_nb: number
      }
      remove: {
        particles_nb: number
      }
    }
  }
  retina_detect: boolean
}

export default function initParticles(container: HTMLElement) {
  // Load particles.js script dynamically
  const script = document.createElement("script")
  script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
  script.async = true
  document.body.appendChild(script)

  const particlesConfig: ParticleOptions = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#06b6d4", // Cyan color
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#06b6d4",
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  }

  // Initialize particles when the script is loaded
  script.onload = () => {
    if (window.particlesJS) {
      window.particlesJS(container.id, particlesConfig)
    }
  }

  // Cleanup function
  return () => {
    document.body.removeChild(script)
  }
}

// Add the particlesJS type to the window object
declare global {
  interface Window {
    particlesJS: (id: string, options: ParticleOptions) => void
  }
}

