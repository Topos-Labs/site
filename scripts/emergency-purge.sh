#!/bin/bash

# Emergency Cache Purge Script for Cloudflare
# Use this when fonts are corrupted or site needs immediate cache clear

set -e

echo "🚨 EMERGENCY CACHE PURGE FOR TOPOS LABS"
echo "========================================"
echo ""

# Check for required environment variables
if [ -z "$CF_ZONE_ID" ] || [ -z "$CF_API_TOKEN" ]; then
  echo "❌ Error: Missing Cloudflare credentials"
  echo ""
  echo "Please set environment variables:"
  echo "  export CF_ZONE_ID='your-zone-id'"
  echo "  export CF_API_TOKEN='your-api-token'"
  echo ""
  exit 1
fi

echo "🔐 Cloudflare credentials found"
echo "📍 Zone ID: ${CF_ZONE_ID:0:8}..."
echo ""

# Ask for confirmation
read -p "⚠️  This will purge ALL cached files. Continue? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
  echo "❌ Purge cancelled"
  exit 0
fi

echo ""
echo "🧹 Purging Cloudflare cache..."

# Purge everything
RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"purge_everything":true}' \
  -w "\nHTTP_CODE:%{http_code}")

HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_CODE/d')

echo "$BODY" | jq . 2>/dev/null || echo "$BODY"

if [ "$HTTP_CODE" = "200" ] && echo "$BODY" | grep -q '"success":true'; then
  echo ""
  echo "✅ Cache purge successful!"
  echo ""
  echo "📝 Next steps:"
  echo "  1. Wait 30-60 seconds for purge to propagate"
  echo "  2. Test fonts at: https://toposlabs.ai/assets/fonts/nunito-400.woff2"
  echo "  3. Verify Content-Type is 'font/woff2'"
  echo "  4. Check file size is >10KB"
  echo ""
  echo "🔍 Quick verification:"
  echo "  curl -I https://toposlabs.ai/assets/fonts/nunito-400.woff2 | grep -E 'content-type|content-length|cf-cache'"
else
  echo ""
  echo "❌ Cache purge failed!"
  echo "HTTP Status: $HTTP_CODE"
  echo ""
  echo "Common issues:"
  echo "  - Invalid API token (check permissions)"
  echo "  - Wrong zone ID"
  echo "  - API rate limit exceeded"
  echo ""
  exit 1
fi
