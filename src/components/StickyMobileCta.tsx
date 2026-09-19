import { useEffect, useState } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { OFFER_PRICE } from '../data/content';
import { useUserIntent } from '../context/UserIntentContext';

export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false);
  const { currentWhatsAppUrl, intentSummary } = useUserIntent();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      const form = document.getElementById('contact-form');

      if (!hero || !form) return;

      const heroBottom = hero.getBoundingClientRect().bottom;
      const formRect = form.getBoundingClientRect();
      const formVisible = formRect.top < window.innerHeight && formRect.bottom > 0;

      // Show if scrolled past hero AND form is not currently visible in viewport
      if (heroBottom < 0 && !formVisible) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label="إجراءات التواصل السريعة للهاتف"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 shadow-2xl animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-center gap-3">
        {/* Form Anchor Button */}
        <a
          href="#contact-form"
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-sm text-center shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5"
        >
          <span>اطلب موقعك بعرض الـ {OFFER_PRICE}</span>
          <ArrowLeft className="w-4 h-4" />
        </a>

        {/* WhatsApp Direct Button with tailored sales template */}
        <a
          href={currentWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/25 active:scale-95 transition-transform relative"
          aria-label={`تواصل فوري عبر واتساب: ${intentSummary.headline}`}
          title={intentSummary.headline}
        >
          <MessageCircle className="w-5 h-5" />
          {intentSummary.hasSpecificContext && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white" />
          )}
        </a>
      </div>
    </aside>
  );
}
