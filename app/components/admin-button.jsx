"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Shield, LogIn } from "lucide-react"
import Link from "next/link"
import { getCurrentUser, isAdmin } from "@/lib/firebase"

export default function AdminButton() {
  const [showButton, setShowButton] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const currentUser = getCurrentUser()
        setUser(currentUser)

        if (currentUser) {
          const adminStatus = await isAdmin()
          setShowButton(adminStatus)
        } else {
          setShowButton(false)
        }
      } catch (error) {
        console.error("Error al verificar estado del usuario:", error)
        setShowButton(false)
      } finally {
        setLoading(false)
      }
    }

    checkUserStatus()
  }, [])

  if (loading) return null

  if (user && !showButton) return null

  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed bottom-4 right-4 z-50 bg-primary text-white hover:bg-primary/90"
      asChild
    >
      <Link href="/admin">
        {user ? (
          <>
            <Shield className="mr-2 h-4 w-4" />
            Admin
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Iniciar sesión
          </>
        )}
      </Link>
    </Button>
  )
}

