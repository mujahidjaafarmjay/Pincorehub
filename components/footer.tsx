import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react"

export default function Footer() {
  const services = [
    "System Repairs",
    "Phone Repairs",
    "Website Development",
    "Mobile Apps",
    "Graphic Design",
    "Digital Marketing",
    "ICT Training",
    "Crypto Education",
  ]

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Book Appointment", href: "/book" },
  ]

  const resources = [
    { name: "Tech Tutorials", href: "/blog/tutorials" },
    { name: "Crypto Guides", href: "/blog/crypto" },
    { name: "Business Tips", href: "/blog/business" },
    { name: "Downloads", href: "/resources" },
    { name: "FAQ", href: "/faq" },
    { name: "Support", href: "/support" },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black border-t border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg p-2 rounded-lg mr-3">
                <div className="w-6 h-6 flex items-center justify-center font-bold">P</div>
              </div>
              <span className="text-xl font-bold">
                PINCORE<span className="text-orange-500">HUB</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6">
              Your complete tech partner providing integrated digital and physical solutions for individuals and
              businesses across Nigeria and beyond.
            </p>
            <div className="flex space-x-4">
              <Button
                size="sm"
                variant="ghost"
                className="p-2 hover:bg-gray-800 hover:text-orange-400 glow-orange text-gray-300"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="p-2 hover:bg-gray-800 hover:text-orange-400 glow-orange text-gray-300"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="p-2 hover:bg-gray-800 hover:text-orange-400 glow-orange text-gray-300"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="p-2 hover:bg-gray-800 hover:text-orange-400 glow-orange text-gray-300"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href="/services" className="text-gray-300 hover:text-orange-400 transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-orange-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get In Touch</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Lagos, Nigeria</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+234 903 437 6039</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@pincorehub.com.ng</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Mon-Sat: 8AM-6PM</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">WhatsApp Support</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Newsletter</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Your email"
                  className="bg-gray-800/50 border-gray-600 focus:border-orange-500 text-white placeholder:text-gray-400"
                />
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 glow-orange"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">© 2024 PINCOREHUB. All rights reserved. | Business Company</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-300 hover:text-orange-400 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-orange-400 text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-300 hover:text-orange-400 text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
