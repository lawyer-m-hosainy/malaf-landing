import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Zap,
  Gift,
  Phone,
  User,
  Scale,
  Loader2,
  CheckCircle2,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import {
  LEGAL_SPECIALTIES,
  WEBHOOK_URL,
  PRICING_PACKAGES,
  PORTFOLIO_ITEMS,
  DELIVERY_TIME,
} from '../data/content';
import { LAWYER_DESIGNS } from '../data/designsData';
import { LeadFormData } from '../types';
import { useUserIntent } from '../context/UserIntentContext';
import { getWhatsAppUrl } from '../utils/whatsappTemplates';

interface LeadFormSectionProps {
  selectedPackage: string;
  onPackageChange: (pkgId: string) => void;
  selectedDesignId?: string;
  onDesignChange?: (designId: string) => void;
  onSuccess: (lead: LeadFormData) => void;
}

const isHttpUrl = (url: string) => /^https?:///i.test(url);

export default function LeadFormSection({
  selectedPackage,
  onPackageChange,
  selectedDesignId,
  onDesignChange,
  onSuccess,
}: LeadFormSectionProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState(LEGAL_SPECIALTIES[0]);
  const [hasWebsite, setHasWebsite] = useState('لا، ده أول موقع ليا');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'خرائط جوجل (Google Maps) مجاناً ضمن العرض',
  ]);
  const [notes, setNotes] = useState('');
  const [designChoice, setDesignChoice] = useState<string>(
    selectedDesignId || LAWYER_DESIGNS[0].id
  );

  useEffect(() => {
    if (selectedDesignId) {
      setDesignChoice(selectedDesignId);
    }
  }, [selectedDesignId]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    selectedDesign: contextDesign,
    selectedPackage: contextPackage,
    setDesignById,
    setPackageById,
    intentSummary,
  } = useUserIntent();

  // Map package id to Arabic label for payload & radio display
  const packageOptions = [
    { id: 'basic', label: 'عرض الإطلاق - 500 ج.م 🔥 (تسليم 3 أيام عمل)' },
    { id: 'pro', label: 'المحامي المحترف - 1,200 ج.م (3-4 أيام عمل)' },
    { id: 'vip', label: 'المكتب المتكامل - 2,500 ج.م (4-5 أيام عمل)' },
  ];

  const currentDesignObj = LAWYER_DESIGNS.find(
    (d) => d.id === designChoice
  );

  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'يرجى كتابة الاسم بالكامل (3 أحرف على الأقل)';
    }

    const cleanedPhone = phone.trim().replace(/[\s-]/g, '');
    const egyptianPhoneRegex = /^(010|011|012|015)\d{8}$/;
    if (!cleanedPhone) {
      errs.phone = 'رقم الموبايل أو الواتساب مطلوب';
    } else if (!egyptianPhoneRegex.test(cleanedPhone)) {
      errs.phone = 'يرجى إدخال رقم مصري صحيح يبدأ بـ 010 أو 011 أو 012 أو 015 ومكون من 11 رقم';
    }

    if (!specialty) {
      errs.specialty = 'يرجى اختيار التخصص القانوني';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const chosenDesignInfo = currentDesignObj
      ? `نمط #${currentDesignObj.designNumber} — ${currentDesignObj.title}`
      : 'تصميم مخصص';

    const leadData: LeadFormData = {
      fullName: fullName.trim(),
      phoneNumber: phone.trim(),
      specialty,
      selectedPackage:
        packageOptions.find((p) => p.id === selectedPackage)?.label ||
        selectedPackage,
      selectedDesign: chosenDesignInfo,
      hasWebsite,
      addons: selectedAddons,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      source: window.location.href,
      userAgent: navigator.userAgent,
    };

    // 1. Build the WhatsApp message with everything the lawyer filled in
    const matchedPkg = PRICING_PACKAGES.find((p) => p.id === selectedPackage) || contextPackage;
    const waUrl = getWhatsAppUrl({
      design: currentDesignObj || contextDesign,
      pkg: matchedPkg,
      lawyerName: leadData.fullName,
      phone: leadData.phoneNumber,
      specialty: leadData.specialty,
      selectedAddons: selectedAddons.length > 0 ? selectedAddons : undefined,
      notes: leadData.notes || undefined,
      source: 'lead_form',
    });

    // 2. Optional: forward to a webhook (Google Sheets / CRM) when configured.
    //    Fire-and-forget; never blocks the WhatsApp handoff.
    if (WEBHOOK_URL && isHttpUrl(WEBHOOK_URL)) {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
        keepalive: true,
      }).catch(() => {
        /* ignored: WhatsApp is the primary channel */
      });
    }

    // 3. Open WhatsApp with the ready message (this is how the request reaches us)
    const opened = window.open(waUrl, '_blank', 'noopener,noreferrer');
    if (!opened) {
      // Popup blocked → navigate in the same tab
      window.location.href = waUrl;
    }

    setIsSubmitting(false);
    onSuccess({ ...leadData, whatsappUrl: waUrl });
  };

  return (
    <section
      id="contact-form"
      className="py-24 bg-gradient-to-b from-white via-slate-50 to-amber-50/20 border-b border-slate-200"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-sm">
            <span>استشارة مجانية بدون التزام</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight">
            ابدأ موقعك الاحترافي دلوقتي
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            املأ بياناتك وسيتم تجهيز رسالة واتساب جاهزة بطلبك — ترسلها بضغطة واحدة ونرد عليك في أقرب وقت
          </p>
        </div>

        {/* The Card Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-400/50 shadow-2xl shadow-amber-500/10 text-right">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* a. Full Name */}
            <div>
              <label
                htmlFor="full-name"
                className="block text-sm font-bold text-slate-800 mb-2"
              >
                الاسم بالكامل (مع اللقب) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) {
                      setErrors((prev) => ({ ...prev, fullName: '' }));
                    }
                  }}
                  placeholder="الأستاذ / أو المستشار / ..."
                  className={`w-full px-4 py-3.5 pr-11 rounded-xl border ${
                    errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-slate-300 focus:border-amber-500'
                  } focus:ring-2 focus:ring-amber-400/30 text-slate-900 placeholder:text-slate-400 transition-all text-sm sm:text-base outline-none`}
                />
                <User className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-600 font-semibold">{errors.fullName}</p>
              )}
            </div>

            {/* b. Phone / WhatsApp */}
            <div>
              <label
                htmlFor="phone-number"
                className="block text-sm font-bold text-slate-800 mb-2"
              >
                رقم الموبايل أو الواتساب (للتواصل والتسليم){' '}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="phone-number"
                  type="tel"
                  dir="ltr"
                  inputMode="numeric"
                  maxLength={11}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) {
                      setErrors((prev) => ({ ...prev, phone: '' }));
                    }
                  }}
                  placeholder="01012345678"
                  className={`w-full px-4 py-3.5 pl-11 rounded-xl border ${
                    errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-300 focus:border-amber-500'
                  } focus:ring-2 focus:ring-amber-400/30 text-slate-900 placeholder:text-slate-400 transition-all text-sm sm:text-base outline-none font-mono`}
                />
                <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                أرقام مصرية فقط (010, 011, 012, 015)
              </span>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600 font-semibold">{errors.phone}</p>
              )}
            </div>

            {/* c. Specialty */}
            <div>
              <label
                htmlFor="legal-specialty"
                className="block text-sm font-bold text-slate-800 mb-2"
              >
                التخصص القانوني الأساسي <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="legal-specialty"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full px-4 py-3.5 pr-11 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 text-slate-900 bg-white transition-all text-sm sm:text-base outline-none appearance-none cursor-pointer"
                >
                  {LEGAL_SPECIALTIES.map((spec, idx) => (
                    <option key={idx} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
                <Scale className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* d. Choose Design from the 20 Available Designs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="preferred-design"
                  className="block text-sm font-bold text-slate-800"
                >
                  نمط التصميم المفضل
                </label>
                <a
                  href="#portfolio"
                  className="text-xs text-amber-600 hover:text-amber-700 font-bold underline"
                >
                  استعراض الأنماط الخمسة
                </a>
              </div>
              <div className="relative">
                <select
                  id="preferred-design"
                  value={designChoice}
                  onChange={(e) => {
                    setDesignChoice(e.target.value);
                    setDesignById(e.target.value);
                    if (onDesignChange) {
                      onDesignChange(e.target.value);
                    }
                  }}
                  className="w-full px-4 py-3.5 pr-11 rounded-xl border border-amber-300/80 bg-amber-50/20 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 text-slate-900 transition-all text-xs sm:text-sm outline-none appearance-none cursor-pointer font-medium"
                >
                  {LAWYER_DESIGNS.map((d) => (
                    <option key={d.id} value={d.id}>
                      #{d.designNumber} {d.title} — {d.themeStyle} ({d.tag})
                    </option>
                  ))}
                </select>
                <Sparkles className="w-5 h-5 text-amber-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {currentDesignObj && (
                <div className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-between text-xs text-amber-900">
                  <span>
                    تم اختيار نمط: <strong>{currentDesignObj.tag}</strong> — {currentDesignObj.themeStyle}
                  </span>
                  <span className="text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-amber-200">
                    باقة {currentDesignObj.packageLabel}
                  </span>
                </div>
              )}
            </div>

            {/* e. Preferred Package */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2.5">
                الباقة المفضلة <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {packageOptions.map((pkg) => {
                  const isChecked = selectedPackage === pkg.id;
                  return (
                    <label
                      key={pkg.id}
                      onClick={() => {
                        onPackageChange(pkg.id);
                        setPackageById(pkg.id);
                      }}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-amber-500 bg-amber-50/50 shadow-sm font-bold text-slate-950'
                          : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100/60'
                      }`}
                    >
                      <input
                        type="radio"
                        name="preferred-package"
                        value={pkg.id}
                        checked={isChecked}
                        onChange={() => {
                          onPackageChange(pkg.id);
                          setPackageById(pkg.id);
                        }}
                        className="w-4 h-4 text-amber-500 focus:ring-amber-400 border-slate-300"
                      />
                      <span className="text-xs sm:text-[13px] leading-tight">{pkg.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* e. Do you currently have a website? */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                عندك موقع إلكتروني حالياً للمكتب؟
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                {['لا، ده أول موقع ليا', 'أيوه، بس عايز أحسنه وأطوره'].map((option) => (
                  <label
                    key={option}
                    onClick={() => setHasWebsite(option)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border cursor-pointer transition-all flex-1 ${
                      hasWebsite === option
                        ? 'border-amber-500 bg-amber-50/40 font-bold text-slate-950'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="has-website"
                      value={option}
                      checked={hasWebsite === option}
                      onChange={() => setHasWebsite(option)}
                      className="w-4 h-4 text-amber-500 focus:ring-amber-400 border-slate-300"
                    />
                    <span className="text-xs sm:text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Optional Value Add-ons */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-slate-800">
                  خدمات إضافية اختيارية لمكتبك (حدد ما يناسبك):
                </label>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  تجهيز فوري مع الموقع
                </span>
              </div>
              <div className="space-y-2">
                {[
                  {
                    id: 'maps',
                    label: 'ربط وتوثيق مقر المكتب على خرائط Google Maps',
                    badge: 'مشمول مجاناً 🎁',
                    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
                  },
                  {
                    id: 'email',
                    label: 'إنشاء بريد مهني رسمي باسمك (مثل: counsel@yourname.com)',
                    badge: 'احترافي للشركات',
                    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
                  },
                  {
                    id: 'qr',
                    label: 'تصميم كارت ذكي مزود برمز QR Code لفتح الموقع فوراً بالهاتف',
                    badge: 'للبطاقات الشخصية',
                    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
                  },
                ].map((addon) => {
                  const isChecked = selectedAddons.includes(addon.label);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-amber-400 bg-amber-50/40 text-slate-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            setSelectedAddons((prev) =>
                              isChecked
                                ? prev.filter((item) => item !== addon.label)
                                : [...prev, addon.label]
                            );
                          }}
                          className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-slate-300"
                        />
                        <span className="text-xs sm:text-sm">{addon.label}</span>
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full border ${addon.badgeColor}`}
                      >
                        {addon.badge}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* f. Additional Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-bold text-slate-800 mb-2"
              >
                ملاحظات إضافية أو استفسارات خاصة (اختياري)
              </label>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أي تفاصيل تانية تحب تقولهالنا عن مكتبك أو ألوانك المفضلة..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 text-slate-900 placeholder:text-slate-400 transition-all text-sm outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              id="submit-lead-form-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl font-black text-base sm:text-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-xl shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري تجهيز رسالتك...</span>
                </>
              ) : (
                <>
                  <span>إرسال الطلب عبر واتساب</span>
                  <MessageCircle className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Alternative WhatsApp Direct Contact with Smart Prefilled details */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center space-y-3">
            <div className="text-xs sm:text-sm text-slate-600 font-medium">
              تفضّل تتكلم مباشرة من غير ما تملأ الفورم؟
            </div>
            {(() => {
              const matchedPortfolio = PORTFOLIO_ITEMS.find((p) => p.id === designChoice) || contextDesign;
              const matchedPkg = PRICING_PACKAGES.find((p) => p.id === selectedPackage) || contextPackage;
              const directWaUrl = getWhatsAppUrl({
                design: matchedPortfolio,
                pkg: matchedPkg,
                lawyerName: fullName.trim() || undefined,
                phone: phone.trim() || undefined,
                specialty: specialty || undefined,
                selectedAddons: selectedAddons.length > 0 ? selectedAddons : undefined,
                notes: notes.trim() || undefined,
                source: 'lead_form',
              });

              return (
                <div className="space-y-2">
                  <a
                    id="direct-whatsapp-lead-btn"
                    href={directWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>تواصل عبر واتساب مباشرة</span>
                  </a>
                  <div className="text-[11px] text-slate-500">
                    🎯 مجهزة تلقائياً ببيانات: {matchedPortfolio ? `نموذج #${matchedPortfolio.designNumber} (${matchedPortfolio.title})` : 'التصميم المحدد'} + باقة {matchedPkg?.name || 'الأساسية'}.
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Trust Badges Under Form */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-[11px] sm:text-xs text-slate-600">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>بياناتك تُستخدم للتواصل فقط</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 font-medium">
              <Zap className="w-4 h-4 text-amber-600 shrink-0" />
              <span>نرد في أقرب وقت</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 font-medium">
              <Gift className="w-4 h-4 text-blue-600 shrink-0" />
              <span>التسليم خلال {DELIVERY_TIME}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
