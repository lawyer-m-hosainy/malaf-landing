import { Clock, ArrowLeft, ShieldCheck, Flame, MessageCircle } from 'lucide-react';
import { useUserIntent } from '../context/UserIntentContext';
import { OFFER_PRICE, DELIVERY_TIME } from '../data/content';

export default function FinalCtaSection() {
  const { currentWhatsAppUrl } = useUserIntent();

  return (
    <section className="py-20 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] text-slate-900 relative overflow-hidden border-t border-amber-200">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-7">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs sm:text-sm font-bold">
          <Flame className="w-4 h-4 text-amber-600" />
          <span>
            عرض الإطلاق: {OFFER_PRICE} — لفترة محدودة
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 leading-tight">
          موكلك القادم يبحث عن محامي الآن على جوجل...
        </h2>

        <p className="text-xl sm:text-2xl font-black text-amber-800">هل سيجد مكتبك، أم سيجد منافسك؟</p>

        <p className="text-slate-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          لا تترك تواجدك الرقمي للصدفة. ابدأ في بناء «مَلَفـك» الاحترافي اليوم بعرض الـ {OFFER_PRICE}، واستلم موقعك
          خلال {DELIVERY_TIME}.
        </p>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            id="final-urgency-cta"
            href="#contact-form"
            className="pulse-gold w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-base sm:text-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>اطلب موقعك بعرض الـ {OFFER_PRICE}</span>
            <ArrowLeft className="w-5 h-5" />
          </a>
          <a
            href={currentWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-5 rounded-2xl font-bold text-base bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>أو تواصل عبر واتساب</span>
          </a>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-600 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            جولة تعديلات مجانية بعد التسليم
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-600" />
            التسليم خلال {DELIVERY_TIME}
          </span>
        </div>
      </div>
    </section>
  );
}
