import React, { useState } from "react"
import useAuth from "@/context/use-auth"
import { ReloadIcon, UpdateIcon } from "@radix-ui/react-icons"
import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useToast } from "../components/ui/use-toast"
import fetchApi from "@/lib/api-handler"

function SettingsPage() {
  const { toast } = useToast()
  const { user } = useAuth()

  const [formState, setFormState] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { target } = event
    if (target instanceof HTMLInputElement) {
      const key = target.id
      const value = target.value
      setFormState({ ...formState, [key]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await fetchApi("/api/auth/settings", {
        method: "PATCH",
        body: JSON.stringify(formState),
      })

      toast({
        title: "Profil mis à jour!",
      })
    } catch (error: any) {
      setIsLoading(false)
      const errorMessage = error.message || "Une erreur est survenue!"
      toast({
        variant: "destructive",
        title: "Une erreur est survenue! ❌",
        description: errorMessage,
      })
      setError(errorMessage)
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }

  return (
    <div>
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <div className="flex items-center py-5">
          <Link to="/profile">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="ml-5 text-3xl font-medium">Modifier ton profil</h1>
          </div>
        </div>
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    placeholder="Prénom"
                    value={formState.firstName}
                    onChange={handleChange}
                    required
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    placeholder="Nom"
                    value={formState.lastName}
                    onChange={handleChange}
                    required
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  type="email"
                />
              </div>

              {!isLoading ? (
                <Button
                  className="mt-4 w-full"
                  type="submit"
                  onClick={() => {
                    toast({
                      title: "✅ Profil mis à jour!",
                    })
                  }}
                >
                  <UpdateIcon className="mr-2 h-4 w-4" />
                  Mettre à jour
                </Button>
              ) : (
                <Button
                  disabled
                  className="mt-4 w-full"
                  type="submit"
                  onClick={() => {
                    toast({
                      title: "✅ Profil mis à jour!",
                    })
                  }}
                >
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Mettre à jour
                </Button>
              )}
            </div>
          </form>

          {error && <p>{error}</p>}
        </div>
      </main>
    </div>
  )
}

export default SettingsPage
