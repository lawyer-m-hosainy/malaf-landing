import { useEffect } from 'react';
import { UserIntentProvider } from './context/UserIntentContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ShowcaseSection from './components/ShowcaseSection';
import HowItWorksSteps from './components/HowItWorksSteps';
import WhySection from './components/WhySection';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import FinalCtaSection from './components/FinalCtaSection';
import StickyMobileCta from './components/StickyMobileCta';
import Footer from './components/Footer';
import { installWhatsAppLeadTracking } from './utils/tracking';

/**
 * صفحة البيع: 6 أقسام وزرار أساسي واحد (بوت الطلبات على واتساب).
 * صفحة /order فيها النموذج الكامل لمن يفضّل الكتابة بدل البوت.
 */
function MainAppContent() {
  // Meta Pixel "Lead" على أي ضغطة واتساب في الصفحة
  useEffect(() => installWhatsAppLeadTracking(), []);

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#0F172A] font-['Cairo',sans-serif] flex flex-col selection:bg-amber-400/30 selection:text-slate-950">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <ShowcaseSection />
        <HowItWorksSteps />
        <WhySection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <StickyMobileCta />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <UserIntentProvider initialPackageId="basic" initialDesignId="design-1-classic-navy">
      <MainAppContent />
    </UserIntentProvider>
  );
}
