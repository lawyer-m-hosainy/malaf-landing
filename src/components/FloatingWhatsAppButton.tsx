import { MessageCircle } from 'lucide-react';
import { useUserIntent } from '../context/UserIntentContext';

export default function FloatingWhatsAppButton() {
  const { currentWhatsAppUrl, intentSummary } = useUserIntent();

  return (
    <div
      id="floating-whatsapp-container"
      className="fixed bottom-20 sm:bottom-6 left-5 sm:left-6 z-50 flex flex-col items-start font-['Cairo',sans-serif] select-none"
      dir="rtl"
    >
      {/* Main Floating Button */}
      <a
        id="floating-whatsapp-btn"
        href={currentWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`تواصل سريع عبر واتساب: ${intentSummary.headline}`}
        title={`محادثة واتساب مجهزة تلقائياً لـ: ${intentSummary.headline}`}
        className="group relative flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-emerald-600/35 hover:shadow-emerald-600/50 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white"
      >
        {/* Pulsing Green Halo */}
        

        {/* Online Status Dot */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-slate-950 rounded-full"></span>
        </span>

        {/* WhatsApp Icon */}
        <MessageCircle className="w-6 h-6 text-white stroke-[2.2] shrink-0" />

        {/* Text Label on desktop or tablet */}
        <div className="hidden sm:flex flex-col text-right pr-0.5">
          <span className="text-xs font-black tracking-tight leading-tight flex items-center gap-1">
            <span>تواصل واتساب</span>
            {intentSummary.hasSpecificContext && (
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-950/30 font-bold">
                مجهز
              </span>
            )}
          </span>
          <span className="text-[10px] text-emerald-100 font-medium leading-none">
            {intentSummary.hasSpecificContext ? intentSummary.badge : 'نرد في أقرب وقت'}
          </span>
        </div>
      </a>
    </div>
  );
}
