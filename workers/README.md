# Cloudflare Workers Setup

These Workers provide error logging and Web Vitals monitoring endpoints.

## Workers Included

1. **errors.js** - `/api/errors` - Error logging endpoint
2. **vitals.js** - `/api/vitals` - Web Vitals metrics endpoint

## Free Tier Limits

- 100,000 requests/day (resets at midnight UTC)
- 10ms CPU time per request
- 30 Workers scripts total

**Your expected usage:** ~150-200 requests/day (well under limit)

## Deployment Instructions

### Option 1: Deploy via Wrangler CLI (Recommended)

```bash
# Install Wrangler (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy errors worker
cd workers
wrangler deploy errors.js --name toposlabs-errors --route "toposlabs.ai/api/errors"

# Deploy vitals worker
wrangler deploy vitals.js --name toposlabs-vitals --route "toposlabs.ai/api/vitals"
```

### Option 2: Deploy via Cloudflare Dashboard

1. Go to https://dash.cloudflare.com/
2. Select your account
3. Click **"Workers & Pages"** in the left sidebar
4. Click **"Create application"**
5. Click **"Create Worker"**

**For errors.js:**
1. Name: `toposlabs-errors`
2. Click **"Deploy"**
3. Click **"Edit code"**
4. Paste the contents of `errors.js`
5. Click **"Save and deploy"**
6. Go to **"Triggers"** tab
7. Click **"Add route"**
8. Route: `toposlabs.ai/api/errors`
9. Click **"Add route"**

**For vitals.js:**
1. Repeat the same steps
2. Name: `toposlabs-vitals`
3. Route: `toposlabs.ai/api/vitals`

## Testing Workers Locally

```bash
# Install wrangler dev
npm install -g wrangler

# Test errors worker
cd workers
wrangler dev errors.js --port 8787

# In another terminal, test it:
curl -X POST http://localhost:8787/api/errors \
  -H "Content-Type: application/json" \
  -d '{"message": "Test error", "url": "https://toposlabs.ai/"}'

# Test vitals worker
wrangler dev vitals.js --port 8788

# Test it:
curl -X POST http://localhost:8788/api/vitals \
  -H "Content-Type: application/json" \
  -d '{"name": "LCP", "value": 1234, "id": "test-id"}'
```

## Testing Workers in Production

After deployment:

```bash
# Test errors endpoint
curl -X POST https://toposlabs.ai/api/errors \
  -H "Content-Type: application/json" \
  -H "Origin: https://toposlabs.ai" \
  -d '{
    "message": "Test error",
    "url": "https://toposlabs.ai/",
    "userAgent": "Test/1.0"
  }'

# Expected response: OK

# Test vitals endpoint
curl -X POST https://toposlabs.ai/api/vitals \
  -H "Content-Type: application/json" \
  -H "Origin: https://toposlabs.ai" \
  -d '{
    "name": "LCP",
    "value": 1234.5,
    "id": "v3-123-456",
    "url": "https://toposlabs.ai/"
  }'

# Expected response: OK
```

## Viewing Logs

### Via Dashboard:
1. Go to **Workers & Pages**
2. Click on your worker (e.g., `toposlabs-errors`)
3. Click **"Logs"** tab
4. View real-time logs

### Via Wrangler:
```bash
# Tail logs for errors worker
wrangler tail toposlabs-errors

# Tail logs for vitals worker
wrangler tail toposlabs-vitals
```

## Optional: Add Workers KV Storage

If you want to persist logs for analysis:

```bash
# Create KV namespace
wrangler kv:namespace create "ERRORS_KV"
wrangler kv:namespace create "VITALS_KV"

# Update wrangler.toml (create if doesn't exist)
```

**wrangler.toml:**
```toml
name = "toposlabs-errors"
main = "errors.js"
compatibility_date = "2025-01-01"

[[kv_namespaces]]
binding = "ERRORS_KV"
id = "YOUR_KV_NAMESPACE_ID"
```

Then uncomment the KV storage code in the worker files.

## Monitoring Usage

### Check request counts:
1. Dashboard → Workers & Pages
2. Click on worker name
3. View **Metrics** tab
4. See request count, errors, CPU time

### Free tier usage:
- Requests: ~150-200/day out of 100,000 (0.2% used)
- Very safe margin!

## Troubleshooting

**CORS errors?**
- Check that origin is in `allowedOrigins` array
- Verify route is set up correctly

**Worker not found?**
- Verify route: `toposlabs.ai/api/errors` (no https://)
- Check that worker is deployed
- Wait 1-2 minutes for propagation

**Rate limited?**
- Free tier: 100,000 req/day
- Check dashboard metrics
- Unlikely with your traffic

**Workers not logging?**
- Check console in Workers dashboard
- Verify wrangler tail is connected
- Check that worker is actually being called

## Cost

**Current setup: $0/month**
- 100,000 requests/day free
- Your usage: ~150-200/day
- Plenty of headroom

**If you need more:**
- Workers Paid: $5/mo for 10M requests
- Not needed for your traffic levels

## Security Notes

- Workers validate request method (POST only)
- CORS headers restrict origins
- No sensitive data stored
- Logs expire automatically if using KV
- Rate limiting via Cloudflare built-in

## Next Steps

1. Deploy both workers using one of the methods above
2. Test endpoints with curl commands
3. Update HTML to call these endpoints
4. Monitor logs in Workers dashboard
5. Enjoy free error and performance monitoring!
