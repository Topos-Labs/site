# Cloudflare Dashboard Setup Instructions

**⚠️ ACTION REQUIRED: You must complete these steps in your Cloudflare dashboard**

These settings cannot be automated - you need to log into your Cloudflare dashboard and enable them manually.

---

## 📋 Step-by-Step Checklist

### Step 1: Login to Cloudflare
1. Go to https://dash.cloudflare.com/
2. Select your account
3. Select the `toposlabs.ai` domain

---

## ⚡ Speed & Optimization Settings

### Enable 103 Early Hints (HIGH IMPACT!)
**Location:** Speed → Optimization

1. Click **"Speed"** in the left sidebar
2. Click **"Optimization"** tab
3. Scroll to **"Early Hints"**
4. Toggle **ON** ✅

**Expected Impact:** 10-20% faster page loads
**Time:** 30 seconds

---

### Enable Auto Minify (HIGH IMPACT!)
**Location:** Speed → Optimization

1. In the same **"Optimization"** tab
2. Scroll to **"Auto Minify"**
3. Check all three boxes:
   - ✅ JavaScript
   - ✅ CSS
   - ✅ HTML
4. Click **"Save"**

**Expected Impact:** 15-25% smaller page sizes
**Time:** 30 seconds

---

### Enable Brotli Compression
**Location:** Speed → Optimization

1. In the same **"Optimization"** tab
2. Scroll to **"Brotli"**
3. Toggle **ON** ✅

**Expected Impact:** Better compression than gzip
**Time:** 15 seconds

---

## 🌐 Network Settings

### Enable HTTP/3 (QUIC)
**Location:** Network

1. Click **"Network"** in the left sidebar
2. Find **"HTTP/3 (with QUIC)"**
3. Toggle **ON** ✅

**Expected Impact:** Faster connection establishment
**Time:** 15 seconds

---

### Verify WebSockets (Should be ON)
**Location:** Network

1. In the same **"Network"** tab
2. Verify **"WebSockets"** is **ON** ✅
3. If OFF, toggle it ON

**Expected Impact:** Ensures service worker communication
**Time:** 10 seconds

---

## 💾 Caching Settings

### Enable Always Online
**Location:** Caching → Configuration

1. Click **"Caching"** in the left sidebar
2. Click **"Configuration"** tab
3. Scroll to **"Always Online™"**
4. Toggle **ON** ✅

**Expected Impact:** Site stays accessible during origin outages
**Time:** 15 seconds

---

## 📊 Analytics Setup

### Enable Cloudflare Web Analytics
**Location:** Analytics → Web Analytics

1. Click **"Analytics"** in the left sidebar
2. Click **"Web Analytics"** tab
3. Click **"Enable Web Analytics"** button
4. Copy the **Site Tag** (beacon token)
5. Save the token - you'll add it to your HTML files

**Or use Automatic Injection:**
1. Toggle **"Automatic Injection"** ON ✅
2. This automatically adds the beacon to all your pages

**Expected Impact:** Privacy-first analytics, no cookies
**Time:** 2 minutes

**Token format will look like:**
```
abc123def456...
```

---

## 🔒 Security Settings (Optional but Recommended)

### Verify SSL/TLS Settings
**Location:** SSL/TLS → Overview

1. Click **"SSL/TLS"** in the left sidebar
2. Ensure SSL/TLS encryption mode is: **"Full (strict)"** ✅
3. If not, select it and save

**Expected Impact:** Maximum security
**Time:** 30 seconds

---

### Enable Always Use HTTPS
**Location:** SSL/TLS → Edge Certificates

1. Click **"SSL/TLS"** → **"Edge Certificates"** tab
2. Find **"Always Use HTTPS"**
3. Toggle **ON** ✅

**Expected Impact:** Force HTTPS for all traffic
**Time:** 15 seconds

---

### Enable HSTS (Strict Transport Security)
**Location:** SSL/TLS → Edge Certificates

1. In **"Edge Certificates"** tab
2. Find **"HTTP Strict Transport Security (HSTS)"**
3. Click **"Enable HSTS"**
4. Configure:
   - **Max Age:** 12 months (recommended)
   - **Apply to subdomains:** ON ✅
   - **Preload:** ON ✅ (optional, enables HSTS preload list)
