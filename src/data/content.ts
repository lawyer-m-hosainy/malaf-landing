import { FaqItem, PortfolioItem, PricingPackage } from '../types';
import { LAWYER_DESIGNS } from './designsData';

// ---------------------------------------------------------------------------
// هوية البراند وبيانات التواصل — المرجع الوحيد لكل الصفحة
// (مأخوذة من بوستات الإطلاق على فيسبوك)
// ---------------------------------------------------------------------------
export const BRAND_NAME = 'مَلَف';
export const BRAND_TAGLINE = 'مواقع شخصية للمحامين';
export const BRAND_DESCRIPTION =
  'منصة متخصصة في تصميم وإنشاء المواقع الإلكترونية الشخصية والأدوات الرقمية التي تليق بمكانة السادة المحامين وتبرز خبراتهم.';

/** رقم واتساب بصيغة دولية بدون + (لروابط wa.me) */
export const WHATSAPP_NUMBER = '201141973834';
/** نفس الرقم بصيغة العرض المحلية */
export const WHATSAPP_DISPLAY = '01141973834';

/** رقم بوت الطلبات الآلي (يأخذ الطلب في دقائق بدون تدخّل بشري) */
export const BOT_WHATSAPP_NUMBER = '201141971311';
export const BOT_WHATSAPP_DISPLAY = '01141971311';
/** رابط يفتح البوت ومعه كلمة البدء جاهزة */
export const BOT_ORDER_LINK = `https://wa.me/${BOT_WHATSAPP_NUMBER}?text=${encodeURIComponent('طلب')}`;

/** النموذج الحي الحقيقي الذي يمكن للزائر تصفحه */
export const DEMO_URL = 'https://hosainy.pro';
export const DEMO_LABEL = 'hosainy.pro';
export const DEMO_TITLE = 'مكتب محمد السيد الحسيني للمحاماة — المنصورة';

/** العرض الحالي */
export const OFFER_PRICE = '500 ج.م';
export const DELIVERY_TIME = '3 أيام عمل';

/**
 * ملاحظة الدومين والاستضافة — تُعرض في الباقات والأسئلة الشائعة.
 * الاستضافة وشهادة الأمان مجاناً دايماً (Cloudflare)؛ الدومين الخاص بس هو اللي ليه تكلفة، ومتاح من باقة المحترف.
 */
export const DOMAIN_HOSTING_NOTE =
  'الاستضافة وشهادة الأمان (HTTPS) مجاناً في كل الباقات، والموقع بيشتغل على اسم-مكتبك.malaf.pro بدون أي رسوم. الدومين الخاص (زي .com) متاح في باقتي المحترف والمكتب المتكامل، وبتدفع سعره الفعلي لدى جهة التسجيل بس (حوالي 10–15 دولار في السنة حسب الامتداد وسعر الصرف).';

/** شروط السداد — تُعرض في الباقات والأسئلة الشائعة وتُذكر في رسائل واتساب */
export const PAYMENT_TERMS_BASIC = 'باقة الـ 500: المعاينة مجانية بالكامل، والسداد 100% بعد موافقتك على المعاينة وقبل النشر على الدومين.';
export const PAYMENT_TERMS_PRO = 'باقتا المحترف والمكتب المتكامل: 50% عند بدء التنفيذ، و50% بعد موافقتك على المعاينة وقبل التسليم.';

/**
 * Cloudflare Turnstile — Site key (عام، آمن في المتصفح) لحماية نموذج /order من السبام.
 * الـ Secret key المقابل في أسرار Supabase باسم TURNSTILE_SECRET (دالة submit-order).
 */
export const TURNSTILE_SITE_KEY = '0x4AAAAAAFDW_xIJGiCT4_Id';

export const WHATSAPP_DEFAULT_MESSAGE = `السلام عليكم ${BRAND_NAME}، أنا محامي وأود الاستفادة من عرض تصميم الموقع الشخصي بـ ${OFFER_PRICE} والتسليم خلال ${DELIVERY_TIME}.`;

