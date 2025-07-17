import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Smartphone,
  Monitor,
  Camera,
  Code,
  Palette,
  GraduationCap,
  Bitcoin,
  MapPin,
  Clock,
  Phone,
  Mail,
  Star,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Zap,
  Shield,
  Globe,
  Cpu,
  BookOpen,
  Play,
} from "lucide-react"
import Link from "next/link"
import FAQSection from "@/components/faq-section"
import EnhancedHero from "@/components/enhanced-hero"

export default function HomePage() {
  const services = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Technical Services",
      description: "Professional device repairs, installations, and technical support",
      services: ["System Repairs", "Phone Repairs", "CCTV Installation", "Solar Setup"],
      href: "/services/technical",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Software Development",
      description: "Custom websites, mobile apps, and AI automation solutions",
      services: ["Website Design", "Mobile Apps", "AI Tools", "Automation"],
      href: "/services/development",
      color: "bg-gray-100 text-gray-700",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Creative & Digital",
      description: "Professional graphic design and digital marketing solutions",
      services: ["Logo Design", "Business Cards", "Social Media", "SEO/PPC"],
      href: "/services/creative",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Training & Consultancy",
      description: "ICT skills training and professional business consultancy",
      services: ["Microsoft Office", "Canva Training", "AI Tools", "Business Advisory"],
      href: "/services/training",
      color: "bg-gray-100 text-gray-700",
    },
    {
      icon: <Bitcoin className="h-8 w-8" />,
      title: "Crypto & Blockchain",
      description: "Comprehensive cryptocurrency education and blockchain training",
      services: ["Crypto Basics", "Wallet Setup", "Trading", "Blockchain Tech"],
      href: "/services/crypto",
      color: "bg-orange-50 text-orange-600",
    },
  ]

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "500+", label: "Happy Customers" },
    { icon: <CheckCircle className="h-6 w-6" />, value: "1000+", label: "Devices Repaired" },
    { icon: <Award className="h-6 w-6" />, value: "100+", label: "Projects Completed" },
    { icon: <Zap className="h-6 w-6" />, value: "24/7", label: "Online Support" },
  ]

  const testimonials = [
    {
      name: "Adebayo Johnson",
      role: "Small Business Owner",
      content:
        "PINCOREHUB designed our company website and set up our social media presence. Their integrated approach saved us both time and money. Highly recommended!",
      rating: 5,
      location: "Kano, Nigeria",
    },
    {
      name: "Fatima Abdullahi",
      role: "IT Manager",
      content:
        "Fast laptop repair service with excellent customer support. They also trained our team on new software. Professional service from start to finish.",
      rating: 5,
      location: "Abuja, Nigeria",
    },
    {
      name: "Chinedu Okafor",
      role: "Entrepreneur",
      content:
        "The cryptocurrency training course was comprehensive and practical. Now I confidently manage my digital assets. Worth every penny!",
      rating: 5,
      location: "Port Harcourt, Nigeria",
    },
  ]

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security for all our services",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Reach",
      description: "Serving clients worldwide with local expertise",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Latest Technology",
      description: "Cutting-edge tools and modern solutions",
    },
  ]

  const featuredCourses = [
    {
      title: "Complete Web Development Bootcamp",
      description: "Master modern web development with React, Node.js, and MongoDB",
      duration: "42 hours",
      students: 2847,
      rating: 4.9,
      price: 89000,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Digital Marketing Mastery",
      description: "Learn SEO, social media marketing, and grow your business online",
      duration: "24 hours",
      students: 1567,
      rating: 4.6,
      price: 45000,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Cryptocurrency Trading Course",
      description: "Learn crypto fundamentals, trading strategies, and blockchain technology",
      duration: "18 hours",
      students: 892,
      rating: 4.5,
      price: 75000,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedHero />

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500 rounded-lg mb-4 group-hover:scale-110 transition-transform glow-orange">
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 animate-fade-in-up">
              Our Complete Service Portfolio
            </h2>
            <p
              className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Whether you need immediate hands-on support or scalable digital solutions, we provide integrated services
              that grow with your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${service.color} rounded-lg mb-4 hover:scale-110 transition-transform`}
                  >
                    <div>{service.icon}</div>
                  </div>
                  <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                  <CardDescription className="text-gray-400">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.services.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-400">
                        <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white bg-transparent btn-animate"
                    asChild
                  >
                    <Link href={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-400 mb-8">Master new skills with our expert-led courses</p>
            <Button className="bg-orange-500 hover:bg-orange-600 glow-orange" asChild>
              <Link href="/courses">
                <BookOpen className="mr-2 h-5 w-5" />
                View All Courses
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group card-hover"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  <Button
                    size="sm"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-md hover:bg-white/30"
                  >
                    <Play className="h-5 w-5" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg text-white group-hover:text-orange-400 transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">₦{course.price.toLocaleString()}</span>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-orange-600">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physical Location Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Visit Our Physical Shop</h2>
              <p className="text-lg text-gray-400 mb-8">
                Get immediate hands-on support at our fully equipped tech center. From device repairs to face-to-face
                consultations, we're here to help you succeed.
              </p>

              <div className="space-y-4">
                <div className="flex items-center group">
                  <MapPin className="h-5 w-5 text-orange-500 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-300">Lagos, Nigeria (Multiple Locations)</span>
                </div>
                <div className="flex items-center group">
                  <Clock className="h-5 w-5 text-orange-500 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-300">Mon-Sat: 8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center group">
                  <Phone className="h-5 w-5 text-orange-500 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-300">+234 903 437 6039</span>
                </div>
                <div className="flex items-center group">
                  <Mail className="h-5 w-5 text-orange-500 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-300">info@pincorehub.com.ng</span>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 btn-animate">
                  Get Directions
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black bg-transparent btn-animate"
                >
                  WhatsApp Us
                </Button>
              </div>
            </div>

            <div className="bg-gray-800/50 border-gray-700 rounded-2xl p-8 shadow-lg border animate-slide-in-right">
              <h3 className="text-xl font-semibold mb-6 text-white">Shop Services</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col items-center p-4 bg-orange-500/10 border-orange-500/20 rounded-lg border hover:scale-105 transition-transform cursor-pointer">
                  <Smartphone className="h-6 w-6 text-orange-600 mb-2" />
                  <span className="text-sm font-medium text-gray-300">Phone Repairs</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-800/50 border-gray-700 rounded-lg border hover:scale-105 transition-transform cursor-pointer">
                  <Monitor className="h-6 w-6 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-300">System Repairs</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-orange-500/10 border-orange-500/20 rounded-lg border hover:scale-105 transition-transform cursor-pointer">
                  <Camera className="h-6 w-6 text-orange-600 mb-2" />
                  <span className="text-sm font-medium text-gray-300">CCTV Install</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-800/50 border-gray-700 rounded-lg border hover:scale-105 transition-transform cursor-pointer">
                  <GraduationCap className="h-6 w-6 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-300">Training</span>
                </div>
              </div>
              <p className="text-gray-400 text-center">Walk-ins welcome or book an appointment online</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-400">Real feedback from real customers who trust PINCOREHUB</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-orange-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-400 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-xs text-orange-600 mt-1">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Transform Your Tech Experience?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether you need immediate repair services or want to build the next big digital solution, we're here to
            help you succeed in the digital age.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 btn-animate">
              Book a Service Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent btn-animate"
            >
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
