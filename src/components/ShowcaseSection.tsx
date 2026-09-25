import { ExternalLink } from 'lucide-react';
import { DEMO_LABEL, DEMO_URL, LAWYER_DESIGNS } from '../data/content';

/** النموذج الحي + الأنماط الخمسة في قسم واحد (بدل "النموذج الحي" و"الأنماط" و"قبل/بعد"). */
export default function ShowcaseSection() {
  return (
    <section id="showcase" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950">اختار شكل موقعك</h2>
          <p className="text-slate-600 text-base sm:text-lg">
            5 أنماط تصميم هادية تليق بالمحاماة. البوت هيسألك تختار واحد، وتقدر تغيّره في المعاينة.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {LAWYER_DESIGNS.map((d) => (
            <li key={d.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
              <div className="h-24 relative" style={{ backgroundColor: d.palette.bg }} aria-hidden="true">
                <div className="absolute inset-x-4 top-5 h-2 rounded-full" style={{ backgroundColor: d.palette.accent }} />
                <div className="absolute inset-x-4 top-10 h-1.5 w-2/3 rounded-full opacity-70" style={{ backgroundColor: d.palette.text }} />
                <div className="absolute inset-x-4 top-14 h-1.5 w-1/2 rounded-full opacity-40" style={{ backgroundColor: d.palette.text }} />
              </div>
              <div className="p-4 text-right space-y-1">
                <p className="text-xs font-bold text-slate-400">نمط {d.designNumber}</p>
                <h3 className="font-black text-slate-950">{d.title}</h3>
                <p className="text-sm text-slate-600">{d.tag}</p>
                <p className="text-xs text-slate-500 pt-1">يناسب: {d.suitableFor.slice(0, 2).join('، ')}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            شوف موقع حقيقي معمول بنفس الطريقة: <span dir="ltr" className="font-mono">{DEMO_LABEL}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
