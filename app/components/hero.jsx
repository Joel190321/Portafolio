"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticlesBackground from "../components/particles-background"
import AnimatedText from "../components/animated-text"
import FloatingIcons from "../components/floating-icons"

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 in-view relative overflow-hidden">
      <ParticlesBackground className="opacity-50" />
      <FloatingIcons />

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="block">Hola, soy</span>
              <AnimatedText text="Joel David Peña" className="text-primary block mt-2" delay={0.2} />
            </h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-2xl md:text-3xl text-foreground/80 mb-6"
            >
              <span className="relative">
                Desarrollador Web Frontend
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-lg text-foreground/70 mb-8 max-w-lg"
            >
              Apasionado por crear experiencias digitales atractivas y funcionales. Especializado en JavaScript, React,
              Next.js y más.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="relative overflow-hidden group">
                <a href="#contact">
                  <span className="relative z-10">Contáctame</span>
                  <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="relative overflow-hidden group">
                <a href="#projects">
                  <span className="relative z-10">Ver Proyectos</span>
                  <span className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex items-center mt-8 space-x-4"
            >
              {[
                { icon: <Github className="h-6 w-6" />, href: "https://github.com/Joel190321" },
                { icon: <Linkedin className="h-6 w-6" />, href: "https://linkedin.com/in/joel-david-peña" },
                { icon: <Mail className="h-6 w-6" />, href: "mailto:ype0111@gmail.com" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors"
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex justify-center"
          >
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20"
              animate={{
                boxShadow: ["0 0 0 0 rgba(0, 0, 0, 0)", "0 0 20px 5px rgba(0, 0, 0, 0.1)", "0 0 0 0 rgba(0, 0, 0, 0)"],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              }}
            >
              <img
                src="/Joel.webp"
                alt="Joel David Peña"
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-foreground/60 mb-2">Desplázate para más</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <ArrowDown className="h-6 w-6 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

