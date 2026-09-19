import { Check, X, ShieldCheck, CreditCard, Sparkles, Star, Zap, Info, Scale, HelpCircle, MessageCircle } from 'lucide-react';
import { PRICING_PACKAGES, DOMAIN_HOSTING_NOTE, DELIVERY_TIME } from '../data/content';
import LawyerBenefitTooltip from './LawyerBenefitTooltip';
import { getFeatureExplanation, FEATURE_EXPLANATIONS } from '../data/featureTooltips';
import { useUserIntent } from '../context/UserIntentContext';

interface PricingSectionProps {
  onSelectPackage: (packageId: string) => void;
}

export default function PricingSection({ onSelectPackage }: PricingSectionProps) {
  const { getWhatsAppLinkForPackage, setPackageById } = useUserIntent();

  const handlePackageClick = (pkgId: string) => {
    onSelectPackage(pkgId);
    setPackageById(pkgId);
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] text-slate-900 border-b border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs sm:text-sm font-bold shadow-2xs">
            <Zap className="w-4 h-4 text-amber-700" />
            <span>عرض الإطلاق لفترة محدودة — التسليم خلال {DELIVERY_TIME}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            اختر الباقة المناسبة لمكتبك
          </h2>
          <p className="text-slate-700 text-base sm:text-lg">
            تصميم احترافي كامل بألوان تليق بوقار المحاماة + التسليم خلال {DELIVERY_TIME} + جولة تعديلات مجانية.
          </p>

          {/* Interactive Tooltips Prompt Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white border border-amber-300/80 shadow-xs text-xs font-bold text-amber-900">
            <Scale className="w-4 h-4 text-amber-700 shrink-0" />
            <span>⚖️ دليلك المهني: مرر الفأرة أو انقر على أي ميزة لاستعراض فائدتها القانونية والتقنية</span>
          </div>
        </div>

        {/* 3 Pricing Cards - Light & Elegant */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PACKAGES.map((pkg) => {
            const isPro = pkg.recommended;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between text-right bg-white ${
                  isPro
                    ? 'border-2 border-amber-500 shadow-xl shadow-amber-950/10 lg:-translate-y-4 z-10 ring-4 ring-amber-400/20'
                    : 'border-2 border-slate-200/90 hover:border-amber-400/80 shadow-sm hover:shadow-lg'
                }`}
              >
                {/* Floating "Most Popular" Badge */}
                {isPro && (
                  <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Star className="w-4 h-4 fill-slate-950" />
                    <span>عرض الإطلاق</span>
                  </div>
                )}

                <div className="p-8 sm:p-9 space-y-6">
                  {/* Top Badge & Package Name */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      {pkg.badge}
                    </span>
                    
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-slate-950">{pkg.name}</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-amber-800">
                        {pkg.price}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
                        {pkg.originalPrice}
                      </span>
                    </div>
                    <div className="text-xs text-emerald-700 font-bold mt-1 bg-emerald-50 px-2.5 py-1 rounded-md inline-block border border-emerald-200">
                      وفر {parseInt(pkg.originalPrice.replace(/\D/g, '')) - parseInt(pkg.price.replace(/\D/g, ''))} ج.م في هذا العرض الخاص!
                    </div>
                  </div>

                  {/* Features List with Rich Lawyer Tooltips */}
                  <div className="pt-4 border-t border-slate-100 space-y-3.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <span>المميزات المشمولة:</span>
                      <span className="text-[10px] text-amber-700 font-normal normal-case flex items-center gap-1">
                        <Info className="w-3 h-3 text-amber-600" />
                        <span>انقر للشرح القانوني</span>
                      </span>
                    </div>
                    {pkg.features.map((feat, idx) => {
                      const explanation = getFeatureExplanation(feat.text);
                      return (
                        <div
                          key={idx}
                          className={`flex items-start gap-3 text-xs sm:text-sm ${
                            feat.included ? 'text-slate-800 font-medium' : 'text-slate-400 opacity-60'
                          }`}
                        >
                          {feat.included ? (
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                              <X className="w-3.5 h-3.5" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <LawyerBenefitTooltip explanation={explanation}>
                              <span
                                className={`transition-colors group-hover/tooltip:text-amber-800 ${
                                  feat.included ? '' : 'line-through'
                                }`}
                              >
                                {feat.text}
                              </span>
                            </LawyerBenefitTooltip>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom CTA Button & WhatsApp Direct Action */}
                <div className="p-8 sm:p-9 pt-0 space-y-2.5">
                  <button
                    onClick={() => handlePackageClick(pkg.id)}
                    className={`w-full py-3.5 rounded-xl font-black text-sm transition-all duration-200 shadow-sm ${
                      isPro
                        ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-md transform hover:-translate-y-0.5'
                        : 'bg-slate-100 text-slate-900 hover:bg-amber-100 hover:text-amber-950 border border-slate-300'
                    }`}
                  >
                    {pkg.ctaText}
                  </button>

                  <a
                    href={getWhatsAppLinkForPackage(pkg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setPackageById(pkg.id)}
                    className="w-full py-2.5 px-3 rounded-xl border border-emerald-300 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                    title={`حجز مباشر وفوري لباقة ${pkg.name} عبر واتساب مع كود الباقة`}
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>حجز هذه الباقة عبر واتساب 💬</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantees and Trust Below Pricing with Rich Tooltips */}
        <div className="mt-16 pt-10 border-t border-amber-200/80 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <LawyerBenefitTooltip
            explanation={FEATURE_EXPLANATIONS['payment-deposit']}
            className="w-full"
          >
            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400/80 shadow-sm hover:shadow-md transition-all text-right w-full">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="text-right flex-1">
                <div className="font-bold text-slate-950 text-sm sm:text-base flex items-center justify-between">
                  <span>تسهيلات مرنة ومريحة في السداد</span>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                    معيار تعاقدي عادل
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  💳 مقدم 50% عند البدء، والباقي عند التسليم وموافقتك على الموقع.
                </div>
              </div>
            </div>
          </LawyerBenefitTooltip>

          <LawyerBenefitTooltip
            explanation={FEATURE_EXPLANATIONS['guarantee-satisfaction']}
            className="w-full"
          >
            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400/80 shadow-sm hover:shadow-md transition-all text-right w-full">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-right flex-1">
                <div className="font-bold text-slate-950 text-sm sm:text-base flex items-center justify-between">
                  <span>مراجعة قبل الإطلاق وتعديلات مجانية</span>
                  <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-bold">
                    جولة تعديلات
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  🔒 نراجع معك الموقع قبل الإطلاق، مع جولة تعديلات مجانية على النصوص والألوان والصور والترتيب.
                </div>
              </div>
            </div>
          </LawyerBenefitTooltip>
        </div>

        {/* Domain & hosting disclosure */}
        <p className="mt-8 max-w-4xl mx-auto text-center text-xs sm:text-sm text-slate-600 leading-relaxed bg-white/70 border border-amber-200 rounded-2xl px-5 py-4">
          📌 <strong className="text-slate-800">ملاحظة:</strong> {DOMAIN_HOSTING_NOTE}
        </p>
      </div>
    </section>
  );
}

