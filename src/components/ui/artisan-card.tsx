import { Card, CardContent } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { MapPin } from "lucide-react"
import { cn } from "@lib/util/tailwind"

interface Artisan {
  id: string
  name: string
  artForm: string
  location: string
  experience: string
  image: string
  specialty: string
  description: string
}

interface ArtisanCardProps {
  artisan: Artisan
  className?: string
}

export function ArtisanCard({ artisan, className }: ArtisanCardProps) {
  return (
    <Card className={cn("group h-full overflow-hidden hover:shadow-medium transition-all duration-300", className)}>
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${artisan.image})` }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

        {/* Art Form Badge */}
        <div className="absolute top-4 left-4">
          <Badge variant={artisan.artForm.toLowerCase() as any} className="uppercase tracking-wide">
            {artisan.artForm}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Name & Location */}
        <div className="mb-4">
          <h3 className="font-serif text-xl font-semibold text-soil-charcoal mb-1">{artisan.name}</h3>
          <div className="flex items-center text-muted text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {artisan.location}
          </div>
        </div>

        {/* Experience & Specialty */}
        <div className="mb-4">
          <p className="text-sm font-medium text-soil-charcoal mb-1">{artisan.experience} of experience</p>
          <p className="text-sm text-muted">Specializes in {artisan.specialty}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed line-clamp-3">{artisan.description}</p>
      </CardContent>
    </Card>
  )
}
