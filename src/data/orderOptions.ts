/** Keys must match malaf-factory/presets/specialties.json */
export const SPECIALTIES = [
  { key: 'criminal', label: 'القضايا الجنائية' },
  { key: 'civil', label: 'المدني والتعويضات' },
  { key: 'family', label: 'الأسرة والأحوال الشخصية' },
  { key: 'corporate', label: 'الشركات والاستشارات المؤسسية' },
  { key: 'commercial', label: 'التجاري والشيكات' },
  { key: 'realestate', label: 'العقاري والمقاولات' },
  { key: 'labor', label: 'العمل والتأمينات' },
  { key: 'administrative', label: 'الإداري ومجلس الدولة' },
  { key: 'inheritance', label: 'المواريث والتركات' },
  { key: 'general', label: 'استشارات قانونية عامة' },
] as const;

/** Must match malaf-factory/presets/cities.json */
export const CITIES = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'المنصورة', 'طنطا', 'الزقازيق', 'بنها', 'شبين الكوم', 'دمنهور',
  'كفر الشيخ', 'دمياط', 'بورسعيد', 'الإسماعيلية', 'السويس', 'الفيوم', 'بني سويف', 'المنيا', 'أسيوط',
  'سوهاج', 'قنا', 'الأقصر', 'أسوان',
];

/** Keys must match malaf-factory/presets/themes.json and the landing's designsData */
export const THEMES = [
  { key: 'classic-navy', label: 'الوقار الكلاسيكي', colors: ['#0B1F3A', '#C9A227', '#F6F1E7'], note: 'كحلي عميق وذهب هادئ' },
  { key: 'royal-emerald', label: 'الزمرد الملكي', colors: ['#0F3D3E', '#D4B483', '#F8F6F1'], note: 'أخضر زمردي وشامبانيا' },
  { key: 'burgundy-editorial', label: 'البورجوندي التحريري', colors: ['#4A1C2B', '#B08D57', '#FBF7F2'], note: 'نبيذي داكن وذهب عتيق' },
  { key: 'charcoal-copper', label: 'الفحم والنحاس', colors: ['#1C1C1E', '#B87333', '#F3F1EC'], note: 'رمادي فحمي ونحاس دافئ' },
  { key: 'ivory-minimal', label: 'العاجي الهادئ', colors: ['#2F3A4A', '#C8B27A', '#F7F3EA'], note: 'عاجي فاتح وأزرق أردوازي' },
] as const;

export const PACKAGES = [
  { key: 'basic', label: 'الأساسية — 500 ج.م (موقع كامل، 3 أيام عمل)' },
  { key: 'pro', label: 'المحترف — 1,200 ج.م (محتوى معك + دومين خاص + 3 مقالات)' },
  { key: 'vip', label: 'المكتب المتكامل — 2,500 ج.م (فريق المكتب + شعار + 6 مقالات)' },
] as const;
