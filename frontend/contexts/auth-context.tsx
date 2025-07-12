"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  location?: string
  skillsOffered?: string[]
  skillsWanted?: string[]
  availability?: string
  isPublic?: boolean
  bio?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  updateProfile: (profile: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("skillswap_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email: email,
      avatar: "/placeholder.svg?height=40&width=40",
      location: "San Francisco, CA",
      skillsOffered: ["JavaScript", "React", "Node.js"],
      skillsWanted: ["Python", "Machine Learning", "UI Design"],
      availability: "evenings",
      isPublic: true,
      bio: "Full-stack developer passionate about learning new technologies.",
    }

    setUser(mockUser)
    localStorage.setItem("skillswap_user", JSON.stringify(mockUser))
  }

  const signup = async (email: string, password: string, name: string) => {
    // Mock signup - in real app, this would call an API
    const mockUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      avatar: "/placeholder.svg?height=40&width=40",
      skillsOffered: [],
      skillsWanted: [],
      isPublic: true,
      bio: "",
    }

    setUser(mockUser)
    localStorage.setItem("skillswap_user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("skillswap_user")
  }

  const updateProfile = async (profile: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...profile }
    setUser(updatedUser)
    localStorage.setItem("skillswap_user", JSON.stringify(updatedUser))
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
