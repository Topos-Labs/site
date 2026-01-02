# Font File Sources and Verification

This document records the sources and integrity information for all self-hosted fonts used on toposlabs.ai.

## Font Files

### Nunito (v8.0)
- **Source**: Google Fonts / fontsource.org
- **License**: Open Font License (OFL)
- **Designer**: Vernon Adams, Jacques Le Bailly, Manvel Shmavonyan
- **Download Date**: 2024-12-29
- **Format**: WOFF2 (Latin subset)

#### Files and SRI Hashes:

**nunito-400.woff2** (Regular)
- Size: 16,292 bytes
- SHA-384: `sha384-TdhPSiVJVcGjVklNrvJUueB5292zwZm3/GaS6Bhf3Zv9skX7Y+J0y+FDoKxDxvtf`
- Usage: Body text, paragraphs, default content

**nunito-600.woff2** (SemiBold)
- Size: 16,280 bytes
- SHA-384: `sha384-ZdMLMxAgOS7JRi+m9pOdRFKX0gmmitBtnfJ0OLrUdcqZLeGRW3V/e0zz3cpgaO+J`
- Usage: Logo "Labs", navigation, subheadings, product badges

**nunito-700.woff2** (Bold)
- Size: 16,336 bytes
- SHA-384: `sha384-TuM9bX6+Pryf9yXAZMAmB1Q8RjekNt0e7zYKSUj5ogp5Hxb7cBOC4HN4mU6z+E4d`
- Usage: Logo "Topos", main headings (h1), emphasis

### JetBrains Mono (v2.304)
- **Source**: JetBrains / fontsource.org
- **License**: Apache License 2.0
- **Designer**: Philipp Nurullin, Konstantin Bulenkov
- **Download Date**: 2024-12-29
- **Format**: WOFF2 (Latin subset)

#### Files and SRI Hashes:

**jetbrains-mono-400.woff2** (Regular)
- Size: 21,164 bytes
- SHA-384: `sha384-/4dCc3INKaFZBsZMku6bd44i8Gr1uXW1GYvdcNjsbHXHh2nGnk9G4RAhHf8hx3GT`
- Usage: Code blocks, inline code, command names, terminal output

---

## Font Acquisition Process

### Verified Download Method:

```bash
# 1. Install fontsource package (verified via npm)
npm install @fontsource/nunito @fontsource/jetbrains-mono

# 2. Copy WOFF2 files to assets/fonts/
cp node_modules/@fontsource/nunito/files/nunito-latin-400-normal.woff2 assets/fonts/nunito-400.woff2
cp node_modules/@fontsource/nunito/files/nunito-latin-600-normal.woff2 assets/fonts/nunito-600.woff2
cp node_modules/@fontsource/nunito/files/nunito-latin-700-normal.woff2 assets/fonts/nunito-700.woff2
cp node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2 assets/fonts/jetbrains-mono-400.woff2

# 3. Verify file integrity
node scripts/verify-fonts.js

# 4. Generate SRI hashes
openssl dgst -sha384 -binary assets/fonts/nunito-400.woff2 | base64
# Repeat for all fonts
```

### ⚠️ DO NOT:
- Download fonts directly from CDN URLs (risk of corrupted/404 responses)
- Rename files without verification
- Commit font files without running `npm run verify-fonts`
- Modify font files in any way

---

## Verification Process

### Pre-Commit Verification:

All font files are automatically verified before commit via `.githooks/pre-commit`:
- ✅ File type validation (WOFF2 magic number check)
- ✅ Integrity hash verification (SHA-384)
- ✅ File size validation (10KB-100KB range)
- ✅ User confirmation prompt

### Manual Verification:

```bash
# Run font verification script
npm run verify-fonts

# Or directly:
node scripts/verify-fonts.js
```

### CI/CD Verification:

Fonts are automatically verified in GitHub Actions before deployment:
- See: `.github/workflows/deploy-and-purge.yml`

