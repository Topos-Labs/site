# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview



## Architecture

### Site Structure

The site consists of several key pages organized as standalone HTML files:

- `/index.html` - Main landing page with company overview and product showcase


- `/docs/commands/*.html` - Individual command documentation pages (pack, map, scan, index, diff, impact, chunk, init, info)
- `/assets/` - Static assets (logo SVG)

### Design System

The site uses a consistent dark theme with the following design tokens:

```css
--bg: #0a0a0a
--surface: #141414
--border: rgba(255,255,255,0.1)
--text: #ffffff
--text-secondary: #888888
--text-tertiary: #555555
```

Brand colors:
- Primary teal: `#3DBAAC` (used for "Labs" in logo and accents)
- Topos white: `#ffffff` (used for "Topos" in logo)

Typography:
- Body: Nunito (rounded sans-serif, imported from Google Fonts)
- Code: JetBrains Mono (monospace)

### Page Architecture

Each HTML file is self-contained with:
1. Inline CSS in `<style>` tags (no external stylesheets)
2. Inline JavaScript for interactivity (no external scripts)
3. Shared navigation component with logo and links
4. Mobile-responsive design with hamburger menu
5. Consistent footer across pages

### Key Components

**Navigation**: Fixed header with logo (SVG + text) and links. Mobile hamburger menu appears on narrow screens.

**Hero Section** (index.html only): Includes animated neural network canvas visualization with nodes, connections, synapses, and geometric shapes. Complex particle system with mouse interaction.

**Documentation Layout** (docs pages): Three-column layout with fixed sidebar navigation, main content area, and mobile collapsible navigation.

### Animation System

The site uses CSS keyframe animations with staggered delays:
- `fadeIn` - opacity and translateY for text elements
- `fadeInUp` - larger translateY for cards
- `slideIn` - translateX for labels
- Hover effects with smooth transitions

Animations are applied via classes with progressive delays (0.1s, 0.15s, 0.2s, etc.).

## Development

### Deployment

The site is deployed on Cloudflare Pages. The repository is connected to Cloudflare and automatically deploys on push to main branch.

Domain: https://toposlabs.ai

### Making Changes

When editing pages:
1. Maintain consistent styling across all pages - copy CSS variables and component styles
2. Keep mobile responsiveness - test at 640px and 900px breakpoints
3. Preserve the inline CSS/JS architecture (no build step)
4. Match the animation style - use fadeIn/fadeInUp with staggered delays
5. Follow the brand colors and typography (Nunito for text, JetBrains Mono for code)

### Adding New Pages

New pages should:
1. Include the standard navigation component with logo and links
2. Use the same CSS variable system
3. Include mobile menu toggle functionality
4. Include the footer component
5. Be added to navigation in all existing pages

### Navigation Links Structure

Current navigation structure:
- Home (/)

- Docs (/docs/)
- GitHub (https://github.com/Topos-Labs - external)

Documentation sidebar includes:
- Getting Started section (Overview)
- Commands section (9 command pages)

## Assets

`/assets/logo-icon.svg` - The official Topos Labs logo icon (vector format)

## Common Operations

### Testing Locally

Since this is a static site with no build step:
1. Use any local web server (e.g., `python3 -m http.server 8000`)
2. Open browser to http://localhost:8000
3. Test mobile responsiveness using browser dev tools

### Checking for Broken Links

```bash
# Find all href and src attributes
grep -r "href=\|src=" . --include="*.html" | grep -v node_modules
```

### Finding Typography Inconsistencies

All pages should use Nunito for body text and JetBrains Mono for code. Check font-family declarations across all HTML files to ensure consistency.

## Brand Guidelines

**Logo Usage**: The logo consists of two parts - "Topos" in white and "Labs" in teal (#3DBAAC). Always maintain this two-tone styling.

**Writing Style**: Technical, clear, and concise. Focus on performance and developer experience.


