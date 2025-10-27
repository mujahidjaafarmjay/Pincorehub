import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import VideoPlayer from "@/components/course/video-player"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LessonPageProps {
  params: {
    courseId: string
    lessonId: string
  }
}

export async function generateMetadata({ params }: LessonPageProps) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: params.lessonId },
    select: { title: true, course: { select: { title: true } } },
  })

  return {
    title: lesson ? `${lesson.title} - ${lesson.course.title}` : "Lesson",
    description: `Learn ${lesson?.title || "this lesson"} from ${lesson?.course.title || "a course"} on pincohub.`,
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.id) {
    redirect(`/auth/signin?callbackUrl=/courses/${params.courseId}/lessons/${params.lessonId}`)
  }

  // Check if user is enrolled in the course
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId: params.courseId,
      },
    },
  })

  // Admins and Instructors can access all lessons
  const isAdminOrInstructor = session.user.role === "ADMIN" || session.user.role === "INSTRUCTOR"

  if (!enrollment && !isAdminOrInstructor) {
    // If not enrolled and not admin/instructor, redirect to course page
    redirect(`/courses/${params.courseId}?enroll=true`)
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: params.lessonId },
    include: {
      course: {
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  })

  if (!lesson) {
    notFound()
  }

  const lessonsInCourse = lesson.course.lessons
  const currentLessonIndex = lessonsInCourse.findIndex((l) => l.id === lesson.id)
  const nextLesson = lessonsInCourse[currentLessonIndex + 1]
  const prevLesson = lessonsInCourse[currentLessonIndex - 1]

  // Update user's lesson progress (simple example: mark as completed if accessed)
  // In a real app, you might track actual video completion or quiz completion
  await prisma.userLessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId: session.user.id,
        lessonId: lesson.id,
      },
    },
    update: {
      completed: true, // Mark as completed just by visiting
      completedAt: new Date(),
    },
    create: {
      userId: session.user.id,
      lessonId: lesson.id,
      completed: true,
      completedAt: new Date(),
    },
  })

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="mb-6">
        <Link href={`/courses/${params.courseId}`} className="text-sm text-muted-foreground hover:underline">
          &larr; Back to {lesson.course.title}
        </Link>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{lesson.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {lesson.videoUrl ? (
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black">
              <VideoPlayer src={lesson.videoUrl} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg text-muted-foreground">
              No video available for this lesson.
            </div>
          )}
          <div className="mt-6 prose dark:prose-invert max-w-none">
            <p>{lesson.content}</p>
            {/* Render rich text content if available */}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mt-8">
        {prevLesson ? (
          <Button asChild variant="outline">
            <Link href={`/courses/${params.courseId}/lessons/${prevLesson.id}`}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous Lesson
            </Link>
          </Button>
        ) : (
          <div /> // Empty div to maintain spacing
        )}

        {nextLesson ? (
          <Button asChild>
            <Link href={`/courses/${params.courseId}/lessons/${nextLesson.id}`}>
              Next Lesson <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button disabled>End of Course</Button>
        )}
      </div>
    </div>
  )
}
