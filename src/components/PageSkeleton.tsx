/** 
 * Lightweight PageSkeleton for initial route loading.
 * Does not import Radix/Shadcn components to keep the initial 
 * route bundle as small as possible.
 */
const PageSkeleton = () => {
  const pulse = "animate-pulse rounded-md bg-muted";
  
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="h-20 border-b border-border/40 bg-background flex items-center px-4">
        <div className={`h-12 w-48 ${pulse}`} />
        <div className="ml-auto flex gap-4">
          <div className={`h-8 w-20 hidden md:block ${pulse}`} />
          <div className={`h-8 w-20 hidden md:block ${pulse}`} />
          <div className={`h-8 w-20 hidden md:block ${pulse}`} />
        </div>
      </div>
      {/* Hero skeleton */}
      <div className="bg-muted/30 py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className={`h-10 w-3/4 mx-auto ${pulse}`} />
          <div className={`h-6 w-1/2 mx-auto ${pulse}`} />
          <div className="flex justify-center gap-3 mt-6">
            <div className={`h-12 w-40 rounded-lg ${pulse}`} />
            <div className={`h-12 w-40 rounded-lg ${pulse}`} />
          </div>
        </div>
      </div>
      {/* Content skeleton */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-3 p-4">
              <div className={`h-6 w-6 rounded-full ${pulse}`} />
              <div className={`h-5 w-3/4 ${pulse}`} />
              <div className={`h-4 w-full ${pulse}`} />
              <div className={`h-4 w-5/6 ${pulse}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;