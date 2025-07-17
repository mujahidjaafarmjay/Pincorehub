import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, User, Clock, Search, ArrowRight, TrendingUp, BookOpen, Download } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: "The Future of AI in Small Business: A Complete Guide for 2024",
    excerpt:
      "Discover how artificial intelligence is transforming small businesses and learn practical ways to implement AI solutions in your organization.",
    author: "Adebayo Ogundimu",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "AI & Technology",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  }

  const blogPosts = [
    {
      id: 2,
      title: "10 Essential Cybersecurity Tips for Nigerian Businesses",
      excerpt:
        "Protect your business from cyber threats with these practical security measures every business should implement.",
      author: "Fatima Hassan",
      date: "December 12, 2024",
      readTime: "6 min read",
      category: "Cybersecurity",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "Building Your First E-commerce Website: A Step-by-Step Guide",
      excerpt:
        "Learn how to create a successful online store that converts visitors into customers with our comprehensive guide.",
      author: "Chinedu Okoro",
      date: "December 10, 2024",
      readTime: "12 min read",
      category: "Web Development",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      title: "Cryptocurrency Basics: What Every Nigerian Should Know",
      excerpt:
        "A beginner-friendly introduction to cryptocurrency, blockchain technology, and how to get started safely.",
      author: "Aisha Abdullahi",
      date: "December 8, 2024",
      readTime: "10 min read",
      category: "Cryptocurrency",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 5,
      title: "Digital Marketing Trends That Will Dominate 2024",
      excerpt:
        "Stay ahead of the competition with these emerging digital marketing trends and strategies for the new year.",
      author: "Adebayo Ogundimu",
      date: "December 5, 2024",
      readTime: "7 min read",
      category: "Digital Marketing",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 6,
      title: "How to Choose the Right Laptop for Your Business Needs",
      excerpt:
        "A comprehensive buying guide to help you select the perfect laptop for your business requirements and budget.",
      author: "Fatima Hassan",
      date: "December 3, 2024",
      readTime: "9 min read",
      category: "Hardware",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 7,
      title: "Setting Up a Home Office: Tech Essentials for Remote Work",
      excerpt:
        "Create the perfect home office setup with our guide to essential technology and equipment for remote work.",
      author: "Chinedu Okoro",
      date: "December 1, 2024",
      readTime: "8 min read",
      category: "Remote Work",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const categories = [
    "All Posts",
    "AI & Technology",
    "Web Development",
    "Cybersecurity",
    "Digital Marketing",
    "Cryptocurrency",
    "Hardware",
    "Remote Work",
  ]

  const popularPosts = [
    { title: "Complete Guide to Website Security", views: "2.5K", category: "Cybersecurity" },
    { title: "Mobile App Development Trends", views: "1.8K", category: "Development" },
    { title: "Social Media Marketing Tips", views: "1.6K", category: "Marketing" },
    { title: "Cloud Storage Solutions Compared", views: "1.4K", category: "Technology" },
  ]

  const resources = [
    {
      title: "Tech Startup Checklist",
      type: "PDF Guide",
      icon: <Download className="h-5 w-5" />,
      description: "Essential steps to launch your tech startup",
    },
    {
      title: "Digital Marketing Templates",
      type: "Template Pack",
      icon: <Download className="h-5 w-5" />,
      description: "Ready-to-use marketing templates",
    },
    {
      title: "Cybersecurity Audit Checklist",
      type: "Checklist",
      icon: <Download className="h-5 w-5" />,
      description: "Comprehensive security assessment guide",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800">Tech Insights & Resources</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Stay Updated with
            <span className="text-orange-500 block">Latest Tech Trends</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Discover insights, tutorials, and expert advice on technology, business, and digital transformation. Learn
            from industry professionals and stay ahead of the curve.
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search articles..." className="pl-10 pr-4 py-3 border-gray-300" />
              <Button
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Featured Article</h2>
            <p className="text-gray-600">Our latest and most comprehensive guide</p>
          </div>

          <Card className="overflow-hidden border-gray-200 hover:shadow-lg transition-shadow bg-gray-800/50 border-gray-700 hover:bg-gray-800/70">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-orange-500 text-white">Featured</Badge>
              </div>
              <div className="p-8">
                <Badge variant="secondary" className="mb-4 bg-orange-100 text-orange-800">
                  {featuredPost.category}
                </Badge>
                <h3 className="text-2xl font-bold text-white mb-4 hover:text-orange-600 transition-colors">
                  <Link href={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                  <Link href={`/blog/${featuredPost.id}`}>
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Latest Articles</h2>
                <div className="flex gap-2 overflow-x-auto">
                  {categories.slice(0, 4).map((category, index) => (
                    <Button
                      key={index}
                      variant={index === 0 ? "default" : "outline"}
                      size="sm"
                      className={
                        index === 0
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "border-gray-300 text-gray-600 hover:bg-gray-100 bg-transparent"
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="group hover:shadow-lg transition-all duration-300 border-gray-200 bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-white text-gray-800">{post.category}</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg text-white group-hover:text-orange-600 transition-colors line-clamp-2">
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription className="text-gray-600 line-clamp-3">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{post.date}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-orange-600 border-orange-600 bg-transparent"
                          asChild
                        >
                          <Link href={`/blog/${post.id}`}>Read More</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white bg-transparent"
                >
                  Load More Articles
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Newsletter Signup */}
              <Card className="border-orange-200 bg-orange-500/10 border-orange-500/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Get the latest tech insights and tutorials delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <Input placeholder="Your email address" className="border-orange-200" />
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">Subscribe Now</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card className="border-gray-200 bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
                    Popular Posts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <div key={index} className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white hover:text-orange-600 transition-colors cursor-pointer">
                            {post.title}
                          </h4>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="text-xs mr-2">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-gray-500">{post.views} views</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="border-gray-200 bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <BookOpen className="h-5 w-5 mr-2 text-orange-500" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.slice(1).map((category, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Free Resources */}
              <Card className="border-gray-200 bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Download className="h-5 w-5 mr-2 text-orange-500" />
                    Free Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resources.map((resource, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <div className="text-orange-600">{resource.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">{resource.title}</h4>
                          <p className="text-xs text-gray-500 mb-2">{resource.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
