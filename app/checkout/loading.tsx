import { Skeleton } from "@/components/ui/skeleton"

export default function CheckoutLoading() {
  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4 mx-2 rounded-full" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4 mx-2 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>

      <Skeleton className="h-10 w-48 mb-8" />

      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-1 flex-1 mx-2" />
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-1 flex-1 mx-2" />
          <Skeleton className="h-16 w-16 rounded-full" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>

        <div>
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
