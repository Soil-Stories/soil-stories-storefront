"use client"

import { ArrowRight } from "lucide-react"
import { Section } from "@components/ui/section"
import { SectionHeader } from "@components/ui/section-header"
import { StoryCard } from "@components/ui/story-card"
import { Button } from "@components/ui/button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Mock data - in real app this would come from API/GraphQL
const featuredStories = [
  {
    id: "1",
    title: "The Sacred Geometry of Warli",
    region: "Maharashtra",
    image: "/placeholder.svg?height=500&width=400",
    tags: ["#Warli", "#Maharashtra", "#TribalArt"],
    description: "Where circles become cosmos and lines tell stories of harvest, celebrating the eternal cycle of life",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "Gond Dreams in Dots",
    region: "Madhya Pradesh",
    image: "/placeholder.svg?height=450&width=400",
    tags: ["#Gond", "#MadhyaPradesh", "#DreamTime"],
    description: "Each dot a prayer, each pattern a pathway to the spirit world where ancestors dance with nature",
    readTime: "7 min read",
  },
  {
    id: "3",
    title: "Chamba's Mountain Whispers",
    region: "Himachal Pradesh",
    image: "/placeholder.svg?height=550&width=400",
    tags: ["#Chamba", "#Himalayas", "#Miniature"],
    description: "Where mountain mists meet delicate brushstrokes in the ancient art of Chamba Rumal",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Madhubani's Celebration Canvas",
    region: "Bihar",
    image: "/placeholder.svg?height=480&width=400",
    tags: ["#Madhubani", "#Bihar", "#Celebration"],
    description: "Walls that bloom with stories of love and devotion, painted by generations of women artists",
    readTime: "8 min read",
  },
]

export function StoriesPreviewSection() {
  return (
    <Section background="alt" padding="default">
      <SectionHeader
        subtitle="Cultural Heritage"
        title="More Than Fashion"
        description="Explore how land, people, and tradition shape the design language of each garment. These are not trends — they're timeless truths."
      />

      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {featuredStories.map((story, index) => (
          <div key={story.id} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
            <StoryCard story={story} index={index} />
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="flex flex-col items-center text-center">
        <Button asChild size="lg" variant="secondary" className="group">
          <LocalizedClientLink href="/stories" className="inline-flex items-center">
            Read All Stories
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </LocalizedClientLink>
        </Button>
        <p className="mt-4 text-sm text-muted">Dive deeper into the rich cultural heritage behind each art form</p>
      </div>
    </Section>
  )
}
