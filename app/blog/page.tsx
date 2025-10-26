"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import SearchInput from "@/components/shared/search-input"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  image?: string
  category: string
  tags: string[]
  author: {
    name: string
    image?: string
  }
  createdAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, pages: 1 })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const fetchBlogPosts = async (page: number, query: string, category: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
      })
      if (query) params.append("search", query)
      if (category && category !== "all") params.append("category", category)

      const res = await fetch(`http://localhost:8000/api/admin/blog?${params.toString()}`)
      if (!res.ok) {
        throw new Error("Failed to fetch blog posts")
      }
      const data = await res.json()
      setPosts(data)
      // The new API doesn't have pagination, so I'll just set some default values.
      setPagination({ page: 1, limit: 10, total: data.length, pages: 1 })
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogPosts(pagination.page, searchQuery, selectedCategory)
  }, [pagination.page, searchQuery, selectedCategory])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPagination((prev) => ({ ...prev, page: 1 })) // Reset to first page on new search
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setPagination((prev) => ({ ...prev, page: 1 })) // Reset to first page on category change
  }

  const categories = ["all", "Technology", "Business", "Personal Development", "Career", "Finance"] // Example categories

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 bg-gray-900 text-white min-h-screen">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">Our Blog</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Stay updated with the latest insights, tips, and trends in IT, business, and personal development.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/4">
          <Card className="bg-gray-800/50 border-gray-700 p-4">
            <CardTitle className="text-xl mb-4 text-white">Search</CardTitle>
            <SearchInput placeholder="Search blog posts..." onSearch={handleSearch} className="mb-6" />

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
          </Card>
        </div>

        <div className="w-full md:w-3/4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
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
                onClick={() => fetchBlogPosts(pagination.page, searchQuery, selectedCategory)}
                className="mt-4 bg-orange-500 hover:bg-orange-600"
              >
                Retry
              </Button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-400 py-10">No blog posts found matching your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="bg-gray-800/50 border-gray-700 hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={post.image || "/placeholder.svg?height=200&width=300&text=Blog+Image"}
                        alt={post.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-orange-500 hover:bg-orange-600">{post.category}</Badge>
                      <CardTitle className="text-xl font-semibold text-white mb-2 line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="text-gray-400 text-sm line-clamp-3">
                        {post.excerpt || "No excerpt available."}
                      </CardDescription>
                      <div className="flex items-center text-gray-500 text-xs mt-4">
                        {post.author?.image && (
                          <Image
                            src={post.author.image || "/placeholder.svg"}
                            alt={post.author.name}
                            width={24}
                            height={24}
                            className="rounded-full mr-2"
                          />
                        )}
                        <span>{post.author?.name || "Unknown Author"}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
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
    </div>
  )
}
