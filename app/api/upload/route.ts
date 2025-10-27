import { NextResponse } from "next/server"
import { getCloudinarySignature } from "@/lib/cloudinary"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get("folder") || "pincorehub"

    const { timestamp, signature } = await getCloudinarySignature(folder)

    return NextResponse.json({
      signature,
      timestamp,
      cloudname: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    })
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error)
    return NextResponse.json({ error: "Failed to generate upload signature" }, { status: 500 })
  }
}
