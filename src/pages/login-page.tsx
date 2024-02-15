import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"

import { AuthContext } from "../context/context-wrapper"
import myApi from "../lib/api-handler"

const LoginPage = () => {
  const { authenticateUser } = useContext(AuthContext)

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await myApi.post("/auth/login", formState)
      console.log(response)
      localStorage.setItem("token", response.data.token)
      await authenticateUser()
      navigate("/exercises-list/")
    } catch (error: any) {
      // console.log(error)

      setError("Mot de passe incorrect")
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { target } = event
    if (target instanceof HTMLInputElement) {
      const key = target.id
      const value = target.value
      setFormState({ ...formState, [key]: value })
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
            <h1 className="text-3xl font-bold">Se connecter</h1>
            <p className="text-gray-500 dark:text-gray-400">Connecte toi avec tes informations</p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="johnny.bravo@cartoon.com"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" value={formState.password} onChange={handleChange} required type="password" />
              </div>
              {error && (
                <Alert className=" animate-pulse" variant="destructive">
                  <AlertTitle>Erreur</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
            <Button className="w-full" type="submit">
              Se connecter
            </Button>
            <div className="text-center text-sm">
              Tu n'as pas de compte ?
              <Link className="ml-1 underline hover:animate-pulse" to="/signup">
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default LoginPage
