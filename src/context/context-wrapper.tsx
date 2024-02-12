// import { AuthContext } from './auth-context';

import React, { createContext, useEffect, useState } from "react"

import { User } from "@/types/user"
import myApi from "@/lib/api-handler"

// import { useAuth } from '../hooks/use-auth';

type WrapperProps = {
  children: React.ReactNode
}

interface IAuthContext {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  authenticateUser: () => void
}

const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  authenticateUser: () => {},
} as IAuthContext)

const AuthContextWrapper = ({ children }: WrapperProps) => {
  // const { user, login, logout, setUser } = useAuth();

  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  async function authenticateUser() {
    const token = localStorage.getItem("token")

    if (token) {
      const response = await myApi.get("/auth/verify")
      setUser(response.data)
      setIsLoggedIn(true)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setIsLoggedIn(false)
      setUser(null)
    }
  }

  useEffect(() => {
    authenticateUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, authenticateUser }}>{children}</AuthContext.Provider>
  )
}

export { AuthContext }

export default AuthContextWrapper
