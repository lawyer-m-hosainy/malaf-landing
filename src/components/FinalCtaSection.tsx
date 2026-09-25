import { MessageCircle } from 'lucide-react';
import { BOT_ORDER_LINK, DELIVERY_TIME, OFFER_PRICE } from '../data/content';

export default function FinalCtaSection() {
  return (
    <section id="start" className="py-20 bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black leading-tight">موكلك القادم بيدوّر على محامٍ في جوجل دلوقتي.</h2>
        <p className="text-slate-300 text-base sm:text-lg">
          اطلب موقعك في 3 دقائق، واستلم المعاينة خلال {DELIVERY_TIME}، وادفع {OFFER_PRICE} بس لو عجبك.
        </p>
        <a
          href={BOT_ORDER_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-lg"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          اطلب موقعك على واتساب
        </a>
      </div>
    </section>
  );
}
