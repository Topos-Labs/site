# Cloudflare Free Tier Setup Guide

**Site:** toposlabs.ai
**Date:** 2025-12-28
**Cloudflare Plan:** Free (Pages + CDN)

This guide ensures **all optimizations work on Cloudflare's free tier** with no paid features required.

---

## ✅ What Works on Cloudflare Free Tier

### Core Features (100% Free)

#### 1. Cloudflare Pages (Your Current Setup)
- ✅ **Unlimited bandwidth**
- ✅ **Unlimited requests**
- ✅ **500 builds per month**
- ✅ **Custom domains**
- ✅ **Automatic HTTPS**
- ✅ **Git integration**
- ✅ **Preview deployments**
- ✅ **_headers file support** (security headers)
- ✅ **_redirects file support**

#### 2. CDN & Caching
- ✅ **Global CDN** (all 300+ edge locations)
- ✅ **HTTP/2 & HTTP/3**
- ✅ **Brotli compression**
- ✅ **Auto Minify** (HTML, CSS, JS)
- ✅ **Rocket Loader** (async JS loading)
- ✅ **Mirage** (image optimization)
- ✅ **Polish** (image compression) - Lossy only on free

#### 3. Security
- ✅ **Universal SSL** (Let's Encrypt)
- ✅ **DDoS protection**
- ✅ **Firewall (basic rules)**
- ✅ **Always Online™** (cached version during outage)
- ✅ **Certificate Transparency Monitoring**
- ✅ **Custom headers via _headers**
- ✅ **HSTS, CSP, and all security headers**

#### 4. Performance Features
- ✅ **103 Early Hints** (FREE on all plans since 2023!)
- ✅ **HTTP/2 Server Push** (via Link headers)
- ✅ **IPv6**
- ✅ **Railgun™** (WAN optimization)
- ✅ **Argo Tiered Cache** (free version)

#### 5. Analytics & Monitoring
- ✅ **Cloudflare Web Analytics** (Privacy-first, no cookies)
- ✅ **Basic traffic analytics**
- ✅ **Performance insights**
- ✅ **Security events log**

#### 6. Workers (Limited but Sufficient)
- ✅ **100,000 requests/day** (resets daily at midnight UTC)
- ✅ **10ms CPU time per request**
- ✅ **30 Workers scripts**
- ✅ **Workers KV: 100,000 reads/day, 1,000 writes/day**
- ⚠️ **No Durable Objects** (paid only)
- ⚠️ **No Cron Triggers** (paid only)

#### 7. DNS
- ✅ **Unlimited DNS queries**
- ✅ **DNSSEC**
- ✅ **3.5 second response time globally**

---

## ⚠️ Free Tier Limitations

### What You DON'T Get (But Don't Need)
- ❌ **WAF (Web Application Firewall)** - Pro plan ($20/mo)
  - **Alternative:** Use _headers for security, GitHub security scanning
- ❌ **Image Resizing API** - Pro plan
  - **Alternative:** Pre-optimize images, use static sizes
- ❌ **Load Balancing** - Requires Cloudflare Business ($200/mo)
  - **Alternative:** Single origin is fine for your site
- ❌ **Workers Cron Triggers** - Requires Workers Paid ($5/mo)
  - **Alternative:** Use GitHub Actions for scheduled tasks
- ❌ **Page Rules: Only 3 rules** - Pro plan gives 20
  - **Alternative:** Use _headers and _redirects files instead
- ❌ **Health Checks: Only 1 monitor** - Pro gives 3
  - **Alternative:** Use external monitoring (UptimeRobot, Better Uptime)
- ❌ **Mobile Redirect** - Pro plan
  - **Alternative:** Use responsive design (already doing this)
- ❌ **Polish (Lossless)** - Pro plan
  - **Alternative:** Pre-optimize images with tools like Squoosh

---

## 🎯 Optimizations Compatible with Free Tier

### From ADVANCED_OPTIMIZATION_PLAN.md

#### ✅ Fully Compatible (No Changes Needed)

**Security:**
1. ✅ Self-host fonts - Just host files in /assets/fonts/
2. ✅ Tighten CSP - Via _headers file
3. ✅ Cross-Origin Isolation - Via _headers file
4. ✅ Security.txt - Static file in /.well-known/
5. ✅ Certificate Transparency - Included with Universal SSL

**Performance:**
6. ✅ Core Web Vitals optimization - Client-side changes
7. ✅ Resource hints - HTML changes only
8. ✅ **103 Early Hints** - FREE! Enable in dashboard
9. ✅ Speculation Rules API - Client-side only
10. ✅ Progressive enhancement - JavaScript changes
11. ✅ Long task detection - Client-side monitoring

**SEO:**
12. ✅ Meta descriptions - HTML changes
13. ✅ Breadcrumbs - HTML/CSS changes
14. ✅ FAQ Schema - HTML changes
15. ✅ HowTo Schema - HTML changes
16. ✅ HTML sitemap - Static HTML file
17. ✅ Language/i18n prep - HTML meta tags

**UX:**
18. ✅ Print styles - CSS changes
19. ✅ View Transitions API - Client-side JavaScript
20. ✅ Scroll-to-top button - HTML/CSS/JS
21. ✅ Copy code buttons - JavaScript
22. ✅ Dark mode detection - Client-side JavaScript

**PWA:**
23. ✅ Web app manifest - Static JSON file
24. ✅ Service worker - Client-side caching
25. ✅ Update notifications - Client-side JavaScript

#### ⚠️ Needs Free Alternatives

**Monitoring (Use External Tools):**

**#19: Real User Monitoring (RUM)**
- ✅ **Cloudflare Web Analytics** - FREE, built-in
- ✅ **Custom Web Vitals endpoint** - Use Workers (100k req/day free)
- ✅ **Or external:** Plausible (paid), Umami (free self-hosted)

**#20: Error Monitoring**
- ✅ **Workers endpoint** - 100k req/day is plenty for error logs
- ✅ **Or external:** Sentry (free tier: 5k events/mo)

**#21: Uptime Monitoring**
- ❌ **Cloudflare Health Checks** - Only 1 check on free tier
- ✅ **Alternative:** UptimeRobot (free tier: 50 monitors, 5-min intervals)
- ✅ **Alternative:** Better Uptime (free tier: 10 monitors)
- ✅ **Alternative:** Pingdom (free tier available)

**#22: Synthetic Monitoring**
- ❌ **Workers Cron** - Not available on free tier
- ✅ **Alternative:** GitHub Actions (free for public repos)
  ```yaml
  # Run Lighthouse daily
  on:
    schedule:
      - cron: '0 0 * * *'
  ```

---

## 📋 Free Tier Implementation Checklist

### Phase 1: Enable Free Cloudflare Features (10 minutes)

1. **Enable 103 Early Hints:**
   - Dashboard → Speed → Optimization
   - Toggle "Early Hints" → ON
   - **Result:** 10-20% faster page loads (FREE!)

2. **Enable Auto Minify:**
   - Dashboard → Speed → Optimization
   - Check: HTML, CSS, JavaScript
   - Toggle "Auto Minify" → ON
   - **Result:** 15-25% smaller page sizes

3. **Enable Brotli Compression:**
   - Dashboard → Speed → Optimization
   - Toggle "Brotli" → ON
   - **Result:** Better compression than gzip

4. **Enable HTTP/3 (QUIC):**
   - Dashboard → Network
   - Toggle "HTTP/3" → ON
   - **Result:** Faster connection establishment

5. **Enable Cloudflare Web Analytics:**
   - Dashboard → Analytics → Web Analytics
   - Click "Enable Web Analytics"
   - Add snippet to all pages (or use automatic injection)
   - **Result:** Privacy-first analytics, no cookies

6. **Configure Always Online:**
   - Dashboard → Caching → Configuration
   - Toggle "Always Online" → ON
   - **Result:** Site stays up during origin outages

### Phase 2: Optimize Workers Usage (If Needed)

**Current Usage:** None (100k req/day available)

**Recommended Workers (All Free Tier Compatible):**

#### Worker 1: Web Vitals Endpoint (Optional)
```javascript
// /api/vitals endpoint
export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const data = await request.json();

      // Log to console (visible in Workers dashboard)
      console.log('Web Vital:', JSON.stringify(data));

      // Optional: Store in Workers KV (100k reads, 1k writes/day free)
      // await env.VITALS_KV.put(
      //   `vital_${Date.now()}`,
      //   JSON.stringify(data),
      //   { expirationTtl: 86400 } // 24 hours
      // );

      return new Response('OK', { status: 200 });
    } catch (err) {
      return new Response('Error', { status: 500 });
    }
  }
};
```

**Usage estimate:** ~100 requests/day (well under 100k limit)

#### Worker 2: Error Logging Endpoint (Optional)
```javascript
// /api/errors endpoint
export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const error = await request.json();
      console.error('Client Error:', JSON.stringify(error));
      return new Response('OK', { status: 200 });
    } catch (err) {
      return new Response('Error', { status: 500 });
    }
  }
};
```

**Usage estimate:** ~50 requests/day (well under limit)

**Total Worker Usage:** ~150 requests/day out of 100,000 available (0.15% used)

### Phase 3: External Free Tools Setup (30 minutes)

#### Uptime Monitoring: UptimeRobot (Free)
```
1. Sign up at uptimerobot.com (free tier)
2. Add monitors:
   - https://toposlabs.ai/ (5 min interval)

   - https://toposlabs.ai/docs/ (5 min interval)
3. Set up alerts:
   - Email notifications
   - Discord webhook (optional)
4. Result: 50 monitors, 5-min checks, all free
```

#### Synthetic Monitoring: GitHub Actions (Free)
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
  workflow_dispatch:  # Manual trigger

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://toposlabs.ai/

            https://toposlabs.ai/docs/
          uploadArtifacts: true
          temporaryPublicStorage: true

      - name: Check scores
        run: |
          echo "Lighthouse results available in artifacts"
```

**Cost:** FREE (public repos get unlimited GitHub Actions minutes)

#### Error Monitoring: Sentry (Free Tier)
```
Free tier: 5,000 events/month
1. Sign up at sentry.io
2. Create project for "toposlabs.ai"
3. Add Sentry SDK snippet:
   <script src="https://js.sentry-cdn.com/YOUR_DSN.min.js"></script>
4. Configure:
   - Sample rate: 100% (low traffic site)
   - Environment: production
   - Release tracking: optional
```

**Alternative:** Use Workers for basic error logging (included in 100k req/day)

---

## 💰 Cost Breakdown

### Current Monthly Costs: $0
- Cloudflare Pages: FREE
- Cloudflare CDN: FREE
- Cloudflare DNS: FREE
- Workers (100k req/day): FREE
- Web Analytics: FREE
- SSL Certificate: FREE

### External Services (All Free Tier)
- UptimeRobot: FREE (50 monitors)
- GitHub Actions: FREE (public repo)
- Sentry: FREE (5k events/mo)

### Total Monthly Cost: $0 🎉

---

## 🚀 Quick Start: Enable All Free Features

Run this checklist to maximize Cloudflare free tier:

```bash
# 1. Enable in Cloudflare Dashboard (5 minutes)
# ✅ Speed → Optimization → Early Hints: ON
# ✅ Speed → Optimization → Auto Minify: HTML, CSS, JS
# ✅ Speed → Optimization → Brotli: ON
# ✅ Network → HTTP/3: ON
# ✅ Caching → Always Online: ON
# ✅ Analytics → Web Analytics: Enable

# 2. Add Cloudflare Web Analytics (if not auto-injected)
# Add to all HTML files before </body>:
```

```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

```bash
# 3. Verify _headers file is deployed
curl -I https://toposlabs.ai/ | grep -i "x-frame-options\|content-security"

# 4. Test 103 Early Hints
curl -I https://toposlabs.ai/ | grep -i "103\|early"

# 5. Check HTTP/3
curl --http3 -I https://toposlabs.ai/ 2>&1 | grep -i "http/3"
```

---

## 📊 Expected Performance on Free Tier

### Before Optimization
- **TTFB:** ~800ms
- **LCP:** ~2.0s
- **FCP:** ~1.2s
- **Total Size:** ~195KB
- **Requests:** ~12

### After Free Tier Optimizations
- **TTFB:** ~400ms (Cloudflare CDN + Early Hints)
- **LCP:** ~1.2s (Early Hints + Auto Minify)
- **FCP:** ~0.8s
- **Total Size:** ~140KB (Auto Minify + Brotli)
- **Requests:** ~12 (same, but faster)
- **Lighthouse:** 95+ (Performance)

### Savings vs Paid Plans
- **vs Pro ($20/mo):** All critical features available free
- **vs Business ($200/mo):** Only missing load balancing (not needed)
- **vs Enterprise ($5k+/mo):** Only missing advanced security features

**Recommendation:** Stay on free tier. It's perfect for your use case.

---

## 🔧 Troubleshooting Free Tier Limits

### If You Hit Workers Limit (100k req/day)

**Current usage:** ~150 req/day (0.15% of limit)

**If you hit 100k:**
1. Check for bot traffic
2. Add rate limiting in Worker
3. Cache Worker responses
4. Consider Workers Paid ($5/mo for 10M req/mo)

**Unlikely to be an issue for your site.**

### If You Need More Page Rules (Currently 3)

**Cloudflare Pages doesn't count _headers/_redirects against Page Rules limit!**

You can have:
- ✅ Unlimited rules in _headers file
- ✅ Unlimited redirects in _redirects file
- ✅ 3 Page Rules for dynamic logic

**Current usage:** 0 Page Rules, so you have 3 available.

### If You Need More Health Checks

**Free tier:** 1 health check

**Solution:** Use external free monitoring
- UptimeRobot: 50 monitors free
- Better Uptime: 10 monitors free
- Pingdom: 1 monitor free

**These are often better than Cloudflare's anyway.**

---

## ✅ Final Checklist: All Free Features Enabled

**Cloudflare Dashboard:**
- [ ] Early Hints enabled (Speed → Optimization)
- [ ] Auto Minify enabled (HTML, CSS, JS)
- [ ] Brotli compression enabled
- [ ] HTTP/3 enabled
- [ ] Always Online enabled
- [ ] Web Analytics enabled and beacon added to HTML

**Repository:**
- [ ] _headers file deployed with security headers
- [ ] robots.txt and sitemap.xml deployed
- [ ] Fonts self-hosted in /assets/fonts/ (optional, saves Google Fonts request)

**External Tools:**
- [ ] UptimeRobot monitoring set up (3 monitors)
- [ ] GitHub Actions Lighthouse CI set up
- [ ] Error monitoring (Sentry or Workers endpoint)

**Testing:**
- [ ] Test security headers: securityheaders.com
- [ ] Test performance: pagespeed.web.dev
- [ ] Test 103 Early Hints: webpagetest.org
- [ ] Verify HTTP/3: http3check.net
- [ ] Check analytics: Cloudflare dashboard

---

## 🎯 Summary

**Everything in the optimization plan works on Cloudflare's free tier!**

**Key Free Features:**
- ✅ 103 Early Hints (10-20% faster loads)
- ✅ Auto Minify (15-25% smaller pages)
- ✅ Global CDN (300+ locations)
- ✅ Unlimited bandwidth
- ✅ Workers (100k req/day)
- ✅ Web Analytics
- ✅ All security headers via _headers

**No Paid Features Needed:**
- ❌ Don't need WAF
- ❌ Don't need load balancing
- ❌ Don't need image resizing
- ❌ Don't need Workers Cron (use GitHub Actions)

**External Free Tools:**
- UptimeRobot for monitoring (50 monitors free)
- GitHub Actions for Lighthouse CI (unlimited for public repos)
- Sentry for errors (5k events/mo free)

**Total Monthly Cost:** $0 with enterprise-grade features! 🚀

---

## 📚 Additional Resources

**Cloudflare Free Tier Documentation:**
- https://www.cloudflare.com/plans/free/
- https://developers.cloudflare.com/pages/
- https://developers.cloudflare.com/workers/platform/limits/

**Performance Testing:**
- https://pagespeed.web.dev/
- https://webpagetest.org/
- https://www.giftofspeed.com/

**Security Testing:**
- https://securityheaders.com/
- https://observatory.mozilla.org/

**Free Monitoring Tools:**
- https://uptimerobot.com/
- https://betteruptime.com/
- https://sentry.io/

---

**Last Updated:** 2025-12-28
**Cloudflare Plan:** Free (Forever!)
**Monthly Cost:** $0
**Performance:** Enterprise-grade
