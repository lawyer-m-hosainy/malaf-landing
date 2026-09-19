import { Zap, ShieldCheck, Smartphone, Search, Award, Check } from 'lucide-react';

export default function PerformanceBadgesSection() {
  const specs = [
    {
      score: 'سريع',
      title: 'تحميل سريع على الموبايل',
      desc: 'كود خفيف بدون إضافات ثقيلة، وصور مضغوطة، ليفتح الموقع بسرعة على شبكات الموبايل.',
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      accent: 'border-amber-200 bg-amber-50/40 text-amber-950',
    },
    {
      score: 'HTTPS',
      title: 'شهادة أمان SSL',
      desc: 'الموقع يعمل عبر اتصال مشفّر بشهادة أمان، بدون أي تحذيرات في المتصفح.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      accent: 'border-emerald-200 bg-emerald-50/40 text-emerald-950',
    },
    {
      score: 'متجاوب',
      title: 'توافق كامل مع الموبايل',
      desc: 'تجربة تصفح مريحة على هواتف iPhone وAndroid وكل مقاسات الشاشات.',
      icon: <Smartphone className="w-5 h-5 text-sky-600" />,
      accent: 'border-sky-200 bg-sky-50/40 text-sky-950',
    },
    {
      score: 'SEO',
      title: 'تهيئة لمحركات البحث',
      desc: 'بيانات وصفية وبنية صحيحة (Schema.org) تساعد جوجل على فهم اسمك وتخصصك ومحافظتك.',
      icon: <Search className="w-5 h-5 text-purple-600" />,
      accent: 'border-purple-200 bg-purple-50/40 text-purple-950',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F6] rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm text-right">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              <span>جودة تقنية تليق بمكتب محاماة</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
              موقعك مبني بمعايير حديثة في السرعة والأمان
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              نفس المنهج التقني المستخدم في النموذج الحي، بدون قوالب ثقيلة أو إضافات مكررة.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {specs.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all duration-200 hover:shadow-md space-y-2 ${item.accent}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-lg tracking-tight">
                    {item.score}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                    {item.icon}
                  </div>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
            <span className="flex items-center gap-1 font-medium">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> استضافة سحابية سريعة (بسعر التكلفة)
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> دعم فني ومتابعة مستمرة
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> نسخة من ملفات الموقع تُسلَّم لك
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
