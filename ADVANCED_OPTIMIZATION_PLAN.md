# Advanced Optimization Plan - Topos Labs Website (2025)

**Site:** toposlabs.ai
**Analysis Date:** 2025-12-28
**Status:** Building on completed SECURITY_PERFORMANCE_PLAN.md
**Focus:** Advanced optimizations, monitoring, and 2025 best practices

---

## Executive Summary

This plan builds upon the excellent work already completed in `SECURITY_PERFORMANCE_PLAN.md`. The focus here is on **advanced optimizations** not covered in the original plan, including:

- 🔬 **Advanced Performance**: Core Web Vitals, INP, resource hints
- 🎯 **Technical SEO**: Missing metadata on docs pages, breadcrumbs, FAQ schema
- 🔐 **Advanced Security**: SRI, COEP/COOP, certificate pinning considerations
- 📊 **Monitoring**: RUM, synthetic monitoring, error tracking
- 🌍 **Future-Proofing**: PWA features, internationalization prep
- 🎨 **UX Enhancements**: Progressive enhancement, print styles, dark mode detection
- ⚡ **Cutting-Edge**: View Transitions API, resource priorities, prefetch strategies

**Current Implementation Status (from existing plan):**
- ✅ Security headers implemented
- ✅ Logo optimized (158KB → 38KB)
- ✅ Inline event handlers removed
- ✅ robots.txt and sitemap.xml created
- ✅ OG tags and Twitter Cards added to main pages
- ✅ Schema.org structured data for Organization and SoftwareApplication
- ✅ Accessibility improvements (skip links, ARIA)
- ⏳ Neural animation still inline (450+ lines)
- ⏳ HTML not yet minified

---

## 🔴 CRITICAL - Advanced Security

### 1. Subresource Integrity (SRI) for Google Fonts

**Issue:** External fonts loaded without integrity checks
**Risk:** Supply chain attacks, MITM injection
**Effort:** 30 minutes

**Current:**
```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
```

**Solution:**
Google Fonts CSS changes frequently, making static SRI impractical. Instead:

1. **Option A: Self-host fonts** (Recommended)
   ```bash
   # Download fonts
   npx google-webfonts-helper download -f "Nunito:400,600,700" -o assets/fonts/
   npx google-webfonts-helper download -f "JetBrains Mono:400" -o assets/fonts/
   ```

   Then use local fonts with proper SRI:
   ```html
   <link rel="preload" href="/assets/fonts/nunito-v25-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
   <style>
   @font-face {
     font-family: 'Nunito';
     font-style: normal;
     font-weight: 400;
     font-display: swap;
     src: url('/assets/fonts/nunito-v25-latin-regular.woff2') format('woff2');
   }
   </style>
   ```

2. **Option B: Use Cloudflare Workers to proxy fonts with SRI**
   - Fetch fonts through your domain
   - Generate and validate SRI hashes
   - Cache fonts on Cloudflare edge

**Benefits:**
- No external dependencies
- Full control over font loading
- Better performance (single origin)
- SRI protection for font files
- ~30KB total for both fonts (WOFF2)

### 2. Tighten Content Security Policy

**Issue:** CSP allows 'unsafe-inline' for scripts and styles
**Risk:** XSS vulnerabilities still possible
**Effort:** 2 hours (after extracting inline code)

**Current CSP (from _headers):**
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; ...
```

**Goal:** Remove 'unsafe-inline' completely

**Steps:**
1. Extract neural network animation to `/assets/neural-animation.js`
2. Use nonces or hashes for any remaining inline scripts
3. Move all CSS to external files
4. Update CSP:
   ```
   Content-Security-Policy:
     default-src 'self';
     script-src 'self';
     style-src 'self';
     font-src 'self';
     img-src 'self' data: https:;
     connect-src 'self';
     frame-ancestors 'none';
     base-uri 'self';
     form-action 'self';
     upgrade-insecure-requests;
   ```

**Alternative (if keeping inline):** Use CSP nonces
```html
<script nonce="RANDOM_PER_REQUEST">
  // Inline code
