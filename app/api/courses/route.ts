import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  duration: z.string().min(1, "Duration is required"),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  category: z.string().min(1, "Category is required"),
  instructor: z.string().min(1, "Instructor is required"),
  image: z.string().optional(),
  videoUrl: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const level = searchParams.get("level")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const where: any = { isPublished: true }

    if (category && category !== "all") {
      where.category = category
    }

    if (level && level !== "all") {
      where.level = level.toUpperCase()
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        lessons: {
          where: { isPublished: true },
          select: { id: true, title: true, duration: true },
        },
        enrollments: {
          select: { id: true },
        },
        reviews: {
          select: { rating: true },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    })

    const coursesWithStats = courses.map((course) => ({
      ...course,
      studentCount: course.enrollments.length,
      averageRating:
        course.reviews.length > 0
          ? course.reviews.reduce((sum, review) => sum + review.rating, 0) / course.reviews.length
          : 0,
      lessonCount: course.lessons.length,
    }))

    const total = await prisma.course.count({ where })

    return NextResponse.json({
      courses: coursesWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const courseData = courseSchema.parse(body)

    const course = await prisma.course.create({
      data: courseData,
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 })
    }

    console.error("Error creating course:", error)
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}
