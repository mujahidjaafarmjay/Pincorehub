import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  image: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const where: any = { published: true }

    if (category && category !== "all") {
      where.category = category
    }

    if (tag) {
      where.tags = { has: tag }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ]
    }

    const posts = await prisma.blogPost.findMany({
      where,
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    })

    const total = await prisma.blogPost.count({ where })

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const postData = blogPostSchema.parse(body)

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: postData.slug },
    })

    if (existingPost) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 })
    }

    const post = await prisma.blogPost.create({
      data: {
        ...postData,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 })
    }

    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
