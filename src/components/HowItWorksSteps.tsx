import { MousePointerClick, Sliders, Rocket, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function HowItWorksSteps() {
  const steps = [
    {
      step: '01',
      title: 'اختر تصميمك وسجل بياناتك',
      time: 'دقيقة واحدة فقط',
      desc: 'اختر واحداً من أنماط التصميم الخمسة، ثم املأ نموذج الطلب باسمك وتخصصك ورقم هاتفك — أو راسلنا على واتساب مباشرة.',
      icon: <MousePointerClick className="w-6 h-6 text-amber-700" />,
      badge: 'الخطوة الأولى',
      accent: 'border-amber-300 bg-amber-50/60',
    },
    {
      step: '02',
      title: 'نخصص الهوية والمحتوى القانوني',
      time: 'خلال 48 ساعة',
      desc: 'يقوم فريقنا بربط بياناتك، صورك، نبذة قضاياك، أرقام الواتساب، وعنوان مكتبك بدقة كاملة، مع إجراء أي تعديلات تفضلها مجاناً.',
      icon: <Sliders className="w-6 h-6 text-sky-700" />,
      badge: 'الخطوة الثانية',
      accent: 'border-sky-300 bg-sky-50/60',
    },
    {
      step: '03',
      title: 'إطلاق الموقع والتسليم النهائي',
      time: 'في يوم العمل الثالث ⚡',
      desc: 'نراجع معك النسخة النهائية، ثم نطلق الموقع على دومينك ونرسله لمحركات البحث لفهرسته، مع دعم فني بعد الإطلاق.',
      icon: <Rocket className="w-6 h-6 text-emerald-700" />,
      badge: 'الإطلاق',
      accent: 'border-emerald-300 bg-emerald-50/60',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-950 text-xs sm:text-sm font-bold border border-amber-300">
            <Clock className="w-4 h-4 text-amber-700" />
            <span>تسليم دقيق وسلس بدون تعقيد</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            كيف تستلم موقعك في 3 خطوات بسيطة؟
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            منظومة عمل واضحة تنقلك من إرسال بياناتك إلى موقع منشور على الإنترنت خلال 3 أيام عمل.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-7 border-2 transition-all duration-300 hover:shadow-lg flex flex-col justify-between text-right relative ${item.accent}`}
            >
              {/* Step Number Top Badge */}
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white text-slate-800 border border-slate-200 shadow-2xs">
                  {item.badge}
                </span>
                <span className="text-3xl font-black text-slate-400/80 font-mono">
                  {item.step}
                </span>
              </div>

              {/* Icon and Content */}
              <div className="space-y-3 flex-1">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                  {item.icon}
                </div>
                <h3 className="text-lg font-black text-slate-950">
                  {item.title}
                </h3>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>المدة: {item.time}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {item.desc}
                </p>
              </div>

              {/* Step Guarantee Footer */}
              <div className="mt-6 pt-3 border-t border-slate-200/70 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>مشمول ضمن عرض الـ 500 ج.م</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-12 bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">
                مراجعة معك قبل الإطلاق والتزام بالموعد
              </div>
              <div className="text-xs text-slate-600">
                باقة الـ 500: تشوف المعاينة الأول، وتدفع 100% بعد موافقتك وقبل النشر. الباقات الأعلى: 50% عند البدء و50% قبل التسليم.
              </div>
            </div>
          </div>
          <a
            href="#contact-form"
            className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors whitespace-nowrap"
          >
            ابدأ خطوتك الأولى الآن ←
          </a>
        </div>
      </div>
    </section>
  );
}
