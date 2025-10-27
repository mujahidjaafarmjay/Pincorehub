import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ExternalLink,
  Calendar,
  User,
  ArrowRight,
  Monitor,
  Palette,
  Code,
  Camera,
  Zap,
  Star,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform for Fashion Brand",
      category: "development",
      client: "StyleHub Nigeria",
      description: "Complete e-commerce solution with inventory management, payment integration, and mobile app.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      results: ["300% increase in online sales", "50% reduction in cart abandonment", "Mobile-first design"],
      duration: "8 weeks",
      year: "2024",
      testimonial: "pincohub transformed our business with their exceptional e-commerce platform.",
      rating: 5,
    },
    {
      id: 2,
      title: "Corporate Website Redesign",
      category: "development",
      client: "TechCorp Solutions",
      description: "Modern, responsive website with CMS integration and SEO optimization.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Next.js", "Tailwind CSS", "Strapi", "Vercel"],
      results: ["200% increase in organic traffic", "Improved user engagement", "Mobile optimization"],
      duration: "4 weeks",
      year: "2024",
      testimonial: "Professional service and outstanding results. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      title: "Restaurant Management System",
      category: "development",
      client: "Delicious Bites",
      description: "Complete POS system with inventory tracking, staff management, and analytics.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Vue.js", "Laravel", "MySQL", "PWA"],
      results: ["40% faster order processing", "Real-time inventory tracking", "Staff productivity boost"],
      duration: "6 weeks",
      year: "2023",
      testimonial: "The system has revolutionized how we manage our restaurant operations.",
      rating: 5,
    },
    {
      id: 4,
      title: "Brand Identity Package",
      category: "creative",
      client: "GreenTech Innovations",
      description: "Complete brand identity including logo, business cards, letterheads, and brand guidelines.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Adobe Illustrator", "Photoshop", "InDesign"],
      results: ["Cohesive brand identity", "Professional marketing materials", "Brand recognition increase"],
      duration: "2 weeks",
      year: "2024",
      testimonial: "Amazing creative work that perfectly captured our brand vision.",
      rating: 5,
    },
    {
      id: 5,
      title: "Digital Marketing Campaign",
      category: "creative",
      client: "FitLife Gym",
      description: "Comprehensive social media marketing campaign with content creation and ad management.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Facebook Ads", "Instagram", "Google Ads", "Analytics"],
      results: ["150% increase in membership", "Higher engagement rates", "Brand awareness growth"],
      duration: "3 months",
      year: "2024",
      testimonial: "Our membership doubled thanks to their excellent marketing strategies.",
      rating: 5,
    },
    {
      id: 6,
      title: "Office Network Setup",
      category: "technical",
      client: "Legal Associates",
      description: "Complete office network infrastructure with security systems and backup solutions.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Cisco Equipment", "Windows Server", "Firewall", "Backup Systems"],
      results: ["Improved network security", "Faster data access", "Reliable backup system"],
      duration: "1 week",
      year: "2024",
      testimonial: "Professional installation and excellent ongoing support.",
      rating: 5,
    },
    {
      id: 7,
      title: "CCTV Security System",
      category: "technical",
      client: "Retail Store Chain",
      description: "Multi-location CCTV system with remote monitoring and mobile app access.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["IP Cameras", "NVR Systems", "Mobile App", "Cloud Storage"],
      results: ["Enhanced security coverage", "Remote monitoring capability", "Incident reduction"],
      duration: "2 weeks",
      year: "2023",
      testimonial: "Excellent security solution that gives us peace of mind.",
      rating: 5,
    },
    {
      id: 8,
      title: "ICT Training Program",
      category: "training",
      client: "Community Development Center",
      description: "Comprehensive ICT training program for 50+ participants covering basic to advanced skills.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Microsoft Office", "Internet Skills", "Digital Literacy", "Certification"],
      results: ["50+ certified participants", "Improved digital skills", "Employment opportunities"],
      duration: "6 weeks",
      year: "2024",
      testimonial: "Transformative training that opened new opportunities for our community.",
      rating: 5,
    },
  ]

  const categories = [
    { id: "all", name: "All Projects", icon: <Monitor className="h-4 w-4" /> },
    { id: "development", name: "Development", icon: <Code className="h-4 w-4" /> },
    { id: "creative", name: "Creative", icon: <Palette className="h-4 w-4" /> },
    { id: "technical", name: "Technical", icon: <Camera className="h-4 w-4" /> },
    { id: "training", name: "Training", icon: <User className="h-4 w-4" /> },
  ]

  const stats = [
    { number: "100+", label: "Projects Completed" },
    { number: "500+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "99%", label: "Client Satisfaction" },
  ]

  const filteredProjects = (category: string) => {
    return category === "all" ? projects : projects.filter((project) => project.category === category)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800">Our Portfolio</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Showcasing Our
            <span className="text-orange-500 block">Success Stories</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Explore our portfolio of successful projects across various industries. From startups to enterprises, we've
            helped businesses achieve their digital goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600" asChild>
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-black text-white hover:bg-black hover:text-white bg-transparent"
            >
              View Services
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-orange-500 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-12">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects(category.id).map((project) => (
                    <Card
                      key={project.id}
                      className="group hover:shadow-xl transition-all duration-300 border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 glow-orange"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                        <Button
                          size="sm"
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-orange-500 hover:bg-orange-600"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                            {project.category}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {project.year}
                          </div>
                        </div>
                        <CardTitle className="text-lg text-white group-hover:text-orange-600 transition-colors">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Client:</p>
                            <p className="text-sm text-gray-600">{project.client}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Technologies:</p>
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.map((tech, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Key Results:</p>
                            <ul className="space-y-1">
                              {project.results.slice(0, 2).map((result, index) => (
                                <li key={index} className="flex items-center text-xs text-gray-600">
                                  <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="pt-4 border-t">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {[...Array(project.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-orange-600 border-orange-600 bg-transparent"
                              >
                                View Details
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500 italic mt-2">"{project.testimonial}"</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Project Process</h2>
            <p className="text-xl text-gray-600">How we deliver exceptional results for every project</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We understand your goals, requirements, and target audience",
                icon: <User className="h-6 w-6" />,
              },
              {
                step: "02",
                title: "Strategy",
                description: "We develop a comprehensive plan and timeline for your project",
                icon: <Monitor className="h-6 w-6" />,
              },
              {
                step: "03",
                title: "Development",
                description: "Our expert team brings your vision to life with precision",
                icon: <Code className="h-6 w-6" />,
              },
              {
                step: "04",
                title: "Launch & Support",
                description: "We deploy your solution and provide ongoing support",
                icon: <Zap className="h-6 w-6" />,
              },
            ].map((item, index) => (
              <Card key={index} className="text-center border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                    <div className="text-orange-600">{item.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Create Your Success Story?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join our portfolio of successful projects. Let's work together to bring your vision to life and achieve
            exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-500 bg-transparent"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