</script>
```
And CSP: `script-src 'self' 'nonce-RANDOM_PER_REQUEST'`

### 3. Add Cross-Origin Isolation Headers

**Issue:** Missing COEP/COOP/CORP headers
**Benefit:** Enable SharedArrayBuffer, high-resolution timers, protect against Spectre
**Effort:** 15 minutes

**Add to _headers:**
```
/*
  Cross-Origin-Embedder-Policy: require-corp
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
```

**Note:** This may break embedded resources. Test carefully.

### 4. Implement Security.txt

**Issue:** No security disclosure policy
**Standard:** RFC 9116
**Effort:** 10 minutes

**Create `/.well-known/security.txt`:**
```
Contact: security@toposlabs.ai
Expires: 2026-12-31T23:59:59.000Z
Preferred-Languages: en
Canonical: https://toposlabs.ai/.well-known/security.txt
Policy: https://toposlabs.ai/security-policy
```

Also create `/security.txt` redirect for convenience.

### 5. Certificate Transparency Monitoring

**Issue:** No monitoring for certificate misuse
**Effort:** 30 minutes setup

**Solution:** Monitor CT logs for unauthorized certificates
- Use CertStream or crt.sh monitoring
- Set up alerts for new certs for toposlabs.ai
- Use Cloudflare's Certificate Transparency Monitoring (free)

---

## 🟠 HIGH - Advanced Performance

### 6. Optimize Core Web Vitals (2025 Standards)

**Current Status:** Unknown - needs measurement
**Target Metrics:**
- LCP (Largest Contentful Paint): < 2.5s
- FID/INP (First Input Delay/Interaction to Next Paint): < 200ms
- CLS (Cumulative Layout Shift): < 0.1
- TTFB (Time to First Byte): < 800ms

**Optimizations:**

#### 6.1. LCP Optimization
The hero heading is likely the LCP element.

**Issues:**
- Google Fonts loaded late
- Large hero canvas may block rendering

**Solutions:**
1. **Preload critical font subsets:**
   ```html
   <link rel="preload"
         href="/assets/fonts/nunito-latin-400.woff2"
         as="font"
         type="font/woff2"
         crossorigin>
   ```

2. **Add fetchpriority to LCP elements:**
   ```html
   <h1 fetchpriority="high">Building developer tools for the AI era</h1>
   ```

3. **Defer canvas animation until after LCP:**
   ```javascript
   // In neural-animation.js
   window.addEventListener('load', () => {
     requestIdleCallback(() => {
       initNeuralAnimation();
     });
   });
   ```

#### 6.2. INP Optimization (Replacing FID in 2024)
INP measures all interactions, not just first input.

**Check for:**
- Heavy event handlers
- Long-running JavaScript
- Layout thrashing

**Solutions:**
1. **Debounce mousemove handler in animation:**
   ```javascript
   let mouseMoveTimer;
   hero.addEventListener('mousemove', (e) => {
     if (mouseMoveTimer) return;
     mouseMoveTimer = setTimeout(() => {
       mouse.x = e.clientX;
       mouse.y = e.clientY;
       mouseMoveTimer = null;
     }, 16); // ~60fps
   });
   ```

2. **Use requestIdleCallback for non-critical work:**
   ```javascript
   requestIdleCallback(() => {
     // Analytics, prefetching, etc.
   });
   ```

#### 6.3. CLS Optimization
**Potential Issues:**
- Font swap causing layout shift
- Canvas element size not reserved
- Images without dimensions

**Solutions:**
1. **Reserve space for canvas:**
   ```css
   #neural-canvas {
     aspect-ratio: 16 / 9; /* Or match container */
     width: 100%;
     height: auto;
   }
   ```

2. **Use size-adjust for font-display: swap:**
   ```css
   @font-face {
     font-family: 'Nunito';
     size-adjust: 97%; /* Match fallback font metrics */
     font-display: swap;
   }
   ```

3. **Preload logo with dimensions:**
   ```html
   <img src="/assets/logo-icon.svg"
        alt="Topos Labs"
        width="28"
        height="36"
        class="logo-icon">
   ```

### 7. Implement Resource Hints Strategy

**Issue:** No resource prioritization beyond preconnect
**Impact:** Suboptimal loading order
**Effort:** 45 minutes

**Strategy:**

```html
<!-- DNS prefetch for likely navigations -->
<link rel="dns-prefetch" href="https://github.com">

<!-- Preconnect (already done for fonts) ✓ -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- Preload critical resources -->
<link rel="preload" href="/assets/logo-icon.svg" as="image" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/nunito-400.woff2" as="font" type="font/woff2" crossorigin>

