import { CheckCircle2, MessageCircle, X, Shield, Clock } from 'lucide-react';
import { LeadFormData } from '../types';
import { useUserIntent } from '../context/UserIntentContext';
import { getWhatsAppUrl } from '../utils/whatsappTemplates';

interface ThankYouModalProps {
  lead: LeadFormData | null;
  onClose: () => void;
}

export default function ThankYouModal({ lead, onClose }: ThankYouModalProps) {
  const { selectedDesign, selectedPackage } = useUserIntent();

  if (!lead) return null;

  const thankYouWaUrl = lead.whatsappUrl || getWhatsAppUrl({
    design: selectedDesign,
    pkg: selectedPackage,
    lawyerName: lead.fullName,
    phone: lead.phoneNumber,
    specialty: lead.specialty,
    selectedAddons: lead.addons,
    notes: lead.notes,
    source: 'thank_you',
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 text-right animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 p-6 sm:p-8 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-slate-900 hover:text-black p-1.5 rounded-lg bg-black/10 hover:bg-black/20"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Animated Success Badge */}
          <div className="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-md">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
            رسالتك جاهزة على واتساب ✅
          </h3>
          <p className="text-sm text-slate-900 font-semibold mt-2">
            لو واتساب مفتحش تلقائياً، اضغط الزر بالأسفل لإرسال الطلب — وسنرد عليك في أقرب وقت
          </p>
        </div>

        {/* Body Summary */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              ملخص طلبك:
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">الاسم:</span>
              <span className="font-bold text-slate-900">{lead.fullName}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">رقم الهاتف:</span>
              <span className="font-mono font-bold text-slate-900" dir="ltr">{lead.phoneNumber}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">التخصص:</span>
              <span className="font-semibold text-slate-800">{lead.specialty}</span>
            </div>

            <div className="flex items-center justify-between text-sm border-t border-slate-200 pt-2">
              <span className="text-slate-500">التصميم المختار:</span>
              <span className="font-bold text-slate-800">{lead.selectedDesign || 'تصميم محامي مخصص'}</span>
            </div>

            {lead.addons && lead.addons.length > 0 && (
              <div className="text-sm border-t border-slate-200 pt-2">
                <span className="text-slate-500 block mb-1">الخدمات الإضافية المرفقة:</span>
                <div className="flex flex-wrap gap-1">
                  {lead.addons.map((a, i) => (
                    <span key={i} className="text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-sm border-t border-slate-200 pt-2">
              <span className="text-slate-500">الباقة المختارة:</span>
              <span className="font-bold text-amber-600">{lead.selectedPackage}</span>
            </div>
          </div>

          {/* WhatsApp Direct Option */}
          <div className="space-y-3 text-center">
            <p className="text-xs sm:text-sm text-slate-600">
              الطلب لا يصلنا إلا بعد إرسال الرسالة من واتساب:
            </p>
            <a
              href={thankYouWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>إرسال الطلب عبر واتساب الآن</span>
            </a>
          </div>

          {/* Assurance footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              بياناتك للتواصل فقط
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              نرد في أقرب وقت
            </span>
          </div>
        </div>

        {/* Bottom Dismiss */}
        <div className="px-6 pb-6 pt-0">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
          >
            إغلاق ومتابعة تصفح الصفحة
          </button>
        </div>
      </div>
    </div>
  );
}
