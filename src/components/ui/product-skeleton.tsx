import { Card, CardContent } from "@components/ui/card"
import { Skeleton } from "@components/ui/skeleton"

export function ProductSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <div className="relative">
        <Skeleton className="h-80 w-full" />
      </div>
      <CardContent className="p-6">
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-5 w-20" />
      </CardContent>
    </Card>
  )
}
