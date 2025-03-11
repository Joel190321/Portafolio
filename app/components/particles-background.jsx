"use client"

import { useCallback, useEffect, useState } from "react"
import { loadSlim } from "tsparticles-slim"
import Particles from "react-tsparticles"

export default function ParticlesBackground({ className }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const particlesInit = useCallback(async (engine) => {
    // Esta función se llama cuando la instancia de tsParticles se inicializa
    await loadSlim(engine)
  }, [])

  if (!mounted) return null

  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: "#888888",
            },
            links: {
              color: "#888888",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.8,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 50,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  )
}

