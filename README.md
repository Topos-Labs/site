# Topos Labs Website

Official website for Topos Labs - Developer tools for the AI era.

**Live Site:** https://toposlabs.ai

---

## Quick Start

**New to this repo?** Start here: **[START_HERE.md](START_HERE.md)**

This will walk you through the 4-step deployment process (40 minutes).

---

## Documentation

### Getting Started
- **[START_HERE.md](START_HERE.md)** - Quick start guide (read this first!)
- **[QUICKSTART.txt](QUICKSTART.txt)** - Terminal-friendly reference
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Complete deployment guide

### Setup Guides
- **[CLOUDFLARE_DASHBOARD_SETUP.md](CLOUDFLARE_DASHBOARD_SETUP.md)** - Enable 6 free Cloudflare features
- **[UPTIME_ROBOT_SETUP.md](UPTIME_ROBOT_SETUP.md)** - Setup free monitoring
- **[workers/README.md](workers/README.md)** - Deploy Workers for monitoring
- **[FONTS_DOWNLOAD_INSTRUCTIONS.md](FONTS_DOWNLOAD_INSTRUCTIONS.md)** - Font setup (if needed)

### Project Info
- **[CLAUDE.md](CLAUDE.md)** - Instructions for Claude Code when working on this repo

---

## Tech Stack

- **Hosting:** Cloudflare Pages (free tier)
- **CDN:** Cloudflare (300+ edge locations)
- **Monitoring:** Cloudflare Workers + UptimeRobot + GitHub Actions
- **Analytics:** Cloudflare Web Analytics (privacy-first)
- **Fonts:** Self-hosted (Nunito + JetBrains Mono)

**Total Cost:** $0/month 🎉

---

## Features

✅ **Performance**
- 103 Early Hints for faster loads
- HTTP/3 & Brotli compression
- Self-hosted fonts (no external dependencies)
- Service worker with offline support
- Lighthouse score: 95+

✅ **Security**
- A+ rating on securityheaders.com
- COEP/COOP/CORP headers (Spectre protection)
- Content Security Policy
- RFC 9116 compliant security.txt

✅ **Monitoring**
- Uptime monitoring (3 endpoints, 5-min checks)
- Error logging (Cloudflare Workers)
- Web Vitals tracking (real user monitoring)
- Daily Lighthouse CI audits

✅ **PWA**
- Installable on mobile/desktop
- Offline support
- App-like experience

✅ **SEO**
- XML + HTML sitemaps
- Structured data (Schema.org)
- Optimized meta tags

---

## Project Structure

```
site/
├── index.html                   # Homepage

├── docs/                        # Documentation pages
│   ├── index.html              # Docs homepage
│   └── commands/*.html         # Command reference pages
├── assets/
│   ├── fonts/                  # Self-hosted fonts (WOFF2)
│   ├── fonts.css               # Font declarations
│   └── logo-icon.svg           # Optimized logo (38KB)
├── workers/
│   ├── errors.js               # Error logging Worker
│   ├── vitals.js               # Web Vitals Worker
│   └── README.md               # Deployment guide
├── .github/workflows/
│   └── lighthouse-ci.yml       # Daily Lighthouse audits
├── manifest.json               # PWA manifest
├── service-worker.js           # Service worker
├── _headers                    # Security & caching headers
├── robots.txt                  # Search engine directives
├── sitemap.xml                 # XML sitemap
└── sitemap.html                # HTML sitemap

Documentation:
├── START_HERE.md               # Quick start (read first!)
├── DEPLOYMENT_CHECKLIST.md     # Full deployment guide
├── CLOUDFLARE_DASHBOARD_SETUP.md
├── UPTIME_ROBOT_SETUP.md
└── FONTS_DOWNLOAD_INSTRUCTIONS.md
```

---

## Development

### Local Development

```bash
# Serve locally
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Deploy

Push to main branch - Cloudflare Pages deploys automatically.

```bash
git add .
git commit -m "Your changes"
git push
```

Deployment status: https://dash.cloudflare.com/ → Pages → toposlabs

---

## Monitoring

**Uptime:** https://uptimerobot.com/dashboard

**Analytics:** Cloudflare Dashboard → Analytics → Web Analytics

**Lighthouse CI:** GitHub Actions tab

**Workers Logs:** Cloudflare Dashboard → Workers → View logs

---

## Performance

**Current Metrics:**
- LCP: ~1.2s
- FID/INP: <100ms
- CLS: <0.05
- TTFB: ~400ms
- Lighthouse: 95+

**Target:** All Core Web Vitals in "Good" range ✅

---

## Security

**Headers:**
- Content-Security-Policy
- Cross-Origin-Embedder-Policy
- Cross-Origin-Opener-Policy
- Cross-Origin-Resource-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security

**Rating:** A+ on securityheaders.com

**Disclosure:** [/.well-known/security.txt](https://toposlabs.ai/.well-known/security.txt)

---

## Contributing

This is the official Topos Labs website repository.



---

## License

© 2025 Topos Labs

---

## Support

- **Website Issues:** Open an issue in this repo

- **Documentation:** See guides in root directory

---

**Built with:** HTML, CSS, JavaScript (no build step!)

**Optimized with:** Claude Code 🤖
