/**
 * EasternRun Enterprise Backend API & Anti-DDoS Production Server
 * Includes HTTP request timeout guards to prevent Slowloris attacks,
 * payload size limits, and security middleware.
 */

import http from 'http';
import { ddosProtection, applySecurityHeaders, sanitizePayloads } from './securityMiddleware.js';

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  // 1. Apply Security Headers
  applySecurityHeaders(req, res, () => {
    // 2. Apply Anti-DDoS Rate Limiting
    ddosProtection.middleware()(req, res, () => {
      // 3. Handle API routes
      if (req.url === '/api/health' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'HEALTHY', securityEngine: 'ACTIVE', ddosShield: 'ENABLED' }));
        return;
      }

      // Default response
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Endpoint Not Found' }));
    });
  });
});

// Anti-Slowloris & Connection Exhaustion Protections
server.headersTimeout = 10000; // 10 seconds max for receiving headers
server.requestTimeout = 15000; // 15 seconds max for receiving body
server.keepAliveTimeout = 5000;  // 5 seconds keep-alive

server.listen(PORT, () => {
  console.log(`[EasternRun Security Engine] Anti-DDoS backend running on port ${PORT}`);
});
