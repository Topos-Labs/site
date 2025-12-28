/**
 * Cloudflare Worker for Error Logging
 * Endpoint: /api/errors
 *
 * Logs JavaScript errors from the client
 * Free tier: 100,000 requests/day (more than enough)
 */

export default {
  async fetch(request, env, ctx) {
    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', {
        status: 405,
        headers: {
          'Allow': 'POST',
          'Content-Type': 'text/plain'
        }
      });
    }

    // Check origin for CORS
    const origin = request.headers.get('Origin');
    const allowedOrigins = [
      'https://toposlabs.ai',
      'http://localhost:8000',
      'http://localhost:3000'
    ];

    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : 'https://toposlabs.ai',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    // Handle preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    try {
      const errorData = await request.json();

      // Validate error data
      if (!errorData || typeof errorData !== 'object') {
        return new Response('Invalid error data', {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
        });
      }

      // Add server-side metadata
      const logEntry = {
        ...errorData,
        timestamp: new Date().toISOString(),
        clientIP: request.headers.get('CF-Connecting-IP'),
        country: request.headers.get('CF-IPCountry'),
        ray: request.headers.get('CF-Ray'),
        userAgent: request.headers.get('User-Agent')
      };

      // Log to console (viewable in Workers dashboard)
      console.error('Client Error:', JSON.stringify(logEntry, null, 2));

      // Optional: Store in Workers KV (100k reads, 1k writes per day free)
      // Uncomment if you want persistence:
      // if (env.ERRORS_KV) {
      //   const key = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      //   await env.ERRORS_KV.put(key, JSON.stringify(logEntry), {
      //     expirationTtl: 86400 * 7 // 7 days
      //   });
      // }

      // Optional: Send to external service (Sentry, Datadog, etc.)
      // if (env.SENTRY_DSN) {
      //   await fetch(env.SENTRY_DSN, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(logEntry)
      //   });
      // }

      return new Response('OK', {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });

    } catch (err) {
      console.error('Error logging failed:', err);
      return new Response('Internal server error', {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }
  }
};