---

## Security Measures

### Subresource Integrity (SRI):

All font preload links include SRI hashes to prevent tampering:

```html
<link rel="preload" href="/assets/fonts/nunito-400.woff2" as="font" type="font/woff2"
      integrity="sha384-TdhPSiVJVcGjVklNrvJUueB5292zwZm3/GaS6Bhf3Zv9skX7Y+J0y+FDoKxDxvtf">
```

### Supply Chain Protection:

1. **Verified npm packages** - Fonts downloaded via verified fontsource packages
2. **Hash validation** - All files validated against known-good hashes
3. **Pre-commit hooks** - Prevents accidental commit of corrupted files
4. **CI/CD checks** - Automated verification on every deployment

### Previous Incident (2024-12-28):

**Issue**: HTML 404 pages were accidentally downloaded and committed as `.woff2` files
**Impact**: Fonts failed to load for ~11 hours
**Root Cause**: Manual download from CDN without verification
**Resolution**: Implemented automated verification and SRI hashes
**Preventive Measures**: This documentation, verification scripts, pre-commit hooks

---

## Update Process

### When to Update Fonts:

- **Bug fixes** in font rendering
- **New glyphs** needed for internationalization
- **License updates** or version upgrades
- **Performance improvements** (better subsetting)

### Safe Update Procedure:

1. **Download new font files** using verified method (see above)
2. **Run verification**: `npm run verify-fonts`
3. **Generate new SRI hashes**: See acquisition process above
4. **Update this documentation** with new hashes and version numbers
5. **Update all HTML files** with new SRI hashes in preload links
6. **Test locally** - Verify fonts load correctly
7. **Commit with verification**: Pre-commit hook will validate
8. **Deploy and verify**: CI/CD will validate again

### Emergency Rollback:

If fonts are corrupted in production:

```bash
# 1. Purge Cloudflare cache immediately
export CF_ZONE_ID="your-zone-id"
export CF_API_TOKEN="your-api-token"
./scripts/emergency-purge.sh

# 2. Revert to previous commit
git revert HEAD

# 3. Force redeploy
git push

# 4. Verify fonts on production
curl -I https://toposlabs.ai/assets/fonts/nunito-400.woff2 | grep content-type
# Should show: content-type: font/woff2
```

---

## License Information

### Nunito
- License: SIL Open Font License 1.1
- Full text: https://scripts.sil.org/OFL
- Commercial use: ✅ Allowed
- Modification: ✅ Allowed (with renamed font family)
- Redistribution: ✅ Allowed

### JetBrains Mono
- License: Apache License 2.0
- Full text: https://www.apache.org/licenses/LICENSE-2.0
- Commercial use: ✅ Allowed
- Modification: ✅ Allowed
- Redistribution: ✅ Allowed

Both licenses permit self-hosting and commercial use without attribution requirements (though attribution is appreciated).

---

## Performance Metrics

### Font Loading Performance:

- **Total size**: 69KB (all 4 fonts)
- **Compressed (Brotli)**: ~40-45KB
- **Load time (Desktop/Fiber)**: ~50-100ms
- **Load time (Mobile/4G)**: ~200-400ms
- **Format**: WOFF2 (best compression, 97%+ browser support)
- **Strategy**: `font-display: swap` (prevents FOIT)

### Optimization Applied:

- ✅ Self-hosted (no external DNS/CDN requests)
- ✅ Preload hints for critical fonts
- ✅ WOFF2 format only (modern browsers)
- ✅ Latin subset only (smaller file sizes)
- ✅ Inlined @font-face declarations (no render-blocking CSS)
- ✅ SRI hashes (security + cache validation)

---

## Contact

For font-related issues or questions:
- Create an issue at: https://github.com/Topos-Labs/toposlabs-site/issues
- Include: font file name, error message, browser/OS details

Last updated: 2025-01-01
