"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import SearchInput from "@/components/shared/search-input"
import { Loader2, Star, Play, CheckCircle } from "lucide-react"

interface Course {
  id: string
  title: string
  slug: string
  description?: string
  image?: string
  price: number
  instructor: string
  category: string
  isPublished: boolean
  createdAt: string
  rating?: number
  students?: number
  duration?: string
  lessons?: number
  level?: string
  originalPrice?: number
  skills?: string[]
  features?: string[]
  badge?: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 9, total: 0, pages: 1 })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const fetchCourses = async (page: number, query: string, category: string, level: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
      })
      if (query) params.append("search", query)
      if (category && category !== "all") params.append("category", category)
      if (level && level !== "all") params.append("level", level)

      const res = await fetch(`http://localhost:8000/api/courses?${params.toString()}`)
      if (!res.ok) {
        throw new Error("Failed to fetch courses")
      }
      const data = await res.json()
      setCourses(data)
      // The new API doesn't have pagination, so I'll just set some default values.
      setPagination({ page: 1, limit: 9, total: data.length, pages: 1 })
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses(pagination.page, searchQuery, selectedCategory, selectedLevel)
  }, [pagination.page, searchQuery, selectedCategory, selectedLevel])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPagination((prev) => ({ ...prev, page: 1 })) // Reset to first page on new search
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setPagination((prev) => ({ ...prev, page: 1 })) // Reset to first page on category change
  }

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level)
    setPagination((prev) => ({ ...prev, page: 1 })) // Reset to first page on level change
  }

  const categories = ["all", "Programming", "Design", "Marketing", "Business", "Data Science"] // Example categories

  const courseCategories = [
    {
      id: "all",
      name: "All Courses",
      icon: (
        <Image
          src="/placeholder.svg?height=300&width=500&text=Course+Image"
          alt="All Courses"
          width={500}
          height={300}
        />
      ),
    },
    {
      id: "development",
      name: "Development",
      icon: (
        <Image
          src="/placeholder.svg?height=300&width=500&text=Development"
          alt="Development"
          width={500}
          height={300}
        />
      ),
    },
    {
      id: "design",
      name: "Design",
      icon: <Image src="/placeholder.svg?height=300&width=500&text=Design" alt="Design" width={500} height={300} />,
    },
    {
      id: "business",
      name: "Business",
      icon: <Image src="/placeholder.svg?height=300&width=500&text=Business" alt="Business" width={500} height={300} />,
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: (
        <Image src="/placeholder.svg?height=300&width=500&text=Crypto" alt="Cryptocurrency" width={500} height={300} />
      ),
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      icon: (
        <Image
          src="/placeholder.svg?height=300&width=500&text=Cybersecurity"
          alt="Cybersecurity"
          width={500}
          height={300}
        />
      ),
    },
  ]

  const courseLevels = [
    { id: "all", name: "All Levels" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ]

  const featuredCourse = {
    id: 1,
    title: "Complete Web Development Bootcamp 2024",
    description:
      "Master modern web development with React, Node.js, and MongoDB. Build real-world projects and launch your career.",
    instructor: "Adebayo Ogundimu",
    rating: 4.9,
    students: 2847,
    duration: "42 hours",
    lessons: 156,
    level: "Beginner to Advanced",
    price: 89000,
    originalPrice: 150000,
    category: "development",
    image: "/placeholder.svg?height=300&width=500",
    skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB", "Deployment"],
    features: ["Lifetime Access", "Certificate", "Project Files", "Community Access"],
    badge: "Bestseller",
  }

  const learningPaths = [
    {
      id: 1,
      title: "Full-Stack Web Developer",
      description: "Complete path from beginner to professional web developer",
      courses: 6,
      duration: "6 months",
      level: "Beginner to Advanced",
      price: 299000,
      originalPrice: 500000,
      image: "/placeholder.svg?height=200&width=300",
      skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "Databases", "Deployment"],
    },
    {
      id: 2,
      title: "Digital Marketing Professional",
      description: "Master all aspects of digital marketing and grow businesses online",
      courses: 5,
      duration: "4 months",
      level: "Beginner to Intermediate",
      price: 199000,
      originalPrice: 350000,
      image: "/placeholder.svg?height=200&width=300",
      skills: ["SEO", "Social Media", "PPC", "Content Marketing", "Analytics", "Strategy"],
    },
    {
      id: 3,
      title: "Cybersecurity Specialist",
      description: "Comprehensive cybersecurity training for modern threats",
      courses: 4,
      duration: "5 months",
      level: "Intermediate to Advanced",
      price: 349000,
      originalPrice: 600000,
      image: "/placeholder.svg?height=200&width=300",
      skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Compliance", "Incident Response"],
    },
  ]

  const instructors = [
    {
      name: "Adebayo Ogundimu",
      role: "Senior Full-Stack Developer",
      courses: 8,
      students: 5420,
      rating: 4.9,
      image: "/placeholder.svg?height=100&width=100",
      expertise: ["Web Development", "JavaScript", "React", "Node.js"],
    },
    {
      name: "Fatima Hassan",
      role: "Cybersecurity Expert",
      courses: 6,
      students: 3210,
      rating: 4.8,
      image: "/placeholder.svg?height=100&width=100",
      expertise: ["Cybersecurity", "Network Security", "Ethical Hacking"],
    },
    {
      name: "Chinedu Okoro",
      role: "UI/UX Design Lead",
      courses: 5,
      students: 2890,
      rating: 4.7,
      image: "/placeholder.svg?height=100&width=100",
      expertise: ["UI/UX Design", "Figma", "Mobile Design"],
    },
    {
      name: "Aisha Abdullahi",
      role: "Digital Marketing Specialist",
      courses: 7,
      students: 4150,
      rating: 4.6,
      image: "/placeholder.svg?height=100&width=100",
      expertise: ["Digital Marketing", "SEO", "Social Media"],
    },
  ]

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Bestseller":
        return "bg-orange-500 text-white"
      case "New":
        return "bg-green-500 text-white"
      case "Popular":
        return "bg-blue-500 text-white"
      case "Trending":
        return "bg-purple-500 text-white"
      case "Hot":
        return "bg-red-500 text-white"
      case "Certified":
        return "bg-yellow-500 text-black"
      case "Updated":
        return "bg-indigo-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 bg-gray-900 text-white min-h-screen">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">Our Courses</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Explore our wide range of courses designed to help you master new skills and advance your career.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/4">
          <Card className="bg-gray-800/50 border-gray-700 p-4">
            <CardTitle className="text-xl mb-4 text-white">Search</CardTitle>
            <SearchInput placeholder="Search courses..." onSearch={handleSearch} className="mb-6" />

            <CardTitle className="text-xl mb-4 text-white">Categories</CardTitle>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category.toLowerCase() ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-1 text-sm ${
                    selectedCategory === category.toLowerCase()
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => handleCategoryChange(category.toLowerCase())}
                >
                  {category}
                </Badge>
              ))}
            </div>

            <CardTitle className="text-xl mb-4 text-white mt-6">Levels</CardTitle>
            <div className="flex flex-wrap gap-2">
              {courseLevels.map((level) => (
                <Badge
                  key={level.id}
                  variant={selectedLevel === level.id ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-1 text-sm ${
                    selectedLevel === level.id
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => handleLevelChange(level.id)}
                >
                  {level.name}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        <div className="w-full md:w-3/4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <Card key={i} className="bg-gray-800/50 border-gray-700 animate-pulse">
                  <div className="w-full h-48 bg-gray-700 rounded-t-lg"></div>
                  <CardContent className="p-4 space-y-3">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-10">
              <p>{error}</p>
              <Button
                onClick={() => fetchCourses(pagination.page, searchQuery, selectedCategory, selectedLevel)}
                className="mt-4 bg-orange-500 hover:bg-orange-600"
              >
                Retry
              </Button>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center text-gray-400 py-10">No courses found matching your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="bg-gray-800/50 border-gray-700 hover:shadow-lg transition-shadow">
                  <Link href={`/courses/${course.slug}`}>
                    <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={course.image || "/placeholder.svg?height=200&width=300&text=Course+Image"}
                        alt={course.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-orange-500 hover:bg-orange-600">{course.category}</Badge>
                      <CardTitle className="text-xl font-semibold text-white mb-2 line-clamp-2">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-sm mb-3 line-clamp-3">
                        {course.description || "No description available."}
                      </CardDescription>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{course.instructor}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{course.rating || "No rating available."}</span>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-orange-400 mt-3">₦{course.price.toLocaleString()}</div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <Button
                variant="outline"
                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1 || isLoading}
                className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              >
                Previous
              </Button>
              <span className="text-gray-300">
                Page {pagination.page} of {pagination.pages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.pages || isLoading}
                className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-orange-500/20 text-orange-400 border border-orange-500/30 animate-pulse">
                🎓 Professional Courses
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Master New Skills
                <span className="text-orange-500 block gradient-text">Advance Your Career</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Learn from industry experts with hands-on projects, real-world applications, and lifetime access to
                cutting-edge technology courses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 glow-orange">
                  Browse Courses
                  <Link href="/courses" className="ml-2 h-5 w-5">
                    <Loader2 className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                >
                  <Link href="/demo" className="mr-2 h-5 w-5">
                    <Loader2 className="h-5 w-5" />
                  </Link>
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="glass rounded-2xl shadow-2xl p-8 glow-orange">
                <div className="grid grid-cols-2 gap-4">
                  {courseCategories.map((category) => (
                    <div
                      key={category.id}
                      className="bg-orange-500/10 border-orange-500/20 rounded-lg p-4 text-center border"
                    >
                      {category.icon}
                      <p className="text-sm font-medium text-gray-300">{category.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-white">
                    <Image
                      src={instructor.image || "/placeholder.svg"}
                      alt={instructor.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{instructor.courses}</div>
                <div className="text-gray-300">Courses by {instructor.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Course */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Featured Course</h2>
            <p className="text-xl text-gray-400">Our most popular and comprehensive course</p>
          </div>

          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 glow-orange">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative">
                <img
                  src={featuredCourse.image || "/placeholder.svg"}
                  alt={featuredCourse.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <Badge className={`absolute top-4 left-4 ${getBadgeColor(featuredCourse.badge)}`}>
                  {featuredCourse.badge}
                </Badge>
                <Button
                  size="sm"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30"
                >
                  <Link href={`/courses/${featuredCourse.id}`}>
                    <Play className="h-6 w-6" />
                  </Link>
                </Button>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {featuredCourse.category}
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    {featuredCourse.level}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{featuredCourse.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{featuredCourse.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-400">
                    <Image
                      src="/placeholder.svg?height=20&width=20&text=Clock"
                      alt="Clock"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    {featuredCourse.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Image
                      src="/placeholder.svg?height=20&width=20&text=Video"
                      alt="Video"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    {featuredCourse.lessons} lessons
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Image
                      src="/placeholder.svg?height=20&width=20&text=Users"
                      alt="Users"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    {featuredCourse.students.toLocaleString()} students
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Star className="h-4 w-4 mr-2 text-yellow-400" />
                    {featuredCourse.rating} rating
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-2">What you'll learn:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {featuredCourse.skills.map((skill, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-400">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-2xl font-bold text-white">₦{featuredCourse.price.toLocaleString()}</span>
                    <span className="text-lg text-gray-500 line-through ml-2">
                      ₦{featuredCourse.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <Badge className="bg-green-500 text-white">
                    {Math.round(
                      ((featuredCourse.originalPrice - featuredCourse.price) / featuredCourse.originalPrice) * 100,
                    )}
                    % OFF
                  </Badge>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                    Enroll Now
                    <Link href={`/courses/${featuredCourse.id}`} className="ml-2 h-4 w-4">
                      <Loader2 className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Learning Paths</h2>
            <p className="text-xl text-gray-400">Structured learning journeys to master complete skill sets</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningPaths.map((path) => (
              <Card
                key={path.id}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={path.image || "/placeholder.svg"}
                    alt={path.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-purple-500 text-white">Learning Path</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-white group-hover:text-orange-400 transition-colors">
                    {path.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">{path.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Image
                          src="/placeholder.svg?height=20&width=20&text=BookOpen"
                          alt="BookOpen"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        {path.courses} courses
                      </div>
                      <div className="flex items-center">
                        <Image
                          src="/placeholder.svg?height=20&width=20&text=Clock"
                          alt="Clock"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        {path.duration}
                      </div>
                      <div className="flex items-center col-span-2">
                        <Image
                          src="/placeholder.svg?height=20&width=20&text=Target"
                          alt="Target"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        {path.level}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Skills you'll master:</h4>
                      <div className="flex flex-wrap gap-1">
                        {path.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div>
                        <span className="text-xl font-bold text-white">₦{path.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₦{path.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                        Start Path
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Courses */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">All Courses</h2>
            <p className="text-xl text-gray-400">Choose from our comprehensive course library</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <div className="flex gap-2">
              {courseCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  }
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              {courseLevels.map((level) => (
                <Button
                  key={level.id}
                  variant={selectedLevel === level.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(level.id)}
                  className={
                    selectedLevel === level.id
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  }
                >
                  {level.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg?height=200&width=300&text=Course+Image"}
                    alt={course.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 hover:scale-110"
                  />
                  <Badge className={`absolute top-2 left-2 ${getBadgeColor(course.badge)} text-xs`}>
                    {course.badge}
                  </Badge>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{course.instructor}</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        {course.rating}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                      <div className="flex items-center">
                        <Image
                          src="/placeholder.svg?height=20&width=20&text=Clock"
                          alt="Clock"
                          width={20}
                          height={20}
                          className="mr-1"
                        />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Image
                          src="/placeholder.svg?height=20&width=20&text=Users"
                          alt="Users"
                          width={20}
                          height={20}
                          className="mr-1"
                        />
                        {course.students}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                      <div>
                        <span className="text-lg font-bold text-white">₦{course.price.toLocaleString()}</span>
                        <span className="text-xs text-gray-500 line-through ml-1">
                          ₦{course.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                        Enroll
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Meet Our Expert Instructors</h2>
            <p className="text-xl text-gray-400">Learn from industry professionals with real-world experience</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 text-center group"
              >
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img
                      src={instructor.image || "/placeholder.svg?height=100&width=100&text=Instructor+Image"}
                      alt={instructor.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-orange-500"
                    />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{instructor.name}</h3>
                  <p className="text-orange-400 text-sm font-medium mb-3">{instructor.role}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-400">
                    <div>
                      <div className="text-white font-semibold">{instructor.courses}</div>
                      <div>Courses</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{instructor.students.toLocaleString()}</div>
                      <div>Students</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center mb-4">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-white font-semibold">{instructor.rating}</span>
                    <span className="text-gray-400 text-sm ml-1">rating</span>
                  </div>

                  <div className="flex flex-wrap gap-1 justify-center">
                    {instructor.expertise.slice(0, 2).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of students who have transformed their careers with our expert-led courses. Start your
            learning journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
              Browse All Courses
              <Link href="/courses" className="ml-2 h-5 w-5">
                <Loader2 className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-500 bg-transparent"
            >
              <Link href="/demo" className="mr-2 h-5 w-5">
                <Loader2 className="h-5 w-5" />
              </Link>
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
