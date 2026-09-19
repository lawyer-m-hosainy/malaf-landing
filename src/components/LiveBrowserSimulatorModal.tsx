import { useEffect, useState } from 'react';
import { X, Monitor, Smartphone, Lock, CheckCircle2, MessageCircle, ArrowLeft, Home, User, Briefcase, Newspaper, HelpCircle, CalendarCheck } from 'lucide-react';
import { PortfolioItem } from '../types';
import MiniWebsiteMockup from './MiniWebsiteMockup';
import { useUserIntent } from '../context/UserIntentContext';
import { OFFER_PRICE, DELIVERY_TIME } from '../data/content';

interface LiveBrowserSimulatorModalProps {
  item: PortfolioItem;
  onClose: () => void;
  onChooseDesign: (item: PortfolioItem) => void;
}

type Device = 'desktop' | 'mobile';

/** Pages every delivered site includes (same structure as the live demo) */
const SITE_PAGES = [
  { icon: Home, label: 'الرئيسية' },
  { icon: User, label: 'من نحن / السيرة المهنية' },
  { icon: Briefcase, label: 'مجالات التخصص' },
  { icon: Newspaper, label: 'المقالات (في الباقات الأعلى)' },
  { icon: HelpCircle, label: 'أسئلة قانونية شائعة' },
  { icon: CalendarCheck, label: 'احجز استشارة (يُرسل عبر واتساب)' },
];

export default function LiveBrowserSimulatorModal({ item, onClose, onChooseDesign }: LiveBrowserSimulatorModalProps) {
  const [device, setDevice] = useState<Device>('desktop');
  const { getWhatsAppLinkForDesign } = useUserIntent();

  // Close on Escape + lock background scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-title"
    >
      <div
        className="bg-white w-full max-w-6xl max-h-[92vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-200 bg-slate-50">
          <div className="text-right min-w-0">
            <h3 id="preview-title" className="text-sm sm:text-base font-black text-slate-950 truncate">
              نمط #{item.designNumber} — {item.title}
            </h3>
            <p className="text-[11px] text-slate-500 truncate">
              {item.themeStyle} · {item.colorsDescription}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center rounded-lg border border-slate-300 overflow-hidden text-xs font-bold">
              <button
                type="button"
                onClick={() => setDevice('desktop')}
                className={`px-3 py-1.5 inline-flex items-center gap-1 ${device === 'desktop' ? 'bg-slate-950 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                aria-pressed={device === 'desktop'}
              >
                <Monitor className="w-3.5 h-3.5" /> كمبيوتر
              </button>
              <button
                type="button"
                onClick={() => setDevice('mobile')}
                className={`px-3 py-1.5 inline-flex items-center gap-1 ${device === 'mobile' ? 'bg-slate-950 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                aria-pressed={device === 'mobile'}
              >
                <Smartphone className="w-3.5 h-3.5" /> موبايل
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              aria-label="إغلاق المعاينة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6">
            {/* Browser frame */}
            <div className="lg:col-span-8">
              <div className={`mx-auto transition-all duration-300 ${device === 'mobile' ? 'max-w-[390px]' : 'max-w-full'}`}>
                <div className="rounded-2xl border-2 border-slate-200 overflow-hidden shadow-xl bg-slate-100">
                  <div className="px-3 py-2 flex items-center justify-between border-b border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 bg-white px-3 py-0.5 rounded-full border border-slate-200" dir="ltr">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      <span>https://{item.demoDomain}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      نموذج توضيحي
                    </span>
                  </div>
                  <MiniWebsiteMockup item={item} isExpanded={device === 'desktop'} />
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-slate-500">
                معاينة تقريبية للطابع البصري. الموقع النهائي يُبنى بالكامل باسمك وبياناتك وصورك وبنفس هذه الألوان.
              </p>
            </div>

            {/* Details */}
            <aside className="lg:col-span-4 space-y-5 text-right">
              <div>
                <h4 className="text-sm font-black text-slate-950 mb-2">ما يميّز هذا النمط</h4>
                <ul className="space-y-2">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-black text-slate-950 mb-2">يناسب</h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.suitableFor.map((s) => (
                    <span key={s} className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black text-slate-950 mb-2">صفحات موقعك</h4>
                <ul className="space-y-1.5">
                  {SITE_PAGES.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-2 text-xs text-slate-700">
                      <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-slate-950 text-white p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold">عرض الإطلاق</span>
                  <span className="font-black text-amber-400">{OFFER_PRICE}</span>
                </div>
                <div className="text-xs text-slate-300">
                  التسليم خلال {DELIVERY_TIME} — الدومين والاستضافة بسعر التكلفة.
                </div>
                <button
                  type="button"
                  onClick={() => onChooseDesign(item)}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm inline-flex items-center justify-center gap-2 transition-colors"
                >
                  اطلب هذا النمط
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <a
                  href={getWhatsAppLinkForDesign(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl border border-emerald-500/60 text-emerald-300 hover:bg-emerald-500/10 font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  اسأل عنه عبر واتساب
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
