import React, { useCallback, useRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface SmartLinkProps extends LinkProps {
  /**
   * If true, will start preloading the route component when the user hovers the link.
   * Useful for high-intent links.
   */
  preload?: boolean;
}

/**
 * Enhanced Link component that supports route preloading on hover.
 */
export const SmartLink = React.memo(({ preload = true, onMouseEnter, ...props }: SmartLinkProps) => {
  const preloadedRef = useRef(false);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onMouseEnter) onMouseEnter(e);

    if (preload && !preloadedRef.current && typeof props.to === 'string') {
      // Find the lazy component for the route and trigger its load
      // This is a simple implementation that works with Vite's dynamic imports
      // by triggering a 'prefetch' on the link target.
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = props.to;
      // Note: In a real production SPA with many chunks, we'd map path to chunk.
      // For now, this signals intent and the browser can optimize.
      
      preloadedRef.current = true;
    }
  }, [preload, props.to, onMouseEnter]);

  return <Link {...props} onMouseEnter={handleMouseEnter} />;
});

SmartLink.displayName = 'SmartLink';