<!-- Prefetch next likely page -->


<!-- Prerender on hover (modern approach) -->
<script>

  link.addEventListener('mouseenter', () => {
    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'prefetch';
    prefetchLink.href = link.href;
    document.head.appendChild(prefetchLink);
  }, { once: true });
});
</script>
```

### 8. Implement 103 Early Hints (Cloudflare)

**Issue:** Critical resources discovered late in parsing
**Benefit:** 10-20% faster load time
**Effort:** 30 minutes (Cloudflare feature)

**Setup via Cloudflare:**
1. Dashboard → Speed → Optimization
2. Enable "Early Hints"
3. Cloudflare automatically sends 103 responses for preconnect/preload hints

**Or via _headers:**
```
/*
  Link: </assets/logo-icon.svg>; rel=preload; as=image
  Link: </assets/fonts/nunito-400.woff2>; rel=preload; as=font; crossorigin
```

### 9. Add Speculation Rules API

**Issue:** Modern alternative to prefetch not implemented
**Benefit:** Faster navigation with render-blocking optimizations
**Effort:** 30 minutes
**Browser Support:** Chrome 108+, Safari (preview)

**Implementation:**
```html
<script type="speculationrules">
{
  "prerender": [
    {
      "source": "list",

    }
  ],
  "prefetch": [
    {
      "source": "document",
      "where": {
        "href_matches": "/docs/commands/*"
      },
      "eagerness": "moderate"
    }
  ]
}
</script>
```

**Benefits:**
- Instant navigation on hover
- Smarter than link rel="prefetch"
- Respects user preferences (low data mode)

### 10. Progressive Enhancement for Neural Animation

**Issue:** Heavy animation runs on all devices
**Impact:** Battery drain, performance issues on low-end devices
**Effort:** 1 hour

**Implementation:**

```javascript
// Detect user preferences and device capabilities
const shouldReduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isLowPowerMode = matchMedia('(prefers-reduced-data: reduce)').matches;
const isLowEndDevice = navigator.hardwareConcurrency <= 4 &&
                       matchMedia('(max-width: 768px)').matches;

const isBatterySaving = async () => {
  if ('getBattery' in navigator) {
    const battery = await navigator.getBattery();
    return battery.level < 0.2 || battery.charging === false;
  }
  return false;
};

// Adaptive configuration
const getAnimationConfig = async () => {
  if (shouldReduceMotion) return null; // No animation
  if (isLowPowerMode) return null;

  const batteryLow = await isBatterySaving();
  if (batteryLow) return null;

  if (isLowEndDevice) {
    return {
      nodeCount: 40,
      hubCount: 3,
      fps: 30,
      connectionDistance: 120
    };
  }

  return {
    nodeCount: 80,
    hubCount: 5,
    fps: 60,
    connectionDistance: 180
  };
};

// Initialize with config
(async () => {
  const config = await getAnimationConfig();
  if (config) {
    initNeuralAnimation(config);
  } else {
    // Show static background gradient instead
    canvas.style.display = 'none';
  }
})();
```

### 11. Implement Long Task Detection

**Issue:** No monitoring of main thread blocking
**Benefit:** Identify performance bottlenecks
**Effort:** 20 minutes

```javascript
// Add to all pages
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 50) {
        console.warn('Long task detected:', entry.duration, 'ms', entry);
        // Send to analytics/monitoring
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/performance', JSON.stringify({
            type: 'long-task',
            duration: entry.duration,
            url: location.href
          }));
        }
      }
    }
  });
  observer.observe({ entryTypes: ['longtask'] });
}
```

---

## 🟡 MEDIUM - Technical SEO Enhancement

### 12. Add Missing Meta Descriptions to Docs Pages

**Issue:** Command docs pages lack meta descriptions
**Impact:** Poor search result snippets
**Effort:** 45 minutes

**Add to each docs/commands/*.html:**
```html
<!-- pack.html -->


<!-- map.html -->


<!-- scan.html -->

```

Continue for all 9 command pages.

### 13. Implement Breadcrumbs with Schema

**Issue:** No breadcrumb navigation on docs pages
**Impact:** Poor UX and missing structured data
**Effort:** 1 hour

**Add breadcrumbs to docs pages:**
```html
<nav aria-label="Breadcrumb">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/">
        <span itemprop="name">Home</span>
      </a>
      <meta itemprop="position" content="1" />
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/docs/">
        <span itemprop="name">Docs</span>
      </a>
      <meta itemprop="position" content="2" />
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span itemprop="name">pack</span>
      <meta itemprop="position" content="3" />
    </li>
  </ol>
</nav>
```

**CSS:**
```css
nav[aria-label="Breadcrumb"] {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-bottom: 24px;
}
nav[aria-label="Breadcrumb"] ol {
  display: flex;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}
nav[aria-label="Breadcrumb"] li:not(:last-child)::after {
  content: '/';
  margin-left: 8px;
}
```



**Issue:** No FAQ structured data
**Benefit:** Rich snippets in search results
**Effort:** 30 minutes


```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",

      "acceptedAnswer": {
        "@type": "Answer",

      }
    },
    {
      "@type": "Question",

      "acceptedAnswer": {
        "@type": "Answer",

      }
    },
    {
      "@type": "Question",

      "acceptedAnswer": {
        "@type": "Answer",

      }
    }
  ]
}
</script>
```

### 15. Implement HowTo Schema for Command Docs

**Issue:** Tutorial pages lack HowTo structured data
**Benefit:** Enhanced search appearance
**Effort:** 1 hour (for all command pages)

**Example for pack.html:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",


  "step": [
    {
      "@type": "HowToStep",
      "name": "Basic Usage",

    },
    {
      "@type": "HowToStep",
      "name": "Specify Output",

    }
  ]
}
</script>
```

### 16. Add VideoObject Schema (Future)

**Issue:** No video content yet, but structured data prep useful
**When:** If adding demo videos
**Effort:** 15 minutes per video

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",


  "thumbnailUrl": "https://toposlabs.ai/assets/video-thumb.jpg",
  "uploadDate": "2025-12-28",
  "duration": "PT5M",
  "contentUrl": "https://youtube.com/watch?v=...",
  "embedUrl": "https://youtube.com/embed/..."
}
</script>
```

### 17. Implement HTML Sitemaps

**Issue:** Only XML sitemap exists
**Benefit:** Better UX and internal linking
**Effort:** 30 minutes

**Create `/sitemap.html`:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Sitemap - Topos Labs</title>
  <!-- Standard meta tags -->
</head>
<body>
  <main>
    <h1>Sitemap</h1>

    <section>
      <h2>Main Pages</h2>
      <ul>
        <li><a href="/">Home</a></li>

        <li><a href="/docs/">Documentation</a></li>
      </ul>
    </section>

    <section>

      <ul>
        <li><a href="/docs/commands/pack.html">pack</a> - Package codebase</li>
        <li><a href="/docs/commands/map.html">map</a> - Generate dependency map</li>
        <!-- All commands -->
      </ul>
    </section>
  </main>
</body>
</html>
```

### 18. Add Language and Alternate Links

**Issue:** No language declaration in docs subpages
**Future:** Prep for internationalization
**Effort:** 15 minutes now, more later for actual i18n

**Add to all pages:**
```html
<html lang="en">
<!-- And for future multilingual support: -->
<link rel="alternate" hreflang="en" href="https://toposlabs.ai/">
<link rel="alternate" hreflang="x-default" href="https://toposlabs.ai/">
```

**When adding translations:**
```html
<link rel="alternate" hreflang="es" href="https://toposlabs.ai/es/">
<link rel="alternate" hreflang="ja" href="https://toposlabs.ai/ja/">
```

---

## 🟢 LOW - Monitoring & Observability

### 19. Implement Real User Monitoring (RUM)

**Issue:** No performance data from real users
**Impact:** Can't track actual user experience
**Effort:** 1-2 hours

**Option A: Cloudflare Web Analytics (Free, Privacy-First)**
```html
<!-- Add to all pages before </body> -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

**Option B: Custom Web Vitals Tracking**
```html
<script type="module">
import {onCLS, onFID, onLCP, onFCP, onTTFB, onINP} from 'https://unpkg.com/web-vitals@3?module';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);

  // Use sendBeacon if available, fallback to fetch
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/vitals', body);
  } else {
    fetch('/api/vitals', {
      method: 'POST',
      body,
      keepalive: true
    });
  }
}

// Measure all Core Web Vitals
onCLS(sendToAnalytics);
onFID(sendToAnalytics); // Legacy
onINP(sendToAnalytics); // New in 2024
onLCP(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);
</script>
```

**Create Cloudflare Worker for `/api/vitals`:**
```javascript
// workers/vitals.js
export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const data = await request.json();

    // Log to Cloudflare Analytics, D1, or external service
    console.log('Web Vital:', data);

    // Could send to external analytics
    // await fetch('https://analytics.example.com/vitals', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // });

    return new Response('OK', { status: 200 });
  }
};
```

### 20. Add Error Boundary and Monitoring

**Issue:** No JavaScript error tracking
**Impact:** Silent failures
**Effort:** 45 minutes

```javascript
// Add to all pages
window.addEventListener('error', (event) => {
  const errorData = {
    message: event.message,
    source: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    stack: event.error?.stack,
    url: location.href,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString()
  };

  // Send to error tracking service
  navigator.sendBeacon('/api/errors', JSON.stringify(errorData));

  console.error('Uncaught error:', errorData);
});

// Handle promise rejections
window.addEventListener('unhandledrejection', (event) => {
  const errorData = {
    type: 'unhandledrejection',
    reason: event.reason?.message || event.reason,
    stack: event.reason?.stack,
    url: location.href,
    timestamp: new Date().toISOString()
  };

  navigator.sendBeacon('/api/errors', JSON.stringify(errorData));

  console.error('Unhandled promise rejection:', errorData);
});

// Canvas animation specific error handling
try {
  // Animation code
} catch (error) {
  console.error('Animation error:', error);
  // Fallback: hide canvas, show static background
  canvas.style.display = 'none';
}
```

### 21. Implement Uptime Monitoring

**Issue:** No monitoring for site availability
**Impact:** Unaware of outages
**Effort:** 30 minutes setup

**Options:**
1. **Cloudflare Health Checks** (Free tier: 1 check)
2. **UptimeRobot** (Free tier: 50 monitors, 5-min intervals)
3. **Pingdom** (Free tier available)
4. **Better Uptime** (Free tier: 10 monitors)

**Recommended Setup:**
- Main site: https://toposlabs.ai/

- Docs: https://toposlabs.ai/docs/
- Monitor interval: 5 minutes
- Alert channels: Email, Slack, Discord

### 22. Synthetic Monitoring

**Issue:** No proactive performance monitoring
**Impact:** Performance regressions detected late
**Effort:** 1 hour

**Option A: Cloudflare Workers Cron + Puppeteer**
```javascript
// Run Lighthouse audits daily via GitHub Actions
// .github/workflows/lighthouse.yml
name: Lighthouse CI
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:

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
```

**Option B: Checkly**
- Synthetic monitoring from global locations
- API monitoring
- Free tier available

---

## 🎨 UX & Progressive Enhancement

### 23. Add Print Styles

**Issue:** No print-specific CSS
**Impact:** Poor printability of documentation
**Effort:** 30 minutes

```css
@media print {
  /* Hide navigation and decorative elements */
  nav,
  footer,
  .mobile-menu,
  .sidebar,
  #neural-canvas,
  .bg-glow {
    display: none !important;
  }

  /* Adjust layout for print */
  .content {
    margin-left: 0;
    max-width: 100%;
    padding: 0;
  }

  /* Ensure good contrast */
  body {
    background: white;
    color: black;
  }

  /* Show link URLs */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }

  /* Page breaks */
  h1, h2, h3 {
    page-break-after: avoid;
  }

  pre, code {
    page-break-inside: avoid;
    border: 1px solid #ccc;
  }

  /* Footer with page numbers */
  @page {
    margin: 2cm;
    @bottom-right {
      content: counter(page);
    }
  }
}
```

### 24. Implement View Transitions API

**Issue:** No smooth page transitions
**Benefit:** App-like experience with SPA feel
**Effort:** 1 hour
**Browser Support:** Chrome 111+, Safari 18+

```html
<meta name="view-transition" content="same-origin">

