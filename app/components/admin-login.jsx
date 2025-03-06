"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { loginAdmin, logoutAdmin, isAdmin } from "@/lib/firebase"

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePostLogin = async (user) => {
    try {
      // Verificar si el usuario es administrador
      const adminStatus = await isAdmin()

      if (adminStatus) {
        toast({
          title: "Inicio de sesión exitoso",
          description: "Has iniciado sesión como administrador.",
        })
        if (onLoginSuccess) onLoginSuccess(user)
      } else {
        // Si el usuario no es administrador, cerrar sesión y mostrar mensaje
        await logoutAdmin()
        toast({
          variant: "destructive",
          title: "Acceso restringido",
          description: "Este panel es solo para administradores.",
        })
      }
    } catch (error) {
      console.error("Error al verificar administrador:", error)
      await logoutAdmin()
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al verificar tus permisos.",
      })
    }
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Usar la función loginAdmin de Firebase para autenticar
      const user = await loginAdmin(email, password)
      await handlePostLogin(user)
    } catch (error) {
      console.error("Error al iniciar sesión con email:", error)
      toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: error.message || "Credenciales incorrectas. Por favor, intenta de nuevo.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Acceso Administrativo</CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales para acceder al panel de administración
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Iniciar sesión
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

