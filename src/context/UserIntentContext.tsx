import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { PortfolioItem, PricingPackage } from '../types';
import { PORTFOLIO_ITEMS, PRICING_PACKAGES } from '../data/content';
import {
  getWhatsAppUrl,
  getWhatsAppIntentSummary,
  WhatsAppIntentParams,
} from '../utils/whatsappTemplates';

interface UserIntentContextType {
  selectedDesign: PortfolioItem | null;
  selectedPackage: PricingPackage | null;
  lastIntentSource: 'design' | 'package' | 'both' | 'general';
  setSelectedDesign: (design: PortfolioItem | null) => void;
  setSelectedPackage: (pkg: PricingPackage | null) => void;
  setDesignById: (designId: string) => void;
  setPackageById: (pkgId: string) => void;
  currentWhatsAppUrl: string;
  intentSummary: {
    headline: string;
    badge: string;
    hasSpecificContext: boolean;
  };
  getWhatsAppLinkForDesign: (design: PortfolioItem) => string;
  getWhatsAppLinkForPackage: (pkg: PricingPackage) => string;
}

const UserIntentContext = createContext<UserIntentContextType | undefined>(undefined);

export function UserIntentProvider({
  children,
  initialPackageId = 'basic',
  initialDesignId,
}: {
  children: ReactNode;
  initialPackageId?: string;
  initialDesignId?: string;
}) {
  const [selectedDesign, setSelectedDesignState] = useState<PortfolioItem | null>(() => {
    if (initialDesignId) {
      return PORTFOLIO_ITEMS.find((d) => d.id === initialDesignId) || null;
    }
    return null;
  });

  const [selectedPackage, setSelectedPackageState] = useState<PricingPackage | null>(() => {
    return PRICING_PACKAGES.find((p) => p.id === initialPackageId) || PRICING_PACKAGES[0];
  });

  const [lastIntentSource, setLastIntentSource] = useState<'design' | 'package' | 'both' | 'general'>(
    initialDesignId ? 'design' : 'general'
  );

  // Sync state if props change
  useEffect(() => {
    if (initialDesignId) {
      const found = PORTFOLIO_ITEMS.find((d) => d.id === initialDesignId);
      if (found) {
        setSelectedDesignState(found);
      }
    }
  }, [initialDesignId]);

  useEffect(() => {
    if (initialPackageId) {
      const found = PRICING_PACKAGES.find((p) => p.id === initialPackageId);
      if (found) {
        setSelectedPackageState(found);
      }
    }
  }, [initialPackageId]);

  const setSelectedDesign = useCallback((design: PortfolioItem | null) => {
    setSelectedDesignState(design);
    setLastIntentSource((prev) => (design ? 'design' : 'general'));
  }, []);

  const setSelectedPackage = useCallback((pkg: PricingPackage | null) => {
    setSelectedPackageState(pkg);
    setLastIntentSource((prev) => (pkg ? 'package' : 'general'));
  }, []);

  const setDesignById = useCallback((designId: string) => {
    const found = PORTFOLIO_ITEMS.find((d) => d.id === designId) || null;
    setSelectedDesignState(found);
    if (found) {
      setLastIntentSource('design');
    }
  }, []);

  const setPackageById = useCallback((pkgId: string) => {
    const found = PRICING_PACKAGES.find((p) => p.id === pkgId) || null;
    setSelectedPackageState(found);
    if (found) {
      setLastIntentSource('package');
    }
  }, []);

  const currentParams: WhatsAppIntentParams = {
    design: selectedDesign,
    pkg: selectedPackage,
    source: lastIntentSource,
  };

  const currentWhatsAppUrl = getWhatsAppUrl(currentParams);
  const intentSummary = getWhatsAppIntentSummary(currentParams);

  const getWhatsAppLinkForDesign = (design: PortfolioItem) => {
    return getWhatsAppUrl({
      design,
      pkg: selectedPackage,
      source: 'design',
    });
  };

  const getWhatsAppLinkForPackage = (pkg: PricingPackage) => {
    return getWhatsAppUrl({
      pkg,
      design: selectedDesign,
      source: 'package',
    });
  };

  return (
    <UserIntentContext.Provider
      value={{
        selectedDesign,
        selectedPackage,
        lastIntentSource,
        setSelectedDesign,
        setSelectedPackage,
        setDesignById,
        setPackageById,
        currentWhatsAppUrl,
        intentSummary,
        getWhatsAppLinkForDesign,
        getWhatsAppLinkForPackage,
      }}
    >
      {children}
    </UserIntentContext.Provider>
  );
}

export function useUserIntent() {
  const context = useContext(UserIntentContext);
  if (!context) {
    throw new Error('useUserIntent must be used within a UserIntentProvider');
  }
  return context;
}
