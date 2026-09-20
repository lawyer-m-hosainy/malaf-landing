import { Scale } from 'lucide-react';
import { BRAND_NAME, WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/content';

const UPDATED = '2026-09-20';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#0F172A] font-['Cairo',sans-serif]">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-black text-xl text-slate-950">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </span>
            {BRAND_NAME}
          </a>
          <a href="/" className="text-xs font-bold text-slate-600 underline">الرئيسية</a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 text-right leading-loose text-slate-700 text-sm sm:text-base">
        <h1 className="text-3xl font-black text-slate-950 mb-2">سياسة الخصوصية</h1>
        <p className="text-xs text-slate-500 mb-8">آخر تحديث: {UPDATED}</p>

        <p>
          تلتزم منصة «{BRAND_NAME}» بحماية البيانات الشخصية لزوارها وعملائها من السادة المحامين، وتسعى للتوافق مع أحكام
          قانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020 ولائحته التنفيذية.
        </p>

        <h2 className="text-xl font-black text-slate-950 mt-8 mb-2">1. البيانات التي نجمعها</h2>
        <p>عند طلب موقع إلكتروني عبر نموذج الطلب أو التواصل عبر واتساب، نجمع فقط ما يلزم لتنفيذ الخدمة:</p>
        <ul className="list-disc pr-6 space-y-1">
          <li>اسم المكتب واسم المحامي والصفة المهنية والمؤهلات.</li>
          <li>رقم الهاتف والواتساب والبريد الإلكتروني (إن وُجد) وعنوان المكتب ومواعيد العمل.</li>
          <li>مجالات التخصص ونبذة تعريفية.</li>
          <li>الشعار والصورة الشخصية التي ترفعها لنشرها على موقعك.</li>
          <li>بيانات تقنية أساسية (نوع المتصفح، الصفحة التي أُرسل منها الطلب) لأغراض الأمان ومنع الإساءة.</li>
        </ul>
        <p className="mt-2">
          <strong>لا نطلب</strong> أي أرقام قومية أو مستندات قضايا أو بيانات موكلين، ونرجو عدم إرسالها.
        </p>

        <h2 className="text-xl font-black text-slate-950 mt-8 mb-2">2. الغرض من المعالجة</h2>
        <ul className="list-disc pr-6 space-y-1">
          <li>تصميم وبناء ونشر الموقع الإلكتروني الذي طلبته، والتواصل معك بشأنه.</li>
          <li>نشر البيانات التي حددتها أنت (الاسم، التخصصات، رقم التواصل، العنوان، الصور) علناً على موقعك — بقرارك وموافقتك.</li>
          <li>قياس أداء صفحتنا وإعلاناتنا بشكل مجمّع عبر Meta Pixel (بدون بيع أي بيانات).</li>
        </ul>

        <h2 className="text-xl font-black text-slate-950 mt-8 mb-2">3. أين تُخزَّن البيانات ومن يطلع عليها</h2>
        <p>
          تُخزَّن الطلبات والصور لدى مزود قواعد بيانات سحابي (Supabase) بخوادم داخل الاتحاد الأوروبي مع تشفير أثناء النقل
          والتخزين، ولا يطلع عليها سوى فريق «{BRAND_NAME}». تُنشر مواقع العملاء عبر Cloudflare. لا نبيع البيانات ولا نشاركها
          مع أي طرف ثالث لأغراض تسويقية.
        </p>

        <h2 className="text-xl font-black text-slate-950 mt-8 mb-2">4. مدة الاحتفاظ</h2>
        <p>
          نحتفظ ببيانات الطلب طوال فترة تقديم الخدمة وسنة واحدة بعدها لأغراض الدعم والتجديد، ثم تُحذف. يمكنك طلب حذفها في أي وقت
          قبل ذلك.
        </p>

        <h2 className="text-xl font-black text-slate-950 mt-8 mb-2">5. حقوقك</h2>
        <p>
          لك الحق في الاطلاع على بياناتك وتصحيحها وحذفها وسحب موافقتك على معالجتها، وذلك بمراسلتنا عبر واتساب على{' '}
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="underline text-amber-800" dir="ltr">
            {WHATSAPP_DISPLAY}
          </a>
          . سنستجيب خلال 7 أيام عمل.
        </p>

        <h2 className="text-xl font-black text-slate-950 mt-8 mb-2">6. ملفات تعريف الارتباط</h2>
        <p>
          نستخدم Meta Pixel لقياس فاعلية الإعلانات؛ يمكنك تعطيله من إعدادات المتصفح أو عبر إعدادات الإعلانات في حساب فيسبوك.
          لا نستخدم أي ملفات تتبع أخرى.
        </p>

        <h2 className="text-xl font-black text-slate-950 mt-8 mb-2">7. التعديلات</h2>
        <p>قد نحدّث هذه السياسة عند الحاجة، ويُنشر تاريخ آخر تحديث أعلى الصفحة.</p>
      </main>
    </div>
  );
}
