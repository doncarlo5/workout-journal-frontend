// import { AuthContext } from './auth-context';

import myApi from "@/lib/my-api";
import React, { createContext, useState } from "react";

// import { useAuth } from '../hooks/use-auth';

type WrapperProps = {
    children: React.ReactNode;
}

export const AuthContext = createContext({
    user: null,
    isLoggedIn: false,
    isLoading: true,
    authenticateUser: () => {},
})
const AuthContextWrapper = ({children}: WrapperProps) => {
    // const { user, login, logout, setUser } = useAuth();
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    async function authenticateUser() {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await myApi.get("/auth/verify")
          setUser(response.data);
          setIsLoggedIn(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsLoggedIn(false);
          setUser(null);
        }
    }
    return (
      <AuthContext.Provider value={{ user, isLoggedIn,isLoading, authenticateUser  }}>
       {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthContextWrapper;