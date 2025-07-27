import { Card, CardContent } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { Star } from "lucide-react"
import { cn } from "@lib/util/tailwind"

interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  comment: string
  product?: string
  avatar?: string
  verified?: boolean
}

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <Card
      className={cn(
        "h-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300",
        className,
      )}
    >
      <CardContent className="p-6 bg-white">
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < testimonial.rating ? "fill-soil-mustard-soil text-soil-mustard-soil" : "text-soil-clay-dark",
                )}
              />
            ))}
          </div>
          {testimonial.verified && (
            <Badge variant="success" className="ml-2 text-xs">
              Verified Purchase
            </Badge>
          )}
        </div>

        {/* Comment */}
        <blockquote className="text-soil-charcoal leading-relaxed mb-6 italic">"{testimonial.comment}"</blockquote>

        {/* Product */}
        {testimonial.product && <p className="text-sm text-muted mb-4 font-medium">Product: {testimonial.product}</p>}

        {/* Author */}
        <div className="flex items-center">
          <div
            className="w-10 h-10 rounded-full bg-soil-clay-dark flex items-center justify-center text-soil-charcoal font-semibold mr-3"
            style={
              testimonial.avatar
                ? { backgroundImage: `url(${testimonial.avatar})`, backgroundSize: "cover" }
                : undefined
            }
          >
            {!testimonial.avatar && testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-soil-charcoal">{testimonial.name}</p>
            <p className="text-sm text-muted">{testimonial.location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
