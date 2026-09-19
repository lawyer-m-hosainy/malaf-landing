import { XCircle, CheckCircle2, ArrowLeftRight } from 'lucide-react';
import { BEFORE_AFTER_ITEMS } from '../data/content';

export default function BeforeAfterSection() {
  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold">
            <ArrowLeftRight className="w-4 h-4 text-amber-600" />
            <span>المقارنة الواقعية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            الفرق اللي الموقع بيعمله في مسيرتك المهنية
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            شوف الفارق الملموس بين إدارة مكتبك بالطرق التقليدية وبين امتلاك واجهة رقمية احترافية.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before: Red / Gray */}
          <div className="rounded-3xl p-8 bg-red-50/50 border-2 border-red-200/80 text-right space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-red-200/60 pb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-700">
                الوضع الحالي الشائع
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-red-900">
                {BEFORE_AFTER_ITEMS.before.title}
              </h3>
            </div>

            <ul className="space-y-4">
              {BEFORE_AFTER_ITEMS.before.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-red-950/80">
                  <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <span className="leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After: Green / Gold */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-emerald-50/60 via-amber-50/30 to-emerald-50/60 border-2 border-emerald-300 text-right space-y-6 shadow-lg shadow-emerald-500/5 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                بعد إطلاق موقعك معنا
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-emerald-950">
                {BEFORE_AFTER_ITEMS.after.title}
              </h3>
            </div>

            <ul className="space-y-4">
              {BEFORE_AFTER_ITEMS.after.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-emerald-950 font-medium">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
