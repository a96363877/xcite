import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-600" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
