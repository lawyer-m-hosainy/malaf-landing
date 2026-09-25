import { createClient } from '@supabase/supabase-js';

/**
 * Public (publishable) credentials — safe to ship in the browser.
 * Row-level security on the database decides what each visitor may do:
 * anyone can submit an order and upload its images; only admins can read/update.
 */
export const SUPABASE_URL = 'https://cjdgnvghggpzlkpvmgmz.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_IctAABO7VFd-fH-27YFisw_4O7GsA0K';

/**
 * supabase-js sends "application/json;charset=UTF-8"; the auth server on this project
 * rejects the charset suffix ("Missing Content-Type header"), so normalise it here.
 */
const normalisedFetch: typeof fetch = (input, init) => {
  const headers = new Headers(init?.headers);
  if ((headers.get('content-type') || '').startsWith('application/json')) headers.set('content-type', 'application/json');
  return fetch(input, { ...init, headers });
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, detectSessionInUrl: true, flowType: 'pkce' },
  global: { fetch: normalisedFetch },
});

export type OrderStatus = 'new' | 'building' | 'preview' | 'paid' | 'delivered' | 'cancelled';

export interface OrderRow {
  id: string;
  code: string;
  created_at: string;
  updated_at: string;
  status: OrderStatus;
  slug: string | null;
  custom_domain: string | null;
  theme: string;
  package: string;
  lawyer: Record<string, unknown>;
  assets: { logo?: string; photo?: string; hero?: string };
  content: Record<string, unknown>;
  notes: string | null;
  admin_notes: string | null;
  preview_url: string | null;
  live_url: string | null;
  paid_at: string | null;
  delivered_at: string | null;
  source: string | null;
  user_agent: string | null;
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  new: 'جديد',
  building: 'جاري البناء',
  preview: 'معاينة جاهزة — بانتظار الدفع',
  paid: 'تم الدفع',
  delivered: 'تم التسليم',
  cancelled: 'ملغي',
};
