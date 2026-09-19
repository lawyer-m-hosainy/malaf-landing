import { useState, useRef, useEffect } from 'react';
import { Scale, Cpu, Lightbulb, Info, X } from 'lucide-react';
import { FeatureExplanation } from '../data/featureTooltips';

interface LawyerBenefitTooltipProps {
  explanation: FeatureExplanation;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'auto';
  className?: string;
  showIconOnly?: boolean;
}

export default function LawyerBenefitTooltip({
  explanation,
  children,
  position = 'auto',
  className = '',
  showIconOnly = false,
}: LawyerBenefitTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [calculatedPosition, setCalculatedPosition] = useState<'top' | 'bottom'>('top');
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      calculateBestPosition();
      setIsOpen(true);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 120);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    calculateBestPosition();
    setIsOpen((prev) => !prev);
  };

  const calculateBestPosition = () => {
    if (position !== 'auto') {
      setCalculatedPosition(position);
      return;
    }
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // If trigger is in the upper 280px of screen, open downwards, else open upwards
      if (rect.top < 280) {
        setCalculatedPosition('bottom');
      } else {
        setCalculatedPosition('top');
      }
    }
  };

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center group/tooltip ${className}`}
    >
      {/* Trigger element */}
      <div
        onClick={handleToggleClick}
        className="cursor-help inline-flex items-center gap-1.5 w-full text-right"
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label={`توضيح الفائدة القانونية والتقنية لـ ${explanation.title}`}
        onFocus={() => {
          calculateBestPosition();
          setIsOpen(true);
        }}
        onBlur={() => setIsOpen(false)}
      >
        {children}
        
        {/* Subtle (i) indicator for affordance */}
        <span
          className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold transition-all shrink-0 ${
            isOpen
              ? 'bg-amber-400 text-slate-950 scale-110'
              : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
          }`}
          title="انقر أو مرر الفأرة لمعرفة الفائدة القانونية والتقنية"
        >
          <Info className="w-2.5 h-2.5" />
        </span>
      </div>

      {/* The Rich Floating Tooltip Card */}
      {isOpen && (
        <div
          ref={tooltipRef}
          onMouseEnter={() => {
            if (timerRef.current) clearTimeout(timerRef.current);
          }}
          onMouseLeave={handleMouseLeave}
          className={`absolute z-50 w-[min(calc(100vw-2rem),380px)] text-right bg-slate-950 text-white rounded-2xl p-4 shadow-2xl border border-amber-400/50 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 pointer-events-auto select-text ${
            calculatedPosition === 'top'
              ? 'bottom-full mb-3 right-0'
              : 'top-full mt-3 right-0'
          }`}
          role="tooltip"
        >
          {/* Pointer Arrow */}
          <div
            className={`absolute w-3 h-3 bg-slate-950 border-amber-400/50 transform rotate-45 right-6 ${
              calculatedPosition === 'top'
                ? 'bottom-[-7px] border-b border-r'
                : 'top-[-7px] border-t border-l'
            }`}
          />

          {/* Header */}
          <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-400/20 text-amber-400 border border-amber-400/30">
                <Scale className="w-3.5 h-3.5" />
              </span>
              <h4 className="text-xs sm:text-sm font-black text-amber-300 leading-snug">
                {explanation.title}
              </h4>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="text-slate-400 hover:text-white p-0.5 rounded-md hover:bg-slate-800 transition-colors"
              aria-label="إغلاق التوضيح"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body: Legal & Technical breakdown */}
          <div className="mt-3 space-y-2.5 text-xs">
            {/* 1. Legal & Professional Benefit */}
            <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
                <Scale className="w-3.5 h-3.5 shrink-0" />
                <span>الأثر القانوني والمهني:</span>
              </div>
              <p className="text-slate-200 text-[11px] leading-relaxed">
                {explanation.legalBenefit}
              </p>
            </div>

            {/* 2. Technical & Performance Value */}
            <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                <Cpu className="w-3.5 h-3.5 shrink-0" />
                <span>القيمة التقنية والأداء:</span>
              </div>
              <p className="text-slate-200 text-[11px] leading-relaxed">
                {explanation.technicalBenefit}
              </p>
            </div>

            {/* 3. Lawyer Tip (Optional) */}
            {explanation.lawyerTip && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
                <Lightbulb className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="font-semibold text-slate-400">معلومة سريعة:</span>
                <span className="truncate">{explanation.lawyerTip}</span>
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span className="text-amber-400/80 font-bold">معيار مهني معتمد للمحامين</span>
            <span>انقر أو ابتعد للإغلاق</span>
          </div>
        </div>
      )}
    </div>
  );
}
