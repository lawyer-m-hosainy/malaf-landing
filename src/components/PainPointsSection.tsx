import { Search, UserX, TrendingDown, ArrowDown } from 'lucide-react';
import { PAIN_POINTS } from '../data/content';

export default function PainPointsSection() {
  const getIcon = (id: string) => {
    switch (id) {
      case 'pain-1':
        return <Search className="w-7 h-7 text-red-500" />;
      case 'pain-2':
        return <UserX className="w-7 h-7 text-amber-500" />;
      case 'pain-3':
        return <TrendingDown className="w-7 h-7 text-rose-500" />;
      default:
        return <Search className="w-7 h-7 text-red-500" />;
    }
  };

  return (
    <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs sm:text-sm font-bold">
            <span>واقع السوق القانوني في مصر</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            بدون موقع شخصي، أنت بتخسر عملاء كل يوم
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            سلوك الموكل اتغيّر؛ قبل ما يرفع سماعة التليفون أو يروح مكتبك، بيكتب اسمك على جوجل.. فماذا يرى؟
          </p>
        </div>

        {/* 3 Pain Point Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {PAIN_POINTS.map((pain) => (
            <div
              key={pain.id}
              className="relative group bg-white rounded-2xl p-8 border border-red-100 shadow-sm hover:shadow-xl hover:border-red-300 transition-all duration-300 text-right flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {getIcon(pain.id)}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100">
                    {pain.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0F172A] pt-2">{pain.title}</h3>

                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {pain.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-red-500/80 flex items-center gap-1">
                <span>أثر مباشر على فرصك في الحصول على موكلين جدد</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Transition */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-4 rounded-2xl bg-amber-50 text-slate-900 shadow-sm border border-amber-300/80">
            <span className="text-base sm:text-lg font-black text-amber-900">
              الحل: موقع شخصي احترافي يعرض خبرتك ويسهّل التواصل معك 24/7
            </span>
            <a
              href="#features"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-amber-800 hover:text-amber-950 transition-colors bg-white px-4 py-1.5 rounded-full border border-amber-300 shadow-sm"
            >
              <span>شوف إيه اللي هيكون في موقعك</span>
              <ArrowDown className="w-4 h-4 animate-bounce text-amber-600" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
