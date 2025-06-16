import { Card, CardContent } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        {/* Image skeleton */}
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
          {/* Badge skeleton */}
          <div className="absolute top-2 left-2 w-16 h-5 bg-gray-300 dark:bg-gray-600 animate-pulse rounded" />
          {/* Rating skeleton */}
          <div className="absolute top-2 right-2 w-12 h-6 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full" />
        </div>

        <div className="space-y-3">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-3/4" />

          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-2/3" />
          </div>

          {/* Star rating skeleton */}
          <div className="py-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                ))}
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-24" />
            </div>
          </div>

          {/* Price and category skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-20" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-16" />
          </div>

          {/* Button skeleton */}
          <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}
