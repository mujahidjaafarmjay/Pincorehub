"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { User, Phone, Mail, MapPin, CheckCircle, ArrowRight } from "lucide-react"

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    location: "",
    message: "",
  })

  const services = [
    {
      id: "technical",
      name: "Technical Services",
      description: "Device repairs, installations, and technical support",
      duration: "1-2 hours",
      price: "From ₦5,000",
      available: "Mon-Sat",
    },
    {
      id: "development",
      name: "Software Development",
      description: "Website, mobile app, and software consultation",
      duration: "1 hour",
      price: "Free consultation",
      available: "Mon-Fri",
    },
    {
      id: "creative",
      name: "Creative & Digital",
      description: "Design and digital marketing consultation",
      duration: "45 minutes",
      price: "Free consultation",
      available: "Mon-Fri",
    },
    {
      id: "training",
      name: "Training & Consultancy",
      description: "ICT training and business consultancy",
      duration: "1-2 hours",
      price: "From ₦15,000",
      available: "Mon-Sat",
    },
    {
      id: "crypto",
      name: "Crypto & Blockchain",
      description: "Cryptocurrency education and consultation",
      duration: "1 hour",
      price: "From ₦20,000",
      available: "Mon-Fri",
    },
  ]

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"]

  const locations = [
    { id: "shop", name: "Visit Our Shop", address: "Lagos, Nigeria", icon: <MapPin className="h-5 w-5" /> },
    {
      id: "online",
      name: "Online Meeting",
      address: "Video call via Zoom/Google Meet",
      icon: <Phone className="h-5 w-5" />,
    },
    { id: "onsite", name: "On-site Visit", address: "We come to your location", icon: <User className="h-5 w-5" /> },
  ]

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setFormData({ ...formData, service: serviceId })
    setStep(2)
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setFormData({ ...formData, date })
    setStep(3)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setFormData({ ...formData, time })
    setStep(4)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setStep(5)
  }

  const generateDateOptions = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        full: date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      })
    }
    return dates
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800">Book Appointment</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Schedule Your
            <span className="text-orange-500 block">Tech Consultation</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Book a consultation with our experts. Whether you need technical support, want to discuss a project, or
            require training, we're here to help.
          </p>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-12">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                </div>
                {stepNumber < 5 && (
                  <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-orange-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Choose Your Service</CardTitle>
                <CardDescription>Select the service you need assistance with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <Card
                      key={service.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 bg-gray-800/50 border-gray-700 ${
                        selectedService === service.id
                          ? "border-orange-500 bg-orange-500/20 shadow-orange-500/50 glow-orange"
                          : "border-gray-700"
                      }`}
                      onClick={() => handleServiceSelect(service.id)}
                    >
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Duration:</span>
                            <span className="font-medium">{service.duration}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Price:</span>
                            <span className="font-medium text-orange-600">{service.price}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Available:</span>
                            <span className="font-medium">{service.available}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Date Selection */}
          {step === 2 && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Select Date</CardTitle>
                <CardDescription>Choose your preferred appointment date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {generateDateOptions().map((date) => (
                    <Card
                      key={date.value}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 bg-gray-800/50 border-gray-700 ${
                        selectedDate === date.value
                          ? "border-orange-500 bg-orange-500/20 shadow-orange-500/50 glow-orange"
                          : "border-gray-700"
                      }`}
                      onClick={() => handleDateSelect(date.value)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-sm font-medium text-white">{date.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setStep(1)} className="bg-transparent">
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Time Selection */}
          {step === 3 && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Select Time</CardTitle>
                <CardDescription>Choose your preferred appointment time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {timeSlots.map((time) => (
                    <Card
                      key={time}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 bg-gray-800/50 border-gray-700 ${
                        selectedTime === time
                          ? "border-orange-500 bg-orange-500/20 shadow-orange-500/50 glow-orange"
                          : "border-gray-700"
                      }`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-sm font-medium text-white">{time}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setStep(2)} className="bg-transparent">
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Contact Details & Location */}
          {step === 4 && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Contact Details</CardTitle>
                <CardDescription>Provide your information and preferred meeting location</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-gray-800/50 border-gray-600 text-white focus:border-orange-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="bg-gray-800/50 border-gray-600 text-white focus:border-orange-500"
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Preferred Meeting Location *</label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {locations.map((location) => (
                        <Card
                          key={location.id}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 bg-gray-800/50 border-gray-700 ${
                            formData.location === location.id
                              ? "border-orange-500 bg-orange-500/20 shadow-orange-500/50 glow-orange"
                              : "border-gray-700"
                          }`}
                          onClick={() => setFormData({ ...formData, location: location.id })}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="flex justify-center mb-2">{location.icon}</div>
                            <h3 className="font-medium text-white mb-1">{location.name}</h3>
                            <p className="text-xs text-gray-500">{location.address}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="bg-gray-800/50 border-gray-600 text-white focus:border-orange-500"
                      placeholder="Tell us more about what you need help with..."
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(3)} className="bg-transparent">
                      Back
                    </Button>
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                      Confirm Booking
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for booking with pincohub. We've sent a confirmation email with all the details.
                </p>

                <div className="bg-gray-700 rounded-lg p-6 mb-6 text-left">
                  <h3 className="font-semibold text-white mb-4">Appointment Details:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">{services.find((s) => s.id === formData.service)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{formData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{formData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{locations.find((l) => l.id === formData.location)?.name}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    We'll contact you 24 hours before your appointment to confirm. If you need to reschedule, please
                    call us at +234 903 437 6039.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-orange-500 hover:bg-orange-600">Add to Calendar</Button>
                    <Button variant="outline" className="bg-transparent">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-black mb-6">Need Help with Booking?</h2>
          <p className="text-gray-600 mb-8">
            Our team is here to assist you. Contact us directly for immediate support.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-black mb-2">Call Us</h3>
              <p className="text-gray-600">+234 903 437 6039</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-black mb-2">Email Us</h3>
              <p className="text-gray-600">info@pincorehub.com.ng</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-black mb-2">Visit Us</h3>
              <p className="text-gray-600">Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
