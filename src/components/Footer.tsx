import { Scale, Phone, MessageCircle, ExternalLink, Zap } from 'lucide-react';
import { useUserIntent } from '../context/UserIntentContext';
import {
  BRAND_NAME,
  BRAND_TAGLINE,
  BRAND_DESCRIPTION,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  DEMO_URL,
  DEMO_LABEL,
  OFFER_PRICE,
  DELIVERY_TIME,
  DOMAIN_HOSTING_NOTE,
} from '../data/content';

const QUICK_LINKS = [
  { href: '#hero', label: 'الرئيسية' },
  { href: '#live-demo', label: 'النموذج الحي' },
  { href: '#features', label: 'المميزات' },
  { href: '#pricing', label: `عرض الـ ${OFFER_PRICE} والباقات` },
  { href: '#portfolio', label: 'أنماط التصميم' },
  { href: '#faq', label: 'الأسئلة الشائعة' },
];

export default function Footer() {
  const { currentWhatsAppUrl } = useUserIntent();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 text-slate-700 text-right border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                <Scale className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
              <div>
                <div className="font-black text-xl text-slate-950">{BRAND_NAME}</div>
                <div className="text-[11px] text-slate-500 font-semibold">{BRAND_TAGLINE}</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{BRAND_DESCRIPTION}</p>
            <div className="text-xs text-amber-800 font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>
                عرض الإطلاق: موقعك الشخصي بـ {OFFER_PRICE} — التسليم خلال {DELIVERY_TIME}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-950">روابط سريعة</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-slate-600 hover:text-amber-800 transition-colors font-medium">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-950">للتواصل والحجز</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <a
                  href={currentWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 font-bold text-slate-800"
                >
                  واتساب: <span dir="ltr" className="font-mono">{WHATSAPP_DISPLAY}</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-amber-800 font-mono font-bold text-slate-800" dir="ltr">
                  +{WHATSAPP_NUMBER}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-slate-500 shrink-0" />
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 font-medium text-slate-700"
                >
                  النموذج الحي: <span dir="ltr" className="font-mono">{DEMO_LABEL}</span>
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <a
                href="#contact-form"
                className="inline-block px-4 py-2 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-200 transition-colors"
              >
                اطلب موقعك بعرض الـ {OFFER_PRICE} ←
              </a>
            </div>
          </div>

          {/* Commitments */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-950">التزاماتنا</h4>
            <div className="bg-white rounded-xl p-4 border border-amber-200 space-y-2 text-xs">
              <div className="text-amber-800 font-black">التسليم خلال {DELIVERY_TIME} ⚡</div>
              <p className="text-slate-600 leading-relaxed">
                نلتزم بالموعد المتفق عليه، ونراجع معك الموقع قبل الإطلاق مع جولة تعديلات مجانية.
              </p>
              <p className="text-slate-500 leading-relaxed border-t border-slate-100 pt-2">{DOMAIN_HOSTING_NOTE}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div>
            © {year} {BRAND_NAME} — جميع الحقوق محفوظة
          </div>
          <div>صُنع للمحامين والمستشارين القانونيين في مصر</div>
        </div>
      </div>
    </footer>
  );
}
