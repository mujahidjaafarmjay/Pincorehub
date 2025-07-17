import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Eye, Award, Globe, Shield, Zap, Heart, ArrowRight, CheckCircle } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Integrity",
      description: "We maintain the highest standards of honesty and transparency in all our dealings.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Innovation",
      description: "We embrace cutting-edge technology to deliver forward-thinking solutions.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Customer-Centric",
      description: "Your success is our priority. We go above and beyond to exceed expectations.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Reach",
      description: "Local expertise with international standards and global connectivity.",
    },
  ]

  const team = [
    {
      name: "Adebayo Ogundimu",
      role: "Founder & CEO",
      description: "Tech entrepreneur with 10+ years experience in digital solutions and business development.",
      expertise: ["Business Strategy", "Tech Leadership", "Digital Transformation"],
    },
    {
      name: "Fatima Hassan",
      role: "Head of Development",
      description: "Full-stack developer specializing in modern web technologies and AI automation.",
      expertise: ["Web Development", "Mobile Apps", "AI Integration"],
    },
    {
      name: "Chinedu Okoro",
      role: "Technical Services Manager",
      description: "Hardware specialist with extensive experience in device repairs and installations.",
      expertise: ["Hardware Repair", "CCTV Systems", "Solar Installation"],
    },
    {
      name: "Aisha Abdullahi",
      role: "Training & Education Lead",
      description: "Certified trainer in ICT skills, digital marketing, and cryptocurrency education.",
      expertise: ["ICT Training", "Digital Marketing", "Crypto Education"],
    },
  ]

  const achievements = [
    { number: "500+", label: "Happy Customers" },
    { number: "1000+", label: "Devices Repaired" },
    { number: "100+", label: "Projects Completed" },
    { number: "50+", label: "Training Sessions" },
    { number: "24/7", label: "Support Available" },
    { number: "5+", label: "Years Experience" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800">About PINCOREHUB</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Empowering Digital Transformation
            <span className="text-orange-500 block">Across Nigeria & Beyond</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            We are a comprehensive tech solutions provider bridging the gap between traditional services and modern
            digital innovation. Our integrated approach combines physical expertise with online scalability.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Mission */}
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-lg mb-6">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed">
                  To democratize technology access by providing comprehensive, affordable, and innovative tech solutions
                  that empower individuals and businesses to thrive in the digital age.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-lg mb-6">
                  <Eye className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-gray-400 leading-relaxed">
                  To become Africa's leading integrated tech solutions provider, known for excellence, innovation, and
                  transformative impact on communities and businesses.
                </p>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-lg mb-6">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Values</h3>
                <p className="text-gray-400 leading-relaxed">
                  Integrity, innovation, customer-centricity, and global thinking guide everything we do. We believe in
                  building lasting relationships through exceptional service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Details */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">What Drives Us</h2>
            <p className="text-xl text-gray-400">The core values that shape our culture and guide our decisions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                  <div className="text-orange-600">{value.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-400">
              Passionate professionals dedicated to delivering exceptional tech solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-shadow">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white text-center mb-1">{member.name}</h3>
                  <p className="text-orange-600 text-center text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-4 text-center">{member.description}</p>
                  <div className="space-y-1">
                    {member.expertise.map((skill, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-500">
                        <CheckCircle className="h-3 w-3 text-orange-500 mr-2 flex-shrink-0" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-300">Numbers that reflect our commitment to excellence</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-orange-500 mb-2">{achievement.number}</div>
                <div className="text-gray-300 text-sm">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join hundreds of satisfied customers who trust PINCOREHUB for their tech needs. Let's build something
            amazing together.
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
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
