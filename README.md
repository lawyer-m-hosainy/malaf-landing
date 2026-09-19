# مَلَف — صفحة هبوط «مواقع شخصية للمحامين»

صفحة بيع خدمة تصميم المواقع الشخصية للمحامين في مصر (عرض الإطلاق: 500 ج.م — التسليم خلال 3 أيام عمل).

- React 19 + Vite 8 + Tailwind CSS 4 + TypeScript (strict)
- بدون أي خادم أو قاعدة بيانات: كل الطلبات تصل عبر **واتساب** برسالة جاهزة

## التشغيل

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # الناتج في dist/
npm run preview    # معاينة نسخة الإنتاج
npm run lint       # فحص الأنواع (tsc)
```

## أين تعدّل البيانات؟

كل البيانات التجارية في ملف واحد: [`src/data/content.ts`](src/data/content.ts)

| الثابت | الاستخدام |
|---|---|
| `BRAND_NAME` / `BRAND_TAGLINE` / `BRAND_DESCRIPTION` | اسم البراند ووصفه في الهيدر والفوتر والـ SEO |
| `WHATSAPP_NUMBER` (`201141973834`) | رقم واتساب لكل الأزرار والفورم (صيغة دولية بدون +) |
| `WHATSAPP_DISPLAY` (`01141973834`) | نفس الرقم بصيغة العرض |
| `DEMO_URL` (`https://hosainy.pro`) | النموذج الحي الظاهر في الهيرو وقسم «النموذج الحي» والفوتر |
| `OFFER_PRICE` / `DELIVERY_TIME` | السعر ومدة التسليم في كل الصفحة |
| `DOMAIN_HOSTING_NOTE` | ملاحظة الدومين والاستضافة (الباقات + الأسئلة الشائعة + الفوتر) |
| `PRICING_PACKAGES` | الباقات الثلاث (السعر، السعر قبل الخصم، المميزات) |
| `FAQ_ITEMS` / `FEATURES` / `PAIN_POINTS` / `BEFORE_AFTER_ITEMS` | نصوص الأقسام |
| `WEBHOOK_URL` | اختياري: رابط Webhook (Google Sheets / CRM) لتسجيل الطلبات بالإضافة إلى واتساب. اتركه فارغاً لتعطيله |

أنماط التصميم الخمسة (الألوان، الاسم، الوصف، التخصصات المناسبة) في `src/data/designsData.ts` — كل نمط له `layout` و`palette` تتحكم في شكل النموذج المصغّر تلقائياً.

## كيف يصل الطلب؟

1. الزائر يملأ الفورم (اسم، رقم مصري، تخصص، نمط تصميم، باقة، إضافات، ملاحظات).
2. عند الإرسال تُبنى رسالة واتساب كاملة بالبيانات (`src/utils/whatsappTemplates.ts`) ويُفتح `wa.me/201141973834` بها.
3. تظهر نافذة «رسالتك جاهزة على واتساب» بزر إعادة الفتح لو المتصفح منع النافذة.
4. اختيارياً، لو `WEBHOOK_URL` مضبوط، تُرسل نسخة JSON من الطلب إليه.

## قبل النشر

- **صورة المشاركة (OG)**: `public/og-image.jpg` موجودة (1200×630). فيسبوك يحتاج رابطاً مطلقاً، فبعد معرفة الدومين النهائي غيّر
  `content="/og-image.jpg"` في `index.html` إلى `https://your-domain/og-image.jpg`، وأضف
  `<link rel="canonical" href="https://your-domain/" />`.
- **Meta Pixel / Google Analytics**: أضف كود التتبع في `index.html` قبل `</head>` لقياس التحويلات من إعلانات فيسبوك.
- **النشر**: مشروع Vite ثابت — يعمل مباشرة على Vercel / Netlify / Cloudflare Pages (أمر البناء `npm run build`، مجلد الإخراج `dist`).
