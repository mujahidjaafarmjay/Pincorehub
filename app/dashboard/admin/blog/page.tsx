import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { PlusCircle, Edit } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import DeleteBlogPostButton from "./delete-blog-post-button" // We'll create this component
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Manage Blog Posts",
  description: "Admin panel for managing blog posts on pincohub.",
}

export default async function AdminBlogPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "INSTRUCTOR")) {
    redirect("/auth/signin?callbackUrl=/dashboard/admin/blog")
  }

  const blogPosts = await prisma.blogPost.findMany({
    include: {
      author: {
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
            <h1 className="text-lg font-semibold md:text-2xl">Blog Posts</h1>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1" asChild>
                <Link href="/dashboard/admin/blog/create">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Post</span>
                </Link>
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Blog Post List</CardTitle>
              <CardDescription>Manage your blog posts, edit content, or change status.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.author?.name || "N/A"}</TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>
                        <Badge variant={post.published ? "default" : "secondary"}>
                          {post.published ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" asChild>
                            <Link href={`/dashboard/admin/blog/${post.id}/edit`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit Post</span>
                            </Link>
                          </Button>
                          <DeleteBlogPostButton postId={post.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {blogPosts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No blog posts found. Start by adding a new post!
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
