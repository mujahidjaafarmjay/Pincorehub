import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Payment Successful",
  description: "Your payment was successful. Thank you for your purchase!",
}

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px-64px)] items-center justify-center py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <CardTitle className="mt-4 text-2xl font-bold">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Thank you for your purchase. Your transaction was completed successfully. You should receive a confirmation
            email shortly.
          </p>
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/courses">Explore More Courses</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
