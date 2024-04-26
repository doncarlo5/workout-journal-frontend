import { useContext, useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { AuthContext } from "../context/context-wrapper"
import myApi from "../lib/api-handler"

const LoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false)
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
      setIsLoading(true)
      const response = await myApi.post("/api/auth/login", formState)
      console.log(response)
      localStorage.setItem("token", response.data.token)
      await authenticateUser()
      navigate("/")
    } catch (error: any) {
      console.log(error)
      setError(error.response.data.message)
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto w-full space-y-6">
          <div className="mt-8 space-y-2 text-left">
            <h1 className="text-3xl font-bold">Se connecter</h1>
            <p className="text-gray-500 dark:text-gray-400">Connecte toi pour continuer.</p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Ton email"
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
                  placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                  value={formState.password}
                  onChange={handleChange}
                  required
                  type="password"
                  autoComplete="on"
                />
              </div>
            </div>

            {isLoading ? (
              <Button disabled className="w-full">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Chargement
              </Button>
            ) : (
              <Button className="w-full" type="submit">
                Connexion
              </Button>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </form>
    </>
  )
}

export default LoginComponent