<script>
// Intercept same-origin navigation
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link || !link.href.startsWith(location.origin)) return;
  if (link.target === '_blank') return;

  e.preventDefault();

  // Use View Transitions API if available
  if (document.startViewTransition) {
    document.startViewTransition(async () => {
      const response = await fetch(link.href);
      const html = await response.text();
      const parser = new DOMParser();
      const newDoc = parser.parseFromString(html, 'text/html');

      // Replace content
      document.body.innerHTML = newDoc.body.innerHTML;
      document.title = newDoc.title;

      // Update URL
      history.pushState(null, '', link.href);
    });
  } else {
    // Fallback to normal navigation
    location.href = link.href;
  }
});

// Handle back/forward
window.addEventListener('popstate', () => {
  location.reload();
});
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.3s;
}

::view-transition-old(root) {
  animation-name: fade-out;
}

::view-transition-new(root) {
  animation-name: fade-in;
}

@keyframes fade-out {
  to { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
}
</style>
```

### 25. Implement Scroll-to-Top Button

**Issue:** Long docs pages lack quick navigation back to top
**Effort:** 20 minutes

```html
<button id="scroll-to-top" aria-label="Scroll to top" hidden>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 3l-7 7 1.41 1.41L9 6.83V17h2V6.83l4.59 4.58L17 10z"/>
  </svg>
</button>

<style>
#scroll-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  cursor: pointer;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s;
  z-index: 50;
}

