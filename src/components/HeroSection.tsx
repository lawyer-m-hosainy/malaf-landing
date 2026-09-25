import { MessageCircle, ArrowLeft, ShieldCheck, Clock, Eye } from 'lucide-react';
import { BOT_ORDER_LINK, DELIVERY_TIME, DEMO_LABEL, DEMO_URL, OFFER_PRICE } from '../data/content';

/**
 * الواجهة: رسالة واحدة وزرار واحد (بوت الطلبات على واتساب) + طمأنة "المعاينة قبل الدفع".
 * صورة النموذج الحي على اليسار في الشاشات الكبيرة، وتحت النص على الموبايل.
 */
export default function HeroSection() {
  return (
    <section id="hero" className="bg-gradient-to-b from-[#FAF8F5] to-white border-b border-amber-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-right space-y-6">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-amber-900 bg-amber-100 border border-amber-300 rounded-full px-4 py-1.5">
            ⚖️ من محامٍ لزملائه المحامين
          </p>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight text-slate-950">
            موقعك الشخصي كمحامٍ
            <br />
            <span className="text-amber-700">جاهز في {DELIVERY_TIME}</span>… وتشوفه قبل ما تدفع.
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl">
            موقع كامل بمحتوى قانوني مكتوب حسب تخصصك ومدينتك، مهيّأ لجوجل، وبتصميم يليق بالمهنة — بـ {OFFER_PRICE}.
          </p>

          <div className="space-y-3">
            <a
              href={BOT_ORDER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-lg shadow-lg shadow-amber-500/25 transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              اطلب موقعك على واتساب
            </a>
            <p className="text-sm text-slate-600">
              ابعت «طلب» والبوت هياخد بياناتك في 3 دقائق. <strong className="text-slate-800">المعاينة مجاناً قبل الدفع.</strong>
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700 font-medium">
            <li className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-amber-700" aria-hidden="true" /> معاينة كاملة قبل الدفع
            </li>
            <li className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-700" aria-hidden="true" /> تسليم خلال {DELIVERY_TIME}
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" aria-hidden="true" /> بلا وعود تخالف آداب المهنة
            </li>
          </ul>
        </div>

        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
          aria-label={`افتح النموذج الحي ${DEMO_LABEL}`}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 border-b border-slate-200" dir="ltr">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="ml-3 text-xs font-mono text-slate-500">{DEMO_LABEL}</span>
          </div>
          <img
            src="/demo/hosainy-cover.jpg"
            alt={`نموذج حي لموقع محامٍ — ${DEMO_LABEL}`}
            width={1200}
            height={750}
            className="w-full h-auto"
            loading="eager"
          />
          <div className="px-4 py-3 text-sm font-bold text-amber-800 flex items-center justify-between">
            <span>نموذج حي لموقع محامٍ حقيقي</span>
            <span className="inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              افتحه <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
