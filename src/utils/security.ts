/**
 * EasternRun Input Utilities & Form Submission Throttles
 */

/**
 * Clean text inputs by trimming control characters while preserving standard punctuation.
 * React natively handles DOM text escaping, so we avoid HTML entity encoding to prevent double-escaping.
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  // Strip non-printable ASCII control chars (0x00–0x08, 0x0B, 0x0C, 0x0E–0x1F)
  // without using raw control-char regex ranges (avoids eslint no-control-regex)
  const cleaned = Array.from(String(input))
    .filter((ch) => {
      const cp = ch.codePointAt(0) ?? 0;
      return !(cp <= 8 || cp === 11 || cp === 12 || (cp >= 14 && cp <= 31));
    })
    .join('');
  return cleaned
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .trim();
}

/**
 * Sanitizes search queries for safe matching.
 */
export function sanitizeSearchQuery(query: string): string {
  if (!query) return '';
  return query
    .trim()
    .slice(0, 100);
}

/**
 * Simple client-side form throttle to prevent accidental duplicate clicks.
 */
class ClientFormSubmissionThrottle {
  private lastSubmissionTime: Map<string, number> = new Map();

  isAllowed(actionKey: string, cooldownMs: number = 3000): boolean {
    const now = Date.now();
    const last = this.lastSubmissionTime.get(actionKey) || 0;
    if (now - last < cooldownMs) {
      return false;
    }
    this.lastSubmissionTime.set(actionKey, now);
    return true;
  }
}

export const rateLimiter = new ClientFormSubmissionThrottle();
