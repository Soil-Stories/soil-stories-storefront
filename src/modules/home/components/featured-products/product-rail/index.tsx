import { ProductCard } from "@components/ui/product-card"
import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

const featuredProducts = [
  {
    id: "1",
    name: "Chamba Rumal Silk Scarf",
    description:
      "Hand-embroidered silk scarf featuring traditional Chamba miniature art with intricate details",
    price: 89.99,
    originalPrice: 109.99,
    imageUrl: "https://res.cloudinary.com/dg56fyfea/image/upload/v1753032776/samples/dessert-on-a-plate.jpg?height=400&width=300",
    category: "accessories",
    artForm: "Chamba",
    region: "Himachal Pradesh",
    stock: 15,
    rating: 4.8,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Warli Print Cotton Kurta",
    description:
      "Contemporary kurta with authentic Warli tribal motifs celebrating harvest traditions",
    price: 65.99,
    imageUrl: "https://res.cloudinary.com/dg56fyfea/image/upload/v1753032776/samples/upscale-face-1.jpg?height=400&width=300",
    category: "clothing",
    artForm: "Warli",
    region: "Maharashtra",
    stock: 25,
    rating: 4.6,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Madhubani Painted Tote Bag",
    description:
      "Canvas tote bag with vibrant Madhubani folk art patterns and natural dyes",
    price: 45.99,
    originalPrice: 55.99,
    imageUrl: "https://res.cloudinary.com/dg56fyfea/image/upload/v1753032776/samples/look-up.jpg?height=400&width=300",
    category: "accessories",
    artForm: "Madhubani",
    region: "Bihar",
    stock: 30,
    rating: 4.7,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Kalamkari Block Print Dress",
    description:
      "Flowing dress with hand-painted Kalamkari designs inspired by ancient mythology",
    price: 125.99,
    imageUrl: "https://res.cloudinary.com/dg56fyfea/image/upload/v1753032776/samples/outdoor-woman.jpg?height=400&width=300",
    category: "clothing",
    artForm: "Kalamkari",
    region: "Andhra Pradesh",
    stock: 12,
    rating: 4.9,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "5",
    name: "Gond Art Wall Tapestry",
    description:
      "Large tapestry featuring intricate Gond tribal art with dreamtime motifs",
    price: 95.99,
    imageUrl: "https://res.cloudinary.com/dg56fyfea/image/upload/v1753032775/samples/shoe.jpg?height=400&width=300",
    category: "home",
    artForm: "Gond",
    region: "Madhya Pradesh",
    stock: 8,
    rating: 4.5,
    isFeatured: true,
  },
  {
    id: "6",
    name: "Phad Painting Cushion Cover",
    description:
      "Decorative cushion cover with traditional Phad scroll art depicting epic tales",
    price: 35.99,
    imageUrl: "https://res.cloudinary.com/dg56fyfea/image/upload/v1753032772/samples/two-ladies.jpg?height=400&width=300",
    category: "home",
    artForm: "Phad",
    region: "Rajasthan",
    stock: 20,
    rating: 4.4,
    isFeatured: true,
  },
]

export default async function ProductRail({
  // collection,
  region,
}: {
  // collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      // collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      {/* <div className="flex justify-between mb-8">
        <Text className="txt-xlarge">{collection.title}</Text>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View all
        </InteractiveLink>
      </div> */}
      <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36">
        {featuredProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </ul>
    </div>
  )
}
