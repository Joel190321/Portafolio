"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Lightbulb, Users, Briefcase, Brain } from "lucide-react"

export default function About() {
  const values = [
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Responsabilidad",
      description: "Comprometido con entregar resultados de calidad en tiempo y forma.",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Trabajo en Equipo",
      description: "Colaboración efectiva para lograr objetivos comunes.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      title: "Creatividad",
      description: "Enfoque innovador para resolver problemas y crear soluciones.",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      title: "Perseverancia",
      description: "Determinación para superar obstáculos y alcanzar metas.",
    },
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "Aprendizaje Continuo",
      description: "Siempre en búsqueda de nuevos conocimientos y habilidades.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Sobre Mí</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg leading-relaxed mb-6">
              Hola, soy Joel, un joven de 20 años apasionado por la informática. Me caracterizo por ser amable,
              proactivo y siempre con ganas de aprender. Me fascina la posibilidad de crear cosas nuevas en el mundo
              digital, y cuando me enfrento a lo desconocido en este vasto campo, doy lo mejor de mí para comprenderlo.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Mi mentalidad abierta y curiosa me impulsa a afrontar retos tecnológicos con entusiasmo. Estoy
              comprometido con mi crecimiento personal y profesional, siempre dispuesto a abrazar nuevas oportunidades y
              aportar al mundo de la informática con mi creatividad y dedicación.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full">JavaScript</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full">React</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full">Next.js</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full">Tailwind CSS</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full">Node.js</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Mis Valores</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <Card key={index} className="border border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">{value.icon}</div>
                      <div>
                        <h4 className="font-medium text-lg">{value.title}</h4>
                        <p className="text-foreground/70 text-sm mt-1">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

