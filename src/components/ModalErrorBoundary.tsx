import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, X, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../data/content';

interface Props {
  children: ReactNode;
  onClose: () => void;
}

interface State {
  hasError: boolean;
}

/**
 * Local boundary for lazily-loaded modals: if a modal fails to load or render,
 * only the modal is replaced with a small notice — the rest of the page keeps working.
 */
export default class ModalErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Modal failed to load:', error, info);
  }

  public render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70"
        onClick={this.props.onClose}
        role="alertdialog"
      >
        <div
          className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          dir="rtl"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-950">تعذّر فتح المعاينة الآن</h3>
          <p className="text-sm text-slate-600">
            غالباً بسبب انقطاع مؤقت في الاتصال. جرّب مرة أخرى، أو راسلنا على واتساب ونرسل لك النماذج مباشرة.
          </p>
          <div className="flex flex-col gap-2">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              تواصل عبر واتساب
            </a>
            <button
              type="button"
              onClick={this.props.onClose}
              className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm inline-flex items-center justify-center gap-2 hover:bg-slate-50"
            >
              <X className="w-4 h-4" />
              إغلاق ومتابعة التصفح
            </button>
          </div>
        </div>
      </div>
    );
  }
}
