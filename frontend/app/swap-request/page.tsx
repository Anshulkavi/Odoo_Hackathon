"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useRouter, useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import { ArrowLeft, Send } from "lucide-react"

// Mock profile data (in real app, this would come from API)
const mockProfile = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah@example.com",
  location: "New York, NY",
  avatar: "/placeholder.svg?height=60&width=60",
  skillsOffered: ["Photoshop", "UI/UX Design", "Figma"],
  skillsWanted: ["React", "Node.js", "MongoDB"],
  availability: "Weekends",
  rating: 4.8,
  bio: "Passionate designer with 5+ years of experience. Love helping others learn design skills!",
}

export default function SwapRequestPage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const profileId = searchParams.get("profileId")

  const [selectedSkillOffered, setSelectedSkillOffered] = useState("")
  const [selectedSkillWanted, setSelectedSkillWanted] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSkillOffered || !selectedSkillWanted || !message.trim()) {
      return
    }

    setLoading(true)

    try {
      // In a real app, this would make an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to dashboard with success message
      router.push("/dashboard?success=request-sent")
    } catch (error) {
      console.error("Error sending swap request:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Profile Preview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Request Skill Swap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={mockProfile.avatar || "/placeholder.svg"} alt={mockProfile.name} />
                  <AvatarFallback>
                    {mockProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{mockProfile.name}</h3>
                  <p className="text-muted-foreground">{mockProfile.location}</p>
                  <p className="text-sm text-muted-foreground mt-1">{mockProfile.bio}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm mb-2 text-green-600 dark:text-green-400">Skills They Offer</h4>
                  <div className="flex flex-wrap gap-1">
                    {mockProfile.skillsOffered.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2 text-blue-600 dark:text-blue-400">Skills They Want</h4>
                  <div className="flex flex-wrap gap-1">
                    {mockProfile.skillsWanted.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Swap Request Form */}
          <Card>
            <CardHeader>
              <CardTitle>Propose a Skill Swap</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skill-offered">Skill You'll Offer</Label>
                    <Select value={selectedSkillOffered} onValueChange={setSelectedSkillOffered}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a skill you can teach" />
                      </SelectTrigger>
                      <SelectContent>
                        {user.skillsOffered?.map((skill, index) => (
                          <SelectItem key={index} value={skill}>
                            {skill}
                          </SelectItem>
                        )) || []}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skill-wanted">Skill You Want to Learn</Label>
                    <Select value={selectedSkillWanted} onValueChange={setSelectedSkillWanted}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a skill you want to learn" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProfile.skillsOffered.map((skill, index) => (
                          <SelectItem key={index} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Introduce yourself and explain why you'd like to swap skills..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Be friendly and specific about what you can offer and what you hope to learn.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !selectedSkillOffered || !selectedSkillWanted || !message.trim()}
                >
                  {loading ? (
                    "Sending Request..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Swap Request
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
