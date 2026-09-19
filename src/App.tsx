import { useState, useEffect } from 'react';
import { UserIntentProvider, useUserIntent } from './context/UserIntentContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LiveDemoSection from './components/LiveDemoSection';
import PainPointsSection from './components/PainPointsSection';
import HowItWorksSteps from './components/HowItWorksSteps';
import PerformanceBadgesSection from './components/PerformanceBadgesSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import BeforeAfterSection from './components/BeforeAfterSection';
import PortfolioSection from './components/PortfolioSection';
import FaqSection from './components/FaqSection';
import LeadFormSection from './components/LeadFormSection';
import FinalCtaSection from './components/FinalCtaSection';
import StickyMobileCta from './components/StickyMobileCta';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import Footer from './components/Footer';
import ThankYouModal from './components/ThankYouModal';
import { LeadFormData } from './types';
import { installWhatsAppLeadTracking } from './utils/tracking';

const DEFAULT_PACKAGE = 'basic';
const DEFAULT_DESIGN = 'design-1-classic-navy';

function MainAppContent() {
  const [selectedPackage, setSelectedPackage] = useState<string>(DEFAULT_PACKAGE);
  const [selectedDesign, setSelectedDesign] = useState<string>(DEFAULT_DESIGN);
  const [submittedLead, setSubmittedLead] = useState<LeadFormData | null>(null);
  const { setDesignById, setPackageById } = useUserIntent();

  // Report a Meta Pixel "Lead" on every WhatsApp click anywhere on the page
  useEffect(() => installWhatsAppLeadTracking(), []);

  const handleFormSuccess = (newLead: LeadFormData) => {
    setSubmittedLead(newLead);
  };

  const handleSelectPackage = (pkgId: string) => {
    setSelectedPackage(pkgId);
    setPackageById(pkgId);
  };

  const handleSelectDesign = (designId: string, packageId?: string) => {
    setSelectedDesign(designId);
    setDesignById(designId);
    if (packageId) {
      setSelectedPackage(packageId);
      setPackageById(packageId);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#0F172A] font-['Cairo',sans-serif] flex flex-col selection:bg-amber-400/30 selection:text-slate-950">
      <Header />

      <main className="flex-1">
        {/* 1. Hero: offer + headline + CTAs */}
        <HeroSection />

        {/* 2. Real live demo the visitor can open (hosainy.pro) */}
        <LiveDemoSection />

        {/* 3. Why a lawyer needs a website */}
        <PainPointsSection />

        {/* 4. What's included */}
        <FeaturesSection />

        {/* 5. 3-step process */}
        <HowItWorksSteps />

        {/* 6. Pricing (500 offer pre-selected) + domain/hosting note */}
        <PricingSection onSelectPackage={handleSelectPackage} />

        {/* 7. Design styles catalog (illustrative mockups) */}
        <PortfolioSection selectedDesignId={selectedDesign} onSelectDesign={handleSelectDesign} />

        {/* 8. Before / after */}
        <BeforeAfterSection />

        {/* 9. Technical quality */}
        <PerformanceBadgesSection />

        {/* 10. FAQ */}
        <FaqSection />

        {/* 11. Lead form → opens WhatsApp with a ready message */}
        <LeadFormSection
          selectedPackage={selectedPackage}
          onPackageChange={handleSelectPackage}
          selectedDesignId={selectedDesign}
          onDesignChange={handleSelectDesign}
          onSuccess={handleFormSuccess}
        />

        {/* 12. Final CTA */}
        <FinalCtaSection />
      </main>

      <StickyMobileCta />
      <FloatingWhatsAppButton />
      <Footer />

      <ThankYouModal lead={submittedLead} onClose={() => setSubmittedLead(null)} />
    </div>
  );
}

export default function App() {
  return (
    <UserIntentProvider initialPackageId={DEFAULT_PACKAGE} initialDesignId={DEFAULT_DESIGN}>
      <MainAppContent />
    </UserIntentProvider>
  );
}
