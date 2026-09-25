import { useState, useEffect, useRef, FormEvent } from 'react';
import { Scale, CheckCircle2, MessageCircle, Upload, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SPECIALTIES, CITIES, THEMES, PACKAGES } from '../data/orderOptions';
import { BRAND_NAME, WHATSAPP_NUMBER, OFFER_PRICE, DELIVERY_TIME, DOMAIN_HOSTING_NOTE, TURNSTILE_SITE_KEY } from '../data/content';
import { trackLead } from '../utils/tracking';

const EG_PHONE = /^01[0125]\d{8}$/;
const MAX_MB = 8;

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/** Cloudflare Turnstile ("أنا مش روبوت") — بيدّي توكن يستخدم مرة واحدة؛ resetKey يطلب توكن جديد بعد كل محاولة. */
function Turnstile({ onToken, resetKey }: { onToken: (t: string | null) => void; resetKey: number }) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const cb = useRef(onToken);
  cb.current = onToken;

  useEffect(() => {
    let cancelled = false;
    const mount = () => {
      if (cancelled || !box.current || !window.turnstile || widget.current) return;
      widget.current = window.turnstile.render(box.current, {
        sitekey: TURNSTILE_SITE_KEY,
        language: 'ar',
        callback: (t: string) => cb.current(t),
        'expired-callback': () => cb.current(null),
        'error-callback': () => cb.current(null),
      });
    };
    if (window.turnstile) mount();
    else {
      const id = 'cf-turnstile-script';
      let s = document.getElementById(id) as HTMLScriptElement | null;
      if (!s) {
        s = document.createElement('script');
        s.id = id;
        s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        s.async = true;
        document.head.appendChild(s);
      }
      s.addEventListener('load', mount);
    }
    return () => {
      cancelled = true;
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, []);

  useEffect(() => {
    if (resetKey && widget.current && window.turnstile) {
      cb.current(null);
      window.turnstile.reset(widget.current);
    }
  }, [resetKey]);

  return <div ref={box} className="flex justify-center min-h-[65px]" />;
}

type Field = { label: string; hint?: string; required?: boolean; children: React.ReactNode };
const Field = ({ label, hint, required, children }: Field) => (
  <label className="block">
    <span className="block text-sm font-bold text-slate-800 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </span>
    {children}
    {hint && <span className="block text-[11px] text-slate-500 mt-1">{hint}</span>}
  </label>
);

const input =
  'w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 text-slate-900 bg-white text-sm outline-none';

/** Latin slug from the office/lawyer name for the subdomain suggestion */
function suggestSlug(name: string, phone: string) {
  const map: Record<string, string> = {
    ا: 'a', أ: 'a', إ: 'e', آ: 'a', ب: 'b', ت: 't', ث: 'th', ج: 'g', ح: 'h', خ: 'kh', د: 'd', ذ: 'z', ر: 'r', ز: 'z', س: 's',
    ش: 'sh', ص: 's', ض: 'd', ط: 't', ظ: 'z', ع: 'a', غ: 'gh', ف: 'f', ق: 'k', ك: 'k', ل: 'l', م: 'm', ن: 'n', ه: 'h', ة: 'a',
    و: 'w', ي: 'y', ى: 'a', ء: '', ئ: 'e', ؤ: 'o',
  };
  const words = name
    .replace(/مكتب|المستشار|الأستاذ|الأستاذة|الدكتور|الدكتورة|للمحاماة|والاستشارات|القانونية|أ\.|\//g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);
  const latin = words
    .map((w) => [...w].map((c) => map[c] ?? (/[a-z0-9]/i.test(c) ? c.toLowerCase() : '')).join(''))
    .filter(Boolean)
    .join('-');
  return (latin || 'law') + '-' + phone.slice(-4);
}

export default function OrderPage() {
  // ?code=XXXXXX → the lawyer already ordered via the WhatsApp bot; only collect logo/photo.
  const attachCode = new URLSearchParams(window.location.search).get('code')?.toUpperCase() || '';
  if (/^[A-Z0-9]{6}$/.test(attachCode)) return <AttachAssets code={attachCode} />;
  return <FullOrderForm />;
}

function AttachAssets({ code }: { code: string }) {
  const [logo, setLogo] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function upload(file: File, name: string) {
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const path = `${code}/${name}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from('order-assets').upload(path, file, { upsert: false, contentType: file.type });
    if (upErr) throw new Error('تعذّر رفع الصورة: ' + upErr.message);
    return supabase.storage.from('order-assets').getPublicUrl(path).data.publicUrl;
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!logo && !photo) return setError('اختر الشعار أو الصورة على الأقل');
    for (const f of [logo, photo]) if (f && f.size > MAX_MB * 1024 * 1024) return setError(`حجم الملف أكبر من ${MAX_MB} ميجا`);
    setBusy(true);
    setError(null);
    try {
      const assets: Record<string, string> = {};
      if (logo) assets.logo = await upload(logo, 'logo');
      if (photo) assets.photo = await upload(photo, 'photo');
      const { data, error: rpcErr } = await supabase.rpc('attach_order_assets', { p_code: code, p_assets: assets });
      if (rpcErr || !data) throw new Error('كود الطلب غير صحيح أو الطلب تم تسليمه بالفعل — راسلنا على واتساب');
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ، حاول مرة أخرى');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      <div className="max-w-lg mx-auto bg-white rounded-3xl border border-amber-300/60 shadow-xl p-6 sm:p-8 space-y-5 text-right">
        <h1 className="text-2xl font-black text-slate-950">أضف شعارك وصورتك</h1>
        <p className="text-sm text-slate-600">
          للطلب رقم <span className="font-mono font-black text-amber-700" dir="ltr">{code}</span>. الخطوة اختيارية — بدون شعار نصمم علامة نصية أنيقة باسم مكتبك.
        </p>
        {done ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 text-sm font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> تم استلام الصور وإضافتها لطلبك. شكراً!
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <Field label="شعار المكتب" hint="PNG / SVG / JPG حتى 8 ميجا">
              <label className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-slate-300 text-sm text-slate-600 cursor-pointer hover:border-amber-400">
                <Upload className="w-4 h-4" /> {logo ? logo.name : 'اختر ملف'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setLogo(e.target.files?.[0] || null)} />
              </label>
            </Field>
            <Field label="صورتك الشخصية" hint="تظهر في صفحة «من نحن»">
              <label className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-slate-300 text-sm text-slate-600 cursor-pointer hover:border-amber-400">
                <Upload className="w-4 h-4" /> {photo ? photo.name : 'اختر ملف'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
              </label>
            </Field>
            {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">{error}</p>}
            <button disabled={busy} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black disabled:opacity-60 inline-flex items-center justify-center gap-2">
              {busy ? <><Loader2 className="w-5 h-5 animate-spin" /> جاري الرفع...</> : 'رفع الصور'}
            </button>
          </form>
        )}
      </div>
    </Shell>
  );
}

function FullOrderForm() {
  const [form, setForm] = useState({
    officeName: '',
    displayName: '',
    title: 'محامٍ ومستشار قانوني',
    phone: '',
    whatsapp: '',
    email: '',
    city: 'القاهرة',
    otherCity: '',
    address: '',
    yearsOfExperience: '',
    credentials: '',
    bio: '',
    workingHours: 'من 10 صباحاً إلى 8 مساءً، ما عدا الجمعة',
    theme: 'classic-navy',
    package: 'basic',
    notes: '',
    consent: false,
  });
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [logo, setLogo] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ code: string } | null>(null);
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [captchaReset, setCaptchaReset] = useState(0);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

  const toggleSpecialty = (key: string) =>
    setSpecialties((s) => (s.includes(key) ? s.filter((k) => k !== key) : s.length < 5 ? [...s, key] : s));

  const pickFile = (setter: (f: File | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (f && f.size > MAX_MB * 1024 * 1024) {
      setError(`حجم الملف أكبر من ${MAX_MB} ميجا`);
      e.target.value = '';
      return;
    }
    setError(null);
    setter(f);
  };

  async function upload(file: File, folder: string, name: string) {
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const path = `${folder}/${name}.${ext}`;
    const { error: upErr } = await supabase.storage.from('order-assets').upload(path, file, { upsert: false, contentType: file.type });
    if (upErr) throw new Error('تعذّر رفع الصورة: ' + upErr.message);
    return supabase.storage.from('order-assets').getPublicUrl(path).data.publicUrl;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const phone = form.phone.replace(/\D/g, '');
    const whatsapp = (form.whatsapp || form.phone).replace(/\D/g, '');
    if (form.officeName.trim().length < 4) return setError('اكتب اسم المكتب كاملاً');
    if (!EG_PHONE.test(phone)) return setError('رقم الهاتف لازم يكون رقم مصري 11 رقماً يبدأ بـ 010/011/012/015');
    if (!EG_PHONE.test(whatsapp)) return setError('رقم الواتساب غير صحيح');
    if (!specialties.length) return setError('اختر تخصصاً واحداً على الأقل');
    if (!form.consent) return setError('يرجى الموافقة على استخدام البيانات لإنشاء الموقع');
    const city = form.city === 'أخرى' ? form.otherCity.trim() : form.city;
    if (!city) return setError('اكتب اسم المدينة');
    if (!captcha) return setError('استنى ثانية لحد ما علامة التحقق (أنا مش روبوت) تظهر ✓ وبعدين اضغط إرسال');

    setSubmitting(true);
    try {
      const folder = crypto.randomUUID();
      const assets: Record<string, string> = {};
      if (logo) assets.logo = await upload(logo, folder, 'logo');
      if (photo) assets.photo = await upload(photo, folder, 'photo');

      const lawyer = {
        officeName: form.officeName.trim(),
        shortName: '',
        displayName: form.displayName.trim(),
        title: form.title.trim(),
        phone,
        whatsapp,
        email: form.email.trim(),
        city,
        address: form.address.trim(),
        specialties,
        yearsOfExperience: form.yearsOfExperience ? Number(form.yearsOfExperience) : null,
        credentials: form.credentials.split('\n').map((s) => s.trim()).filter(Boolean),
        bio: form.bio.trim(),
        workingHours: form.workingHours.trim(),
      };

      // الطلب بيتسجّل عن طريق دالة submit-order (تحقق Turnstile + حدود السبام)، وهي اللي بتولّد الكود
      // وتضيف لاحقة للنطاق المقترح لو اتكرر.
      const order = {
        theme: form.theme,
        package: form.package,
        slug: suggestSlug(form.officeName, phone),
        lawyer,
        assets,
        notes: form.notes.trim() || null,
        source: window.location.href,
        user_agent: navigator.userAgent,
      };
      const { data, error: fnErr } = await supabase.functions.invoke('submit-order', { body: { token: captcha, order } });
      if (fnErr || !data?.code) {
        let msg = 'حدث خطأ أثناء الإرسال، حاول مرة أخرى أو راسلنا على واتساب';
        try {
          const detail = await (fnErr as { context?: Response })?.context?.json();
          if (detail?.error) msg = detail.error;
        } catch {
          /* keep the generic message */
        }
        setCaptchaReset((n) => n + 1); // التوكن اتستخدم — نطلب واحد جديد للمحاولة الجاية
        throw new Error(msg);
      }
      const code = data.code as string;

      trackLead('form', { package: form.package, order: true });
      setDone({ code });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع، حاول مرة أخرى أو راسلنا على واتساب');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    const msg = `السلام عليكم ${BRAND_NAME}، أرسلت طلب موقعي من الصفحة. كود الطلب: ${done.code} — مكتب ${form.officeName}.`;
    const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    return (
      <Shell>
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-emerald-200 shadow-xl p-8 text-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h1 className="text-2xl font-black text-slate-950">تم استلام طلبك ✅</h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            كود طلبك: <span className="font-mono font-black text-lg text-amber-700" dir="ltr">{done.code}</span>
            <br />
            سنجهّز نسخة معاينة من موقعك ونرسل لك رابطها على واتساب خلال {DELIVERY_TIME} — الدفع بعد ما تشوفها وتوافق.
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black"
          >
            <MessageCircle className="w-5 h-5" />
            أكّد طلبك على واتساب (اضغط هنا)
          </a>
          <p className="text-[11px] text-slate-500">الضغطة دي بتبعتلنا كود طلبك عشان نبدأ فوراً.</p>
          <a href="/" className="text-xs text-slate-500 underline">العودة للصفحة الرئيسية</a>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950">اطلب موقعك الشخصي</h1>
          <p className="text-slate-600 text-sm sm:text-base">
            5 دقائق وبيانات بسيطة — ونجهّز لك نسخة معاينة كاملة قبل أي دفع. عرض الإطلاق {OFFER_PRICE}.
          </p>
        </div>

        <form onSubmit={onSubmit} className="bg-white rounded-3xl border-2 border-amber-300/60 shadow-xl p-6 sm:p-8 space-y-8 text-right">
          {/* 1. المكتب */}
          <section className="space-y-4">
            <h2 className="text-lg font-black text-slate-950 flex items-center gap-2"><Scale className="w-5 h-5 text-amber-600" /> بيانات المكتب</h2>
            <Field label="اسم المكتب كما سيظهر في الموقع" required hint="مثال: مكتب المستشار أحمد محمود للمحاماة">
              <input className={input} value={form.officeName} onChange={set('officeName')} placeholder="مكتب ... للمحاماة" required />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="اسم المحامي (للصفحة التعريفية)" hint="مثال: أ. أحمد محمود عبد الله">
                <input className={input} value={form.displayName} onChange={set('displayName')} />
              </Field>
              <Field label="الصفة المهنية">
                <input className={input} value={form.title} onChange={set('title')} placeholder="محامٍ بالنقض / بالاستئناف العالي" />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="رقم الهاتف (يظهر في الموقع)" required>
                <input className={input} dir="ltr" inputMode="numeric" maxLength={11} value={form.phone} onChange={set('phone')} placeholder="01xxxxxxxxx" required />
              </Field>
              <Field label="رقم الواتساب (لو مختلف)">
                <input className={input} dir="ltr" inputMode="numeric" maxLength={11} value={form.whatsapp} onChange={set('whatsapp')} placeholder="01xxxxxxxxx" />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="البريد الإلكتروني (اختياري)">
                <input className={input} dir="ltr" type="email" value={form.email} onChange={set('email')} />
              </Field>
              <Field label="المدينة" required>
                <select className={input} value={form.city} onChange={set('city')}>
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                  <option>أخرى</option>
                </select>
              </Field>
            </div>
            {form.city === 'أخرى' && (
              <Field label="اكتب المدينة" required>
                <input className={input} value={form.otherCity} onChange={set('otherCity')} />
              </Field>
            )}
            <Field label="عنوان المكتب" hint="يظهر في صفحة التواصل وفي جوجل">
              <input className={input} value={form.address} onChange={set('address')} placeholder="الشارع، الحي، المدينة" />
            </Field>
            <Field label="مواعيد العمل">
              <input className={input} value={form.workingHours} onChange={set('workingHours')} />
            </Field>
          </section>

          {/* 2. التخصصات */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-950">مجالات التخصص <span className="text-red-500">*</span></h2>
            <p className="text-xs text-slate-500">اختر حتى 5 — كل تخصص بياخد صفحة مستقلة وأسئلة شائعة خاصة به.</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {SPECIALTIES.map((s) => {
                const on = specialties.includes(s.key);
                return (
                  <button
                    type="button"
                    key={s.key}
                    onClick={() => toggleSpecialty(s.key)}
                    className={`text-right px-4 py-3 rounded-xl border text-sm font-bold transition-colors ${on ? 'bg-amber-100 border-amber-500 text-amber-950' : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'}`}
                    aria-pressed={on}
                  >
                    {on ? '✓ ' : ''}{s.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 3. السيرة */}
          <section className="space-y-4">
            <h2 className="text-lg font-black text-slate-950">السيرة المهنية</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="سنوات الخبرة">
                <input className={input} dir="ltr" inputMode="numeric" type="number" min={0} max={60} value={form.yearsOfExperience} onChange={set('yearsOfExperience')} />
              </Field>
              <Field label="القيد والمؤهلات (سطر لكل بند)" hint="مثال: محامٍ بالنقض — عضو نقابة المحامين – القاهرة — ليسانس الحقوق 2010">
                <textarea className={input} rows={3} value={form.credentials} onChange={set('credentials')} />
              </Field>
            </div>
            <Field label="نبذة عنك (اختياري — لو تركتها نكتبها لك بصياغة مهنية)">
              <textarea className={input} rows={3} value={form.bio} onChange={set('bio')} />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="شعار المكتب (اختياري)" hint="PNG/SVG/JPG حتى 8 ميجا — بدون شعار نصمم علامة نصية أنيقة">
                <label className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-slate-300 text-sm text-slate-600 cursor-pointer hover:border-amber-400">
                  <Upload className="w-4 h-4" /> {logo ? logo.name : 'اختر ملف'}
                  <input type="file" accept="image/*" className="hidden" onChange={pickFile(setLogo)} />
                </label>
              </Field>
              <Field label="صورتك الشخصية (اختياري)" hint="تظهر في صفحة «من نحن»">
                <label className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-slate-300 text-sm text-slate-600 cursor-pointer hover:border-amber-400">
                  <Upload className="w-4 h-4" /> {photo ? photo.name : 'اختر ملف'}
                  <input type="file" accept="image/*" className="hidden" onChange={pickFile(setPhoto)} />
                </label>
              </Field>
            </div>
          </section>

          {/* 4. النمط والباقة */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-950">نمط التصميم <span className="text-red-500">*</span></h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {THEMES.map((t) => {
                const on = form.theme === t.key;
                return (
                  <button
                    type="button"
                    key={t.key}
                    onClick={() => setForm((f) => ({ ...f, theme: t.key }))}
                    className={`text-right p-3 rounded-xl border transition-colors ${on ? 'border-amber-500 ring-2 ring-amber-400/40 bg-amber-50' : 'border-slate-200 hover:border-amber-300'}`}
                    aria-pressed={on}
                  >
                    <div className="flex items-center gap-1 mb-1.5">
                      {t.colors.map((c) => <span key={c} className="w-5 h-5 rounded-full border border-slate-300" style={{ backgroundColor: c }} />)}
                    </div>
                    <div className="text-sm font-black text-slate-900">{t.label}</div>
                    <div className="text-[11px] text-slate-500">{t.note}</div>
                  </button>
                );
              })}
            </div>
            <a href="/#portfolio" className="text-xs text-amber-800 underline">شاهد معاينة الأنماط الخمسة ←</a>
            <Field label="الباقة">
              <select className={input} value={form.package} onChange={set('package')}>
                {PACKAGES.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
              </select>
            </Field>
            <Field label="ملاحظات أو طلبات خاصة (اختياري)">
              <textarea className={input} rows={3} value={form.notes} onChange={set('notes')} placeholder="ألوان معينة، صفحات إضافية، دومين خاص عندك بالفعل..." />
            </Field>
            <p className="text-[11px] text-slate-500 leading-relaxed">📌 {DOMAIN_HOSTING_NOTE}</p>
          </section>

          <label className="flex items-start gap-2 text-xs text-slate-700">
            <input type="checkbox" className="mt-0.5" checked={form.consent} onChange={set('consent')} />
            <span>أوافق على استخدام البيانات والصور المرسلة لإنشاء موقعي الإلكتروني فقط وفق <a href="/privacy" className="underline text-amber-800" target="_blank">سياسة الخصوصية</a>، وأقر بأن المحتوى لا يتضمن وعوداً بنتائج أو ما يخالف آداب مهنة المحاماة.</span>
          </label>

          <Turnstile onToken={setCaptcha} resetKey={captchaReset} />

          {error && (
            <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-base shadow-lg disabled:opacity-60 inline-flex items-center justify-center gap-2"
          >
            {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> جاري الإرسال...</> : <><ArrowRight className="w-5 h-5 rotate-180" /> أرسل الطلب — المعاينة قبل الدفع</>}
          </button>
        </form>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#0F172A] font-['Cairo',sans-serif]">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-black text-xl text-slate-950">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center"><Scale className="w-5 h-5 text-white" /></span>
            {BRAND_NAME}
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">واتساب</a>
        </div>
      </header>
      <main className="px-4 py-10 sm:py-14">{children}</main>
    </div>
  );
}
