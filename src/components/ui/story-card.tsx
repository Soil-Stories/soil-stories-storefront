import Link from "next/link"
import { Card } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { cn } from "@lib/util/tailwind"

interface Story {
  id: string
  title: string
  region: string
  image: string
  tags: string[]
  description: string
  readTime?: string
}

interface StoryCardProps {
  story: Story
  index?: number
  className?: string
}

const rotations = ["-rotate-1", "rotate-1", "-rotate-0.5", "rotate-1.5", "-rotate-1.5", "rotate-0.5"]

export function StoryCard({ story, index = 0, className }: StoryCardProps) {
  const rotation = rotations[index % rotations.length]

  return (
    <Card
      className={cn(
        "group h-full overflow-hidden cursor-pointer transition-all duration-500 bg-white border border-gray-200 shadow-lg hover:shadow-xl",
        rotation,
        "hover:rotate-0 hover:scale-105",
        className,
      )}
    >
      <Link href={`/stories/${story.id}`} className="block h-full">
        <div className="relative h-80 md:h-96 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${story.image})` }}
            role="img"
            aria-label={`${story.title} - Traditional art from ${story.region}`}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {story.tags.slice(0, 3).map((tag, tagIndex) => (
                <Badge key={tagIndex} className="bg-white/20 text-white backdrop-blur-sm border-0">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Region & Read Time */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs uppercase tracking-wide opacity-90">{story.region}</p>
              {story.readTime && <p className="text-xs opacity-75">{story.readTime}</p>}
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl font-semibold mb-2 leading-tight">{story.title}</h3>

            {/* Description */}
            <p className="text-sm italic opacity-95 leading-relaxed line-clamp-2">{story.description}</p>
          </div>
        </div>
      </Link>
    </Card>
  )
}
