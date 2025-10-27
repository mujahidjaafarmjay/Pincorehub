import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { PlusCircle, Edit } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import DeleteCourseButton from "./delete-course-button" // We'll create this component

export const metadata = {
  title: "Manage Courses",
  description: "Admin panel for managing courses on pincohub.",
}

export default async function AdminCoursesPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/dashboard/admin/courses")
  }

  const courses = await prisma.course.findMany({
    include: {
      instructor: {
        select: { name: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Courses</h1>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1" asChild>
                <Link href="/dashboard/admin/courses/create">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Course</span>
                </Link>
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Course List</CardTitle>
              <CardDescription>Manage your courses, edit details, or remove them.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell>₦{course.price.toLocaleString()}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>{course.instructor?.name || "N/A"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" asChild>
                            <Link href={`/dashboard/admin/courses/${course.id}/edit`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit Course</span>
                            </Link>
                          </Button>
                          <DeleteCourseButton courseId={course.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {courses.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No courses found. Start by adding a new course!
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
