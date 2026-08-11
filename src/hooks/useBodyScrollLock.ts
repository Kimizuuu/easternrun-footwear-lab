import { useEffect } from 'react';

/**
 * Locks body scroll while the calling component is mounted.
 * Automatically restores scroll on unmount.
 * Pass `enabled` to conditionally lock (default: true).
 */
export function useBodyScrollLock(enabled = true): void {
  useEffect(() => {
    if (!enabled) return;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    // Compensate for scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [enabled]);
}