5. Click **"Next"** and **"I understand"**

**Expected Impact:** Protection against downgrade attacks
**Time:** 1 minute

---

## 🎨 Page Rules (Optional, 3 Available on Free Tier)

You probably don't need these since _headers file handles everything, but here's how to use them if needed:

**Location:** Rules → Page Rules

**Current usage:** 0/3 rules used

**Example useful rules:**
- Force www or non-www
- Redirect old URLs
- Cache everything for specific paths

---

## ✅ Verification Checklist

After completing all steps above, verify:

- [ ] 103 Early Hints: ON
- [ ] Auto Minify: ON (JavaScript, CSS, HTML)
- [ ] Brotli: ON
- [ ] HTTP/3: ON
- [ ] Always Online: ON
- [ ] Web Analytics: Enabled (token saved or auto-injection ON)
- [ ] SSL/TLS: Full (strict)
- [ ] Always Use HTTPS: ON
- [ ] HSTS: Enabled (optional)

---

## 🧪 Test Your Changes

After enabling all features, test with these commands:

```bash
# Test 103 Early Hints
curl -I https://toposlabs.ai/ 2>&1 | grep -i "103\|link"

# Test Brotli compression
curl -H "Accept-Encoding: br" -I https://toposlabs.ai/ | grep -i "content-encoding"

# Test HTTP/3 (requires curl with HTTP/3 support)
curl --http3 -I https://toposlabs.ai/ 2>&1 | grep -i "http/3"

# Test Auto Minify (HTML should be on one line)
curl https://toposlabs.ai/ | head -1

# Test HTTPS redirect (should return 301)
curl -I http://toposlabs.ai/ | grep -i "301\|location"

# Verify Cloudflare is active
curl -I https://toposlabs.ai/ | grep -i "cf-ray\|server"
```

**Or use online tools:**
- https://pagespeed.web.dev/ - Performance test
- https://securityheaders.com/ - Security headers check
- https://http3check.net/ - HTTP/3 verification
- https://www.giftofspeed.com/ - Compression test

---

## 📝 Notes

**Propagation Time:**
- Most changes take effect immediately
- Some changes may take up to 5 minutes to propagate globally
- HSTS takes effect immediately but browser preload list takes weeks

**Free Tier Limits:**
- Page Rules: 3 (you're using 0)
- Workers: 100,000 requests/day
- Health Checks: 1 (use UptimeRobot instead)
- Everything else: Unlimited!

**What You DON'T Need:**
- ❌ Rocket Loader - Can conflict with modern JS
- ❌ Mirage - Only useful if you have lots of images
- ❌ AMP Real URL - Not using AMP
- ❌ Mobile Redirect - Using responsive design instead

---

## 🎯 Priority Order

If you're short on time, do these in order:

1. **MUST DO (2 minutes):**
   - 103 Early Hints
   - Auto Minify
   - Brotli

2. **SHOULD DO (2 minutes):**
   - HTTP/3
   - Always Online
   - Web Analytics

3. **NICE TO HAVE (2 minutes):**
   - Always Use HTTPS
   - HSTS
   - Verify SSL settings

**Total time for everything: ~6 minutes** ⚡

---

## 🆘 Troubleshooting

**Can't find a setting?**
- Make sure you're on the correct domain (toposlabs.ai)
- Some settings may be named slightly differently
- Use the search box in the dashboard

**Changes not taking effect?**
- Wait 5 minutes for propagation
- Clear your browser cache
- Test from a different network/device

**Web Analytics beacon not working?**
- Check browser console for errors
- Verify the token is correct
- Make sure no ad blockers are active when testing

**Need help?**
- Cloudflare docs: https://developers.cloudflare.com/
- Community: https://community.cloudflare.com/

---

## ✅ Next Steps

After completing these dashboard settings:

1. ✅ Mark this todo as complete
2. ✅ Continue with code implementations (security.txt, meta descriptions, etc.)
3. ✅ Test everything together
4. ✅ Deploy to production

---

**Last Updated:** 2025-12-28
**Estimated Time:** 6-10 minutes
**Difficulty:** Easy (just click toggles)
**Impact:** HIGH (20-30% performance boost)
