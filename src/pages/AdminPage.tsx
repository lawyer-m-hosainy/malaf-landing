import { useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Scale, LogOut, RefreshCw, MessageCircle, ExternalLink, Download, Loader2, Copy, Check, Hammer, Rocket } from 'lucide-react';
import { supabase, OrderRow, OrderStatus, STATUS_LABELS } from '../lib/supabase';
import { THEMES, SPECIALTIES, PACKAGES } from '../data/orderOptions';
import { BRAND_NAME } from '../data/content';

const STATUS_COLORS: Record<OrderStatus, string> = {
  new: 'bg-sky-100 text-sky-900 border-sky-300',
  building: 'bg-amber-100 text-amber-900 border-amber-300',
  preview: 'bg-violet-100 text-violet-900 border-violet-300',
  paid: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  delivered: 'bg-slate-900 text-white border-slate-900',
  cancelled: 'bg-slate-100 text-slate-500 border-slate-300',
};
const FLOW: OrderStatus[] = ['new', 'building', 'preview', 'paid', 'delivered'];

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) return <Center><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></Center>;
  if (!session) return <Login />;
  return <Dashboard email={session.user.email || ''} />;
}

/* ------------------------------------------------------------------ */
function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function google() {
    setErr(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/admin` },
    });
    if (error) setErr(error.message);
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setBusy(false);
    if (error) setErr(error.message);
    else setSent(true);
  }

  return (
    <Center>
      <form onSubmit={send} className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-4 text-right">
        <div className="flex items-center gap-2 font-black text-lg text-slate-950">
          <Scale className="w-5 h-5 text-amber-600" /> لوحة تحكم {BRAND_NAME}
        </div>
        {sent ? (
          <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
            أرسلنا رابط الدخول إلى <span dir="ltr" className="font-mono">{email}</span>. افتح الإيميل واضغط الرابط (صالح لدقائق).
          </p>
        ) : (
          <>
            <button type="button" onClick={google} className="w-full py-3 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-900 font-bold text-sm inline-flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.5 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.8 6C12.3 13.2 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.5z"/><path fill="#FBBC05" d="M10.4 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.7l7.8-6z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.7-3.7-13.6-9l-7.8 6C6.5 42.6 14.6 48 24 48z"/></svg>
              الدخول بحساب Google
            </button>
            <div className="flex items-center gap-2 text-[11px] text-slate-400"><span className="flex-1 h-px bg-slate-200" />أو برابط على الإيميل<span className="flex-1 h-px bg-slate-200" /></div>
            <input
              type="email"
              dir="ltr"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 outline-none text-sm"
            />
            {err && <p className="text-xs text-red-600">{err}</p>}
            <button disabled={busy} className="w-full py-3 rounded-xl bg-slate-950 text-white font-bold text-sm disabled:opacity-60">
              {busy ? 'جاري الإرسال...' : 'أرسل رابط الدخول'}
            </button>
          </>
        )}
      </form>
    </Center>
  );
}

/* ------------------------------------------------------------------ */
function Dashboard({ email }: { email: string }) {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [selected, setSelected] = useState<OrderRow | null>(null);
  const [denied, setDenied] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setLoading(false);
    if (error) {
      setDenied(true);
      return;
    }
    setOrders((data || []) as OrderRow[]);
    if (selected) setSelected((data || []).find((o: OrderRow) => o.id === selected.id) || null);
  }
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };
    for (const o of orders) c[o.status] = (c[o.status] || 0) + 1;
    return c;
  }, [orders]);
  const visible = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  if (denied)
    return (
      <Center>
        <div className="bg-white rounded-2xl border border-red-200 p-6 text-center space-y-3 max-w-sm">
          <p className="text-sm text-red-700">الحساب <span dir="ltr" className="font-mono">{email}</span> غير مصرح له بالدخول.</p>
          <button onClick={() => supabase.auth.signOut()} className="text-xs underline text-slate-600">تسجيل الخروج</button>
        </div>
      </Center>
    );

  return (
    <div className="min-h-screen bg-[#F4F4F2] text-slate-900 font-['Cairo',sans-serif]">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-black text-slate-950">
            <Scale className="w-5 h-5 text-amber-600" /> الطلبات
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{orders.length}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button onClick={load} className="p-2 rounded-lg hover:bg-slate-100" title="تحديث"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /></button>
            <span className="hidden sm:inline text-slate-500" dir="ltr">{email}</span>
            <button onClick={() => supabase.auth.signOut()} className="p-2 rounded-lg hover:bg-slate-100" title="خروج"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-12 gap-6">
        <section className="lg:col-span-5 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {(['all', ...FLOW, 'cancelled'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border ${filter === s ? 'bg-slate-950 text-white border-slate-950' : 'bg-white border-slate-200 text-slate-600'}`}
              >
                {s === 'all' ? 'الكل' : STATUS_LABELS[s]} {counts[s] ? `(${counts[s]})` : ''}
              </button>
            ))}
          </div>
          {loading && !orders.length && <p className="text-sm text-slate-500">جاري التحميل...</p>}
          {!loading && !visible.length && <p className="text-sm text-slate-500 bg-white rounded-xl p-6 text-center border border-slate-200">لا توجد طلبات هنا.</p>}
          <ul className="space-y-2">
            {visible.map((o) => (
              <li key={o.id}>
                <button
                  onClick={() => setSelected(o)}
                  className={`w-full text-right bg-white rounded-xl border p-4 hover:border-amber-400 transition-colors ${selected?.id === o.id ? 'border-amber-500 ring-2 ring-amber-300/40' : 'border-slate-200'}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-black text-sm text-slate-950 truncate">{String(o.lawyer.officeName || '—')}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${STATUS_COLORS[o.status]}`}>{STATUS_LABELS[o.status]}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                    <span dir="ltr" className="font-mono">{o.code} · {o.slug}</span>
                    <span>{new Date(o.created_at).toLocaleDateString('ar-EG')}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="lg:col-span-7">
          {selected ? <OrderDetail order={selected} onChange={load} /> : <p className="text-sm text-slate-500 bg-white rounded-xl p-10 text-center border border-slate-200">اختر طلباً من القائمة.</p>}
        </section>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function OrderDetail({ order, onChange }: { order: OrderRow; onChange: () => void }) {
  const [busy, setBusy] = useState(false);
  const [slug, setSlug] = useState(order.slug || '');
  const [previewUrl, setPreviewUrl] = useState(order.preview_url || '');
  const [liveUrl, setLiveUrl] = useState(order.live_url || '');
  const [adminNotes, setAdminNotes] = useState(order.admin_notes || '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSlug(order.slug || '');
    setPreviewUrl(order.preview_url || '');
    setLiveUrl(order.live_url || '');
    setAdminNotes(order.admin_notes || '');
  }, [order.id, order.slug, order.preview_url, order.live_url, order.admin_notes]);

  const L = order.lawyer as Record<string, any>;
  const phone = String(L.whatsapp || L.phone || '');
  const theme = THEMES.find((t) => t.key === order.theme);
  const pkg = PACKAGES.find((p) => p.key === order.package);
  const specialtyLabels = ((L.specialties as string[]) || []).map((k) => SPECIALTIES.find((s) => s.key === k)?.label || k);

  async function save(patch: Partial<OrderRow>) {
    setBusy(true);
    const { error } = await supabase.from('orders').update(patch).eq('id', order.id);
    setBusy(false);
    if (error) alert('لم يتم الحفظ: ' + error.message);
    else onChange();
  }

  /** Ask the cloud builder (Supabase function → GitHub Actions) to build or deliver this order */
  async function build(deliver: boolean) {
    if (deliver && !confirm(`نشر الموقع على ${slug}.malaf.pro وتسليمه؟ (بعد التأكد من الدفع)`)) return;
    setBusy(true);
    const { data, error } = await supabase.functions.invoke('build-order', { body: { code: order.code, deliver } });
    setBusy(false);
    if (error || data?.error) {
      alert('تعذّر بدء البناء: ' + (data?.error || error?.message || 'خطأ غير معروف'));
      return;
    }
    onChange();
    alert(deliver ? 'بدأ النشر على الدومين — يستغرق 3–5 دقائق، اضغط تحديث بعدها.' : 'بدأ بناء المعاينة — يستغرق 3–5 دقائق، اضغط تحديث بعدها وهتلاقي الرابط.');
  }

  const setStatus = (status: OrderStatus) => {
    const patch: Partial<OrderRow> = { status };
    if (status === 'paid') patch.paid_at = new Date().toISOString();
    if (status === 'delivered') patch.delivered_at = new Date().toISOString();
    if (status === 'preview' && previewUrl) patch.preview_url = previewUrl;
    if (status === 'delivered' && liveUrl) patch.live_url = liveUrl;
    return save(patch);
  };

  const orderJson = useMemo(
    () =>
      JSON.stringify(
        {
          slug: slug || order.slug,
          theme: order.theme,
          domain: `https://${slug || order.slug}.malaf.pro`,
          package: order.package,
          lawyer: order.lawyer,
          assets: { logo: order.assets.logo || null, photo: order.assets.photo || null, hero: order.assets.hero || null },
          analytics: { ga4: '' },
          content: order.content || {},
          _meta: { code: order.code, id: order.id, notes: order.notes },
        },
        null,
        2
      ),
    [order, slug]
  );

  const wa = (text: string) => `https://wa.me/2${phone}?text=${encodeURIComponent(text)}`;
  const PRICES: Record<string, string> = { basic: '500', pro: '1,200', vip: '2,500' };
  const payLine =
    order.package === 'basic'
      ? `بعد موافقتك يُسدَّد مبلغ ${PRICES.basic} ج.م (إنستاباي / فودافون كاش) وننشر الموقع على دومينك خلال يوم عمل.`
      : `بعد موافقتك تُسدَّد الدفعة الثانية (50% المتبقية من ${PRICES[order.package] || ''} ج.م) وننشر الموقع على دومينك خلال يوم عمل.`;
  const msgPreview = `أستاذ/ة ${L.displayName || ''}، نسخة المعاينة من موقعكم جاهزة: ${previewUrl || '[رابط المعاينة]'}
تصفّحها من الموبايل والكمبيوتر، وابعتلنا أي تعديلات. ${payLine}`;
  const msgDelivered = `مبروك! موقعكم أصبح منشوراً على: ${liveUrl || `https://${slug}.malaf.pro`}\nولو محتاج تعديلات على النصوص أو الصور أو الألوان، عندك جولة تعديلات مجانية — ابعتهالنا هنا مرة واحدة.`;


  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5 text-right">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-950">{String(L.officeName)}</h2>
          <p className="text-xs text-slate-500">
            <span dir="ltr" className="font-mono">{order.code}</span> · {new Date(order.created_at).toLocaleString('ar-EG')} · {pkg?.label.split(' — ')[0]}
          </p>
        </div>
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${STATUS_COLORS[order.status]}`}>{STATUS_LABELS[order.status]}</span>
      </div>

      <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
        <Row k="المحامي" v={`${L.displayName || '—'} — ${L.title || ''}`} />
        <Row k="الهاتف / واتساب" v={<span dir="ltr" className="font-mono">{L.phone}{L.whatsapp && L.whatsapp !== L.phone ? ` / ${L.whatsapp}` : ''}</span>} />
        <Row k="المدينة" v={`${L.city}${L.address ? ' — ' + L.address : ''}`} />
        <Row k="الإيميل" v={L.email || '—'} />
        <Row k="التخصصات" v={specialtyLabels.join('، ') || '—'} />
        <Row k="الخبرة" v={L.yearsOfExperience ? `${L.yearsOfExperience} سنة` : '—'} />
        <Row k="النمط" v={<span className="inline-flex items-center gap-1">{theme?.colors.map((c) => <i key={c} className="w-3 h-3 rounded-full border border-slate-300 inline-block" style={{ backgroundColor: c }} />)} {theme?.label}</span>} />
        <Row k="المواعيد" v={L.workingHours || '—'} />
      </dl>
      {!!(L.credentials as string[])?.length && <p className="text-xs text-slate-600"><b>المؤهلات:</b> {(L.credentials as string[]).join(' · ')}</p>}
      {L.bio && <p className="text-xs text-slate-600"><b>النبذة:</b> {L.bio}</p>}
      {order.notes && <p className="text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-lg p-2"><b>ملاحظات المحامي:</b> {order.notes}</p>}

      {(order.assets.logo || order.assets.photo) && (
        <div className="flex gap-3">
          {order.assets.logo && <a href={order.assets.logo} target="_blank" rel="noreferrer" className="block"><img src={order.assets.logo} alt="الشعار" className="h-16 rounded-lg border border-slate-200 bg-slate-50 object-contain p-1" /><span className="text-[10px] text-slate-500">الشعار</span></a>}
          {order.assets.photo && <a href={order.assets.photo} target="_blank" rel="noreferrer" className="block"><img src={order.assets.photo} alt="الصورة" className="h-16 rounded-lg border border-slate-200 object-cover" /><span className="text-[10px] text-slate-500">الصورة</span></a>}
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-3 text-sm">
        <label className="block"><span className="text-xs font-bold text-slate-600">النطاق الفرعي</span><input dir="ltr" className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} onBlur={() => slug !== order.slug && save({ slug })} /><span className="text-[10px] text-slate-400" dir="ltr">{slug}.malaf.pro</span></label>
        <label className="block"><span className="text-xs font-bold text-slate-600">رابط المعاينة</span><input dir="ltr" className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs" value={previewUrl} onChange={(e) => setPreviewUrl(e.target.value)} onBlur={() => previewUrl !== (order.preview_url || '') && save({ preview_url: previewUrl || null })} placeholder="https://malaf-xxx.pages.dev" /></label>
        <label className="block"><span className="text-xs font-bold text-slate-600">الرابط النهائي</span><input dir="ltr" className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} onBlur={() => liveUrl !== (order.live_url || '') && save({ live_url: liveUrl || null })} placeholder={`https://${slug}.malaf.pro`} /></label>
      </div>
      <label className="block text-sm"><span className="text-xs font-bold text-slate-600">ملاحظاتك</span><textarea className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-xs" rows={2} value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} onBlur={() => adminNotes !== (order.admin_notes || '') && save({ admin_notes: adminNotes || null })} /></label>

      {/* Cloud build */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
        {(order.status === 'new' || order.status === 'preview') && (
          <button disabled={busy} onClick={() => build(false)} className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black inline-flex items-center gap-1.5 disabled:opacity-60">
            <Hammer className="w-3.5 h-3.5" /> {order.status === 'preview' ? 'إعادة بناء المعاينة' : 'بناء ومعاينة'}
          </button>
        )}
        {order.status === 'paid' && (
          <button disabled={busy} onClick={() => build(true)} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black inline-flex items-center gap-1.5 disabled:opacity-60">
            <Rocket className="w-3.5 h-3.5" /> نشر على {slug}.malaf.pro وتسليم
          </button>
        )}
        {order.status === 'building' && (
          <span className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold inline-flex items-center gap-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> جاري البناء في السحابة (3–5 دقائق) — اضغط تحديث ↻
          </span>
        )}
        {order.status === 'delivered' && liveUrl && (
          <a href={liveUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-slate-950 text-white text-xs font-black inline-flex items-center gap-1.5"><ExternalLink className="w-3.5 h-3.5" /> الموقع منشور</a>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {order.status === 'preview' && (
          <button disabled={busy} onClick={() => confirm('تأكيد استلام الدفع؟') && setStatus('paid')} className="px-4 py-2 rounded-xl bg-slate-950 text-white text-xs font-black disabled:opacity-60">
            ✓ تم الدفع
          </button>
        )}
        {order.status === 'building' && (
          <button disabled={busy} onClick={() => confirm('إعادة الطلب لحالة «جديد»؟ (لو البناء فشل)') && setStatus('new')} className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold">
            إعادة لـ «جديد»
          </button>
        )}
        {order.status === 'preview' && (
          <a href={wa(msgPreview)} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-black inline-flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> ابعت رابط المعاينة</a>
        )}
        {order.status === 'delivered' && (
          <a href={wa(msgDelivered)} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-black inline-flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> ابعت رسالة التسليم</a>
        )}
        <a href={wa(`أستاذ/ة ${L.displayName || ''}، بخصوص طلب موقعكم (${order.code}):`)} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl border border-emerald-300 text-emerald-800 text-xs font-bold inline-flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> واتساب</a>
        {previewUrl && <a href={previewUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold inline-flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5" /> المعاينة</a>}
        {liveUrl && <a href={liveUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold inline-flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5" /> الموقع</a>}
        <button
          onClick={() => {
            const blob = new Blob([orderJson], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `${slug || order.code}.json`;
            a.click();
          }}
          className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold inline-flex items-center gap-1"
        >
          <Download className="w-3.5 h-3.5" /> ملف الطلب للمصنع
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(`node scripts/process.mjs ${order.code}`).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); })}
          className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-mono inline-flex items-center gap-1"
          title="انسخ أمر البناء"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />} process {order.code}
        </button>
        {order.status !== 'cancelled' && order.status !== 'delivered' && (
          <button disabled={busy} onClick={() => confirm('إلغاء الطلب؟') && setStatus('cancelled')} className="px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-red-600 ms-auto">إلغاء</button>
        )}
      </div>
    </div>
  );
}

const Row = ({ k, v }: { k: string; v: React.ReactNode }) => (
  <div className="flex gap-2"><dt className="text-slate-500 shrink-0 w-28">{k}</dt><dd className="font-semibold text-slate-800 min-w-0 break-words">{v}</dd></div>
);

function Center({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#F4F4F2] flex items-center justify-center p-4 font-['Cairo',sans-serif]" dir="rtl">{children}</div>;
}
