"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle, Globe, Users, Headphones } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", phone: "", service: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "Speak directly with our tech experts",
      contact: "+234 903 437 6039",
      action: "Call Now",
      available: "Mon-Sat: 8AM-6PM",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "WhatsApp Chat",
      description: "Quick support via WhatsApp",
      contact: "+234 903 437 6039",
      action: "Chat Now",
      available: "24/7 Response",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Detailed inquiries and documentation",
      contact: "info@pincorehub.com.ng",
      action: "Send Email",
      available: "24-48hr Response",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Our Shop",
      description: "Face-to-face consultation and repairs",
      contact: "Lagos, Nigeria",
      action: "Get Directions",
      available: "Walk-ins Welcome",
    },
  ]

  const services = [
    "Technical Services",
    "Software Development",
    "Creative & Digital",
    "Training & Consultancy",
    "Crypto & Blockchain",
    "General Inquiry",
  ]

  const features = [
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Global Reach",
      description: "Serving clients worldwide",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Expert Team",
      description: "Certified professionals",
    },
    {
      icon: <Headphones className="h-5 w-5" />,
      title: "24/7 Support",
      description: "Always here to help",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800">Get In Touch</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Let's Discuss Your
            <span className="text-orange-500 block">Tech Needs</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Whether you need immediate support or want to plan your next digital project, our team is ready to help.
            Choose your preferred way to connect with us.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Multiple Ways to Reach Us</h2>
            <p className="text-xl text-gray-600">Choose the method that works best for you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 glow-orange text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                    <div className="text-orange-600">{method.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                  <p className="font-medium text-white mb-2">{method.contact}</p>
                  <p className="text-xs text-gray-500 mb-4">{method.available}</p>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 w-full">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Send Us a Message</CardTitle>
                <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-gray-800/50 border-gray-600 text-white focus:border-orange-500"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-gray-800/50 border-gray-600 text-white focus:border-orange-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-gray-800/50 border-gray-600 text-white focus:border-orange-500"
                          placeholder="+234 xxx xxx xxxx"
                        />
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                          Service Needed *
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 bg-gray-800/50 border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:border-orange-500"
                        >
                          <option value="">Select a service</option>
                          {services.map((service, index) => (
                            <option key={index} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="bg-gray-800/50 border-gray-600 text-white focus:border-orange-500"
                        placeholder="Tell us about your project or what you need help with..."
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 hover:bg-orange-600">
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 glow-orange">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-orange-500 mr-3" />
                      <div>
                        <p className="font-medium text-white">Physical Location</p>
                        <p className="text-gray-600 text-sm">Lagos, Nigeria (Multiple Locations)</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-orange-500 mr-3" />
                      <div>
                        <p className="font-medium text-white">Phone & WhatsApp</p>
                        <p className="text-gray-600 text-sm">+234 903 437 6039</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-orange-500 mr-3" />
                      <div>
                        <p className="font-medium text-white">Email Address</p>
                        <p className="text-gray-600 text-sm">info@pincorehub.com.ng</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-orange-500 mr-3" />
                      <div>
                        <p className="font-medium text-white">Business Hours</p>
                        <p className="text-gray-600 text-sm">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 glow-orange">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">Why Choose pincohub?</h3>
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg mr-3">
                          <div className="text-orange-600">{feature.icon}</div>
                        </div>
                        <div>
                          <p className="font-medium text-white">{feature.title}</p>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Emergency Support</h3>
                  <p className="text-gray-300 mb-4">
                    Need urgent technical assistance? Our emergency support team is available for critical issues.
                  </p>
                  <Button className="bg-orange-500 hover:bg-orange-600 w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    Emergency Hotline
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
