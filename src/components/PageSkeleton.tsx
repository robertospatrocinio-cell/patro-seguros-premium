import React from "react";

const PageSkeleton = () => {
  const pulse = "animate-pulse rounded-md bg-slate-200 dark:bg-slate-800";
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="h-16 border-b border-border/40 bg-background/95 flex items-center px-4 sticky top-0 z-50">
        <div className={`h-8 w-32 md:w-48 ${pulse}`} />
        <div className="ml-auto flex gap-4">
          <div className={`h-4 w-16 hidden md:block ${pulse}`} />
          <div className={`h-4 w-16 hidden md:block ${pulse}`} />
          <div className={`h-4 w-16 hidden md:block ${pulse}`} />
        </div>
      </div>
      
      {/* Hero skeleton */}
      <div className="bg-slate-900/10 py-20 px-4 min-h-[500px] flex items-center justify-center">
        <div className="max-w-4xl w-full space-y-6 text-center">
          <div className={`h-12 w-3/4 mx-auto ${pulse}`} />
          <div className={`h-6 w-1/2 mx-auto ${pulse}`} />
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <div className={`h-12 w-full sm:w-44 rounded-lg ${pulse}`} />
            <div className={`h-12 w-full sm:w-44 rounded-lg ${pulse}`} />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-3 text-center">
              <div className={`h-8 w-16 mx-auto ${pulse}`} />
              <div className={`h-3 w-20 mx-auto ${pulse}`} />
            </div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 pt-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-4 p-6 border border-border/50 rounded-xl">
              <div className={`h-10 w-10 rounded-lg ${pulse}`} />
              <div className={`h-6 w-3/4 ${pulse}`} />
              <div className="space-y-2">
                <div className={`h-4 w-full ${pulse}`} />
                <div className={`h-4 w-5/6 ${pulse}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PageSkeleton);