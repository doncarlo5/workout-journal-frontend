import { useState } from "react"

import myApi from "../lib/api-handler"

const SignupPage = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await myApi.post("/auth/signup", formState)
      console.log(response)
    } catch (error: any) {
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
          <label htmlFor="firstName">First Name:</label>
          <input type="text" value={formState.firstName} onChange={handleChange} id="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" value={formState.lastName} onChange={handleChange} id="lastName" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" value={formState.email} onChange={handleChange} id="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" value={formState.password} onChange={handleChange} id="password" />
        </div>

        <button>Signup</button>
      </form>
      {error && <p>{error}</p>}
    </>
  )
}

export default SignupPage
