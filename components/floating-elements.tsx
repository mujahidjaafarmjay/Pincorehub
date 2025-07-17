"use client"

import { useEffect, useState } from "react"

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-orange-500/20 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Floating Shapes */}
      <div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full blur-xl animate-bounce"
        style={{ animationDuration: "6s" }}
      />
      <div
        className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-orange-500/10 rounded-full blur-xl animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="absolute top-1/2 left-1/6 w-16 h-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-bounce"
        style={{ animationDuration: "8s" }}
      />
    </div>
  )
}
