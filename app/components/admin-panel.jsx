"use client"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Pencil, Trash2, LogOut, Mail, Award, Code } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  getCertificados,
  getProyectos,
  getMensajes,
  addCertificado,
  updateCertificado,
  deleteCertificado,
  addProyecto,
  updateProyecto,
  deleteProyecto,
  logoutAdmin,
} from "@/lib/firebase"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("certificados")
  const [certificados, setCertificados] = useState([])
  const [proyectos, setProyectos] = useState([])
  const [mensajes, setMensajes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()

  // Cargar datos según la pestaña activa
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        switch (activeTab) {
          case "certificados":
            const certificadosData = await getCertificados()
            setCertificados(certificadosData)
            break
          case "proyectos":
            const proyectosData = await getProyectos()
            setProyectos(proyectosData)
            break
          case "mensajes":
            const mensajesData = await getMensajes()
            setMensajes(mensajesData)
            break
        }
      } catch (err) {
        console.error(`Error al cargar ${activeTab}:`, err)
        setError(`No se pudieron cargar los ${activeTab}. Por favor, intenta de nuevo.`)
        toast({
          variant: "destructive",
          title: "Error",
          description: `No se pudieron cargar los ${activeTab}.`,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeTab, toast])

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Manejar cambios en campos de array (habilidades)
  const handleArrayInputChange = (e) => {
    const { name, value } = e.target
    // Convertir string separado por comas a array
    const arrayValue = value.split(",").map((item) => item.trim())
    setFormData((prev) => ({ ...prev, [name]: arrayValue }))
  }

  // Preparar formulario para nuevo item
  const handleNewItem = () => {
    if (activeTab === "certificados") {
      setFormData({
        titulo: "",
        emisor: "",
        fecha: "",
        descripcion: "",
        habilidades: [],
        imagen: "",
        credencial: "",
      })
    } else if (activeTab === "proyectos") {
      setFormData({
        titulo: "",
        descripcion: "",
        imagen: "",
        tecnologias: [],
        enlace: "",
        github: "",
      })
    }
    setCurrentItem(null)
  }

  // Preparar formulario para editar item
  const handleEditItem = (item) => {
    // Si es un array, convertirlo a string para el input
    const preparedData = { ...item }
    if (item.habilidades) {
      preparedData.habilidadesString = item.habilidades.join(", ")
    }
    if (item.tecnologias) {
      preparedData.tecnologiasString = item.tecnologias.join(", ")
    }

    setFormData(preparedData)
    setCurrentItem(item)
  }

  // Guardar certificado (nuevo o actualizado)
  const handleSaveCertificado = async () => {
    setIsSubmitting(true)
    try {
      // Preparar datos
      const certificadoData = {
        titulo: formData.titulo,
        emisor: formData.emisor,
        fecha: formData.fecha,
        descripcion: formData.descripcion,
        habilidades: formData.habilidadesString ? formData.habilidadesString.split(",").map((s) => s.trim()) : [],
        imagen: formData.imagen,
        credencial: formData.credencial,
      }

      let result
      if (currentItem) {
        // Actualizar existente
        result = await updateCertificado(currentItem.id, certificadoData)
        setCertificados((prev) => prev.map((cert) => (cert.id === currentItem.id ? result : cert)))
        toast({
          title: "Certificado actualizado",
          description: "El certificado se ha actualizado correctamente.",
        })
      } else {
        // Crear nuevo
        result = await addCertificado(certificadoData)
        setCertificados((prev) => [...prev, result])
        toast({
          title: "Certificado creado",
          description: "El certificado se ha creado correctamente.",
        })
      }

      // Limpiar formulario
      setFormData({})
      setCurrentItem(null)
    } catch (err) {
      console.error("Error al guardar certificado:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo guardar el certificado. Por favor, intenta de nuevo.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Guardar proyecto (nuevo o actualizado)
  const handleSaveProyecto = async () => {
    setIsSubmitting(true)
    try {
      // Preparar datos
      const proyectoData = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        imagen: formData.imagen,
        tecnologias: formData.tecnologiasString ? formData.tecnologiasString.split(",").map((s) => s.trim()) : [],
        enlace: formData.enlace,
        github: formData.github,
      }

      let result
      if (currentItem) {
        // Actualizar existente
        result = await updateProyecto(currentItem.id, proyectoData)
        setProyectos((prev) => prev.map((proj) => (proj.id === currentItem.id ? result : proj)))
        toast({
          title: "Proyecto actualizado",
          description: "El proyecto se ha actualizado correctamente.",
        })
      } else {
        // Crear nuevo
        result = await addProyecto(proyectoData)
        setProyectos((prev) => [...prev, result])
        toast({
          title: "Proyecto creado",
          description: "El proyecto se ha creado correctamente.",
        })
      }

      // Limpiar formulario
      setFormData({})
      setCurrentItem(null)
    } catch (err) {
      console.error("Error al guardar proyecto:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo guardar el proyecto. Por favor, intenta de nuevo.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Eliminar certificado
  const handleDeleteCertificado = async (id) => {
    try {
      await deleteCertificado(id)
      setCertificados((prev) => prev.filter((cert) => cert.id !== id))
      toast({
        title: "Certificado eliminado",
        description: "El certificado se ha eliminado correctamente.",
      })
    } catch (err) {
      console.error("Error al eliminar certificado:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar el certificado. Por favor, intenta de nuevo.",
      })
    }
  }

  // Eliminar proyecto
  const handleDeleteProyecto = async (id) => {
    try {
      await deleteProyecto(id)
      setProyectos((prev) => prev.filter((proj) => proj.id !== id))
      toast({
        title: "Proyecto eliminado",
        description: "El proyecto se ha eliminado correctamente.",
      })
    } catch (err) {
      console.error("Error al eliminar proyecto:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar el proyecto. Por favor, intenta de nuevo.",
      })
    }
  }

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await logoutAdmin()
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      })
    } catch (err) {
      console.error("Error al cerrar sesión:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cerrar sesión. Por favor, intenta de nuevo.",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Cargando panel de administración...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>

      <Tabs defaultValue="certificados" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="certificados" className="flex items-center">
            <Award className="mr-2 h-4 w-4" />
            Certificados
          </TabsTrigger>
          <TabsTrigger value="proyectos" className="flex items-center">
            <Code className="mr-2 h-4 w-4" />
            Proyectos
          </TabsTrigger>
          <TabsTrigger value="mensajes" className="flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            Mensajes
          </TabsTrigger>
        </TabsList>

        {/* Pestaña de Certificados */}
        <TabsContent value="certificados">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Gestión de Certificados</CardTitle>
                  <CardDescription>Administra tus certificados y credenciales.</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={handleNewItem}>
                      <Plus className="mr-2 h-4 w-4" />
                      Nuevo Certificado
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>{currentItem ? "Editar Certificado" : "Nuevo Certificado"}</DialogTitle>
                      <DialogDescription>
                        {currentItem
                          ? "Modifica los detalles del certificado existente."
                          : "Completa el formulario para añadir un nuevo certificado."}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="titulo">Título</Label>
                          <Input
                            id="titulo"
                            name="titulo"
                            value={formData.titulo || ""}
                            onChange={handleInputChange}
                            placeholder="Título del certificado"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emisor">Emisor</Label>
                          <Input
                            id="emisor"
                            name="emisor"
                            value={formData.emisor || ""}
                            onChange={handleInputChange}
                            placeholder="Institución emisora"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fecha">Fecha</Label>
                          <Input
                            id="fecha"
                            name="fecha"
                            value={formData.fecha || ""}
                            onChange={handleInputChange}
                            placeholder="Ej: Enero 2023"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="imagen">URL de Imagen</Label>
                          <Input
                            id="imagen"
                            name="imagen"
                            value={formData.imagen || ""}
                            onChange={handleInputChange}
                            placeholder="https://ejemplo.com/imagen.jpg"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="descripcion">Descripción</Label>
                        <Textarea
                          id="descripcion"
                          name="descripcion"
                          value={formData.descripcion || ""}
                          onChange={handleInputChange}
                          placeholder="Descripción del certificado"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="habilidadesString">Habilidades (separadas por comas)</Label>
                        <Input
                          id="habilidadesString"
                          name="habilidadesString"
                          value={formData.habilidadesString || ""}
                          onChange={handleInputChange}
                          placeholder="HTML, CSS, JavaScript"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="credencial">URL de Credencial (opcional)</Label>
                        <Input
                          id="credencial"
                          name="credencial"
                          value={formData.credencial || ""}
                          onChange={handleInputChange}
                          placeholder="https://ejemplo.com/credencial"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleSaveCertificado} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Guardando...
                          </>
                        ) : (
                          "Guardar Certificado"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Lista de certificados</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Emisor</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Habilidades</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificados.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No hay certificados disponibles
                      </TableCell>
                    </TableRow>
                  ) : (
                    certificados.map((certificado) => (
                      <TableRow key={certificado.id}>
                        <TableCell className="font-medium">{certificado.titulo}</TableCell>
                        <TableCell>{certificado.emisor}</TableCell>
                        <TableCell>{certificado.fecha}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {certificado.habilidades &&
                              certificado.habilidades.slice(0, 2).map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            {certificado.habilidades && certificado.habilidades.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{certificado.habilidades.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => handleEditItem(certificado)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Editar Certificado</DialogTitle>
                                  <DialogDescription>
                                    Modifica los detalles del certificado existente.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="titulo">Título</Label>
                                      <Input
                                        id="titulo"
                                        name="titulo"
                                        value={formData.titulo || ""}
                                        onChange={handleInputChange}
                                        placeholder="Título del certificado"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="emisor">Emisor</Label>
                                      <Input
                                        id="emisor"
                                        name="emisor"
                                        value={formData.emisor || ""}
                                        onChange={handleInputChange}
                                        placeholder="Institución emisora"
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="fecha">Fecha</Label>
                                      <Input
                                        id="fecha"
                                        name="fecha"
                                        value={formData.fecha || ""}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Enero 2023"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="imagen">URL de Imagen</Label>
                                      <Input
                                        id="imagen"
                                        name="imagen"
                                        value={formData.imagen || ""}
                                        onChange={handleInputChange}
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="descripcion">Descripción</Label>
                                    <Textarea
                                      id="descripcion"
                                      name="descripcion"
                                      value={formData.descripcion || ""}
                                      onChange={handleInputChange}
                                      placeholder="Descripción del certificado"
                                      rows={3}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="habilidadesString">Habilidades (separadas por comas)</Label>
                                    <Input
                                      id="habilidadesString"
                                      name="habilidadesString"
                                      value={formData.habilidadesString || ""}
                                      onChange={handleInputChange}
                                      placeholder="HTML, CSS, JavaScript"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="credencial">URL de Credencial (opcional)</Label>
                                    <Input
                                      id="credencial"
                                      name="credencial"
                                      value={formData.credencial || ""}
                                      onChange={handleInputChange}
                                      placeholder="https://ejemplo.com/credencial"
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit" onClick={handleSaveCertificado} disabled={isSubmitting}>
                                    {isSubmitting ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Guardando...
                                      </>
                                    ) : (
                                      "Guardar Cambios"
                                    )}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="icon" className="text-red-500 hover:text-red-700">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Esto eliminará permanentemente el certificado.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteCertificado(certificado.id)}
                                    className="bg-red-500 hover:bg-red-700"
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Proyectos */}
        <TabsContent value="proyectos">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Gestión de Proyectos</CardTitle>
                  <CardDescription>Administra tus proyectos y portafolio.</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={handleNewItem}>
                      <Plus className="mr-2 h-4 w-4" />
                      Nuevo Proyecto
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>{currentItem ? "Editar Proyecto" : "Nuevo Proyecto"}</DialogTitle>
                      <DialogDescription>
                        {currentItem
                          ? "Modifica los detalles del proyecto existente."
                          : "Completa el formulario para añadir un nuevo proyecto."}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="titulo">Título</Label>
                        <Input
                          id="titulo"
                          name="titulo"
                          value={formData.titulo || ""}
                          onChange={handleInputChange}
                          placeholder="Título del proyecto"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="descripcion">Descripción</Label>
                        <Textarea
                          id="descripcion"
                          name="descripcion"
                          value={formData.descripcion || ""}
                          onChange={handleInputChange}
                          placeholder="Descripción del proyecto"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="imagen">URL de Imagen</Label>
                        <Input
                          id="imagen"
                          name="imagen"
                          value={formData.imagen || ""}
                          onChange={handleInputChange}
                          placeholder="https://ejemplo.com/imagen.jpg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tecnologiasString">Tecnologías (separadas por comas)</Label>
                        <Input
                          id="tecnologiasString"
                          name="tecnologiasString"
                          value={formData.tecnologiasString || ""}
                          onChange={handleInputChange}
                          placeholder="React, Node.js, Firebase"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="enlace">URL del Proyecto</Label>
                          <Input
                            id="enlace"
                            name="enlace"
                            value={formData.enlace || ""}
                            onChange={handleInputChange}
                            placeholder="https://miproyecto.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="github">URL de GitHub</Label>
                          <Input
                            id="github"
                            name="github"
                            value={formData.github || ""}
                            onChange={handleInputChange}
                            placeholder="https://github.com/usuario/proyecto"
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleSaveProyecto} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Guardando...
                          </>
                        ) : (
                          "Guardar Proyecto"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Lista de proyectos</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Tecnologías</TableHead>
                    <TableHead>Enlaces</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {proyectos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No hay proyectos disponibles
                      </TableCell>
                    </TableRow>
                  ) : (
                    proyectos.map((proyecto) => (
                      <TableRow key={proyecto.id}>
                        <TableCell className="font-medium">{proyecto.titulo}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {proyecto.tecnologias &&
                              proyecto.tecnologias.slice(0, 2).map((tech, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            {proyecto.tecnologias && proyecto.tecnologias.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{proyecto.tecnologias.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {proyecto.enlace && (
                              <a
                                href={proyecto.enlace}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                Demo
                              </a>
                            )}
                            {proyecto.github && (
                              <a
                                href={proyecto.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                GitHub
                              </a>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => handleEditItem(proyecto)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Editar Proyecto</DialogTitle>
                                  <DialogDescription>Modifica los detalles del proyecto existente.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="titulo">Título</Label>
                                    <Input
                                      id="titulo"
                                      name="titulo"
                                      value={formData.titulo || ""}
                                      onChange={handleInputChange}
                                      placeholder="Título del proyecto"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="descripcion">Descripción</Label>
                                    <Textarea
                                      id="descripcion"
                                      name="descripcion"
                                      value={formData.descripcion || ""}
                                      onChange={handleInputChange}
                                      placeholder="Descripción del proyecto"
                                      rows={3}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="imagen">URL de Imagen</Label>
                                    <Input
                                      id="imagen"
                                      name="imagen"
                                      value={formData.imagen || ""}
                                      onChange={handleInputChange}
                                      placeholder="https://ejemplo.com/imagen.jpg"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="tecnologiasString">Tecnologías (separadas por comas)</Label>
                                    <Input
                                      id="tecnologiasString"
                                      name="tecnologiasString"
                                      value={formData.tecnologiasString || ""}
                                      onChange={handleInputChange}
                                      placeholder="React, Node.js, Firebase"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="enlace">URL del Proyecto</Label>
                                      <Input
                                        id="enlace"
                                        name="enlace"
                                        value={formData.enlace || ""}
                                        onChange={handleInputChange}
                                        placeholder="https://miproyecto.com"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="github">URL de GitHub</Label>
                                      <Input
                                        id="github"
                                        name="github"
                                        value={formData.github || ""}
                                        onChange={handleInputChange}
                                        placeholder="https://github.com/usuario/proyecto"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit" onClick={handleSaveProyecto} disabled={isSubmitting}>
                                    {isSubmitting ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Guardando...
                                      </>
                                    ) : (
                                      "Guardar Cambios"
                                    )}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="icon" className="text-red-500 hover:text-red-700">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Esto eliminará permanentemente el proyecto.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteProyecto(proyecto.id)}
                                    className="bg-red-500 hover:bg-red-700"
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Mensajes */}
        <TabsContent value="mensajes">
          <Card>
            <CardHeader>
              <CardTitle>Mensajes de Contacto</CardTitle>
              <CardDescription>Revisa los mensajes enviados a través del formulario de contacto.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Lista de mensajes</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Mensaje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mensajes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No hay mensajes disponibles
                      </TableCell>
                    </TableRow>
                  ) : (
                    mensajes.map((mensaje) => (
                      <TableRow key={mensaje.id}>
                        <TableCell className="font-medium">{mensaje.name}</TableCell>
                        <TableCell>{mensaje.email}</TableCell>
                        <TableCell>{new Date(mensaje.fecha?.toDate()).toLocaleDateString()}</TableCell>
                        <TableCell className="max-w-xs truncate">{mensaje.message}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

