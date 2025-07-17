"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, MapPin, MessageCircle } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900/90 backdrop-blur-md border-b border-gray-800 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center hover:text-orange-400 transition-colors">
              <Phone className="h-4 w-4 mr-2" />
              <span>+234 903 437 6039</span>
            </div>
            <div className="hidden md:flex items-center hover:text-orange-400 transition-colors">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Lagos, Nigeria</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span>Mon-Sat: 8:00 AM - 6:00 PM</span>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:text-orange-500 p-1 hover:scale-110 transition-all"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`glass sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-gray-900/95 backdrop-blur-md shadow-lg" : "bg-gray-900/95 backdrop-blur-md"
        } border-b border-gray-800`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                <div className="w-6 h-6 flex items-center justify-center font-bold">P</div>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                PINCORE<span className="text-orange-500">HUB</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-orange-400 font-medium transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent hover:scale-105 transition-all"
              >
                Get Quote
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg glow-orange hover:scale-105 transition-all btn-animate"
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-gray-900 border-gray-800">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-300 hover:text-orange-400 font-medium py-2 hover:translate-x-2 transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t space-y-2">
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                    >
                      Get Quote
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg glow-orange">
                      Book Now
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}
