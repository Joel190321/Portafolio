"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Eye,EyeOff  } from "lucide-react"

export default function Projects() {
  const projects = [
    {
      title: "Gestor Financiero",
      description:
        "Plataforma de para gestionar tus finanzas. estableciendo metas y objetivos de tu dinero",
      image: "https://res.cloudinary.com/dupnpphjj/image/upload/v1741638946/imagen_2025-03-10_163546359_hcj6sw.png",
      tags: ["Next.js", "React", "Tailwind CSS", "Firebase"],
      demoLink: "https://fin-track-ruddy.vercel.app",
      codeLink: "https://github.com/Joel190321/FinTrack",
      featured: true,
    },
    {
      title: "CryptoBlog",
      description:
        "Blog de noticias conforme Crypto obteniendo los datos en tiempo real del mercado",
      image: "https://res.cloudinary.com/dupnpphjj/image/upload/v1741974902/Captura_de_pantalla_2025-03-14_122215_wsax4e.png",
      tags: ["Next.js", "Tailwind CSS", "API Coinmarket", "Shadcn", "Typescript"],
      demoLink: "https://crypto-blog-psi.vercel.app",
      codeLink: "https://github.com/Joel190321/Crypto-blog",
      featured: true,
    },
    {
      title: "Lic.Eduviges",
      description:
        "Portafolio web Lic.Eduviges",
      image: "https://res.cloudinary.com/dupnpphjj/image/upload/v1741639166/imagen_2025-03-10_163920070_tlaf0j.png",
      tags: ["Shadcn UI", "Nextjs", "Tailwind", "Firebase", "Lucide React"],
      demoLink: "https://portfolio-lic-eduviges.vercel.app",
      codeLink: "https://github.com/Joel190321/portfolio-licEduviges",
      featured: false,
    },
    {
      title: "PickSmart",
      description: "Sitio web para recomendacion de productos Online a base de referencias",
      image: "https://res.cloudinary.com/dupnpphjj/image/upload/v1741639958/Captura_de_pantalla_2025-03-10_164717_ndq8ka.png",
      tags: ["Nextjs", "Firebase", "Shadcn UI", "Tailwind CSS", "Lucide React"],
      demoLink: "https://picksmartshop.vercel.app",
      codeLink: "https://github.com/Joel190321/Amazon",
      featured: false,
    },
    {
      title: "Sistema de Detección de Intrusos (IDS)",
      description: "Sitio web de portafolio personal con animaciones y diseño responsivo.",
      image: "https://res.cloudinary.com/dupnpphjj/image/upload/v1741801323/Captura_de_pantalla_2025-03-12_123221_dqlw7v.png",
      tags: ["Python", "Scapy", "Shadcn", "JSON", "SQLite3"],
      demoLink: "No disponible :)",
      codeLink: "https://github.com/Joel190321/Sistema-de-Detecci-n-de-Intrusos-IDS-/tree/main",
      featured: true,
    },
    {
      title: "Exploit Python",
      description: "Este proyecto permite escanear formularios en una página web para detectar vulnerabilidades de Cross-Site Scripting (XSS) y SQL Injection. Genera un informe en HTML y PDF con los resultados del escaneo.",
      image: "https://res.cloudinary.com/dupnpphjj/image/upload/v1741659677/Captura_de_pantalla_2025-03-10_221800_eygwuz.png",
      tags: ["Python", "Flask", "HTML", "CSS"],
      codeLink: "https://github.com/Joel190321/VulnerabilityScannerPy",
      demoLink: "No disponible :) ",
      featured: false,
    },
    {
      title: "PacketSniffer",
      description: "El Analizador de Tráfico de Red es una herramienta que captura paquetes de red utilizando Python y Scapy, mostrando la información en una interfaz web interactiva desarrollada con HTML, Tailwind CSS y JavaScript.",
      image: "https://res.cloudinary.com/dupnpphjj/image/upload/v1741704756/PacketSniffercode_rb64n9.png",
      tags: ["Python", "Scapy", "JavaScript", "Tailwind", "HTML"],
      demoLink: "No disponible :)",
      codeLink: "https://github.com/Joel190321/PacketSniffer",
      featured: true,
    },
  ]

  // Ordenar proyectos para mostrar los destacados primero
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Mis Proyectos</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mt-4">
            Una selección de proyectos que he desarrollado, demostrando mis habilidades y experiencia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <Card className="w-full project-card border border-border/50 flex flex-col">
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {project.featured && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-primary-foreground">Destacado</Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex-grow">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
  <Button variant="outline" size="sm" asChild>
    <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
      <Github className="h-4 w-4 mr-2" />
      Código
    </a>
  </Button>
  {project.demoLink === "No disponible :)" ? (
    <div className="flex items-center text-sm text-foreground/70">
      <EyeOff className="h-4 w-4 mr-2" />
      Sin demo
    </div>
  ) : (
    <Button size="sm" asChild>
      <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
        <Eye className="h-4 w-4 mr-2" />
        Demo
      </a>
    </Button>
  )}
</CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/Joel190321" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 mr-2" />
              Ver más proyectos en GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

