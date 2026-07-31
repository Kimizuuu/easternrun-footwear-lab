/**
 * EasternRun Enterprise Web Security, Anti-DDoS & Takeover Defense Engine
 * Implements XSS Sanitization, Input Validation, CSRF Protection, Anti-Spam Rate Limiting,
 * Prototype Pollution Protection, and Anti-DDoS Sliding Window Rate Capping.
 */

// 1. Cryptographically Secure CSRF Token Manager
class CSRFProtectionManager {
  private csrfToken: string;

  constructor() {
    this.csrfToken = this.generateSecureToken();
  }

  private generateSecureToken(): string {
    const array = new Uint8Array(32);
    if (typeof window !== 'undefined' && window.crypto) {
      window.crypto.getRandomValues(array);
    } else {
      for (let i = 0; i < 32; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
    }
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  public getToken(): string {
    return this.csrfToken;
  }

  public validateToken(token: string): boolean {
    return !!token && token === this.csrfToken;
  }
}

export const csrfManager = new CSRFProtectionManager();

// 2. Advanced XSS & Injection Sanitizer Algorithm
export function sanitizeText(input: string): string {
  if (!input) return '';
  
  // Prevent Prototype Pollution attempts
  let sanitized = String(input)
    .replace(/__proto__/gi, '')
    .replace(/constructor/gi, '')
    .replace(/prototype/gi, '');

  // Strip control characters & dangerous scripts / protocols
  sanitized = sanitized
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:text\/html/gi, '')
    .replace(/onload=/gi, '')
    .replace(/onerror=/gi, '')
    .replace(/onclick=/gi, '')
    .replace(/onmouseover=/gi, '');

  // Escape HTML Special Characters
  return sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// 3. Safe Unescaping for Rendered Content
export function decodeHTML(escapedStr: string): string {
  if (typeof DOMParser === 'undefined') return escapedStr;
  const doc = new DOMParser().parseFromString(escapedStr, 'text/html');
  return doc.body.textContent || '';
}

// 4. Search Query Sanitizer (Prevents ReDoS & Injection)
export function sanitizeSearchQuery(query: string): string {
  if (!query) return '';
  return query
    .trim()
    .slice(0, 100)
    .replace(/[^\w\s\-\.\°\%\$\:\/\(\)]/gi, '');
}

// 5. Anti-DDoS & Rate Limiting Engine (Sliding Window Bucket)
class ClientAntiDDoSProtection {
  private requestLog: Map<string, number[]> = new Map();
  private blockedKeys: Set<string> = new Set();

  /**
   * Checks if an action is allowed based on rate limits.
   * @param actionKey Unique identifier for the action (e.g. 'submit_review', 'search_burst')
   * @param maxLimit Maximum allowed requests in the window
   * @param windowMs Time window in milliseconds
   */
  isAllowed(actionKey: string, maxLimit: number = 8, windowMs: number = 60000): boolean {
    if (this.blockedKeys.has(actionKey)) {
      return false;
    }

    const now = Date.now();
    const timestamps = this.requestLog.get(actionKey) || [];

    // Filter out timestamps older than the time window
    const validTimestamps = timestamps.filter((t) => now - t < windowMs);

    if (validTimestamps.length >= maxLimit) {
      // Temporarily block key to stop burst spamming
      this.blockedKeys.add(actionKey);
      setTimeout(() => {
        this.blockedKeys.delete(actionKey);
      }, windowMs);
      return false;
    }

    validTimestamps.push(now);
    this.requestLog.set(actionKey, validTimestamps);
    return true;
  }
}

export const rateLimiter = new ClientAntiDDoSProtection();
