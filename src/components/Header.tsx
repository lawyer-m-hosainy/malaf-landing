import { useState, useEffect } from 'react';
import { Scale, Menu, X, PhoneCall, ChevronLeft } from 'lucide-react';
import { useUserIntent } from '../context/UserIntentContext';
import { BOT_ORDER_LINK, BRAND_NAME, BRAND_TAGLINE } from '../data/content';

const NAV_LINKS = [
  { href: '#showcase', label: 'الأنماط والنموذج' },
  { href: '#how-it-works', label: 'إزاي بنشتغل' },
  { href: '#why', label: 'ليه مَلَف' },
  { href: '#pricing', label: 'الباقات' },
  { href: '#faq', label: 'الأسئلة الشائعة' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentWhatsAppUrl, intentSummary } = useUserIntent();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile drawer on Escape and lock body scroll while it is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full bg-white text-slate-900 border-b transition-shadow duration-300 ${
        scrolled ? 'shadow-md shadow-slate-900/5 border-slate-200/90' : 'border-slate-200/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group text-right shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
            <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />
          </div>
          <div className="leading-tight">
            <div className="font-black text-xl sm:text-2xl tracking-tight text-slate-950">{BRAND_NAME}</div>
            <div className="text-[11px] font-semibold text-slate-500">{BRAND_TAGLINE}</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="التنقل الرئيسي">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-amber-700 rounded-lg hover:bg-amber-50/80 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={currentWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
            title={`تواصل عبر واتساب: ${intentSummary.headline}`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">واتساب</span>
          </a>
          <a
            id="header-cta-btn"
            href={BOT_ORDER_LINK} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg text-sm font-black bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-md shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center"
          >
            اطلب موقعك على واتساب
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={BOT_ORDER_LINK} target="_blank" rel="noopener noreferrer"
            className="px-3 py-2 text-xs font-black rounded-lg bg-amber-400 text-slate-950 whitespace-nowrap"
          >
            اطلب موقعك
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="p-2 text-slate-700 hover:text-slate-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="قائمة الهاتف"
          className="sm:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 animate-in slide-in-from-top duration-200 shadow-xl"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-3 rounded-lg text-sm font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-800"
            >
              <span>{link.label}</span>
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            </a>
          ))}
          <div className="pt-3 mt-2 border-t border-slate-200 flex flex-col gap-2">
            <a
              href={BOT_ORDER_LINK} target="_blank" rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-lg text-sm font-black bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 text-center shadow-md shadow-amber-500/20"
            >
              اطلب موقعك على واتساب
            </a>
            <a
              href={currentWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>تواصل عبر واتساب</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
