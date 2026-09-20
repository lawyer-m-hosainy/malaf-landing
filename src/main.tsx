import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { lazyWithRetry } from './utils/lazyWithRetry';
import './index.css';

// Tiny path router: the landing is "/", the order form "/order", the admin panel "/admin".
// vercel.json rewrites every path to index.html so deep links work.
const OrderPage = lazyWithRetry(() => import('./pages/OrderPage.tsx'));
const AdminPage = lazyWithRetry(() => import('./pages/AdminPage.tsx'));
const PrivacyPage = lazyWithRetry(() => import('./pages/PrivacyPage.tsx'));

const path = window.location.pathname.replace(/\/+$/, '') || '/';
const Page = path === '/order' ? OrderPage : path === '/admin' ? AdminPage : path === '/privacy' ? PrivacyPage : App;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div className="min-h-screen bg-[#FAFAF9]" />}>
        <Page />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
);
