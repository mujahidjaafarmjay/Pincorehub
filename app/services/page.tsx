import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Monitor,
  Smartphone,
  Camera,
  Zap,
  Code,
  Globe,
  Palette,
  Megaphone,
  GraduationCap,
  Users,
  Bitcoin,
  Shield,
  CheckCircle,
  ArrowRight,
  Clock,
  Star,
  Award,
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const serviceCategories = [
    {
      id: "technical",
      title: "Technical Services",
      icon: <Monitor className="h-8 w-8" />,
      description: "Professional hardware repairs, installations, and technical support",
      color: "bg-orange-50 border-orange-200",
      services: [
        {
          name: "System Repairs",
          description: "Complete laptop and desktop repair services",
          features: ["Hardware Diagnostics", "Component Replacement", "Performance Optimization", "Data Recovery"],
          price: "From ₦5,000",
          duration: "1-3 days",
          icon: <Monitor className="h-6 w-6" />,
        },
        {
          name: "Phone Repairs",
          description: "Professional smartphone and tablet repair services",
          features: ["Screen Replacement", "Battery Replacement", "Water Damage Repair", "Software Issues"],
          price: "From ₦3,000",
          duration: "Same day",
          icon: <Smartphone className="h-6 w-6" />,
        },
        {
          name: "CCTV Installation",
          description: "Complete security camera system setup and monitoring",
          features: ["System Design", "Professional Installation", "Remote Monitoring", "Maintenance Support"],
          price: "From ₦50,000",
          duration: "1-2 days",
          icon: <Camera className="h-6 w-6" />,
        },
        {
          name: "Solar System Setup",
          description: "Renewable energy solutions for homes and businesses",
          features: ["System Sizing", "Equipment Supply", "Professional Installation", "Maintenance"],
          price: "From ₦200,000",
          duration: "2-5 days",
          icon: <Zap className="h-6 w-6" />,
        },
      ],
    },
    {
      id: "development",
      title: "Software Development",
      icon: <Code className="h-8 w-8" />,
      description: "Custom software solutions, websites, and mobile applications",
      color: "bg-blue-50 border-blue-200",
      services: [
        {
          name: "Website Development",
          description: "Modern, responsive websites that drive results",
          features: ["Responsive Design", "SEO Optimization", "CMS Integration", "E-commerce Ready"],
          price: "From ₦100,000",
          duration: "2-4 weeks",
          icon: <Globe className="h-6 w-6" />,
        },
        {
          name: "Mobile App Development",
          description: "Native and cross-platform mobile applications",
          features: ["iOS & Android", "Cross-platform", "API Integration", "App Store Deployment"],
          price: "From ₦300,000",
          duration: "6-12 weeks",
          icon: <Smartphone className="h-6 w-6" />,
        },
        {
          name: "AI Automation",
          description: "Intelligent automation solutions for business processes",
          features: ["Process Automation", "AI Integration", "Custom Workflows", "Analytics Dashboard"],
          price: "From ₦150,000",
          duration: "3-6 weeks",
          icon: <Code className="h-6 w-6" />,
        },
      ],
    },
    {
      id: "creative",
      title: "Creative & Digital",
      icon: <Palette className="h-8 w-8" />,
      description: "Professional design and digital marketing services",
      color: "bg-purple-50 border-purple-200",
      services: [
        {
          name: "Graphic Design",
          description: "Professional visual identity and marketing materials",
          features: ["Logo Design", "Business Cards", "Flyers & Posters", "Brand Identity"],
          price: "From ₦10,000",
          duration: "3-7 days",
          icon: <Palette className="h-6 w-6" />,
        },
        {
          name: "Digital Marketing",
          description: "Comprehensive online marketing strategies",
          features: ["Social Media Management", "SEO Services", "PPC Advertising", "Content Marketing"],
          price: "From ₦50,000/month",
          duration: "Ongoing",
          icon: <Megaphone className="h-6 w-6" />,
        },
      ],
    },
    {
      id: "training",
      title: "Training & Consultancy",
      icon: <GraduationCap className="h-8 w-8" />,
      description: "Professional development and business consultancy services",
      color: "bg-green-50 border-green-200",
      services: [
        {
          name: "ICT Skills Training",
          description: "Comprehensive computer and digital literacy programs",
          features: ["Basic Computer Skills", "Microsoft Office", "Internet & Email", "Digital Literacy"],
          price: "From ₦15,000",
          duration: "1-4 weeks",
          icon: <GraduationCap className="h-6 w-6" />,
        },
        {
          name: "Business Consultancy",
          description: "Strategic business advice and digital transformation",
          features: ["Business Strategy", "Digital Transformation", "Process Optimization", "Technology Planning"],
          price: "From ₦25,000",
          duration: "Flexible",
          icon: <Users className="h-6 w-6" />,
        },
      ],
    },
    {
      id: "crypto",
      title: "Crypto & Blockchain",
      icon: <Bitcoin className="h-8 w-8" />,
      description: "Cryptocurrency education and blockchain technology training",
      color: "bg-yellow-50 border-yellow-200",
      services: [
        {
          name: "Crypto Education",
          description: "Comprehensive cryptocurrency and blockchain training",
          features: ["Crypto Basics", "Wallet Setup", "Trading Fundamentals", "Security Best Practices"],
          price: "From ₦20,000",
          duration: "2-4 weeks",
          icon: <Bitcoin className="h-6 w-6" />,
        },
        {
          name: "Blockchain Consulting",
          description: "Strategic blockchain implementation for businesses",
          features: ["Blockchain Strategy", "Implementation Planning", "Smart Contracts", "DeFi Solutions"],
          price: "From ₦100,000",
          duration: "4-8 weeks",
          icon: <Shield className="h-6 w-6" />,
        },
      ],
    },
  ]

  const whyChooseUs = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "Expert Team",
      description: "Certified professionals with years of experience",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast Delivery",
      description: "Quick turnaround times without compromising quality",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all our services",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "5-Star Support",
      description: "Exceptional customer service and ongoing support",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-orange-500/20 text-orange-400 border border-orange-500/30">Our Services</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Complete Tech Solutions
            <span className="text-orange-500 block">For Every Need</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            From hardware repairs to AI automation, we provide comprehensive technology services that help you succeed
            in the digital world. Professional, reliable, and affordable.
          </p>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
            Get Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-12 bg-gray-800 border-gray-700">
              {serviceCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex flex-col items-center p-4 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  <div className="mb-2">{category.icon}</div>
                  <span className="text-xs font-medium">{category.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {serviceCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">{category.title}</h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">{category.description}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.services.map((service, index) => (
                    <Card
                      key={index}
                      className={`bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 glow-orange ${category.color} hover:shadow-lg transition-all duration-300`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-white rounded-lg shadow-sm">{service.icon}</div>
                          <Badge variant="secondary" className="bg-white">
                            {service.duration}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl text-white">{service.name}</CardTitle>
                        <CardDescription className="text-gray-300">{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mb-6">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-300">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-bold text-white">{service.price}</span>
                          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                            Get Quote
                          </Button>
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

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Why Choose PINCOREHUB?</h2>
            <p className="text-xl text-gray-300">We deliver exceptional results with unmatched service quality</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                    <div className="text-orange-600">{item.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-xl text-gray-300">Simple steps to get your project started</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", description: "We discuss your needs and requirements" },
              { step: "02", title: "Planning", description: "We create a detailed project plan and timeline" },
              { step: "03", title: "Execution", description: "Our experts work on delivering your solution" },
              { step: "04", title: "Support", description: "Ongoing support and maintenance as needed" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss your project and find the perfect solution for your needs. Get a free consultation today.
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
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
