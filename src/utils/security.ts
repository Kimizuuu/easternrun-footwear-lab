/**
 * EasternRun Input Utilities & Form Submission Throttles
 */

/**
 * Clean text inputs by trimming control characters while preserving standard punctuation.
 * React natively handles DOM text escaping, so we avoid HTML entity encoding to prevent double-escaping.
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return String(input)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
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