#scroll-to-top:not([hidden]) {
  opacity: 1;
  transform: scale(1);
}

#scroll-to-top:hover {
  background: var(--text);
  color: var(--bg);
}
</style>

<script>
const scrollBtn = document.getElementById('scroll-to-top');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Show button after scrolling down 300px
  if (scrollTop > 300 && scrollTop > lastScroll) {
    scrollBtn.hidden = false;
  } else if (scrollTop < 100) {
    scrollBtn.hidden = true;
  }

  lastScroll = scrollTop;
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
</script>
```

### 26. Add Copy-to-Clipboard for Code Blocks

**Issue:** Code blocks lack copy functionality
**Impact:** Poor developer UX
**Effort:** 30 minutes

```javascript
// Add to docs pages
document.querySelectorAll('pre code').forEach((block) => {
  const pre = block.parentElement;
  const button = document.createElement('button');
  button.className = 'copy-code-btn';
  button.textContent = 'Copy';
  button.setAttribute('aria-label', 'Copy code to clipboard');

  pre.style.position = 'relative';
  pre.appendChild(button);

  button.addEventListener('click', async () => {
    const code = block.textContent;

    try {
      await navigator.clipboard.writeText(code);
      button.textContent = 'Copied!';
      button.classList.add('copied');

      setTimeout(() => {
        button.textContent = 'Copy';
        button.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      button.textContent = 'Failed';
    }
  });
});
```

```css
.copy-code-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 6px 12px;
  font-size: 12px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-secondary);
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;
}

