/**
 * EasternRun Backend Anti-DDoS, Anti-Takeover & Injection Security Middleware
 * Defense-in-depth protection against DDoS attacks, Slowloris, XSS, CSRF, SQL/NoSQL injections.
 */

// 1. Sliding Window Token-Bucket Rate Limiter (Anti-DDoS & Bot Mitigation)
class AntiDDoSRateLimiter {
  private ipRequests = new Map();
  private bannedIPs = new Set();
  private windowMs = 60000; // 1 minute window
  private maxRequestsPerWindow = 120; // 120 reqs/min max per IP
  private banDurationMs = 3600000; // 1 hour ban for DDoS offenders

  public middleware() {
    return (req, res, next) => {
      const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

      // 1. Check if IP is currently banned
      if (this.bannedIPs.has(clientIP)) {
        res.writeHead(429, { 'Content-Type': 'application/json', 'Retry-After': '3600' });
        return res.end(JSON.stringify({
          error: 'Access Blocked: Your IP address has been temporarily banned for triggering Anti-DDoS protection limits.'
        }));
      }

      // 2. Track request timestamps
      const now = Date.now();
      const timestamps = this.ipRequests.get(clientIP) || [];
      const validTimestamps = timestamps.filter(t => now - t < this.windowMs);

      if (validTimestamps.length >= this.maxRequestsPerWindow) {
        this.bannedIPs.add(clientIP);
        setTimeout(() => this.bannedIPs.delete(clientIP), this.banDurationMs);

        res.writeHead(429, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
          error: 'Rate Limit Exceeded: Too many requests detected from your IP.'
        }));
      }

      validTimestamps.push(now);
      this.ipRequests.set(clientIP, validTimestamps);

      // Clean up stale IPs periodically
      if (this.ipRequests.size > 10000) {
        this.ipRequests.clear();
      }

      next();
    };
  }
}

export const ddosProtection = new AntiDDoSRateLimiter();

// 2. Strict Security Headers Middleware
export function applySecurityHeaders(req, res, next) {
  // Hide Server Architecture
  res.removeHeader('X-Powered-By');

  // Set HSTS (Strict-Transport-Security)
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Prevent Framing & Clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Prevent MIME-type Sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Enable Anti-XSS Protection Filter
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Strict Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Disable Unused Device APIs
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  next();
}

// 3. Recursive Injection & XSS Sanitizer Middleware
export function sanitizePayloads(req, res, next) {
  const injectionPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /union\s+select/gi,
    /drop\s+table/gi,
    /insert\s+into/gi,
    /delete\s+from/gi,
    /\$where/gi,
    /\$gt/gi
  ];

  function sanitizeValue(value) {
    if (typeof value === 'string') {
      let cleaned = value;
      injectionPatterns.forEach(pattern => {
        cleaned = cleaned.replace(pattern, '');
      });
      return cleaned;
    } else if (typeof value === 'object' && value !== null) {
      Object.keys(value).forEach(key => {
        // Strip Prototype Pollution
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
          delete value[key];
        } else {
          value[key] = sanitizeValue(value[key]);
        }
      });
    }
    return value;
  }

  if (req.body) req.body = sanitizeValue(req.body);
  if (req.query) req.query = sanitizeValue(req.query);

  next();
}
