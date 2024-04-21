import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"

import LoginComponent from "../components/login-component"
import SignupComponent from "../components/signup-component"
import myApi from "../lib/api-handler"

const SignupPage = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

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
      const response = await myApi.post("/auth/signup", formState)
      console.log(response)
      navigate("/login")
    } catch (error: any) {
      setError(error.response.data.message)
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }

  return (
    <div className=" m-auto ">
      <div className="mb-10 flex flex-col">
        <Navbar />
      </div>
      <Tabs defaultValue="signup" className="relative w-[400px]  ">
        <TabsList className="grid w-full max-w-2xl grid-cols-2 rounded-xl ">
          <TabsTrigger value="signup">S'inscrire</TabsTrigger>
          <TabsTrigger value="signin">Se connecter</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <SignupComponent />
        </TabsContent>
        <TabsContent value="signin">
          <LoginComponent />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SignupPage
