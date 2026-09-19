import { lazy, ComponentType } from 'react';

const RELOAD_FLAG = 'malaf_chunk_reload';

/**
 * React.lazy with resilience for code-split chunks.
 *
 * A dynamic import can fail when the network blips or when a new build was
 * deployed while the visitor still has the old page open (hashed file names
 * change). We retry a couple of times, and if it still fails we reload the
 * page once so the visitor gets the fresh build instead of an error screen.
 */
export function lazyWithRetry<T extends ComponentType<any>>(factory: () => Promise<{ default: T }>) {
  return lazy(async () => {
    const attempts = 3;
    for (let i = 1; i <= attempts; i++) {
      try {
        const mod = await factory();
        try {
          sessionStorage.removeItem(RELOAD_FLAG);
        } catch {
          /* storage unavailable */
        }
        return mod;
      } catch (err) {
        if (i < attempts) {
          await new Promise((r) => setTimeout(r, 400 * i));
          continue;
        }
        let alreadyReloaded = false;
        try {
          alreadyReloaded = sessionStorage.getItem(RELOAD_FLAG) === '1';
          if (!alreadyReloaded) sessionStorage.setItem(RELOAD_FLAG, '1');
        } catch {
          /* storage unavailable */
        }
        if (!alreadyReloaded) {
          window.location.reload();
          // Keep the promise pending while the page reloads
          return new Promise<never>(() => {});
        }
        throw err;
      }
    }
    throw new Error('unreachable');
  });
}
