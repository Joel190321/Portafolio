"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Layout, Database, Server, Layers, Cpu } from "lucide-react"

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Layout className="h-8 w-8 text-primary" />,
      skills: [
        { name: "HTML", level: 90 },
        { name: "CSS", level: 85 },
        { name: "JavaScript", level: 85 },
        { name: "React", level: 80 },
        { name: "Next.js", level: 75 },
      ],
    },
    {
      title: "Estilos",
      icon: <Layers className="h-8 w-8 text-primary" />,
      skills: [
        { name: "Tailwind CSS", level: 85 },
        { name: "Bootstrap", level: 80 },
        { name: "CSS Modules", level: 75 },
        { name: "Styled Components", level: 70 },
      ],
    },
    {
      title: "Backend",
      icon: <Server className="h-8 w-8 text-primary" />,
      skills: [
        { name: "Node.js", level: 75 },
        { name: "Express", level: 70 },
        { name: "Python", level: 65 },
      ],
    },
    {
      title: "Bases de Datos",
      icon: <Database className="h-8 w-8 text-primary" />,
      skills: [
        { name: "Firebase", level: 80 },
        { name: "MongoDB", level: 65 },
        { name: "SQL", level: 60 },
      ],
    },
    {
      title: "Herramientas",
      icon: <Cpu className="h-8 w-8 text-primary" />,
      skills: [
        { name: "Git", level: 75 },
        { name: "VS Code", level: 90 },
        { name: "Figma", level: 65 },
      ],
    },
    {
      title: "Otros",
      icon: <Code className="h-8 w-8 text-primary" />,
      skills: [
        { name: "Responsive Design", level: 85 },
        { name: "API Integration", level: 80 },
        { name: "SEO Basics", level: 70 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Mis Habilidades</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mt-4">
            He desarrollado un conjunto diverso de habilidades técnicas a lo largo de mi carrera como desarrollador.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <Card className="h-full skill-card border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    {category.icon}
                    <h3 className="text-xl font-semibold ml-3">{category.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-foreground/70">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 + skillIndex * 0.1 }}
                            className="bg-primary h-2.5 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

