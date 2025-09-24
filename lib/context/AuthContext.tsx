'use client'
import { useAppSelector } from '@/hooks/redux'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean | null
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  console.log("isauth",isAuthenticated)

  
  const login = () => {
    console.log('User logged in via Redux')
  }

  const logout = () => {
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