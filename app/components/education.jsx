"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Calendar, MapPin, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function Education() {
  const education = [
    {
      degree: "Educación Superior",
      institution: "Universidad Tecnológica De Santiago (UTESA)",
      location: "República Dominicana",
      period: "Actual",
      description: "Estudios universitarios en el área de tecnología e informática.",
      subjects: ["Programación", "Bases de Datos", "Desarrollo Web", "Algoritmos"],
    },
    {
      degree: "Educación Secundaria",
      institution: "Politécnico Monseñor Juan Antonio Flores",
      location: "República Dominicana",
      period: "2018 - 2022",
      description: "Formación técnica en el área de informática y tecnología.",
      subjects: ["Informática", "Matemáticas", "Ciencias", "Tecnología"],
    },
    {
      degree: "Formación Complementaria",
      institution: "Cincinnatus Institute of Craftsmanship",
      location: "República Dominicana",
      period: "2022",
      description: "Formación especializada en desarrollo de software y habilidades técnicas.",
      subjects: ["Desarrollo Web", "Programación", "Diseño de Software"],
    },
  ]

  const courses = [
    {
      title: "Connect and Protect: Networks and Network Security",
      institution: "Google / Coursera",
      date: "Enero 2025",
      credential: "https://coursera.org/verify/R6K8DP82XSLD",
    },
    {
      title: "Foundations of Cybersecurity",
      institution: "Google / Coursera",
      date: "Enero 2025",
      credential: "https://coursera.org/verify/3EXM1APAN6OX",
    },
    {
      title: "Desarrollo En Python Avanzado",
      institution: "UTESA PLUS",
      date: "Marzo 2024",
      credential: "https://wallet.xertify.co/certificates/1118AA24C007",
    },
  ]

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Educación</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mt-4">Mi formación académica y cursos especializados.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold mb-6 flex items-center"
            >
              <GraduationCap className="h-6 w-6 mr-2 text-primary" />
              Formación Académica
            </motion.h3>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle>{edu.degree}</CardTitle>
                      <CardDescription className="text-lg font-medium text-primary">{edu.institution}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-foreground/70">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                      <p className="mb-4 text-foreground/80">{edu.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {edu.subjects.map((subject, i) => (
                          <Badge key={i} variant="secondary">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold mb-6 flex items-center"
            >
              <BookOpen className="h-6 w-6 mr-2 text-primary" />
              Cursos y Certificaciones
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {courses.map((course, index) => (
                      <div key={index}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <h4 className="font-semibold text-lg">{course.title}</h4>
                            <p className="text-foreground/70">{course.institution}</p>
                          </div>
                          <div className="text-sm text-foreground/70 whitespace-nowrap">{course.date}</div>
                        </div>
                        <div className="mt-2">
                          <a
                            href={course.credential}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            Ver credencial
                          </a>
                        </div>
                        {index < courses.length - 1 && <Separator className="my-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <Card className="border border-border/50 bg-primary/5">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-2">Aprendizaje Continuo</h4>
                  <p className="text-foreground/80">
                    Además de mi educación formal, constantemente me mantengo actualizado a través de plataformas como
                    Coursera, Udemy, freeCodeCamp y documentación oficial de tecnologías.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge>Autodidacta</Badge>
                    <Badge>Cursos Online</Badge>
                    <Badge>Documentación</Badge>
                    <Badge>Tutoriales</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

