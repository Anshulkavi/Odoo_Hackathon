"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Clock, CheckCircle, XCircle, Star, MessageSquare } from "lucide-react"

// Mock swap requests data
const mockSwapRequests = [
  {
    id: 1,
    type: "received",
    status: "pending",
    requester: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      skillOffered: "Photoshop",
      skillWanted: "React",
    },
    message: "Hi! I'd love to learn React from you. I can teach you advanced Photoshop techniques in return.",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    type: "sent",
    status: "accepted",
    recipient: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      skillOffered: "Python",
      skillWanted: "JavaScript",
    },
    message: "I'm interested in learning Python. I can help you with JavaScript fundamentals.",
    createdAt: "2024-01-14T15:45:00Z",
  },
  {
    id: 3,
    type: "received",
    status: "rejected",
    requester: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      skillOffered: "Excel",
      skillWanted: "UI Design",
    },
    message: "Would you be interested in trading UI design skills for Excel expertise?",
    createdAt: "2024-01-13T09:15:00Z",
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [swapRequests, setSwapRequests] = useState(mockSwapRequests)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const handleAcceptRequest = (requestId: number) => {
    setSwapRequests((prev) =>
      prev.map((request) => (request.id === requestId ? { ...request, status: "accepted" } : request)),
    )
  }

  const handleRejectRequest = (requestId: number) => {
    setSwapRequests((prev) =>
      prev.map((request) => (request.id === requestId ? { ...request, status: "rejected" } : request)),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return ""
    }
  }

  if (!user) return null

  const receivedRequests = swapRequests.filter((req) => req.type === "received")
  const sentRequests = swapRequests.filter((req) => req.type === "sent")
  const pendingRequests = swapRequests.filter((req) => req.status === "pending")
  const activeSwaps = swapRequests.filter((req) => req.status === "accepted")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your skill swaps and requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="stats-card-warning">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-xl">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-yellow-600">{pendingRequests.length}</p>
                  <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card-success">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">{activeSwaps.length}</p>
                  <p className="text-sm font-medium text-muted-foreground">Active Swaps</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card-info">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">4.8</p>
                  <p className="text-sm font-medium text-muted-foreground">Your Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">12</p>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Swap Requests */}
        <Card className="skill-card-featured">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Swap Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="received" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1 rounded-xl">
                <TabsTrigger value="received" className="tab-enhanced rounded-lg font-semibold">
                  Received ({receivedRequests.length})
                </TabsTrigger>
                <TabsTrigger value="sent" className="tab-enhanced rounded-lg font-semibold">
                  Sent ({sentRequests.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="received" className="space-y-4">
                {receivedRequests.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No received requests yet.</p>
                ) : (
                  receivedRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage
                              src={request.requester.avatar || "/placeholder.svg"}
                              alt={request.requester.name}
                            />
                            <AvatarFallback>
                              {request.requester.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{request.requester.name}</h4>
                              <Badge className={getStatusColor(request.status)}>
                                {getStatusIcon(request.status)}
                                <span className="ml-1 capitalize">{request.status}</span>
                              </Badge>
                            </div>

                            <div className="flex gap-4 mb-3 text-sm">
                              <div>
                                <span className="text-muted-foreground">Offers:</span>
                                <Badge variant="secondary" className="ml-1">
                                  {request.requester.skillOffered}
                                </Badge>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Wants:</span>
                                <Badge variant="outline" className="ml-1">
                                  {request.requester.skillWanted}
                                </Badge>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3">{request.message}</p>

                            {request.status === "pending" && (
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => handleAcceptRequest(request.id)}>
                                  Accept
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleRejectRequest(request.id)}>
                                  Decline
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="sent" className="space-y-4">
                {sentRequests.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No sent requests yet.</p>
                ) : (
                  sentRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage
                              src={request.recipient.avatar || "/placeholder.svg"}
                              alt={request.recipient.name}
                            />
                            <AvatarFallback>
                              {request.recipient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{request.recipient.name}</h4>
                              <Badge className={getStatusColor(request.status)}>
                                {getStatusIcon(request.status)}
                                <span className="ml-1 capitalize">{request.status}</span>
                              </Badge>
                            </div>

                            <div className="flex gap-4 mb-3 text-sm">
                              <div>
                                <span className="text-muted-foreground">You offered:</span>
                                <Badge variant="secondary" className="ml-1">
                                  {request.recipient.skillWanted}
                                </Badge>
                              </div>
                              <div>
                                <span className="text-muted-foreground">You wanted:</span>
                                <Badge variant="outline" className="ml-1">
                                  {request.recipient.skillOffered}
                                </Badge>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground">{request.message}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
