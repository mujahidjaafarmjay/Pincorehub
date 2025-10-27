import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query") || ""

    if (!query) {
      return NextResponse.json({ courses: [], blogPosts: [] })
    }

    const searchTerms = query.split(" ").filter(Boolean)
    const searchConditions = searchTerms.map((term) => ({
      contains: term,
      mode: "insensitive",
    }))

    const courses = await prisma.course.findMany({
      where: {
        OR: [
          { title: { OR: searchConditions } },
          { description: { OR: searchConditions } },
          { instructor: { OR: searchConditions } },
          { category: { OR: searchConditions } },
        ],
        isPublished: true,
      },
      take: 5, // Limit results for brevity
    })

    const blogPosts = await prisma.blogPost.findMany({
      where: {
        OR: [
          { title: { OR: searchConditions } },
          { excerpt: { OR: searchConditions } },
          { content: { OR: searchConditions } },
          { category: { OR: searchConditions } },
          { tags: { hasSome: searchTerms } },
        ],
        published: true,
      },
      include: {
        author: {
          select: { name: true },
        },
      },
      take: 5, // Limit results for brevity
    })

    return NextResponse.json({ courses, blogPosts })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 })
  }
}
