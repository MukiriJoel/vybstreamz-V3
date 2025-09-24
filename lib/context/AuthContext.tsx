'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { loginUser } from '@/store/thunks/authThunks'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean | null
  // login: () => void
  // logout: () => void
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch=useAppDispatch();
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  console.log("isauthen",isAuthenticated)
  // const isLoggedIn = isAuthenticated === true

  // const login = () => setIsLoggedIn(true)
  // const logout = () => setIsLoggedIn(false)

  
  const login = () => {
    // dispatch(loginUser(userData))
    // No need to set local state - Redux handles this
    console.log('User logged in via Redux')
  }

  const logout = () => {
    //  dispatch(logout());
    // No need to set local state - Redux handles this
    console.log('User logged out via Redux')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated,login,logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}