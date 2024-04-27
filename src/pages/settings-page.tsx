import React, { useState } from "react"
import useAuth from "@/context/use-auth"
import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"

import myApi from "@/lib/api-handler"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useToast } from "../components/ui/use-toast"

function SettingsPage() {
  const { toast } = useToast()
  const { user } = useAuth()

  const [formState, setFormState] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  })
  const [error, setError] = useState("")

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
      const response = await myApi.patch("/api/auth/settings", formState)
      toast({
        title: "Profil mis à jour!",
      })

      console.log(response)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Une erreur est survenue! ❌",
      })
      setError(error.response.data.message)
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }

  return (
    <div>
      <div className="mx-auto max-w-sm space-y-6 p-4">
        <div className="flex items-center space-y-2 text-left">
          <Link to="/profile">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="ml-5 text-3xl font-medium">Modifier ton profil</h1>
          </div>
        </div>
        <div className=" ">
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
              <Button
                className="mt-4 w-full"
                type="submit"
                onClick={() => {
                  toast({
                    description: "Ton profil a bien été mis à jour! ✅",
                  })
                }}
              >
                Mettre à jour
              </Button>
            </div>
          </form>

          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
