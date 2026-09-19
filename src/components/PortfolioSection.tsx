import { useState, Suspense } from 'react';
import { Eye, CheckCircle2, MessageCircle, Palette, Lock, Sparkles } from 'lucide-react';
import { PORTFOLIO_ITEMS, OFFER_PRICE, DELIVERY_TIME } from '../data/content';
import { PortfolioItem } from '../types';
import MiniWebsiteMockup from './MiniWebsiteMockup';
import LazyMockupContainer from './LazyMockupContainer';
import { useUserIntent } from '../context/UserIntentContext';
import { lazyWithRetry } from '../utils/lazyWithRetry';
import ModalErrorBoundary from './ModalErrorBoundary';

// The preview modal is only downloaded when a visitor opens it (with retry + safe fallback)
const LiveBrowserSimulatorModal = lazyWithRetry(() => import('./LiveBrowserSimulatorModal'));

interface PortfolioSectionProps {
  selectedDesignId?: string;
  onSelectDesign: (designId: string, packageId?: string) => void;
}

export default function PortfolioSection({ selectedDesignId, onSelectDesign }: PortfolioSectionProps) {
  const [previewItem, setPreviewItem] = useState<PortfolioItem | null>(null);
  const { getWhatsAppLinkForDesign } = useUserIntent();

  const handleChooseDesign = (item: PortfolioItem) => {
    onSelectDesign(item.id, item.recommendedPackage);
    setPreviewItem(null);
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="portfolio" className="py-24 bg-[#F8F7F4] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs sm:text-sm font-bold">
            <Palette className="w-4 h-4 text-amber-700" />
            <span>{PORTFOLIO_ITEMS.length} أنماط تصميم فاخرة تختار منها</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            هوية تليق بمكانة مكتبك
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            خمسة أنماط مختارة بعناية بألوان هادئة وخطوط راقية. اختر الأقرب لشخصيتك المهنية، ونطبّقه باسمك وبياناتك
            وصورك — أي نمط منها مشمول بعرض الـ {OFFER_PRICE} والتسليم خلال {DELIVERY_TIME}.
          </p>
          <p className="text-xs text-slate-500">
            أسماء المكاتب داخل النماذج افتراضية للعرض فقط.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 flex flex-wrap justify-center gap-8">
          {PORTFOLIO_ITEMS.map((item) => {
            const isSelected = selectedDesignId === item.id;
            return (
              <article
                key={item.id}
                className={`w-full md:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.4rem)] bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 flex flex-col ${
                  isSelected
                    ? 'border-amber-500 ring-4 ring-amber-400/20 shadow-xl'
                    : 'border-slate-200 hover:border-amber-400/70 shadow-sm hover:shadow-lg'
                }`}
              >
                {/* Mock browser bar */}
                <div className="bg-slate-100 px-3 py-2 flex items-center justify-between border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200" dir="ltr">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>{item.demoDomain}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-500">#{item.designNumber}</span>
                </div>

                {/* Mockup */}
                <button
                  type="button"
                  onClick={() => setPreviewItem(item)}
                  className="group relative block w-full text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-label={`معاينة نمط ${item.title}`}
                >
                  <LazyMockupContainer item={item}>
                    <MiniWebsiteMockup item={item} />
                  </LazyMockupContainer>
                  <span className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/35 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 bg-white text-slate-950 text-xs font-black px-4 py-2 rounded-lg shadow-lg">
                      <Eye className="w-4 h-4" />
                      معاينة أكبر
                    </span>
                  </span>
                </button>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col gap-3 text-right">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.themeStyle} — {item.tag}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 mt-1" title={item.colorsDescription}>
                      {[item.palette.primary, item.palette.accent, item.palette.bg].map((c, i) => (
                        <span key={i} className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>

                  <div className="text-xs text-slate-700">
                    <span className="font-bold text-slate-900">يناسب: </span>
                    {item.suitableFor.join(' · ')}
                  </div>

                  <ul className="space-y-1.5">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleChooseDesign(item)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-950 text-white hover:bg-slate-800'
                        }`}
                      >
                        {isSelected ? '✓ النمط المختار' : 'اطلب هذا النمط'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewItem(item)}
                        className="px-3 py-2.5 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:border-amber-400 hover:text-amber-800 transition-colors inline-flex items-center gap-1.5"
                      >
                        <Eye className="w-4 h-4" />
                        معاينة
                      </button>
                    </div>
                    <a
                      href={getWhatsAppLinkForDesign(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 rounded-xl text-xs font-bold border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors inline-flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      اسأل عن هذا النمط عبر واتساب
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Custom request */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-5 sm:px-8 rounded-2xl bg-white border border-amber-300 shadow-sm text-right">
            <Sparkles className="w-6 h-6 text-amber-600 shrink-0" />
            <div>
              <div className="text-base font-black text-slate-950">عندك ألوان أو شعار خاص بمكتبك؟</div>
              <div className="text-xs sm:text-sm text-slate-600">
                نطبّق هويتك على أي نمط من الخمسة، أو نصمم لك ألواناً خاصة — ضمن نفس العرض.
              </div>
            </div>
            <a
              href="#contact-form"
              className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm hover:from-amber-400 hover:to-amber-500 transition-colors"
            >
              اطلب موقعك الآن
            </a>
          </div>
        </div>
      </div>

      {previewItem && (
        <ModalErrorBoundary onClose={() => setPreviewItem(null)}>
          <Suspense
            fallback={
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60" aria-busy="true">
                <div className="bg-white rounded-xl px-5 py-3 text-sm font-bold text-slate-700 shadow-xl">جاري تحميل المعاينة...</div>
              </div>
            }
          >
            <LiveBrowserSimulatorModal
              item={previewItem}
              onClose={() => setPreviewItem(null)}
              onChooseDesign={handleChooseDesign}
            />
          </Suspense>
        </ModalErrorBoundary>
      )}
    </section>
  );
}
