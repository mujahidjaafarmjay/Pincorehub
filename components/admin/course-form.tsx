"use client"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be non-negative"),
  imageUrl: z.string().url("Invalid image URL").optional().nullable(),
  category: z.string().min(1, "Category is required"),
  duration: z.string().min(1, "Duration is required"),
  instructorId: z.string().optional().nullable(),
})

type CourseFormValues = z.infer<typeof courseSchema>

interface CourseFormProps {
  initialData?: CourseFormValues & { id?: string }
}

export default function CourseForm({ initialData }: CourseFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [instructors, setInstructors] = useState<{ id: string; name: string }[]>([])

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      price: 0,
      imageUrl: "",
      category: "",
      duration: "",
      instructorId: "", // Updated to be a non-empty string
    },
  })

  useEffect(() => {
    // Fetch instructors for the dropdown
    const fetchInstructors = async () => {
      try {
        const response = await fetch("/api/admin/users?role=INSTRUCTOR") // Assuming an API to fetch users by role
        if (response.ok) {
          const data = await response.json()
          setInstructors(data)
        } else {
          toast({
            title: "Error",
            description: "Failed to load instructors.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Failed to fetch instructors:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred while fetching instructors.",
          variant: "destructive",
        })
      }
    }
    fetchInstructors()
  }, [toast])

  const onSubmit = async (values: CourseFormValues) => {
    setIsSubmitting(true)
    try {
      const method = initialData?.id ? "PUT" : "POST"
      const url = initialData?.id ? `/api/admin/courses?id=${initialData.id}` : "/api/admin/courses"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: initialData?.id ? "Course Updated" : "Course Created",
          description: `Course "${values.title}" has been ${initialData?.id ? "updated" : "created"} successfully.`,
        })
        router.push("/dashboard/admin/courses")
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
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input placeholder="Introduction to Web Development" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A comprehensive course covering..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (NGN)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="50000.00"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Image</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value || ""}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                  folder="course_images"
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
                <Input placeholder="Programming, Design, Business" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input placeholder="10 weeks, 40 hours" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || "none"}>
                {" "}
                // Updated to have a non-empty default value
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an instructor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">No Instructor (Optional)</SelectItem>
                  {instructors.map((instructor) => (
                    <SelectItem key={instructor.id} value={instructor.id}>
                      {instructor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData?.id ? "Update Course" : "Create Course"}
        </Button>
      </form>
    </Form>
  )
}
