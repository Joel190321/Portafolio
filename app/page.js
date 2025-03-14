"use client"

import { useEffect } from "react"
import Navbar from "./components/navbar"
import Hero from "./components/hero"
import About from "./components/about"
import Skills from "./components/skills"
import Experience from "./components/experience"
import Education from "./components/education"
import Projects from "./components/projects"
import Contact from "./components/contact"
import Footer from "./components/footer"
import ScrollIndicator from "./components/scroll-indicator"

export default function Home() {
  // Efecto para animación de scroll suave
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const windowHeight = window.innerHeight

        if (sectionTop < windowHeight * 0.75) {
          section.classList.add("in-view")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Iniciar al cargar

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <ScrollIndicator />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
    </div>
  )
}

