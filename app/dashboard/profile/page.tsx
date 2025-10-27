import ProfileForm from "@/components/user/profile-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export const metadata = {
  title: "User Profile",
  description: "Manage your pincohub user profile.",
}

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.id) {
    redirect("/auth/signin?callbackUrl=/dashboard/profile")
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Your Profile</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
