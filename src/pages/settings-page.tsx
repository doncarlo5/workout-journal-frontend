import { useState } from "react"
import useAuth from "@/context/use-auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Navbar } from "@/components/navbar"

import myApi from "../lib/api-handler"

const SettingsPage = () => {
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
      const response = await myApi.patch("/auth/settings", formState)
      console.log(response)
    } catch (error: any) {
      setError(error.response.data.message)
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }

  return (
    <>
      <div className="mb-10 flex flex-col">
        <Navbar />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Mettre à jour mes informations</h1>
            <p className="text-gray-500 dark:text-gray-400">Modifie ton profile et tes identifiants de connexion.</p>
          </div>
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
        </div>
      </form>
      {error && <p>{error}</p>}
    </>
  )
}

export default SettingsPage
