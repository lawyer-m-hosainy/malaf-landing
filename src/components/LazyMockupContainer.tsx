import { useState, useEffect, useRef, ReactNode } from 'react';
import { PortfolioItem } from '../types';
import { Sparkles, Scale } from 'lucide-react';

interface LazyMockupContainerProps {
  item: PortfolioItem;
  children: ReactNode;
  heightClass?: string;
}

export default function LazyMockupContainer({
  item,
  children,
  heightClass = 'h-[290px]',
}: LazyMockupContainerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If IntersectionObserver is not available, render immediately
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once loaded, no need to observe anymore
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      {
        // 200px pre-loading buffer ensures instant visual readiness before user scrolls into view
        rootMargin: '200px 0px 200px 0px',
        threshold: 0.01,
      }
    );

    const currentEl = containerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-full ${heightClass} relative overflow-hidden`}>
      {isVisible ? (
        <div className="w-full h-full animate-in fade-in duration-300">
          {children}
        </div>
      ) : (
        /* Lightweight Skeleton Placeholder for Lazy Loading */
        <div className="w-full h-full bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 flex flex-col justify-between p-4 select-none relative overflow-hidden">
          {/* Shimmer overlay animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite] pointer-events-none" />

          {/* Skeleton Header */}
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 bg-slate-200 rounded-md animate-pulse" />
            <div className="h-4 w-16 bg-slate-200 rounded-md animate-pulse" />
          </div>

          {/* Skeleton Middle Body */}
          <div className="space-y-2.5 my-auto text-center flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 mb-1 animate-pulse">
              <Scale className="w-4 h-4" />
            </div>
            <div className="h-5 w-3/4 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-3.5 w-1/2 bg-slate-200 rounded-md animate-pulse" />
            <div className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-bold bg-white/80 px-2 py-0.5 rounded border border-slate-200 mt-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>جاري تحميل معاينة التصميم #{item.designNumber}...</span>
            </div>
          </div>

          {/* Skeleton Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
            <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
            <div className="h-5 w-20 bg-slate-200 rounded-md animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
}
