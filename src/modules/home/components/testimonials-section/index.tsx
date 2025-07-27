"use client"

import { Section } from "@components/ui/section"
import { SectionHeader } from "@components/ui/section-header"
import { TestimonialCard } from "@components/ui/testimonial-card"

const testimonials = [
  {
    id: "1",
    name: "Sarah Chen",
    location: "San Francisco, CA",
    rating: 5,
    comment:
      "The Madhubani tote bag I purchased is absolutely stunning. You can feel the love and craftsmanship in every brushstroke. It's become my favorite accessory.",
    product: "Madhubani Painted Tote Bag",
    verified: true,
  },
  {
    id: "2",
    name: "James Wilson",
    location: "London, UK",
    rating: 5,
    comment:
      "SoilStories has completely changed how I think about fashion. Each piece tells a story, and I love being part of preserving these beautiful traditions.",
    product: "Warli Print Cotton Kurta",
    verified: true,
  },
  {
    id: "3",
    name: "Ananya Gupta",
    location: "Mumbai, India",
    rating: 5,
    comment:
      "As someone who grew up around these art forms, I'm amazed by how SoilStories honors the authenticity while making them accessible to a global audience.",
    product: "Chamba Rumal Silk Scarf",
    verified: true,
  },
  {
    id: "4",
    name: "Maria Rodriguez",
    location: "Barcelona, Spain",
    rating: 5,
    comment:
      "The quality is exceptional and knowing that my purchase supports artisan communities makes it even more meaningful. This is fashion with purpose.",
    product: "Kalamkari Block Print Dress",
    verified: true,
  },
  {
    id: "5",
    name: "David Kim",
    location: "Seoul, South Korea",
    rating: 5,
    comment:
      "I've never owned anything quite like the Gond art tapestry. It's a conversation starter and a beautiful piece of cultural art for my home.",
    product: "Gond Art Wall Tapestry",
    verified: true,
  },
  {
    id: "6",
    name: "Emma Thompson",
    location: "Sydney, Australia",
    rating: 5,
    comment:
      "SoilStories represents everything I value in fashion - sustainability, authenticity, and respect for cultural heritage. Absolutely love my purchases!",
    product: "Phad Painting Cushion Cover",
    verified: true,
  },
]

export function TestimonialsSection() {
  return (
    <Section background="white" padding="default">
      <SectionHeader
        subtitle="Customer Stories"
        title="Voices from Our Community"
        description="Hear from customers around the world who have embraced the SoilStories philosophy of conscious fashion and cultural appreciation."
      />

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div>
            <p className="font-serif text-2xl font-bold text-soil-charcoal">4.9/5</p>
            <p className="text-sm text-muted">Average Rating</p>
          </div>
          <div>
            <p className="font-serif text-2xl font-bold text-soil-charcoal">2,500+</p>
            <p className="text-sm text-muted">Happy Customers</p>
          </div>
          <div>
            <p className="font-serif text-2xl font-bold text-soil-charcoal">98%</p>
            <p className="text-sm text-muted">Would Recommend</p>
          </div>
          <div>
            <p className="font-serif text-2xl font-bold text-soil-charcoal">50+</p>
            <p className="text-sm text-muted">Countries Served</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
