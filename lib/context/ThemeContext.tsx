// contexts/ThemeContext.tsx
"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAppSelector,useAppDispatch } from '@/hooks/redux'
import { setActualTheme,Theme,setTheme as setThemeAction } from '@/store/slices/themeSlice'

interface ThemeContextType {
  theme: Theme
  actualTheme: 'light' | 'dark' // The actual theme being applied (resolves 'system')
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const dispatch = useAppDispatch();
  // const [theme, setTheme] = useState<Theme>('system')
  const {theme,actualTheme} = useAppSelector((state)=>state.theme)
  // const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light')

  // Function to get system theme preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }

  // Function to apply theme to document
  const applyTheme = (themeToApply: 'light' | 'dark') => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(themeToApply)
      dispatch(setActualTheme(themeToApply)) 
    }
  }

  // Initialize theme on mount
  // useEffect(() => {
  //   // Try to get saved theme from localStorage
  //   const savedTheme = localStorage.getItem('theme') as Theme | null
  //   if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
  //     setTheme(savedTheme)
  //   }
  // }, [])

  // Handle theme changes
  useEffect(() => {
    let resolvedTheme: 'light' | 'dark'

    if (theme === 'system') {
      resolvedTheme = getSystemTheme()
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        if (theme === 'system') {
          applyTheme(e.matches ? 'dark' : 'light')
        }
      }
      
      mediaQuery.addEventListener('change', handleChange)
      
      // Cleanup listener
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      resolvedTheme = theme
    }

    applyTheme(resolvedTheme)
  
  }, [theme,dispatch]);

  const setTheme = (newTheme:Theme)=>{
    dispatch(setThemeAction(newTheme))
  }

  const contextValue: ThemeContextType = {
    theme,
    actualTheme,
    setTheme
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Helper function to get theme display name
export function getThemeDisplayName(theme: Theme): string {
  switch (theme) {
    case 'light':
      return 'Light Mode'
    case 'dark':
      return 'Dark Mode'
    case 'system':
      return 'System Defined'
    default:
      return 'System Defined'
  }
}