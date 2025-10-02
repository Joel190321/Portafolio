"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Briefcase, Calendar, MapPin, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Experience() {
  const experiences = [
    {
      title: "Desarrollador",
      company: "Cincinnatus",
      location: "República Dominicana",
      period: "2022 - 2024",
      description:
        "Desarrollo de aplicaciones web utilizando tecnologías modernas como React, Next.js y Node.js. Implementación de interfaces de usuario responsivas y optimización del rendimiento de aplicaciones web. Colaboración en equipos ágiles para el desarrollo de soluciones innovadoras.",
      achievements: [
        
        "Optimización de rendimiento en aplicaciones existentes",
        "Implementación de mejores prácticas de desarrollo",
      ],
      skills: ["React", "Next.js", "Node.js", "JavaScript", "Tailwind CSS", "Electron","Firebase",],
    },
    {
      title: "Servicio al Cliente",
      company: "VacunateRD",
      location: "República Dominicana",
      period: "2023 - 2024",
      description:
        "Atención y soporte a usuarios de la plataforma nacional de vacunación. Resolución de problemas técnicos y orientación sobre el proceso de vacunación. Manejo de bases de datos y sistemas de registro.",
      achievements: [
        "Atención eficiente a más de 1000 usuarios",
        "Resolución de problemas técnicos en tiempo real",
        "Contribución a la mejora de procesos internos",
      ],
      skills: ["Atención al Cliente", "Resolución de Problemas", "Bases de Datos", "Comunicación Efectiva"],
    },
  ]

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Experiencia Profesional</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mt-4">
            Mi trayectoria profesional en el mundo del desarrollo y tecnología.
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border border-border/50 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-muted p-6 flex flex-col justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{exp.title}</CardTitle>
                      <CardDescription className="text-lg font-medium text-primary">{exp.company}</CardDescription>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-foreground/70">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center text-foreground/70">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block mt-6">
                      <Briefcase className="h-12 w-12 text-primary/30" />
                    </div>
                  </div>
                  <CardContent className="md:w-2/3 p-6">
                    <p className="mb-4 text-foreground/80">{exp.description}</p>
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Logros Destacados:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

