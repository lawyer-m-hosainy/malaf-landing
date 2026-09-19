import { ShieldCheck, Clock, ArrowLeft, Eye, CheckCircle2, Scale, Zap, ExternalLink, Globe } from 'lucide-react';
import { DEMO_URL, DEMO_LABEL, OFFER_PRICE, DELIVERY_TIME } from '../data/content';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4F0E8] to-[#FAF8F5] text-slate-900 pt-10 pb-20 lg:pt-14 lg:pb-24 border-b border-amber-200/50"
    >
      {/* Decorative Legal Watermarks & Soft Ambient Warmth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-[0.04]">
        <Scale className="absolute -top-12 -left-12 w-96 h-96 text-slate-900" />
        <Scale className="absolute -bottom-16 -right-16 w-80 h-80 text-amber-900" />
      </div>

      <div className="absolute top-1/4 right-1/2 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Right Column: Hero Content */}
          <div className="lg:col-span-7 text-right space-y-6">
            {/* Offer Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-950 text-xs sm:text-sm font-black shadow-sm">
              <Zap className="w-4 h-4 text-amber-700 fill-amber-500" />
              <span>عرض الإطلاق: موقعك الشخصي بـ {OFFER_PRICE} — التسليم خلال {DELIVERY_TIME}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black leading-[1.25] text-slate-950 tracking-tight">
              موقعك الشخصي هو{' '}
              <span className="text-amber-800 underline decoration-amber-500/60 decoration-wavy underline-offset-8">
                أول انطباع
              </span>{' '}
              عند موكلك القادم — خلّيه يليق بهيبتك
            </h1>

            {/* Subtitle */}
            <p className="text-slate-700 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-normal">
              نصمملك واجهة رقمية احترافية تليق بمكانتك القانونية وتجذب موكليك على مدار الساعة{' '}
              <span className="text-amber-800 font-black">24/7</span> — متوافقة بالكامل مع الموبايل، وبدون أي تعقيدات تقنية.
            </p>

            {/* Dual CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                id="hero-primary-cta"
                href="#pricing"
                className="pulse-gold px-8 py-4 rounded-xl text-base font-black bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-xl shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <span>اطلب موقعك بعرض الـ {OFFER_PRICE}</span>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </a>

              <a
                id="hero-secondary-cta"
                href="#live-demo"
                className="px-7 py-4 rounded-xl text-base font-bold bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-amber-400 transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5 text-amber-700" />
                <span>شاهد نموذجاً حياً</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
                  <Clock className="w-4 h-4 text-emerald-700" />
                </div>
                <span className="font-bold text-slate-800">التسليم خلال {DELIVERY_TIME}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 text-amber-700" />
                </div>
                <span className="font-bold text-slate-800">نموذج حي تقدر تتصفحه</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-sky-700" />
                </div>
                <span className="font-bold text-slate-800">جولة تعديلات مجانية</span>
              </div>
            </div>
          </div>

          {/* Left Column: Interactive Browser Frame Mockup in Light Aesthetic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Floating Live Demo Badge (real, browsable site) */}
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -top-4 -right-4 sm:-right-6 z-20 bg-white border border-emerald-300 rounded-2xl p-3 shadow-xl flex items-center gap-3 float-gentle hover:border-emerald-500 transition-colors"
                aria-label={`فتح النموذج الحي ${DEMO_LABEL}`}
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500">نموذج حي حقيقي</div>
                  <div className="text-sm font-black text-slate-900" dir="ltr">{DEMO_LABEL}</div>
                </div>
              </a>

              {/* Browser Mockup Window */}
              <div className="rounded-2xl bg-white border-2 border-slate-200/90 shadow-2xl shadow-amber-950/10 overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
                {/* Browser Chrome Bar */}
                <div className="bg-slate-100/90 px-4 py-3 flex items-center justify-between border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="bg-white text-slate-700 px-4 py-1 rounded-full text-xs font-mono font-medium flex items-center gap-2 border border-slate-200 shadow-inner">
                    <span className="text-emerald-600">🔒</span>
                    <span dir="ltr">https://اسم-مكتبك.com</span>
                  </div>
                  <div className="text-slate-400 text-xs">•••</div>
                </div>

                {/* Website Preview Inside Mockup - Light & Elegant */}
                <div className="bg-[#FAF9F5] p-5 space-y-4 text-right">
                  {/* Mock Lawyer Top Navigation */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs border border-amber-300">
                        ⚖️
                      </div>
                      <div className="text-xs font-bold text-slate-900">مكتب المستشار / أحمد عبد الرحمن</div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-bold">
                      متاح للاستشارات
                    </span>
                  </div>

                  {/* Mock Lawyer Hero Banner */}
                  <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                        قانون جنائي ونقض
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">خبرة 18 سنة</span>
                    </div>

                    <h2 className="text-sm font-black text-slate-900 leading-snug">
                      تمثيل قانوني واضح يحمي مصالحك — استشارات ودفاع في الجنايات والنقض
                    </h2>

                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      استشارات قانونية دقيقة وتمثيل احترافي يستند إلى دراسة وافية للوقائع، مع الالتزام بالسرية التامة.
                    </p>

                    <div className="pt-1 flex items-center gap-2">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[11px] px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">
                        <span>احجز استشارة</span>
                      </div>
                      <div className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200">
                        راسلنا عبر واتساب
                      </div>
                    </div>
                  </div>

                  {/* Mock Features Mini Strip */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">
                      <div className="text-amber-800 font-black text-xs">18 سنة</div>
                      <div className="text-slate-600 font-medium">خبرة مهنية</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">
                      <div className="text-emerald-700 font-black text-xs">24/7</div>
                      <div className="text-slate-600 font-medium">حجز أونلاين</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">
                      <div className="text-blue-700 font-black text-xs">100%</div>
                      <div className="text-slate-600 font-medium">سرية تامة</div>
                    </div>
                  </div>

                  {/* Footer ribbon inside mockup */}
                  <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      متوافق تماماً مع شاشات الموبايل
                    </span>
                    <span className="text-amber-800 font-bold">التسليم خلال {DELIVERY_TIME}</span>
                  </div>
                </div>
              </div>

              {/* Subtle Bottom Caption */}
              <div className="text-center mt-3 text-xs text-slate-600 flex items-center justify-center gap-2">
                <span>تصميم توضيحي لشكل الموقع (الأسماء والبيانات افتراضية)</span>
                <span className="text-amber-600">✦</span>
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-800 font-bold underline hover:text-emerald-600">
                  افتح الموقع الحقيقي {DEMO_LABEL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
