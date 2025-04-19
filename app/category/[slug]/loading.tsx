import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryLoading() {
  return (
    <div className="container py-6">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4 mx-2 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24 lg:hidden" />
          <Skeleton className="h-9 w-36" />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters - Desktop */}
        <div className="hidden lg:block">
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
