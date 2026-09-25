import { Scale, Eye, MessageCircle, SearchCheck } from 'lucide-react';
import { DELIVERY_TIME } from '../data/content';

/** "ليه مَلَف" — 4 أسباب بس (بدل أقسام المشاكل والمميزات وقبل/بعد وشارات الأداء). */
const REASONS = [
  {
    icon: Scale,
    title: 'من محامٍ لزملائه',
    desc: 'مَلَف من تأسيس محامٍ ممارس؛ فالمحتوى مكتوب بلغة المهنة، ملتزم بآدابها، ومن غير أي وعود بنتائج.',
  },
  {
    icon: Eye,
    title: 'تشوفه قبل ما تدفع',
    desc: 'المعاينة مجانية بالكامل. لو الموقع ماعجبكش، مش هتدفع حاجة.',
  },
  {
    icon: MessageCircle,
    title: 'من واتساب وفي أيام',
    desc: `طلبك في 3 دقائق مع البوت، وموقعك جاهز خلال ${DELIVERY_TIME}. من غير اجتماعات ولا مصطلحات تقنية.`,
  },
  {
    icon: SearchCheck,
    title: 'مبني للمحاماة تحديداً',
    desc: 'محتوى حسب تخصصك ومدينتك، ومهيّأ لجوجل كمكتب محاماة — مش قالب عام زي أي موقع.',
  },
];

export default function WhySection() {
  return (
    <section id="why" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl font-black text-slate-950">ليه مَلَف؟</h2>
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {REASONS.map((r) => (
            <li key={r.title} className="flex gap-4 p-6 rounded-2xl border border-slate-200 text-right">
              <span className="w-12 h-12 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0">
                <r.icon className="w-6 h-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-950">{r.title}</h3>
                <p className="mt-1 text-slate-600 leading-relaxed">{r.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
