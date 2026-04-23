import { Skeleton } from "@/components/ui/skeleton";

/** Skeleton placeholder shown during route-level lazy loading */
const PageSkeleton = () => (
  <div className="min-h-screen animate-in fade-in duration-300">
    {/* Header skeleton */}
    <div className="h-20 border-b border-border/40 bg-background flex items-center px-4">
      <Skeleton className="h-12 w-48" />
      <div className="ml-auto flex gap-4">
        <Skeleton className="h-8 w-20 hidden md:block" />
        <Skeleton className="h-8 w-20 hidden md:block" />
        <Skeleton className="h-8 w-20 hidden md:block" />
      </div>
    </div>
    {/* Hero skeleton */}
    <div className="bg-muted/30 py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <Skeleton className="h-10 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <div className="flex justify-center gap-3 mt-6">
          <Skeleton className="h-12 w-40 rounded-lg" />
          <Skeleton className="h-12 w-40 rounded-lg" />
        </div>
      </div>
    </div>
    {/* Content skeleton */}
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-3 p-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PageSkeleton;