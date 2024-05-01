import { useContext, useState } from "react"
import { AuthContext } from "@/context/context-wrapper"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"

import myApi from "@/lib/api-handler"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"

import SignupComponent from "../components/signup-component"

const SignupPage = () => {
  const [tab, setTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const onTabChange = (tab: string) => {
    setTab(tab)
  }

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
      setIsLoading(false)
      setError(error.response.data.message)
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }

  return (
    <div className="">
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <Tabs
          value={tab}
          onValueChange={onTabChange}
          defaultValue={tab}
          className="my-auto flex flex-col items-center md:px-6"
        >
          <TabsList className="grid w-full max-w-2xl grid-cols-2 rounded-xl ">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="signup">Inscription</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <>
              <form onSubmit={handleSubmit}>
                <div className="">
                  <div className="mt-5 text-left">
                    <h1 className="text-3xl font-bold">Se connecter</h1>
                    <div className="items mb-5 flex items-baseline gap-1">
                      <p className="text-gray-500 dark:text-gray-400">Tu n'as pas de compte?</p>
                      <Button
                        onClick={() => setTab("signup")}
                        variant={"link"}
                        className="m-0 p-0 text-gray-500 underline dark:text-gray-400"
                      >
                        Créer un compte
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          placeholder=""
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
                          // placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                          value={formState.password}
                          onChange={handleChange}
                          required
                          type={showPassword ? "text" : "password"}
                          autoComplete="on"
                        />
                      </div>
                    </div>

                    <div className="flex select-none items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="showPassword"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          onChange={() => setShowPassword(!showPassword)}
                        />
                        <label htmlFor="showPassword" className="ml-2 block text-sm text-gray-900">
                          Afficher le mot de passe
                        </label>
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
          </TabsContent>
          <TabsContent value="signup">
            <SignupComponent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default SignupPage
