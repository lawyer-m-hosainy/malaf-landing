import { CSSProperties } from 'react';
import { Scale, Phone, MessageCircle, ChevronLeft, ShieldCheck, Landmark, FileText, Users } from 'lucide-react';
import { PortfolioItem } from '../types';

interface MiniWebsiteMockupProps {
  item: PortfolioItem;
  /** Larger rendering inside the preview modal */
  isExpanded?: boolean;
}

/** Arabic serif face used for luxurious headings inside the mockups */
const SERIF: CSSProperties = { fontFamily: "'Amiri', 'Cairo', serif" };

const NAV = ['الرئيسية', 'من نحن', 'التخصصات', 'المقالات', 'تواصل معنا'];
const PILLARS = [
  { icon: ShieldCheck, label: 'السرية' },
  { icon: Landmark, label: 'الخبرة' },
  { icon: FileText, label: 'الدقة' },
  { icon: Users, label: 'المتابعة' },
];

/** Alpha-blended tint of a hex color (used for subtle borders/backgrounds) */
function tint(hex: string, alpha: number) {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function MiniWebsiteMockup({ item, isExpanded = false }: MiniWebsiteMockupProps) {
  const p = item.palette;
  const isDark = item.palette.bg === item.palette.primary;
  const frame = `w-full ${isExpanded ? 'min-h-[480px]' : 'h-[290px]'} relative overflow-hidden select-none text-right font-['Cairo',sans-serif] flex flex-col`;
  const base: CSSProperties = { backgroundColor: p.bg, color: p.text };
  const nameSize = isExpanded ? 'text-2xl sm:text-3xl' : 'text-[15px]';
  const bodySize = isExpanded ? 'text-sm' : 'text-[10px]';
  const tiny = isExpanded ? 'text-xs' : 'text-[9px]';

  const Monogram = ({ size = 28 }: { size?: number }) => (
    <div
      className="rounded-full flex items-center justify-center shrink-0"
      style={{ width: size, height: size, border: `1px solid ${p.accent}`, color: p.accent }}
    >
      <Scale style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={1.6} />
    </div>
  );

  const CtaPrimary = ({ label = 'احجز استشارة' }: { label?: string }) => (
    <span
      className={`${tiny} font-bold px-3 py-1.5 rounded-sm inline-flex items-center gap-1`}
      style={{ backgroundColor: p.accent, color: isDark ? p.primary : '#FFFFFF' }}
    >
      {label}
      <ChevronLeft className="w-3 h-3" />
    </span>
  );

  const CtaGhost = ({ label = 'واتساب' }: { label?: string }) => (
    <span
      className={`${tiny} font-semibold px-3 py-1.5 rounded-sm inline-flex items-center gap-1`}
      style={{ border: `1px solid ${tint(isDark ? p.text : p.primary, 0.35)}`, color: isDark ? p.text : p.primary }}
    >
      <MessageCircle className="w-3 h-3" />
      {label}
    </span>
  );

  const Nav = ({ inverted = false }: { inverted?: boolean }) => (
    <div
      className={`flex items-center justify-between ${isExpanded ? 'px-6 py-3' : 'px-3 py-2'}`}
      style={{ borderBottom: `1px solid ${tint(inverted ? '#FFFFFF' : p.accent, 0.25)}` }}
    >
      <div className="flex items-center gap-2">
        <Monogram size={isExpanded ? 30 : 22} />
        <span className={`${tiny} font-bold truncate max-w-[130px] sm:max-w-none`}>{item.officeName}</span>
      </div>
      <div className={`hidden sm:flex items-center gap-3 ${tiny}`} style={{ color: p.muted }}>
        {NAV.map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
      <span className={`${tiny} font-bold inline-flex items-center gap-1`} style={{ color: p.accent }}>
        <Phone className="w-3 h-3" />
        <span dir="ltr">0100 000 0000</span>
      </span>
    </div>
  );

  const Pillars = ({ cols = 4 }: { cols?: number }) => (
    <div className={`grid gap-2 ${cols === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
      {PILLARS.slice(0, cols).map(({ icon: Icon, label }) => (
        <div
          key={label}
          className={`rounded-sm ${isExpanded ? 'p-3' : 'p-1.5'} text-center`}
          style={{ backgroundColor: tint(isDark ? '#FFFFFF' : p.primary, 0.06), border: `1px solid ${tint(p.accent, 0.3)}` }}
        >
          <Icon className={`${isExpanded ? 'w-4 h-4' : 'w-3 h-3'} mx-auto mb-0.5`} style={{ color: p.accent }} strokeWidth={1.6} />
          <div className={`${tiny} font-bold`}>{label}</div>
        </div>
      ))}
    </div>
  );

  /* ------------------------------------------------------------------ */
  /* 1. SPLIT — classic navy: text right, framed “photo” block left       */
  /* ------------------------------------------------------------------ */
  if (item.layout === 'split') {
    return (
      <div className={frame} style={base}>
        <Nav />
        <div className={`flex-1 grid grid-cols-5 gap-3 ${isExpanded ? 'p-6' : 'p-3'} items-center`}>
          <div className="col-span-3 space-y-2">
            <div className={`${tiny} font-bold tracking-wider`} style={{ color: p.accent }}>
              {item.specialty} — القاهرة
            </div>
            <h3 className={`${nameSize} font-bold leading-snug`} style={SERIF}>
              {item.officeName}
            </h3>
            <div className="h-px w-16" style={{ backgroundColor: p.accent }} />
            <p className={`${bodySize} leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`} style={{ color: p.muted }}>
              {item.heroTagline}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <CtaPrimary />
              <CtaGhost />
            </div>
          </div>
          <div className="col-span-2 h-full min-h-[120px] relative">
            <div className="absolute inset-0 rounded-sm" style={{ border: `1px solid ${p.accent}`, transform: 'translate(6px, 6px)' }} />
            <div
              className="absolute inset-0 rounded-sm flex items-center justify-center"
              style={{ backgroundColor: p.surface, border: `1px solid ${tint(p.accent, 0.4)}` }}
            >
              <Scale className={isExpanded ? 'w-20 h-20' : 'w-12 h-12'} style={{ color: tint(p.accent, 0.55) }} strokeWidth={1} />
            </div>
          </div>
        </div>
        <div className={`${isExpanded ? 'px-6 pb-5' : 'px-3 pb-3'}`}>
          <Pillars />
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /* 2. CENTERED — royal emerald: big centered heading + service columns */
  /* ------------------------------------------------------------------ */
  if (item.layout === 'centered') {
    return (
      <div className={frame} style={base}>
        <Nav />
        <div className={`flex-1 flex flex-col items-center justify-center text-center ${isExpanded ? 'px-8 py-6' : 'px-4 py-3'} space-y-2`}>
          <Monogram size={isExpanded ? 44 : 30} />
          <h3 className={`${nameSize} font-bold leading-snug`} style={SERIF}>
            {item.officeName}
          </h3>
          <div className="flex items-center gap-2">
            <span className="h-px w-8" style={{ backgroundColor: p.accent }} />
            <span className={`${tiny} font-bold`} style={{ color: p.accent }}>
              {item.specialty}
            </span>
            <span className="h-px w-8" style={{ backgroundColor: p.accent }} />
          </div>
          <p className={`${bodySize} leading-relaxed max-w-md ${isExpanded ? '' : 'line-clamp-2'}`} style={{ color: p.muted }}>
            {item.heroTagline}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <CtaPrimary />
            <CtaGhost />
          </div>
        </div>
        <div className={`grid grid-cols-3 ${isExpanded ? 'px-6 pb-5 gap-3' : 'px-3 pb-3 gap-2'}`}>
          {['تأسيس الشركات', 'صياغة العقود', 'التمثيل القضائي'].map((s, i) => (
            <div
              key={s}
              className={`rounded-sm ${isExpanded ? 'p-3' : 'p-2'}`}
              style={{ backgroundColor: p.surface, borderTop: `2px solid ${p.accent}` }}
            >
              <div className={`${tiny} font-bold`} style={{ color: p.accent }}>
                0{i + 1}
              </div>
              <div className={`${tiny} font-bold`}>{s}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /* 3. EDITORIAL — burgundy on cream: magazine heading + numbered list  */
  /* ------------------------------------------------------------------ */
  if (item.layout === 'editorial') {
    return (
      <div className={frame} style={base}>
        <div
          className={`flex items-center justify-between ${isExpanded ? 'px-6 py-3' : 'px-3 py-2'}`}
          style={{ backgroundColor: p.primary, color: '#FBF7F2' }}
        >
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4" style={{ color: p.accent }} strokeWidth={1.6} />
            <span className={`${tiny} font-bold`}>{item.officeName}</span>
          </div>
          <span className={`${tiny}`} style={{ color: p.accent }}>
            احجز استشارة
          </span>
        </div>
        <div className={`flex-1 grid grid-cols-5 ${isExpanded ? 'p-6 gap-6' : 'p-3 gap-3'}`}>
          <div className="col-span-3 space-y-2">
            <div className={`${tiny} font-bold tracking-widest`} style={{ color: p.accent }}>
              {item.specialty}
            </div>
            <h3 className={`${isExpanded ? 'text-3xl sm:text-4xl' : 'text-lg'} font-bold leading-[1.15]`} style={{ ...SERIF, color: p.primary }}>
              سندك القانوني في أدق شؤون الأسرة
            </h3>
            <p className={`${bodySize} leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`} style={{ color: p.muted }}>
              {item.heroTagline}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <CtaPrimary />
              <CtaGhost />
            </div>
          </div>
          <div className="col-span-2 space-y-1.5" style={{ borderRight: `1px solid ${tint(p.accent, 0.5)}`, paddingRight: isExpanded ? 16 : 8 }}>
            {['الطلاق والخلع', 'النفقة والحضانة', 'المواريث والتركات'].map((s, i) => (
              <div key={s} className="flex items-baseline gap-2">
                <span className={`${isExpanded ? 'text-xl' : 'text-sm'} font-bold`} style={{ ...SERIF, color: p.accent }}>
                  0{i + 1}
                </span>
                <span className={`${tiny} font-bold`} style={{ color: p.primary }}>
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={`${isExpanded ? 'px-6 pb-5' : 'px-3 pb-3'}`}>
          <Pillars cols={3} />
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /* 4. SIDEBAR — charcoal & copper: fixed side nav + bold heading       */
  /* ------------------------------------------------------------------ */
  if (item.layout === 'sidebar') {
    return (
      <div className={frame.replace('flex-col', 'flex-row')} style={base}>
        <aside
          className={`${isExpanded ? 'w-40 p-4' : 'w-24 p-2.5'} shrink-0 flex flex-col justify-between`}
          style={{ backgroundColor: p.surface, borderLeft: `1px solid ${tint(p.accent, 0.35)}` }}
        >
          <div className="space-y-3">
            <Monogram size={isExpanded ? 36 : 26} />
            <div className={`${tiny} font-bold leading-snug`}>{item.officeName}</div>
            <div className={`space-y-1.5 ${tiny}`} style={{ color: p.muted }}>
              {NAV.map((n, i) => (
                <div key={n} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: i === 0 ? p.accent : tint(p.muted, 0.5) }} />
                  <span style={{ color: i === 0 ? p.accent : undefined }}>{n}</span>
                </div>
              ))}
            </div>
          </div>
          <CtaGhost label="واتساب" />
        </aside>
        <div className={`flex-1 flex flex-col justify-between ${isExpanded ? 'p-6' : 'p-3'}`}>
          <div className="space-y-2">
            <div className={`${tiny} font-bold`} style={{ color: p.accent }}>
              {item.specialty}
            </div>
            <h3 className={`${isExpanded ? 'text-3xl' : 'text-base'} font-black leading-tight`}>
              وضوح في العقد.. <span style={{ color: p.accent }}>واطمئنان</span> في الملكية.
            </h3>
            <p className={`${bodySize} leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`} style={{ color: p.muted }}>
              {item.heroTagline}
            </p>
            <CtaPrimary label="اطلب مراجعة عقدك" />
          </div>
          <div className={`grid grid-cols-3 ${isExpanded ? 'gap-3' : 'gap-1.5'}`}>
            {['تسجيل الملكيات', 'عقود المقاولات', 'المنازعات التجارية'].map((s) => (
              <div key={s} className={`rounded-sm ${isExpanded ? 'p-3' : 'p-1.5'}`} style={{ border: `1px solid ${tint(p.accent, 0.5)}` }}>
                <div className={`${tiny} font-bold`}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /* 5. MINIMAL — ivory & slate: airy, thin rules, academic tone         */
  /* ------------------------------------------------------------------ */
  return (
    <div className={frame} style={base}>
      <div className={`flex items-center justify-between ${isExpanded ? 'px-6 py-3' : 'px-3 py-2'}`} style={{ borderBottom: `1px solid ${tint(p.primary, 0.15)}` }}>
        <span className={`${tiny} font-bold`} style={{ color: p.primary }}>
          {item.officeName}
        </span>
        <div className={`hidden sm:flex items-center gap-3 ${tiny}`} style={{ color: p.muted }}>
          {NAV.slice(0, 4).map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
        <span className={`${tiny} font-bold`} style={{ color: p.accent }}>
          احجز استشارة
        </span>
      </div>
      <div className={`flex-1 flex flex-col justify-center ${isExpanded ? 'px-10 py-6' : 'px-5 py-3'} space-y-2`}>
        <div className={`${tiny} font-bold tracking-[0.2em]`} style={{ color: p.accent }}>
          {item.specialty}
        </div>
        <h3 className={`${isExpanded ? 'text-3xl sm:text-4xl' : 'text-lg'} font-bold leading-snug`} style={{ ...SERIF, color: p.primary }}>
          {item.officeName}
        </h3>
        <p className={`${bodySize} leading-relaxed max-w-lg ${isExpanded ? '' : 'line-clamp-2'}`} style={{ color: p.muted }}>
          {item.heroTagline}
        </p>
        <div className="flex items-center gap-4 pt-1">
          <CtaPrimary label="طلب استشارة" />
          <span className={`${tiny} font-semibold underline underline-offset-4`} style={{ color: p.primary }}>
            السيرة العلمية والمهنية ←
          </span>
        </div>
      </div>
      <div className={`grid grid-cols-3 ${isExpanded ? 'px-10 pb-6 gap-6' : 'px-5 pb-3 gap-3'}`}>
        {['دعاوى الإلغاء والتعويض', 'منازعات العمل والتأمينات', 'الاستشارات المكتوبة'].map((s) => (
          <div key={s} className={`${tiny} font-bold pt-2`} style={{ borderTop: `1px solid ${p.accent}`, color: p.primary }}>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
