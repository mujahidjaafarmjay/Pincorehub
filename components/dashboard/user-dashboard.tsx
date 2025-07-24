"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, Award, Play, CheckCircle, User, Settings } from "lucide-react"

interface DashboardData {
  enrollments: any[]
  bookings: any[]
  certificates: any[]
  recentActivity: any[]
}

export default function UserDashboard() {
  const { data: session } = useSession()
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    enrollments: [],
    bookings: [],
    certificates: [],
    recentActivity: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch user's enrollments, bookings, etc.
      const [enrollmentsRes, bookingsRes] = await Promise.all([
        fetch("/api/user/enrollments"),
        fetch("/api/user/bookings"),
      ])

      const enrollments = await enrollmentsRes.json()
      const bookings = await bookingsRes.json()

      setDashboardData({
        enrollments: enrollments.data || [],
        bookings: bookings.data || [],
        certificates: [],
        recentActivity: [],
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const stats = [
    {
      title: "Courses Enrolled",
      value: dashboardData.enrollments.length,
      icon: <BookOpen className="h-5 w-5" />,
      color: "text-blue-600",
    },
    {
      title: "Completed Courses",
      value: dashboardData.enrollments.filter((e) => e.completed).length,
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-green-600",
    },
    {
      title: "Certificates Earned",
      value: dashboardData.certificates.length,
      icon: <Award className="h-5 w-5" />,
      color: "text-orange-600",
    },
    {
      title: "Upcoming Bookings",
      value: dashboardData.bookings.filter((b) => b.status === "CONFIRMED").length,
      icon: <Calendar className="h-5 w-5" />,
      color: "text-purple-600",
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                    <div className="h-8 bg-gray-600 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {session?.user?.name}!</h1>
          <p className="text-gray-400">Track your learning progress and manage your bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} bg-gray-700 p-3 rounded-lg`}>{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="courses" className="data-[state=active]:bg-orange-500">
              My Courses
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-orange-500">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:bg-orange-500">
              Certificates
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-orange-500">
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">My Courses</CardTitle>
                <CardDescription>Continue your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.enrollments.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">You haven't enrolled in any courses yet</p>
                    <Button className="bg-orange-500 hover:bg-orange-600">Browse Courses</Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {dashboardData.enrollments.map((enrollment) => (
                      <Card key={enrollment.id} className="bg-gray-700/50 border-gray-600">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold text-white">{enrollment.course.title}</h3>
                            <Badge variant={enrollment.completed ? "default" : "secondary"}>
                              {enrollment.completed ? "Completed" : "In Progress"}
                            </Badge>
                          </div>
                          <p className="text-gray-400 text-sm mb-4">{enrollment.course.description}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Progress</span>
                              <span className="text-white">{Math.round(enrollment.progress)}%</span>
                            </div>
                            <Progress value={enrollment.progress} className="h-2" />
                          </div>
                          <Button size="sm" className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
                            <Play className="h-4 w-4 mr-2" />
                            Continue Learning
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">My Bookings</CardTitle>
                <CardDescription>Manage your appointments and consultations</CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No bookings found</p>
                    <Button className="bg-orange-500 hover:bg-orange-600">Book a Service</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dashboardData.bookings.map((booking) => (
                      <Card key={booking.id} className="bg-gray-700/50 border-gray-600">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-white">{booking.service}</h3>
                              <p className="text-gray-400 text-sm">
                                {new Date(booking.date).toLocaleDateString()} at {booking.time}
                              </p>
                              <p className="text-gray-400 text-sm">{booking.location}</p>
                            </div>
                            <Badge
                              variant={
                                booking.status === "CONFIRMED"
                                  ? "default"
                                  : booking.status === "PENDING"
                                    ? "secondary"
                                    : booking.status === "COMPLETED"
                                      ? "default"
                                      : "destructive"
                              }
                            >
                              {booking.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">My Certificates</CardTitle>
                <CardDescription>Your earned certificates and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No certificates earned yet</p>
                  <p className="text-gray-500 text-sm">Complete courses to earn certificates</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Profile Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{session?.user?.name}</h3>
                      <p className="text-gray-400">{session?.user?.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
