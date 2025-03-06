"use client"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import AdminLogin from "./admin-login"
import AdminPanel from "./admin-panel"
import { onAuthStateChange, isAdmin, logoutAdmin } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { LogOut, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminContainer() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdminUser, setIsAdminUser] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (currentUser) => {
      setLoading(true)

      try {
        if (currentUser) {
          setUser(currentUser)
          // Verificar si el usuario es administrador
          const adminStatus = await isAdmin()
          setIsAdminUser(adminStatus)
        } else {
          setUser(null)
          setIsAdminUser(false)
        }
      } catch (error) {
        console.error("Error al verificar estado de administrador:", error)
        setIsAdminUser(false)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Cargando...</span>
      </div>
    )
  }

  if (user && !isAdminUser) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] space-y-6">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Acceso Restringido</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Esta sección es exclusiva para administradores. Gracias por tu interés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default">
              <Link href="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al sitio
              </Link>
            </Button>
            <Button variant="outline" onClick={() => logoutAdmin()}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Si el usuario está autenticado y es administrador, mostrar el panel
  if (user && isAdminUser) {
    return <AdminPanel />
  }

  // Si no está autenticado, mostrar el login
  return <AdminLogin onLoginSuccess={setUser} />
}

