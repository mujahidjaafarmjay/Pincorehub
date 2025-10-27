import { XCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Payment Failed",
  description: "Your payment could not be processed. Please try again.",
}

export default function PaymentFailurePage() {
  return (
    <div className="flex min-h-[calc(100vh-64px-64px)] items-center justify-center py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <XCircle className="mx-auto h-16 w-16 text-red-500" />
          <CardTitle className="mt-4 text-2xl font-bold">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Unfortunately, your payment could not be processed. Please check your payment details or try again with a
            different method.
          </p>
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/courses">Try Again</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
