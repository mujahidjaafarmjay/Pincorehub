import CourseForm from "@/components/admin/course-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface EditCoursePageProps {
  params: {
    courseId: string
  }
}

export async function generateMetadata({ params }: EditCoursePageProps) {
  const course = await prisma.course.findUnique({
    where: { id: params.courseId },
    select: { title: true },
  })

  return {
    title: course ? `Edit ${course.title}` : "Edit Course",
    description: `Admin panel for editing ${course?.title || "a course"} on PINCOREHUB.`,
  }
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    redirect(`/auth/signin?callbackUrl=/dashboard/admin/courses/${params.courseId}/edit`)
  }

  const course = await prisma.course.findUnique({
    where: { id: params.courseId },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      imageUrl: true,
      category: true,
      duration: true,
      instructorId: true,
    },
  })

  if (!course) {
    notFound()
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Edit Course: {course.title}</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <CourseForm initialData={course} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
