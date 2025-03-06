"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Award, ExternalLink, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Image from "next/image"
import { getCertificados } from "@/lib/firebase"

export default function Certificados() {
  const [currentCertificate, setCurrentCertificate] = useState(null)
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Cargar certificados desde Firebase
  useEffect(() => {
    async function fetchCertificates() {
      try {
        setLoading(true)
        const certificadosData = await getCertificados()
        setCertificates(certificadosData)
      } catch (err) {
        console.error("Error al cargar certificados:", err)
        setError("No se pudieron cargar los certificados. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [])

  // Función para navegar entre certificados en el diálogo
  const navigateCertificate = (direction) => {
    if (!currentCertificate) return

    const currentIndex = certificates.findIndex((cert) => cert.id === currentCertificate.id)
    let newIndex

    if (direction === "next") {
      newIndex = (currentIndex + 1) % certificates.length
    } else {
      newIndex = (currentIndex - 1 + certificates.length) % certificates.length
    }

    setCurrentCertificate(certificates[newIndex])
  }

  if (loading) {
    return (
      <section id="certificados" className="py-20">
        <h2 className="text-4xl font-bold mb-10 text-center">Certificados</h2>
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Cargando certificados...</span>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="certificados" className="py-20">
        <h2 className="text-4xl font-bold mb-10 text-center">Certificados</h2>
        <div className="text-center text-red-500">{error}</div>
      </section>
    )
  }

  return (
    <section id="certificados" className="py-20">
      <h2 className="text-4xl font-bold mb-10 text-center">Certificados</h2>

      {certificates.length === 0 ? (
        <p className="text-center text-muted-foreground">No hay certificados disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <Dialog key={certificate.id}>
              <DialogTrigger asChild onClick={() => setCurrentCertificate(certificate)}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl line-clamp-1">{certificate.titulo}</CardTitle>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {certificate.fecha}
                      </Badge>
                    </div>
                    <CardDescription>{certificate.emisor}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative aspect-video overflow-hidden rounded-md">
                    <Image
                      src={certificate.imagen || "/placeholder.svg?height=400&width=600"}
                      alt={certificate.titulo}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Award className="h-12 w-12 text-white" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2 pt-2">
                    {certificate.habilidades &&
                      certificate.habilidades.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    {certificate.habilidades && certificate.habilidades.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{certificate.habilidades.length - 3}
                      </Badge>
                    )}
                  </CardFooter>
                </Card>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                {currentCertificate && (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{currentCertificate.titulo}</DialogTitle>
                      <DialogDescription className="flex items-center gap-2">
                        <span className="font-medium">{currentCertificate.emisor}</span> •
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {currentCertificate.fecha}
                        </span>
                      </DialogDescription>
                    </DialogHeader>

                    <div className="relative aspect-video w-full mt-4 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={currentCertificate.imagen || "/placeholder.svg?height=400&width=600"}
                        alt={currentCertificate.titulo}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Descripción</h4>
                        <p className="text-sm text-muted-foreground">{currentCertificate.descripcion}</p>
                      </div>

                      {currentCertificate.habilidades && currentCertificate.habilidades.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Habilidades</h4>
                          <div className="flex flex-wrap gap-2">
                            {currentCertificate.habilidades.map((skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {currentCertificate.credencial && (
                        <div className="pt-4">
                          <Button variant="outline" className="w-full sm:w-auto" asChild>
                            <a
                              href={currentCertificate.credencial}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Ver credencial
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Botones de navegación */}
                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigateCertificate("prev")}
                        aria-label="Certificado anterior"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigateCertificate("next")}
                        aria-label="Certificado siguiente"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </section>
  )
}

