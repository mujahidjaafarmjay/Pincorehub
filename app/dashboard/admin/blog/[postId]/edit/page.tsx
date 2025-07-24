import BlogPostForm from "@/components/admin/blog-post-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface EditBlogPostPageProps {
  params: {
    postId: string
  }
}

export async function generateMetadata({ params }: EditBlogPostPageProps) {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.postId },
    select: { title: true },
  })

  return {
    title: post ? `Edit ${post.title}` : "Edit Blog Post",
    description: `Admin panel for editing ${post?.title || "a blog post"} on PINCOREHUB.`,
  }
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const session = await getServerSession(authOptions)

  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "INSTRUCTOR")) {
    redirect(`/auth/signin?callbackUrl=/dashboard/admin/blog/${params.postId}/edit`)
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: params.postId },
    select: {
      id: true,
      title: true,
      content: true,
      authorId: true,
      imageUrl: true,
      category: true,
      tags: true,
      published: true,
    },
  })

  if (!post) {
    notFound()
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Edit Blog Post: {post.title}</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Blog Post Details</CardTitle>
            </CardHeader>
            <CardContent>
              <BlogPostForm initialData={post} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
