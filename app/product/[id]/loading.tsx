import { Skeleton } from "@/components/ui/skeleton"

export default function ProductLoading() {
  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4 mx-2 rounded-full" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4 mx-2 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Images */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="flex items-center mt-2">
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <div className="space-y-1">
            <Skeleton className="h-8 w-32" />
          </div>

          <Skeleton className="h-32 w-full" />

          <div className="space-y-4 pt-4">
            <Skeleton className="h-10 w-full" />
            <div className="flex flex-col sm:flex-row gap-3">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-12 hidden sm:block" />
            </div>
          </div>

          <Skeleton className="h-32 w-full" />
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Skeleton className="h-10 w-full mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  )
}
