import { useContext, useState } from "react"

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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" value={formState.email} onChange={handleChange} id="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" value={formState.password} onChange={handleChange} id="password" />
        </div>

        <button>Login</button>
      </form>
      {error && <p>{error}</p>}
    </>
  )
}

export default LoginPage
