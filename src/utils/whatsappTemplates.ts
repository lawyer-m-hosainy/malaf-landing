import { PortfolioItem, PricingPackage } from '../types';
import { WHATSAPP_NUMBER, BRAND_NAME, OFFER_PRICE, DELIVERY_TIME } from '../data/content';

/**
 * Generates tailored, structured Arabic WhatsApp messages for the sales team
 * depending on which design or pricing package the lawyer was viewing.
 */

export interface WhatsAppIntentParams {
  design?: PortfolioItem | null;
  pkg?: PricingPackage | null;
  source?: 'design' | 'package' | 'both' | 'general' | 'lead_form' | 'thank_you' | 'floating' | 'header';
  lawyerName?: string;
  phone?: string;
  specialty?: string;
  city?: string;
  selectedAddons?: string[];
  notes?: string;
}

/**
 * Builds the exact message text for the sales team
 */
export function buildWhatsAppMessage(params: WhatsAppIntentParams): string {
  const { design, pkg, source, lawyerName, phone, specialty, selectedAddons, notes } = params;

  // Case 0: Lead Form submission or Thank You modal follow-up
  if (source === 'lead_form' || source === 'thank_you' || (selectedAddons && selectedAddons.length > 0)) {
    return [
      `السلام عليكم ${BRAND_NAME}،`,
      lawyerName ? `أنا المحامي/المستشار: ${lawyerName}` : 'أنا محامي وأود التعاقد على موقع لمكتبي بالبيانات التالية:',
      phone ? `📱 رقم الهاتف: ${phone}` : '',
      specialty ? `⚖️ التخصص القانوني: ${specialty}` : '',
      '--------------------------------',
      design ? `🏛️ نمط التصميم المختار: #${design.designNumber || ''} — ${design.title} (${design.specialty || ''})` : '🏛️ التصميم: تصميم مخصص للمكتب',
      pkg ? `📦 باقة السعر: ${pkg.name} (${pkg.price})` : `📦 الباقة: عرض الـ ${OFFER_PRICE}`,
      selectedAddons && selectedAddons.length > 0 ? `✨ خدمات إضافية مختارة: ${selectedAddons.join(' + ')}` : '',
      `⚡ مدة التسليم: ${DELIVERY_TIME} مع جولة تعديلات مجانية`,
      `🔖 كود المتابعة: [LEAD-${design?.id?.toUpperCase() || 'CUSTOM'}-${pkg?.id?.toUpperCase() || 'BASIC'}]`,
      notes ? `📝 ملاحظات خاصة: ${notes}` : '',
      '--------------------------------',
      source === 'thank_you'
        ? 'تم تسجيل طلبي عبر الموقع، وأرغب في بدء المناقشة مع مسؤول المبيعات فوراً لتسريع التنفيذ.'
        : 'أرجو التواصل معي لتأكيد استلام بيانات مكتبي والبدء في التنفيذ.',
    ]
      .filter(Boolean)
      .join('\n');
  }

  // Case 1: Both design and package are selected or viewed
  if (design && pkg) {
    return [
      `السلام عليكم ${BRAND_NAME}،`,
      lawyerName ? `أنا المحامي/المستشار: ${lawyerName}` : 'أنا محامي وأود حجز موقع لمكتبي بالبيانات التالية:',
      '--------------------------------',
      `🏛️ نمط التصميم المختار: #${design.designNumber || ''} — ${design.title} (${design.specialty})`,
      `🎨 الطابع: ${design.themeStyle} (${design.colorsDescription})`,
      `📦 باقة السعر المطلوبة: ${pkg.name} (${pkg.price})`,
      `⚡ مدة التسليم: ${DELIVERY_TIME} مع جولة تعديلات مجانية`,
      `🔖 كود المبيعات: [DESIGN-${design.id?.toUpperCase() || 'DEF'} | PKG-${pkg.id?.toUpperCase() || 'BASIC'}]`,
      notes ? `📝 ملاحظات خاصة: ${notes}` : '',
      '--------------------------------',
      'أرجو التواصل معي لتأكيد استلام بيانات مكتبي والبدء في التنفيذ.',
    ]
      .filter(Boolean)
      .join('\n');
  }

  // Case 2: Specific design was viewed or selected
  if (design) {
    return [
      `السلام عليكم ${BRAND_NAME}،`,
      lawyerName ? `أنا المحامي/المستشار: ${lawyerName}` : 'أنا محامي وأعجبني هذا النمط من أنماط التصميم وأود تنفيذ موقعي عليه:',
      '--------------------------------',
      `🏛️ نمط التصميم: #${design.designNumber} — ${design.title}`,
      `⚖️ التخصص القانوني: ${design.specialty}`,
      `🎨 الطابع: ${design.themeStyle} (${design.colorsDescription})`,
      `💰 العرض المطلوب: ${OFFER_PRICE} والتسليم خلال ${DELIVERY_TIME}`,
      `🔖 كود التصميم للمبيعات: [DESIGN-${design.id?.toUpperCase() || 'CUSTOM'}]`,
      notes ? `📝 استفساري: ${notes}` : '',
      '--------------------------------',
      'أرجو التواصل معي لتنفيذ هذا النمط باسم مكتبي وبياناتي.',
    ]
      .filter(Boolean)
      .join('\n');
  }

  // Case 3: Specific pricing package was viewed or clicked
  if (pkg) {
    const packageSummary =
      pkg.id === 'basic'
        ? `موقع شخصي تعريفي متجاوب وتسليم خلال ${DELIVERY_TIME}`
        : pkg.id === 'pro'
        ? 'موقع متعدد الصفحات (حتى 5 صفحات) + مدونة + أسئلة شائعة + تهيئة SEO محلية'
        : 'موقع مؤسسي (حتى 10 صفحات) + نظام حجز مواعيد + هوية بصرية للمكتب';

    return [
      `السلام عليكم ${BRAND_NAME}،`,
      lawyerName ? `أنا المحامي/المستشار: ${lawyerName}` : 'أنا محامي وأود التعاقد على باقة الأسعار التالية لمكتبي:',
      '--------------------------------',
      `📦 الباقة المطلوبة: ${pkg.name}`,
      `💰 السعر في العرض: ${pkg.price} (بدلاً من ${pkg.originalPrice})`,
      `⭐ التميز: ${pkg.badge}`,
      `📋 نبذة: ${packageSummary}`,
      `⚡ التسليم: 3 إلى 5 أيام عمل حسب الباقة + جولة تعديلات مجانية`,
      pkg.id === 'basic' ? '💳 السداد: 100% بعد موافقتي على المعاينة وقبل النشر' : '💳 السداد: 50% عند البدء و50% قبل التسليم',
      `🔖 كود الباقة للمبيعات: [PKG-${pkg.id?.toUpperCase() || 'BASIC'}]`,
      notes ? `📝 تفاصيل إضافية: ${notes}` : '',
      '--------------------------------',
      'أرجو التواصل معي لتأكيد التفاصيل وطريقة السداد والبدء في التنفيذ.',
    ]
      .filter(Boolean)
      .join('\n');
  }

  // Case 4: General fallback inquiry
  return [
    `السلام عليكم ${BRAND_NAME}،`,
    `أنا محامي وأود الاستفسار عن عرض تصميم الموقع الشخصي بـ ${OFFER_PRICE} والتسليم خلال ${DELIVERY_TIME}.`,
    'حابب أعرف التفاصيل والتصميم الأنسب لتخصص مكتبي.',
  ].join('\n');
}

