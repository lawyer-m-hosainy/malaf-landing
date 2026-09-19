import { Smartphone, Zap, SearchCheck, MessageSquareText, ShieldCheck, Palette, CheckCircle, Scale, Info } from 'lucide-react';
import { FEATURES } from '../data/content';
import LawyerBenefitTooltip from './LawyerBenefitTooltip';
import { getFeatureExplanation } from '../data/featureTooltips';

export default function FeaturesSection() {
  const getFeatureIcon = (id: string) => {
    switch (id) {
      case 'feat-1':
        return <Smartphone className="w-6 h-6 text-amber-500" />;
      case 'feat-2':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'feat-3':
        return <SearchCheck className="w-6 h-6 text-amber-500" />;
      case 'feat-4':
        return <MessageSquareText className="w-6 h-6 text-amber-500" />;
      case 'feat-5':
        return <ShieldCheck className="w-6 h-6 text-amber-500" />;
      case 'feat-6':
        return <Palette className="w-6 h-6 text-amber-500" />;
      default:
        return <CheckCircle className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section id="features" className="py-24 bg-[#FAFAF9] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold shadow-2xs">
            <span>معايير التميز الهندسي لمكاتب المحاماة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            كل موقع بنصممه بيجيلك ب...
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            مش مجرد صفحة على الإنترنت، بل منظومة تسويقية متكاملة تجعل مكتبك الخيار الأول والأكثر موثوقية.
          </p>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
            <Scale className="w-3.5 h-3.5 text-amber-700" />
            <span>مرر الفأرة أو انقر على أي ميزة لاستعراض أثرها القانوني والتقني</span>
          </div>
        </div>

        {/* 6 Features Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feature) => {
            const explanation = getFeatureExplanation(feature.id);
            return (
              <div
                key={feature.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-400/70 transition-all duration-300 text-right flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100/70 border border-amber-300/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-200/60 transition-all duration-300">
                      {getFeatureIcon(feature.id)}
                    </div>
                    
                    {/* Tooltip on Badge */}
                    <LawyerBenefitTooltip explanation={explanation}>
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-50 group-hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300/70 flex items-center gap-1 transition-colors">
                        <Scale className="w-3 h-3 text-amber-600" />
                        <span>الأثر القانوني والتقني</span>
                      </span>
                    </LawyerBenefitTooltip>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-800 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Interactive Tooltip Trigger Bar */}
                <div className="pt-3 border-t border-slate-100">
                  <LawyerBenefitTooltip explanation={explanation} className="w-full">
                    <div className="text-[11px] text-slate-500 hover:text-amber-800 flex items-center justify-between w-full font-medium py-1 transition-colors">
                      <span>عرض التفاصيل والفائدة العملية</span>
                      <Info className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                  </LawyerBenefitTooltip>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-100/40 to-amber-50 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-5 border border-amber-300 shadow-sm">
          <div className="text-right">
            <h4 className="font-black text-base sm:text-lg text-amber-950">
              كل الجانب التقني علينا — والتسليم خلال 3 أيام عمل
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1">
              أنت تفرغ لملفاتك وقضاياك ومذكراتك.. والجانب التقني والتصميم وتجهيز الموقع بالكامل علينا.
            </p>
          </div>
          <a
            href="#pricing"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs sm:text-sm hover:from-amber-400 hover:to-amber-500 shadow-md transition-colors shrink-0"
          >
            اطلب عرض الـ 500 ج.م
          </a>
        </div>
      </div>
    </section>
  );
}

