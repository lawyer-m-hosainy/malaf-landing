import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { BOT_ORDER_LINK } from '../data/content';

/**
 * الزرار العائم الوحيد في الصفحة — على الموبايل بس، بيظهر بعد الواجهة
 * وبيختفي عند القسم الأخير (اللي فيه نفس الزرار).
 */
export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero');
      const end = document.getElementById('start');
      if (!hero) return;
      const pastHero = hero.getBoundingClientRect().bottom < 0;
      const atEnd = !!end && end.getBoundingClientRect().top < window.innerHeight;
      setVisible(pastHero && !atEnd);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 p-3">
      <a
        href={BOT_ORDER_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black"
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        اطلب موقعك على واتساب
      </a>
    </div>
  );
}
