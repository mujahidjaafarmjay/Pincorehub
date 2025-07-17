"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Sparkles } from "lucide-react"

export default function EnhancedHero() {
  const [currentText, setCurrentText] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const heroTexts = ["Tech Solutions", "Digital Innovation", "Smart Automation", "Future Technology"]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-purple-500/10 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            <Badge className="mb-4 bg-orange-500/20 text-orange-400 border border-orange-500/30 animate-pulse">
              <Sparkles className="w-4 h-4 mr-2" />
              Your Complete Tech Partner
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Online & Offline
              <span className="text-orange-500 block gradient-text transition-all duration-500">
                {heroTexts[currentText]}
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              From device repairs to AI automation, we help individuals and businesses thrive in the digital age. Visit
              our shop or get online support - we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 glow-orange group">
                Book a Service
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
          >
            <div className="glass rounded-2xl shadow-2xl p-8 glow-orange hover:scale-105 transition-transform duration-300">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "💻", label: "Device Repairs", color: "orange" },
                  { icon: "🌐", label: "Web Development", color: "gray" },
                  { icon: "🎓", label: "Training", color: "orange" },
                  { icon: "₿", label: "Crypto Education", color: "gray" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`${item.color === "orange" ? "bg-orange-500/10 border-orange-500/20" : "bg-gray-800/50 border-gray-700"} rounded-lg p-4 text-center border hover:scale-105 transition-all duration-300 cursor-pointer`}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-sm font-medium text-gray-300">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
