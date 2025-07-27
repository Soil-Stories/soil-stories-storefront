"use client"

import Link from "next/link"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import { Section } from "@components/ui/section"
import { SectionHeader } from "@components/ui/section-header"
import { Card, CardContent } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"

interface Article {
  id: string
  title: string
  summary: string
  image: string
  readTime: string
  date: string
  category: string
  author: string
  featured?: boolean
}

const journalArticles: Article[] = [
  {
    id: "1",
    title: "Why Local Doesn't Mean Small",
    summary: "Exploring how indigenous art forms carry global significance and timeless wisdom in every thread.",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "5 min read",
    date: "March 15, 2024",
    category: "Culture",
    author: "Priya Sharma",
    featured: true,
  },
  {
    id: "2",
    title: "Sustainable Fashion from the Andes to Assam",
    summary: "A journey through traditional textile practices that have sustained communities for generations.",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "8 min read",
    date: "March 10, 2024",
    category: "Sustainability",
    author: "Arjun Patel",
  },
  {
    id: "3",
    title: "What Happens When We Listen to the Land?",
    summary: "How geography, climate, and culture converge to create distinctive design languages.",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "6 min read",
    date: "March 5, 2024",
    category: "Design",
    author: "Maya Singh",
  },
  {
    id: "4",
    title: "The Slow Revolution of Handmade",
    summary: "Why choosing artisan-made pieces is an act of resistance against fast fashion culture.",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "7 min read",
    date: "February 28, 2024",
    category: "Philosophy",
    author: "Ravi Kumar",
  },
]

function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Card
      className={`group h-full overflow-hidden hover:shadow-medium transition-all duration-300 bg-white ${featured ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      <Link href={`/journal/${article.id}`} className="block h-full">
        <div className={`relative overflow-hidden ${featured ? "h-64 md:h-80" : "h-48"}`}>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${article.image})` }}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-white/90 text-soil-charcoal">{article.category}</Badge>
          </div>
        </div>

        <CardContent className="p-6 bg-white">
          {/* Meta Information */}
          <div className="flex items-center gap-4 text-xs text-muted mb-3">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {article.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {article.readTime}
            </div>
          </div>

          {/* Title */}
          <h3
            className={`font-serif font-semibold text-soil-charcoal mb-3 line-clamp-2 group-hover:text-soil-indigo-mud transition-colors ${featured ? "text-xl md:text-2xl" : "text-lg"}`}
          >
            {article.title}
          </h3>

          {/* Summary */}
          <p className={`text-muted leading-relaxed mb-4 ${featured ? "line-clamp-3" : "line-clamp-2"}`}>
            {article.summary}
          </p>

          {/* Author */}
          <p className="text-sm font-medium text-soil-charcoal">By {article.author}</p>
        </CardContent>
      </Link>
    </Card>
  )
}

export function JournalSection() {
  const featuredArticle = journalArticles.find((article) => article.featured)
  const regularArticles = journalArticles.filter((article) => !article.featured)

  return (
    <Section background="alt" padding="default">
      <SectionHeader
        subtitle="The Journal"
        title="Thoughts from the Ground Up"
        description="Insights, stories, and perspectives on sustainable fashion, indigenous art forms, and cultural preservation."
      />

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        {/* Featured Article */}
        {featuredArticle && (
          <div className="md:col-span-2 md:row-span-2 animate-fade-in">
            <ArticleCard article={featuredArticle} featured />
          </div>
        )}

        {/* Regular Articles */}
        {regularArticles.map((article, index) => (
          <div key={article.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 150}ms` }}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="flex flex-col items-center text-center">
        <Button asChild size="lg" variant="secondary" className="group">
          <Link href="/journal" className="inline-flex items-center">
            Read All Articles
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
        <p className="mt-4 text-sm text-muted">
          Explore our complete collection of stories, insights, and cultural perspectives
        </p>
      </div>
    </Section>
  )
}
