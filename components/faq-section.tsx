"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    question: "What types of devices do you repair?",
    answer:
      "We repair laptops, desktops, smartphones, tablets, printers, and other electronic devices. Our technicians are experienced with all major brands including HP, Dell, Apple, Samsung, and more.",
    category: "Technical Services",
  },
  {
    question: "How long does a typical repair take?",
    answer:
      "Repair times vary depending on the issue and parts availability. Simple repairs like screen replacements can be done same-day, while complex motherboard repairs may take 3-5 business days. We always provide estimated timeframes upfront.",
    category: "Technical Services",
  },
  {
    question: "Do you offer warranties on repairs?",
    answer:
      "Yes, we provide a 30-day warranty on all repair services and a 90-day warranty on replacement parts. This covers any issues related to the specific repair performed.",
    category: "Technical Services",
  },
  {
    question: "What's included in your website development service?",
    answer:
      "Our website development includes responsive design, SEO optimization, content management system, contact forms, social media integration, and basic analytics setup. We also provide training on how to manage your website.",
    category: "Development",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Website costs vary based on complexity and features. Basic business websites start from ₦100,000, while e-commerce sites start from ₦300,000. We provide detailed quotes after understanding your specific requirements.",
    category: "Development",
  },
  {
    question: "Do you provide ongoing website maintenance?",
    answer:
      "Yes, we offer monthly maintenance packages that include security updates, content updates, backup services, and technical support. Packages start from ₦15,000 per month.",
    category: "Development",
  },
  {
    question: "What digital marketing services do you offer?",
    answer:
      "We provide social media management, search engine optimization (SEO), pay-per-click advertising (PPC), content creation, email marketing, and digital strategy consulting.",
    category: "Marketing",
  },
  {
    question: "How do you measure marketing success?",
    answer:
      "We track key performance indicators (KPIs) such as website traffic, conversion rates, social media engagement, lead generation, and return on investment (ROI). Monthly reports are provided to all clients.",
    category: "Marketing",
  },
  {
    question: "What training programs do you offer?",
    answer:
      "We offer ICT skills training, Microsoft Office certification, digital marketing courses, cryptocurrency education, and custom corporate training programs. Both individual and group sessions are available.",
    category: "Training",
  },
  {
    question: "Are your training programs certified?",
    answer:
      "Yes, we provide certificates of completion for all our training programs. Some courses also prepare you for industry-recognized certifications like Microsoft Office Specialist (MOS).",
    category: "Training",
  },
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const categories = [...new Set(faqData.map((item) => item.category))]

  return (
    <section className="py-20 bg-gray-900/50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Find answers to common questions about our services</p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-0">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/70 transition-colors"
                  onClick={() => toggleItem(index)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                  </div>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+2349034376039"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md hover:shadow-lg transition-colors"
            >
              Call Us: +234 903 437 6039
            </a>
            <a
              href="mailto:info@pincorehub.com.ng"
              className="inline-flex items-center justify-center px-6 py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500/10 transition-colors"
            >
              Email: info@pincorehub.com.ng
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