export const getWhatsAppLink = (customText?: string) => {
  const text = customText || WHATSAPP_DEFAULT_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

export { LAWYER_DESIGNS };
export const PORTFOLIO_ITEMS: PortfolioItem[] = LAWYER_DESIGNS;

/**
 * الباقات — كل ميزة هنا لازم تكون حاجة بتتسلّم فعلاً:
 * الموقع الكامل (المصنع) في كل الباقات؛ المحترف = + مراجعة المحتوى + دومين خاص + مقالات + Google Business؛
 * المتكامل = + قسم فريق المكتب (قالب المواقع + لوحة التحكم) + شعار + مقالات أكتر + سنة دعم.
 * مدد التسليم هنا لازم تطابق FAQ_ITEMS ورسائل البوت. مفيش أسعار مشطوبة (بلا "قبل الخصم" وهمي).
 */
export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'basic',
    name: 'الأساسية',
    badge: 'الأكثر طلباً',
    price: '500 ج.م',
    recommended: true,
    ctaText: 'اطلب الأساسية على واتساب',
    features: [
      { text: 'موقع كامل: الرئيسية، من نحن، الخدمات، الأسئلة الشائعة، الحجز، التواصل', included: true },
      { text: 'محتوى قانوني جاهز مكتوب حسب تخصصاتك ومدينتك', included: true },
      { text: '5 أنماط تصميم تختار منها', included: true },
      { text: 'أزرار واتساب واتصال وحجز استشارة', included: true },
      { text: 'على اسم-مكتبك.malaf.pro مع استضافة وشهادة أمان مجاناً', included: true },
      { text: 'مهيّأ لجوجل كمكتب محاماة في مدينتك', included: true },
      { text: 'جولة تعديلات مجانية', included: true },
      { text: `التسليم خلال ${DELIVERY_TIME}`, included: true },
      { text: 'دومين خاص ومقالات جاهزة', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'المحترف',
    badge: 'محتوى مكتوب معك',
    price: '1,200 ج.م',
    ctaText: 'اطلب المحترف على واتساب',
    features: [
      { text: 'كل مميزات الأساسية', included: true },
      { text: 'نراجع ونكتب المحتوى معك: نبذتك وخدماتك بكلامك', included: true },
      { text: 'ربط دومين خاص (.com) — تدفع سعره الفعلي بس', included: true },
      { text: '3 مقالات توعوية في تخصصك', included: true },
      { text: 'تجهيز صفحة Google Business للمكتب', included: true },
      { text: 'جولتين تعديلات', included: true },
      { text: 'التسليم خلال 4 إلى 5 أيام عمل', included: true },
      { text: 'قسم فريق المكتب وتصميم الشعار', included: false },
    ],
  },
  {
    id: 'vip',
    name: 'المكتب المتكامل',
    badge: 'للمكاتب والشركاء',
    price: '2,500 ج.م',
    ctaText: 'اطلب المكتب المتكامل على واتساب',
    features: [
      { text: 'كل مميزات المحترف', included: true },
      { text: 'قسم لفريق المكتب والشركاء', included: true },
      { text: 'تصميم شعار وألوان للمكتب', included: true },
      { text: '6 مقالات توعوية بدل 3', included: true },
      { text: '3 جولات تعديلات', included: true },
      { text: 'دعم وتحديثات لمدة سنة', included: true },
      { text: 'التسليم خلال 5 إلى 7 أيام عمل', included: true },
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-2',
    question: 'الموقع بياخد قد إيه عشان يكون جاهز؟',
    answer: `من وقت استلام بياناتك (الاسم، التخصصات، الصور، أرقام التواصل): الأساسية خلال ${DELIVERY_TIME}، والمحترف من 4 إلى 5 أيام عمل، والمكتب المتكامل من 5 إلى 7 أيام عمل لأنهم فيهم كتابة محتوى ومقالات معك.`,
  },
  {
    id: 'faq-3',
    question: 'إزاي بيتم الدفع؟ وهل فيه مقدم؟',
    answer: `${PAYMENT_TERMS_BASIC} ${PAYMENT_TERMS_PRO} نسخة المعاينة بتكون على رابط مؤقت غير منشور وعليها شريط «نسخة معاينة»، وبعد السداد بتتنشر على دومينك النهائي خلال يوم عمل. السداد عبر إنستاباي أو فودافون كاش أو تحويل بنكي.`,
  },
  {
    id: 'faq-3b',
    question: 'لو التصميم بعد التسليم محتاج تعديلات؟',
    answer:
      'التعديلات على الألوان والنصوص والصور والترتيب مجانية: جولة في الأساسية، وجولتين في المحترف، و3 جولات في المكتب المتكامل. وبنراجع معاك كل حاجة في المعاينة قبل ما تدفع.',
  },
  {
    id: 'faq-4',
    question: 'هل السعر شامل الدومين والاستضافة؟',
    answer: `${DOMAIN_HOSTING_NOTE} الاستضافة على شبكة Cloudflare العالمية بدون رسوم سنوية منّا، والتكلفة الوحيدة المتكررة لو اخترت دومين خاص هي تجديده سنوياً لدى جهة التسجيل.`,
  },
  {
    id: 'faq-5',
    question: 'هل الموقع هيظهر في نتائج بحث جوجل؟',
    answer:
      'الموقع بيتبنى ببنية صحيحة وبيانات وصفية (Schema.org) وعناوين مهيّأة باسمك وتخصصك ومحافظتك، وده الأساس اللي جوجل بيحتاجه لفهرستك. ترتيب الظهور نفسه بيتحسن مع الوقت ومع المحتوى، ومفيش أي جهة تقدر تضمن مركز محدد في نتائج البحث.',
  },
];

