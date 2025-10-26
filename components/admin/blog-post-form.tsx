"use client"

import { FormDescription } from "@/components/ui/form"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FileUpload } from "@/components/shared/file-upload"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  authorId: z.string().min(1, "Author ID is required"),
  imageUrl: z.string().url("Invalid image URL").optional().nullable(),
  category: z.string().min(1, "Category is required"),
  tags: z
    .string()
    .optional()
    .transform((str) => (str ? str.split(",").map((tag) => tag.trim()) : [])),
  published: z.boolean().optional(),
})

type BlogPostFormValues = z.infer<typeof blogPostSchema>

interface BlogPostFormProps {
  initialData?: BlogPostFormValues & { id?: string }
}

export default function BlogPostForm({ initialData }: BlogPostFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authors, setAuthors] = useState<{ id: string; name: string }[]>([])

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      ...initialData,
      tags: initialData?.tags?.join(", ") || "", // Convert array back to string for input
      published: initialData?.published ?? false,
    } || {
      title: "",
      content: "",
      authorId: "",
      imageUrl: "",
      category: "",
      tags: "",
      published: false,
    },
  })

  useEffect(() => {
    // Fetch authors (users with ADMIN or INSTRUCTOR role) for the dropdown
    const fetchAuthors = async () => {
      const headers = {
        'Authorization': `Bearer ${session?.accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      try {
        const response = await fetch("http://localhost:8000/api/admin/users", { headers }); // Assuming an API to fetch users by role
        if (response.ok) {
          const data = await response.json();
          setAuthors(data);
        } else {
          toast({
            title: "Error",
            description: "Failed to load authors.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Failed to fetch authors:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred while fetching authors.",
          variant: "destructive",
        });
      }
    };
    fetchAuthors();
  }, [toast]);

  const onSubmit = async (values: BlogPostFormValues) => {
    setIsSubmitting(true);

    const headers = {
      'Authorization': `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    try {
      const method = initialData?.id ? "PUT" : "POST";
      const url = initialData?.id
        ? `http://localhost:8000/api/admin/blog/${initialData.id}`
        : "http://localhost:8000/api/admin/blog";

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(values),
      });

      const data = await response.json()

      if (response.ok) {
        toast({
          title: initialData?.id ? "Blog Post Updated" : "Blog Post Created",
          description: `Blog post "${values.title}" has been ${initialData?.id ? "updated" : "created"} successfully.`,
        })
        router.push("/dashboard/admin/blog")
        router.refresh()
      } else {
        toast({
          title: "Operation Failed",
          description: data.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Blog Post" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your blog post content here..." rows={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an author" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.id}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value || ""}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                  folder="blog_images"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Technology, Business, Lifestyle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="tag1, tag2, tag3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Publish Post</FormLabel>
                <FormDescription>Toggle to make this blog post visible to the public.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData?.id ? "Update Post" : "Create Post"}
        </Button>
      </form>
    </Form>
  )
}
