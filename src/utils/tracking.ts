/**
 * Conversion tracking (Meta Pixel).
 * The base code lives in index.html; here we only send standard events.
 * Every call is guarded so the page never breaks if the pixel is blocked.
 */

type Fbq = (action: 'track' | 'trackCustom', event: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

export type LeadSource = 'form' | 'whatsapp';

/** Standard "Lead" event — fires when a lawyer sends the form or opens WhatsApp. */
export function trackLead(source: LeadSource, details: Record<string, unknown> = {}) {
  try {
    window.fbq?.('track', 'Lead', { content_name: 'malaf-website-offer', source, ...details });
  } catch {
    /* tracking must never affect the UX */
  }
}

/**
 * Attach one document-level listener that reports a Lead whenever any
 * WhatsApp link (wa.me) is clicked — header, floating button, pricing, cards, footer.
 * Returns a cleanup function.
 */
export function installWhatsAppLeadTracking() {
  const handler = (e: MouseEvent) => {
    const anchor = (e.target as Element | null)?.closest?.('a[href*="wa.me/"]');
    if (!anchor) return;
    trackLead('whatsapp', { placement: anchor.id || anchor.getAttribute('aria-label') || 'link' });
  };
  document.addEventListener('click', handler, { capture: true, passive: true });
  return () => document.removeEventListener('click', handler, { capture: true });
}
