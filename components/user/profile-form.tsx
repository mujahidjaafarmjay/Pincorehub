"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FileUpload } from "@/components/shared/file-upload"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"

const profileSchema = z.object({
  name: z.string().min(2, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  imageUrl: z.string().url("Invalid image URL").optional().nullable(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function ProfileForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      imageUrl: "",
    },
  })

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoadingData(true);

      const headers = {
        'Authorization': `Bearer ${session?.accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      try {
        const response = await fetch("http://localhost:8000/api/user", { headers });
        if (response.ok) {
          const data = await response.json();
          form.reset(data); // Populate form with fetched data
        } else {
          toast({
            title: "Error",
            description: "Failed to load profile data.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred while fetching profile.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchProfile();
  }, [form, toast]);

  const onSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true);

    const headers = {
      'Authorization': `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    try {
      const response = await fetch(`http://localhost:8000/api/user/${form.getValues('id')}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(values),
      });

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        })
        // Optionally refresh session or re-fetch user data if needed
      } else {
        toast({
          title: "Update Failed",
          description: data.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Profile update error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading profile...</span>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={form.watch("imageUrl") || "/placeholder-user.jpg"} alt="User Avatar" />
            <AvatarFallback>{form.watch("name")?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileUpload
                    value={field.value || ""}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    folder="profile_images"
                    className="w-full max-w-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} disabled />{" "}
                {/* Email usually not editable */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+234 801 234 5678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="123 Main St, City, State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Update Profile"
          )}
        </Button>
      </form>
    </Form>
  )
}
