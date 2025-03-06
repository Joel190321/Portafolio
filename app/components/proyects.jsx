import React from "react";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";

const Proyects = () => {
    return (
        <section id="projects" className="py-20 ">
                  <h2 className="text-4xl font-bold mb-10 text-center">Proyectos</h2>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>Camp Area</CardTitle>
                        <CardDescription>TypeScript, Node.js, Tailwind, NextJs</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">Desarrollé una plataforma representativa pensada en una App mobil de Campamentos</p>
                        <Button variant="outline" asChild>
                          <a href="https://camp-joel190321s-projects.vercel.app" target="_blank" rel="noopener noreferrer">Ver proyecto</a>
                        </Button>
                      </CardContent>
                    </Card>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>Fitness Web</CardTitle>
                        <CardDescription>Nextjs, Shadcn UI, Tailwind,Lucide React</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">Pagina ilustrativa para un gimnasio</p>
                        <Button variant="outline" asChild>
                          <a href="https://fit-life-one.vercel.app" target="_blank" rel="noopener noreferrer">Ver proyecto</a>
                        </Button>
                      </CardContent>
                    </Card>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>ToDo App</CardTitle>
                        <CardDescription>HTML,JS,Boostrap</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">Un pequeño crud para agregar tareas, permite borrarlas, marcalas como completadas..</p>
                        <Button variant="outline" asChild>
                          <a href="https://elaborate-tulumba-316a46.netlify.app" target="_blank" rel="noopener noreferrer">Ver proyecto</a>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </section>
    )
}
export default Proyects