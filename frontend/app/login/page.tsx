// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Separator } from "@/components/ui/separator"
// import { useAuth } from "@/contexts/auth-context"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Eye, EyeOff } from "lucide-react"

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [isSignUp, setIsSignUp] = useState(false)
//   const [name, setName] = useState("")
//   const [loading, setLoading] = useState(false)
//   const { login, signup } = useAuth()
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       if (isSignUp) {
//         await signup(email, password, name)
//       } else {
//         await login(email, password)
//       }
//       router.push("/dashboard")
//     } catch (error) {
//       console.error("Authentication error:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center gradient-bg-subtle px-4">
//       <Card className="form-card w-full max-w-md animate-scale-in">
//         <CardHeader className="text-center pb-8">
//           <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
//             <span className="text-primary-foreground font-bold text-2xl">SS</span>
//           </div>
//           <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
//             {isSignUp ? "Join SkillSwap" : "Welcome Back"}
//           </CardTitle>
//           <CardDescription className="text-base mt-2">
//             {isSignUp ? "Create your account to start swapping skills" : "Sign in to continue your skill journey"}
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {isSignUp && (
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input
//                   id="name"
//                   type="text"
//                   placeholder="Enter your full name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 </Button>
//               </div>
//             </div>

//             <Button type="submit" className="w-full btn-gradient py-6 text-base font-semibold" disabled={loading}>
//               {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
//             </Button>
//           </form>

//           {!isSignUp && (
//             <div className="mt-4 text-center">
//               <Link href="/forgot-password" className="text-sm text-muted-foreground hover:underline">
//                 Forgot your password?
//               </Link>
//             </div>
//           )}

//           <Separator className="my-6" />

//           <div className="text-center">
//             <p className="text-sm text-muted-foreground">
//               {isSignUp ? "Already have an account?" : "Don't have an account?"}
//             </p>
//             <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="p-0 h-auto font-normal">
//               {isSignUp ? "Sign in here" : "Sign up here"}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import React, { useState } from "react"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { Separator } from "../../components/ui/separator"
import { useAuth } from "../../contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  })

  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, signup } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isSignUp) {
        await signup(form.username, form.password, form.name)
      } else {
        await login(form.username, form.password)
      }
      router.push("/dashboard")
    } catch (error) {
      console.error("Auth error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg-subtle px-4">
      <Card className="form-card w-full max-w-md animate-scale-in">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground font-bold text-2xl">SS</span>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {isSignUp ? "Join SkillSwap" : "Welcome Back"}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {isSignUp
              ? "Create your account to start swapping skills"
              : "Sign in to continue your skill journey"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <InputField
                  label="Full Name"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                />
                <InputField
                  label="Username"
                  id="signup-username"
                  name="username"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={handleChange}
                />
                <InputField
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                />
              </>
            )}

            {!isSignUp && (
              <InputField
                label="Username"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
              />
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full btn-gradient py-6 text-base font-semibold"
              disabled={loading}
            >
              {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          {!isSignUp && (
            <div className="mt-4 text-center">
              <Link href="/forgot-password" className="text-sm text-muted-foreground hover:underline">
                Forgot your password?
              </Link>
            </div>
          )}

          <Separator className="my-6" />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </p>
            <Button
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="p-0 h-auto font-normal"
            >
              {isSignUp ? "Sign in here" : "Sign up here"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 👇 Reusable input field component
type InputProps = {
  label: string
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
}

function InputField({ label, id, name, value, onChange, placeholder = "", type = "text" }: InputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  )
}
