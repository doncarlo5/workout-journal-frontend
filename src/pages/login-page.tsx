import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"

import { AuthContext } from "../context/context-wrapper"
import fetchApi from "@/lib/api-handler"

const LoginPage = () => {
  const [error, setError] = useState("")
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  })

  const { authenticateUser } = useContext(AuthContext)
  const navigate = useNavigate()

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
      const response = await fetchApi("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formState),
      })

      localStorage.setItem("token", response.token)
      await authenticateUser()
      navigate("/exercises/")
    } catch (error: any) {
      console.error(error)
      setError(error.message)
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <form onSubmit={handleSubmit}>
          <div className="mx-auto max-w-sm space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Se connecter 👤</h1>
              <p className="text-gray-500 dark:text-gray-400">Connecte toi avec tes informations</p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="johnny.bravo@email.com"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                    value={formState.password}
                    onChange={handleChange}
                    required
                    type="password"
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
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
              <div>
                <p>Info compte :</p>
                <p>email: pro.julien.thomas</p>
                <p>password: password</p>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}

export default LoginPage