/**
 * Builds the complete wa.me URL with pre-filled encoded text
 */
export function getWhatsAppUrl(params: WhatsAppIntentParams): string {
  const text = buildWhatsAppMessage(params);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Short human-readable label explaining what this WhatsApp action refers to
 */
export function getWhatsAppIntentSummary(params: WhatsAppIntentParams): {
  headline: string;
  badge: string;
  hasSpecificContext: boolean;
} {
  const { design, pkg } = params;

  if (design && pkg) {
    return {
      headline: `طلب نموذج #${design.designNumber} مع باقة ${pkg.name}`,
      badge: `تصميم #${design.designNumber} + ${pkg.price}`,
      hasSpecificContext: true,
    };
  }

  if (design) {
    return {
      headline: `استفسار عن نموذج #${design.designNumber} (${design.specialty})`,
      badge: `تصميم #${design.designNumber} - ${OFFER_PRICE}`,
      hasSpecificContext: true,
    };
  }

  if (pkg) {
    return {
      headline: `حجز ${pkg.name} (${pkg.price})`,
      badge: `باقة ${pkg.name}`,
      hasSpecificContext: true,
    };
  }

  return {
    headline: `استفسار سريع عن عرض الـ ${OFFER_PRICE}`,
    badge: `عرض الـ ${OFFER_PRICE}`,
    hasSpecificContext: false,
  };
}
