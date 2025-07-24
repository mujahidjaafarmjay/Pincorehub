"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, UploadCloud, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FileUploadProps {
  onUploadSuccess: (url: string) => void
  onUploadError?: (error: string) => void
  folder?: string
  accept?: string
  maxFileSizeMb?: number
  label?: string
  initialFileUrl?: string
}

export default function FileUpload({
  onUploadSuccess,
  onUploadError,
  folder = "pincorehub",
  accept = "image/*,video/*",
  maxFileSizeMb = 10,
  label = "Upload File",
  initialFileUrl,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialFileUrl || null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { toast } = useToast()

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0]
      if (selectedFile) {
        if (selectedFile.size > maxFileSizeMb * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `Please select a file smaller than ${maxFileSizeMb}MB.`,
            variant: "destructive",
          })
          setFile(null)
          setPreviewUrl(null)
          return
        }
        setFile(selectedFile)
        setPreviewUrl(URL.createObjectURL(selectedFile))
      } else {
        setFile(null)
        setPreviewUrl(initialFileUrl || null)
      }
    },
    [maxFileSizeMb, initialFileUrl, toast],
  )

  const handleUpload = useCallback(async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setUploadProgress(0)

    try {
      // 1. Get Cloudinary signature
      const signatureRes = await fetch(`/api/upload?folder=${folder}`)
      if (!signatureRes.ok) {
        const errorData = await signatureRes.json()
        throw new Error(errorData.error || "Failed to get upload signature")
      }
      const { signature, timestamp, cloudname, apiKey } = await signatureRes.json()

      // 2. Prepare FormData for Cloudinary upload
      const formData = new FormData()
      formData.append("file", file)
      formData.append("api_key", apiKey)
      formData.append("signature", signature)
      formData.append("timestamp", timestamp)
      formData.append("folder", folder)

      // 3. Upload to Cloudinary
      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudname}/auto/upload`, {
        method: "POST",
        body: formData,
      })

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json()
        throw new Error(errorData.error?.message || "Cloudinary upload failed")
      }

      const uploadData = await uploadRes.json()
      const uploadedUrl = uploadData.secure_url

      onUploadSuccess(uploadedUrl)
      toast({
        title: "Upload successful",
        description: "Your file has been uploaded.",
      })
    } catch (error: any) {
      console.error("Upload error:", error)
      const errorMessage = error.message || "An unknown error occurred during upload."
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      })
      onUploadError?.(errorMessage)
    } finally {
      setIsLoading(false)
      setUploadProgress(0)
      setFile(null) // Clear file input after upload
    }
  }, [file, folder, onUploadSuccess, onUploadError, toast])

  const handleRemoveFile = useCallback(() => {
    setFile(null)
    setPreviewUrl(null)
    // Optionally, if initialFileUrl was set, revert to it
    if (initialFileUrl) {
      setPreviewUrl(initialFileUrl)
    }
  }, [initialFileUrl])

  return (
    <div className="space-y-4">
      <Label htmlFor="file-upload" className="text-gray-300">
        {label}
      </Label>
      <div className="flex items-center space-x-2">
        <Input
          id="file-upload"
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="flex-1 bg-gray-800/50 border-gray-600 text-white file:bg-orange-500 file:text-white file:border-none file:hover:bg-orange-600"
          disabled={isLoading}
        />
        <Button onClick={handleUpload} disabled={isLoading || !file} className="bg-orange-500 hover:bg-orange-600">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
            </>
          ) : (
            <>
              <UploadCloud className="mr-2 h-4 w-4" /> Upload
            </>
          )}
        </Button>
      </div>

      {previewUrl && (
        <div className="relative w-full h-48 rounded-md overflow-hidden border border-gray-700 bg-gray-800 flex items-center justify-center">
          {previewUrl.startsWith("blob:") || previewUrl.match(/\.(jpeg|jpg|gif|png|svg)$/i) ? (
            <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="object-contain h-full w-full" />
          ) : (
            <video src={previewUrl} controls className="object-contain h-full w-full" />
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-red-400 hover:text-red-500 bg-black/50 rounded-full"
            onClick={handleRemoveFile}
          >
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  )
}
