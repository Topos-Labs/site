/**
 * Cloudflare Worker for Web Vitals
 * Endpoint: /api/vitals
 *
 * Logs Core Web Vitals metrics from the client
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
      const metric = await request.json();

      // Validate metric data
      if (!metric || !metric.name || typeof metric.value === 'undefined') {
        return new Response('Invalid metric data', {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
        });
      }

      // Add server-side metadata
      const logEntry = {
        ...metric,
        timestamp: new Date().toISOString(),
        clientIP: request.headers.get('CF-Connecting-IP'),
        country: request.headers.get('CF-IPCountry'),
        ray: request.headers.get('CF-Ray'),
        userAgent: request.headers.get('User-Agent')
      };

      // Log to console (viewable in Workers dashboard)
      console.log('Web Vital:', JSON.stringify(logEntry));

      // Optional: Store in Workers KV for analytics
      // Uncomment if you want persistence:
      // if (env.VITALS_KV) {
      //   const key = `vital_${metric.name}_${Date.now()}`;
      //   await env.VITALS_KV.put(key, JSON.stringify(logEntry), {
      //     expirationTtl: 86400 * 30 // 30 days
      //   });
      // }

      // Optional: Send to analytics service
      // if (env.ANALYTICS_ENDPOINT) {
      //   await fetch(env.ANALYTICS_ENDPOINT, {
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
      console.error('Vitals logging failed:', err);
      return new Response('Internal server error', {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }
  }
};
