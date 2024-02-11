import { useContext, useState } from "react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { AuthContext } from "../context/context-wrapper"
import myApi from "../lib/api-handler"

const LoginPage = () => {
  const { authenticateUser } = useContext(AuthContext)

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await myApi.post("/auth/login", formState)
      console.log(response)
      localStorage.setItem("token", response.data.token)
      authenticateUser()
    } catch (error: any) {
      // console.log(error)

      setError(error.response.data.message)
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
        <header className="border-b p-4">
          <div className="container flex items-center justify-between px-4 md:px-6">
            <Link className="flex items-center space-x-2" to="/">
              <FlagIcon className="h-8 w-8" />
              <span className="text-xl font-bold">Workout Journal</span>
            </Link>
            <nav className="space-x-4">
              <Link
                className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-gray-800"
                to="/signup"
              >
                Sign up
              </Link>
              <Link
                className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-gray-800"
                to="/login"
              >
                Sign in
              </Link>
            </nav>
          </div>
        </header>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">Bon retour! 👋 Connecte toi avec ton compte</p>
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
                <Label htmlFor="password">Password</Label>
                <Input id="password" value={formState.password} onChange={handleChange} required type="password" />
              </div>
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
            <div className="text-center text-sm">
              Tu n'as pas de compte ?
              <Link className="ml-1 underline" to="/signup">
                En créer un
              </Link>
            </div>
          </div>
        </div>
      </form>
      {error && <p>{error}</p>}
    </>
  )

  function FlagIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" x2="4" y1="22" y2="15" />
      </svg>
    )
  }
}

export default LoginPage
