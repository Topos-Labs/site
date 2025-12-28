# Self-Hosted Fonts Setup

The fonts have been partially downloaded, but to ensure the best quality, please follow these steps:

## Option 1: Use google-webfonts-helper (Recommended)

```bash
# 1. Visit https://gwfh.mranftl.com/fonts

# 2. Search for "Nunito"
#    - Select character set: latin
#    - Select styles: regular (400), 600, 700
#    - Download the ZIP file

# 3. Extract files to assets/fonts/
#    You need:
#    - nunito-v26-latin-regular.woff2
#    - nunito-v26-latin-600.woff2
#    - nunito-v26-latin-700.woff2

# 4. Search for "JetBrains Mono"
#    - Select character set: latin
#    - Select styles: regular (400)
#    - Download the ZIP file

# 5. Extract files to assets/fonts/
#    You need:
#    - jetbrains-mono-v18-latin-regular.woff2
```

## Option 2: Download from Google Fonts Directly

Visit the URLs below in your browser to download the font files:

**Nunito Regular (400):**
- https://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshdTQ3j77e.woff2

**Nunito Semibold (600):**
- https://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDOUhdTQ3j77e.woff2

**Nunito Bold (700):**
- https://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDNshdTQ3j77e.woff2

**JetBrains Mono Regular (400):**
- https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOVkw.woff2

Save all files to: `/assets/fonts/`

## Expected File Sizes
- nunito-400.woff2: ~16KB ✓
- nunito-600.woff2: ~16KB (currently 1.6KB - needs re-download)
- nunito-700.woff2: ~16KB (currently 1.6KB - needs re-download)
- jetbrains-mono-400.woff2: ~16KB (currently 1.6KB - needs re-download)

## CSS Already Created

The font-face declarations have been created in a separate CSS file that will be linked in all HTML pages. See: `/assets/fonts.css`

## Next Steps

After downloading the fonts properly:
1. Verify all 4 files are in `/assets/fonts/`
2. Check file sizes match expected sizes above
3. The HTML pages have been updated to use self-hosted fonts
4. Test the site locally to ensure fonts load correctly
