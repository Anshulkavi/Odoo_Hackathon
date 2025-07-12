"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Ban, Download, Send, Users, MessageSquare, Star } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data for admin panel
const mockReports = [
  {
    id: 1,
    type: "inappropriate_skill",
    reporter: "John Doe",
    reported: "Jane Smith",
    skill: "Inappropriate Content Creation",
    reason: "Skill description contains inappropriate content",
    status: "pending",
  },
  {
    id: 2,
    type: "user_behavior",
    reporter: "Mike Chen",
    reported: "Alex Johnson",
    reason: "User was rude and unprofessional during skill exchange",
    status: "pending",
  },
]

const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    status: "active",
    swapsCompleted: 12,
    rating: 4.8,
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@example.com",
    status: "active",
    swapsCompleted: 8,
    rating: 4.9,
    joinDate: "2024-01-10",
  },
]

export default function AdminPage() {
  const [announcement, setAnnouncement] = useState("")
  const [reports, setReports] = useState(mockReports)
  const [users, setUsers] = useState(mockUsers)

  const handleResolveReport = (reportId: number, action: "approve" | "reject") => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === reportId ? { ...report, status: action === "approve" ? "resolved" : "rejected" } : report,
      ),
    )
  }

  const handleBanUser = (userId: number) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: "banned" } : user)))
  }

  const handleSendAnnouncement = () => {
    if (announcement.trim()) {
      // In real app, this would send to all users
      console.log("Sending announcement:", announcement)
      setAnnouncement("")
    }
  }

  const handleDownloadReport = (type: string) => {
    // In real app, this would generate and download actual reports
    console.log(`Downloading ${type} report`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage users, reports, and platform settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{users.length}</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{reports.filter((r) => r.status === "pending").length}</p>
                  <p className="text-sm text-muted-foreground">Pending Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Total Swaps</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">4.7</p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reported Content & Users</CardTitle>
              </CardHeader>
              <CardContent>
                {reports.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No reports to review.</p>
                ) : (
                  <div className="space-y-4">
                    {reports.map((report) => (
                      <Card key={report.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant={report.type === "inappropriate_skill" ? "destructive" : "secondary"}>
                                  {report.type === "inappropriate_skill" ? "Inappropriate Skill" : "User Behavior"}
                                </Badge>
                                <Badge variant={report.status === "pending" ? "outline" : "secondary"}>
                                  {report.status}
                                </Badge>
                              </div>

                              <div className="space-y-2">
                                <p>
                                  <strong>Reporter:</strong> {report.reporter}
                                </p>
                                <p>
                                  <strong>Reported:</strong> {report.reported}
                                </p>
                                {report.skill && (
                                  <p>
                                    <strong>Skill:</strong> {report.skill}
                                  </p>
                                )}
                                <p>
                                  <strong>Reason:</strong> {report.reason}
                                </p>
                              </div>
                            </div>

                            {report.status === "pending" && (
                              <div className="flex gap-2 ml-4">
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleResolveReport(report.id, "reject")}
                                >
                                  Take Action
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleResolveReport(report.id, "approve")}
                                >
                                  Dismiss
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <Card key={user.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user.name} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div>
                              <h4 className="font-medium">{user.name}</h4>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              <div className="flex items-center gap-4 mt-1 text-sm">
                                <span>Swaps: {user.swapsCompleted}</span>
                                <span>Rating: {user.rating}</span>
                                <span>Joined: {user.joinDate}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge variant={user.status === "active" ? "secondary" : "destructive"}>
                              {user.status}
                            </Badge>
                            {user.status === "active" && (
                              <Button size="sm" variant="destructive" onClick={() => handleBanUser(user.id)}>
                                <Ban className="h-4 w-4 mr-1" />
                                Ban User
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Send Global Announcement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="announcement" className="text-sm font-medium">
                      Announcement Message
                    </label>
                    <Textarea
                      id="announcement"
                      placeholder="Type your announcement message here..."
                      value={announcement}
                      onChange={(e) => setAnnouncement(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button onClick={handleSendAnnouncement} disabled={!announcement.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send to All Users
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Download Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => handleDownloadReport("user_activity")}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    User Activity Report
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleDownloadReport("swap_logs")}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Swap Logs
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleDownloadReport("feedback_summary")}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Feedback Summary
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">User Growth</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">This Month</span>
                        <span className="font-medium">+24 users</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Last Month</span>
                        <span className="font-medium">+18 users</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Swap Activity</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Completed This Week</span>
                        <span className="font-medium">32 swaps</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Success Rate</span>
                        <span className="font-medium">87%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
