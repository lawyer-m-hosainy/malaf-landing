import { MessageCircle, Eye, Rocket } from 'lucide-react';
import { BOT_ORDER_LINK, DELIVERY_TIME } from '../data/content';

const STEPS = [
  {
    icon: MessageCircle,
    title: 'اطلب على واتساب',
    time: '3 دقائق',
    desc: 'ابعت «طلب» للبوت، وجاوب على 5 أسئلة: اسم المكتب، والمدينة، والتخصصات، ونمط التصميم.',
  },
  {
    icon: Eye,
    title: 'استلم المعاينة',
    time: `خلال ${DELIVERY_TIME}`,
    desc: 'بيوصلك رابط موقعك كامل على واتساب. تصفّحه من الموبايل والكمبيوتر، وقولّنا على أي تعديل.',
  },
  {
    icon: Rocket,
    title: 'ادفع لو عجبك وننشره',
    time: 'خلال يوم عمل',
    desc: 'بعد موافقتك وسدادك، بننشر الموقع على اسم-مكتبك.malaf.pro (أو دومينك الخاص في الباقات الأعلى).',
  },
];

export default function HowItWorksSteps() {
  return (
    <section id="how-it-works" className="py-20 bg-[#FAF8F5] border-b border-amber-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl font-black text-slate-950">إزاي بنشتغل؟</h2>

        <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-white border border-slate-200 p-6 text-right shadow-sm">
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <s.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="text-3xl font-black text-slate-300 font-mono" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-black text-slate-950">{s.title}</h3>
              <p className="text-xs font-bold text-amber-800 mt-1">{s.time}</p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <a
            href={BOT_ORDER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            ابدأ الخطوة الأولى
          </a>
        </div>
      </div>
    </section>
  );
}