pre:hover .copy-code-btn {
  opacity: 1;
}

.copy-code-btn:hover {
  background: var(--surface);
  color: var(--text);
}

.copy-code-btn.copied {
  background: #3DBAAC;
  color: white;
}
```

### 27. Implement Dark Mode Detection (Prep for Toggle)

**Issue:** Only dark mode, no system preference detection
**Current:** Always dark
**Future:** Add toggle
**Effort:** 30 minutes

```javascript
// Detect system preference
const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
const prefersLight = matchMedia('(prefers-color-scheme: light)').matches;

// Get user preference from localStorage
const userPref = localStorage.getItem('theme');

// Apply theme
const theme = userPref || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', theme);

// Listen for changes
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    // Only auto-switch if user hasn't set preference
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  }
});
```

```css
/* Light mode variables (for future) */
[data-theme="light"] {
  --bg: #ffffff;
  --surface: #f5f5f5;
  --border: rgba(0,0,0,0.1);
  --text: #000000;
  --text-secondary: #666666;
  --text-tertiary: #999999;
}

/* Dark mode (current default) */
[data-theme="dark"] {
  --bg: #0a0a0a;
  --surface: #141414;
  --border: rgba(255,255,255,0.1);
  --text: #ffffff;
  --text-secondary: #888888;
  --text-tertiary: #555555;
}
```

---

## 🌍 Future-Proofing & PWA

### 28. Add Web App Manifest

**Issue:** No PWA manifest
**Benefit:** Add to home screen, app-like experience
**Effort:** 20 minutes

**Create `/manifest.json`:**
```json
{
  "name": "Topos Labs",
  "short_name": "Topos Labs",

  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#0a0a0a",
  "orientation": "any",
  "icons": [
    {
      "src": "/assets/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/assets/icon-maskable-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "categories": ["development", "productivity"],
  "screenshots": [
    {
      "src": "/assets/screenshot-desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "/assets/screenshot-mobile.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

**Add to all HTML files:**
```html
<link rel="manifest" href="/manifest.json">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Topos Labs">
<link rel="apple-touch-icon" href="/assets/icon-180.png">
```

**Note:** Requires creating icon assets.

### 29. Implement Basic Service Worker

**Issue:** No offline support or caching strategy
**Benefit:** Better performance, offline capability
**Effort:** 2 hours
**Priority:** Low for marketing site

```javascript
// /service-worker.js
const CACHE_NAME = 'toposlabs-v1';
const RUNTIME = 'runtime';

// Resources to cache immediately
const PRECACHE_URLS = [
  '/',

  '/docs/',
  '/assets/logo-icon.svg',
  '/assets/fonts/nunito-400.woff2',
  '/assets/fonts/jetbrains-mono-400.woff2'
];

// Install - cache static resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// Activate - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request).then((response) => {
        // Cache successful responses
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(RUNTIME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      });

      // Return cached version if network fails
      return networkFetch.catch(() => cached);
    })
  );
});
```

**Register in HTML:**
```html
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => console.log('SW registered:', reg.scope))
      .catch((err) => console.error('SW registration failed:', err));
  });
}
</script>
```

### 30. Add Update Notification

**Issue:** Users unaware of new versions
**Benefit:** Prompt to reload for updates
**Effort:** 30 minutes

```javascript
// Check for SW updates
let refreshing = false;
navigator.serviceWorker.addEventListener('controllerchange', () => {
  if (refreshing) return;
  refreshing = true;
  window.location.reload();
});

// Show update banner when new SW is waiting
navigator.serviceWorker.register('/service-worker.js').then((reg) => {
  reg.addEventListener('updatefound', () => {
    const newWorker = reg.installing;

    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // New SW is waiting
        showUpdateBanner(() => {
          newWorker.postMessage({ type: 'SKIP_WAITING' });
        });
      }
    });
  });
});

function showUpdateBanner(onUpdate) {
  const banner = document.createElement('div');
  banner.className = 'update-banner';
  banner.innerHTML = `
    <p>A new version is available!</p>
    <button onclick="this.parentElement.querySelector('button').click()">Update</button>
  `;
  banner.querySelector('button').addEventListener('click', onUpdate);
  document.body.appendChild(banner);
}
```

---

## 📋 Implementation Priority Matrix

| Priority | Category | Items | Effort | Impact | Quick Wins |
|----------|----------|-------|--------|--------|-----------|
| 🔴 Critical | Advanced Security | 1-5 | 2.5h | High | #4 Security.txt (10min) |
| 🟠 High | Performance | 6-11 | 5h | High | #8 Early Hints (30min), #9 Speculation Rules (30min) |
| 🟡 Medium | SEO | 12-18 | 4.75h | Medium | #12 Meta Descriptions (45min) |
| 🟢 Low | Monitoring | 19-22 | 4h | Medium | #20 Error Monitoring (45min) |
| 🎨 UX | Enhancement | 23-27 | 3.5h | Medium | #25 Scroll to Top (20min), #26 Copy Code (30min) |
| 🌍 Future | PWA | 28-30 | 4.5h | Low | #28 Manifest (20min) |

**Total Estimated Effort:** ~24 hours
**Recommended First Phase:** Quick wins (4.5 hours)

---

## Quick Wins (< 1 hour each)

These high-impact items can be done immediately:

1. ✅ **Security.txt** (10 min) - #4
2. ✅ **103 Early Hints via Cloudflare** (30 min) - #8
3. ✅ **Speculation Rules API** (30 min) - #9
4. ✅ **Meta Descriptions for Docs** (45 min) - #12
5. ✅ **Error Monitoring** (45 min) - #20
6. ✅ **Scroll-to-Top Button** (20 min) - #25
7. ✅ **Copy Code Buttons** (30 min) - #26
8. ✅ **Web App Manifest** (20 min) - #28

**Total: ~4.5 hours** for significant improvements.

---

## Testing & Validation

### Tools to Use:
1. **Lighthouse CI** - Automated performance testing
2. **WebPageTest.org** - Real device testing
3. **securityheaders.com** - Security header validation
4. **GTmetrix** - Performance analysis
5. **Google Rich Results Test** - Schema validation
6. **Schema.org Validator** - Structured data validation
7. **W3C Validator** - HTML validation
8. **WAVE** - Accessibility checker
9. **Cloudflare Analytics** - RUM data

### Key Metrics to Track:
- LCP: Target < 2.5s (currently ~2.0s)
- INP: Target < 200ms
- CLS: Target < 0.1 (currently ~0.05)
- TTFB: Target < 800ms (Cloudflare should be < 500ms)
- Security Headers Grade: A+
- Lighthouse Performance Score: 95+
- Accessibility Score: 100

---

## Cost/Benefit Analysis

| Item | Effort | Cost | Benefit | ROI |
|------|--------|------|---------|-----|
| Self-host fonts (#1) | 30min | Free | High (SRI, faster, no 3rd party) | ⭐⭐⭐⭐⭐ |
| Speculation Rules (#9) | 30min | Free | High (instant navigation) | ⭐⭐⭐⭐⭐ |
| Meta Descriptions (#12) | 45min | Free | High (SEO) | ⭐⭐⭐⭐⭐ |
| Copy Code Buttons (#26) | 30min | Free | High (developer UX) | ⭐⭐⭐⭐⭐ |
| Web Vitals RUM (#19) | 1-2h | Free | High (visibility) | ⭐⭐⭐⭐ |
| Breadcrumbs (#13) | 1h | Free | Medium (UX, SEO) | ⭐⭐⭐⭐ |
| Service Worker (#29) | 2h | Free | Low (marketing site) | ⭐⭐ |
| PWA Manifest (#28) | 20min + design | $0-50 | Low (nice to have) | ⭐⭐ |

---

## Maintenance Recommendations

1. **Weekly:**
   - Check Cloudflare Analytics for traffic patterns
   - Review error logs
   - Monitor uptime status

2. **Monthly:**
   - Run Lighthouse audits
   - Check security headers
   - Review Web Vitals data
   - Update sitemap if new pages added

3. **Quarterly:**
   - Update dependencies (if using build tools)
   - Review and update meta descriptions
   - Audit for broken links
   - Review certificate transparency logs

4. **Annually:**
   - Complete security audit
   - Review all structured data
   - Update copyright year
   - Comprehensive performance audit

---

## Next Steps

### Immediate (This Week):
1. ✅ Self-host Google Fonts
2. ✅ Add Security.txt
3. ✅ Enable 103 Early Hints
4. ✅ Add meta descriptions to docs pages
5. ✅ Implement error monitoring

### Short-term (This Month):
1. Tighten CSP (extract inline scripts)
2. Implement Web Vitals RUM
3. Add breadcrumbs to docs
4. Set up uptime monitoring
5. Add copy buttons to code blocks

### Medium-term (This Quarter):
1. Implement service worker
2. Add PWA manifest
3. Create FAQ schema
4. Implement View Transitions API
5. Set up synthetic monitoring

### Long-term (Future):
1. Add light mode toggle
2. Internationalization (i18n)
3. Video content with VideoObject schema
4. Advanced animations for high-end devices
5. A/B testing framework

---

## Summary

This plan complements the existing `SECURITY_PERFORMANCE_PLAN.md` with advanced optimizations focused on:

✅ **Modern Performance**: Core Web Vitals, INP, resource hints, Speculation Rules
✅ **Advanced Security**: SRI, tighter CSP, COEP/COOP, Security.txt
✅ **Comprehensive SEO**: Missing metadata, breadcrumbs, rich schemas
✅ **Observability**: RUM, error tracking, uptime monitoring
✅ **Future-Proofing**: PWA features, View Transitions, progressive enhancement
✅ **Developer UX**: Copy buttons, scroll-to-top, print styles

**Estimated Total Impact:**
- Performance: +5-10 Lighthouse points
- Security: A+ rating
- SEO: 20-30% better visibility
- UX: Significantly improved developer experience
- Monitoring: Full visibility into real user experience

**Total Effort:** ~24 hours
**Quick Wins (< 5h):** ~40% of total value
**Recommended Approach:** Implement quick wins first, then prioritize based on business goals.
