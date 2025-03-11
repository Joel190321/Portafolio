"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Code, Database, Layout, Server, Cpu, Globe, Layers, FileCode, Smartphone, Palette } from "lucide-react"

export default function FloatingIcons() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const icons = [
    { Icon: Code, color: "text-blue-500", size: 20 },
    { Icon: Database, color: "text-green-500", size: 24 },
    { Icon: Layout, color: "text-purple-500", size: 22 },
    { Icon: Server, color: "text-red-500", size: 18 },
    { Icon: Cpu, color: "text-yellow-500", size: 26 },
    { Icon: Globe, color: "text-cyan-500", size: 28 },
    { Icon: Layers, color: "text-pink-500", size: 22 },
    { Icon: FileCode, color: "text-indigo-500", size: 20 },
    { Icon: Smartphone, color: "text-orange-500", size: 24 },
    { Icon: Palette, color: "text-emerald-500", size: 26 },
  ]

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {icons.map((icon, index) => {
        const { Icon, color, size } = icon

        // Posición aleatoria
        const top = Math.random() * 100
        const left = Math.random() * 100

        // Duración aleatoria entre 15-30s
        const duration = 15 + Math.random() * 15

        // Retraso aleatorio
        const delay = Math.random() * 5

        return (
          <motion.div
            key={index}
            className={`absolute ${color} opacity-20 dark:opacity-10`}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              fontSize: size,
            }}
            animate={{
              y: [0, -30, 0, 30, 0],
              x: [0, 30, 0, -30, 0],
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1, 0.9, 1],
            }}
            transition={{
              duration,
              repeat: Number.POSITIVE_INFINITY,
              delay,
              ease: "easeInOut",
            }}
          >
            <Icon size={size} />
          </motion.div>
        )
      })}
    </div>
  )
}

