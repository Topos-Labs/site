# Topos Labs Site

Static website for https://toposlabs.ai, deployed on Cloudflare Pages.

## Development

Run the local checks before deploying:

```bash
npm test
```

The public site should expose only intentional static assets and public pages. Avoid committing internal notes or retired product pages at the deployment root because Cloudflare Pages can serve them directly.

## Deployment

Deploy with Wrangler:

```bash
wrangler pages deploy . --project-name toposlabs-site --branch main
```
