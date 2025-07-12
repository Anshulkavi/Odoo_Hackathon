"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Clock, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"

// Mock data for public profiles
const mockProfiles = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=40&width=40",
    skillsOffered: ["Photoshop", "UI/UX Design", "Figma"],
    skillsWanted: ["React", "Node.js", "MongoDB"],
    availability: "Weekends",
    rating: 4.8,
    isPublic: true,
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@example.com",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    skillsOffered: ["React", "JavaScript", "Python"],
    skillsWanted: ["Machine Learning", "Data Science"],
    availability: "Evenings",
    rating: 4.9,
    isPublic: true,
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma@example.com",
    location: "London, UK",
    avatar: "/placeholder.svg?height=40&width=40",
    skillsOffered: ["Excel", "Data Analysis", "SQL"],
    skillsWanted: ["Photoshop", "Graphic Design"],
    availability: "Flexible",
    rating: 4.7,
    isPublic: true,
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    email: "alex@example.com",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=40&width=40",
    skillsOffered: ["Guitar", "Music Production", "Logic Pro"],
    skillsWanted: ["Video Editing", "After Effects"],
    availability: "Weekends",
    rating: 4.6,
    isPublic: true,
  },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProfiles, setFilteredProfiles] = useState(mockProfiles)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const filtered = mockProfiles.filter(
      (profile) =>
        profile.skillsOffered.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        profile.skillsWanted.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredProfiles(filtered)
  }, [searchTerm])

  const handleRequestSwap = (profileId: number) => {
    if (!user) {
      router.push("/login")
      return
    }
    router.push(`/swap-request?profileId=${profileId}`)
  }

  return (
    <div className="min-h-screen gradient-bg-subtle">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Skill Swap Platform
          </h1>
          <p className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with others to exchange skills and learn something new. Join our community of learners and teachers.
          </p>

          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search skills (e.g., Photoshop, Excel, React...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar pl-12 py-6 text-lg focus-ring"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {filteredProfiles.map((profile) => (
            <Card key={profile.id} className="skill-card animate-scale-in">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 avatar-ring">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-lg">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold">{profile.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{profile.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-sm mb-3 text-green-600 dark:text-green-400 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Skills Offered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.skillsOffered.map((skill, index) => (
                      <Badge key={index} className="badge-skill-offered text-xs font-medium px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3 text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Skills Wanted
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.skillsWanted.map((skill, index) => (
                      <Badge key={index} className="badge-skill-wanted text-xs font-medium px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">Available: {profile.availability}</span>
                </div>

                <Button
                  onClick={() => handleRequestSwap(profile.id)}
                  className="w-full btn-gradient py-6 text-base font-semibold"
                >
                  Request Skill Swap
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No profiles found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
