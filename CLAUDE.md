# Repository Notes

This is the Topos Labs static website for https://toposlabs.ai.

## Structure

- `index.html` is the public homepage.
- `sitemap.xml` and `sitemap.html` list public crawlable pages.
- `assets/` contains public images, fonts, and client-side scripts.
- `workers/` contains Cloudflare Worker helpers.

## Checks

Use `npm test` to verify local font assets before deployment.

## Deployment

Deploy production updates with:

```bash
wrangler pages deploy . --project-name toposlabs-site --branch main
```
