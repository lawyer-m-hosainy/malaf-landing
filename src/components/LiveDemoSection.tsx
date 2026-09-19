import { ExternalLink, CheckCircle2, Globe, Smartphone, CalendarCheck, Newspaper, HelpCircle, MapPin } from 'lucide-react';
import { DEMO_URL, DEMO_LABEL, DEMO_TITLE, OFFER_PRICE, DELIVERY_TIME } from '../data/content';

const DEMO_PAGES = [
  { icon: Globe, label: 'الرئيسية والتخصصات (جنائي، مدني، أسرة، شركات)' },
  { icon: CalendarCheck, label: 'نموذج حجز استشارة يُرسل عبر واتساب' },
  { icon: Newspaper, label: 'مدونة مقالات قانونية توعوية' },
  { icon: HelpCircle, label: 'أسئلة قانونية شائعة مصنّفة' },
  { icon: MapPin, label: 'بيانات المكتب، العنوان، وأزرار الاتصال' },
  { icon: Smartphone, label: 'متجاوب بالكامل مع كل الهواتف والشاشات' },
];

export default function LiveDemoSection() {
  return (
    <section id="live-demo" className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Copy */}
          <div className="lg:col-span-5 text-right space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-bold border border-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>نموذج حي يمكنك تصفحه الآن</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              مش صور.. موقع حقيقي شغّال تقدر تفتحه من موبايلك
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              ده موقع فعلي لمكتب محاماة بالمنصورة تم تصميمه وتنفيذه بنفس المنهج اللي هنطبقه على موقعك.
              افتحه، تصفّح صفحاته، وجرّب نموذج حجز الاستشارة بنفسك.
            </p>

            <ul className="space-y-2.5">
              {DEMO_PAGES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <span className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="font-medium">{label}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black text-sm sm:text-base shadow-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>افتح النموذج الحي: {DEMO_LABEL}</span>
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 font-bold text-sm sm:text-base transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-700" />
                <span>
                  اطلب موقعك بـ {OFFER_PRICE} — تسليم خلال {DELIVERY_TIME}
                </span>
              </a>
            </div>
          </div>

          {/* Demo card */}
          <div className="lg:col-span-7">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl bg-white border-2 border-slate-200 shadow-2xl shadow-slate-900/10 overflow-hidden hover:border-emerald-400 transition-colors"
              aria-label={`فتح النموذج الحي ${DEMO_LABEL} في نافذة جديدة`}
            >
              {/* Browser chrome */}
              <div className="bg-slate-100 px-4 py-3 flex items-center justify-between border-b border-slate-200">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div
                  className="bg-white text-slate-700 px-4 py-1 rounded-full text-xs font-mono font-medium flex items-center gap-2 border border-slate-200"
                  dir="ltr"
                >
                  <span className="text-emerald-600">🔒</span>
                  <span>{DEMO_URL.replace('https://', '')}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>
              <img
                src="/demo/hosainy-cover.jpg"
                alt={DEMO_TITLE}
                width={1200}
                height={630}
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
              <div className="px-5 py-4 flex items-center justify-between gap-3 text-right bg-[#FAF9F5]">
                <div>
                  <div className="text-sm font-black text-slate-950">{DEMO_TITLE}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    موقع فعلي منشور على الإنترنت — يُعرض هنا كنموذج للجودة والمنهج
                  </div>
                </div>
                <span className="shrink-0 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg group-hover:bg-emerald-100 transition-colors">
                  تصفّح الموقع ←
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
