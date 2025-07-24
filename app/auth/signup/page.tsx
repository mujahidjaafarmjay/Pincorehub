import SignupForm from "@/components/auth/signup-form"

export const metadata = {
  title: "Sign Up",
  description: "Create an account on PINCOREHUB to access courses and services.",
}

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px-64px)] items-center justify-center py-12">
      <SignupForm />
    </div>
  )
}
