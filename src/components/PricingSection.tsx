import { Check, X, MessageCircle } from 'lucide-react';
import {
  BOT_ORDER_LINK,
  BRAND_NAME,
  DOMAIN_HOSTING_NOTE,
  PAYMENT_TERMS_BASIC,
  PAYMENT_TERMS_PRO,
  PRICING_PACKAGES,
  getWhatsAppLink,
} from '../data/content';

/**
 * الباقات: الأساسية بتروح لبوت الطلبات (بيسجّلها أوتوماتيك)،
 * والمحترف والمتكامل لرقم المبيعات لأن فيهم كتابة محتوى ودومين خاص بيتفق عليهم مع المالك.
 */
const packageLink = (id: string, name: string, price: string) =>
  id === 'basic' ? BOT_ORDER_LINK : getWhatsAppLink(`السلام عليكم ${BRAND_NAME}، أنا محامي وعايز باقة «${name}» (${price}) لمكتبي.`);

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-[#FAF8F5] border-b border-amber-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950">الباقات</h2>
          <p className="text-slate-600 text-base sm:text-lg">كل الباقات بموقع كامل ومعاينة مجانية قبل الدفع. الفرق في اللي بنعمله معاك زيادة.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col rounded-3xl bg-white p-7 text-right ${
                pkg.recommended ? 'border-2 border-amber-500 shadow-xl shadow-amber-900/10' : 'border border-slate-200 shadow-sm'
              }`}
            >
              <span
                className={`self-start text-xs font-bold px-3 py-1 rounded-full ${
                  pkg.recommended ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {pkg.badge}
              </span>
              <h3 className="mt-4 text-2xl font-black text-slate-950">{pkg.name}</h3>
              <p className="mt-2 text-4xl font-black text-amber-800">{pkg.price}</p>

              <ul className="mt-6 space-y-3 flex-1">
                {pkg.features.map((f) => (
                  <li key={f.text} className={`flex items-start gap-2.5 text-sm ${f.included ? 'text-slate-800' : 'text-slate-400'}`}>
                    {f.included ? (
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                    ) : (
                      <X className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                    )}
                    <span>
                      {f.text}
                      {!f.included && <span className="sr-only"> (غير مشمول)</span>}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={packageLink(pkg.id, pkg.name, pkg.price)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-black text-sm transition-colors ${
                  pkg.recommended
                    ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950'
                    : 'bg-slate-950 hover:bg-slate-800 text-white'
                }`}
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {pkg.ctaText}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-3xl mx-auto space-y-2 text-center text-sm text-slate-600 leading-relaxed">
          <p>
            💳 {PAYMENT_TERMS_BASIC} {PAYMENT_TERMS_PRO}
          </p>
          <p>🌐 {DOMAIN_HOSTING_NOTE}</p>
          <p>
            تفضّل تكتب بياناتك في نموذج؟{' '}
            <a href="/order" className="font-bold text-amber-800 underline">
              املأ نموذج الطلب
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
