"use client"
import Link from "next/link"
import { Star, Heart, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardFooter } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import { cn } from "@lib/util/tailwind"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  imageUrl: string
  category: string
  artForm: string
  region: string
  stock: number
  rating: number
  isNew?: boolean
  isFeatured?: boolean
}

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card
      className={cn(
        "group h-full overflow-hidden cursor-pointer hover:scale-[1.02] hover:shadow-lg bg-white border border-gray-200",
        className,
      )}
    >
      <Link href={`/products/${product.id}`}>
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${product.imageUrl})` }}
            role="img"
            aria-label={`${product.name} - ${product.artForm} art from ${product.region}`}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <Badge variant={product.artForm.toLowerCase() as any} className="uppercase tracking-wide">
              {product.artForm}
            </Badge>
            {product.isNew && <Badge variant="accent">New</Badge>}
            {discountPercentage > 0 && <Badge variant="error">{discountPercentage}% Off</Badge>}
          </div>

          {/* Stock Status */}
          <div className="absolute top-3 right-3">
            <Badge variant={product.stock > 0 ? "success" : "error"}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="rounded-full bg-white/90 p-2 text-soil-charcoal hover:bg-white transition-colors"
              aria-label="Add to wishlist"
              onClick={(e) => {
                e.preventDefault()
                // Handle wishlist
              }}
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Link>

      <CardContent className="flex-1 p-6 bg-white">
        {/* Region */}
        <p className="text-xs uppercase tracking-wide text-muted mb-2">{product.region}</p>

        {/* Product Name */}
        <h3 className="font-serif text-xl font-semibold text-soil-charcoal mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(product.rating)
                    ? "fill-soil-mustard-soil text-soil-mustard-soil"
                    : "text-soil-clay-dark",
                )}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xl font-semibold text-soil-charcoal">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 bg-white">
        <Button className="w-full" disabled={product.stock === 0}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
