---
name: testing-northbeat-media
description: Test the NorthBeat Media website end-to-end. Use when verifying UI, animations, scroll behavior, or section rendering.
---

# Testing NorthBeat Media Website

## Setup

1. Run `npm install` in the repo root
2. Run `npm run dev` to start the Vite dev server (default port 5173)
3. Open `http://localhost:5173` in Chrome

## Key Sections to Test

1. **Loader** — Hard-refresh (Ctrl+Shift+R) to see the loading animation with percentage counter and star rotation
2. **Hero** — Large "DIGITAL PRESENCE." typography, two CTA buttons, bounce arrow at bottom
3. **About** — Split layout with Hany's photo and bento-grid stats (alternating dark/neon-yellow cards)
4. **Services** — Pinned left title ("WHAT WE BUILD") with scrolling numbered service cards on the right. Hover to verify neon-yellow accent bar.
5. **Portfolio** — 2x2 grid of gradient project cards with tag badges
6. **Industries** — Horizontal scroll carousel of 8 industry cards on desktop; wrapped grid on mobile
7. **Process** — 6-step alternating timeline with center line animation
8. **Packages** — 3-tier cards on dark background; Growth Package should be highlighted in neon-yellow
9. **Contact** — "LET'S TALK" large text, 6-field contact form, WhatsApp CTA button
10. **Footer** — Email, contact person info, social icons, copyright

## Animation Checks

- **Lenis smooth scroll**: Page should not have native jerky scrolling
- **GSAP ScrollTrigger reveals**: Elements should animate in as you scroll into view (fade, slide, scale)
- **Parallax**: Hero headline should move/fade on scroll
- **Pinned sections**: Services section left column stays pinned on desktop while right side scrolls
- **Horizontal scroll**: Industries section should scroll cards horizontally on desktop
- **Hover effects**: Service cards show accent bottom bar, CTA buttons show arrow translate

## Navigation

- Test each nav link (Home, Services, Portfolio, About, Contact) — all should smooth-scroll to the correct section
- Mobile hamburger menu should open/close with animated bars

## Responsive Testing

- Test at 375px (mobile), 768px (tablet), 1440px (desktop)
- On mobile: Services pinning should disable, Industries should wrap to grid
- Verify `gsap.matchMedia()` breakpoints work correctly

## Build & Lint

- `npm run build` — should pass cleanly
- `npm run lint` — should pass cleanly

## Placeholder Content (User Should Update)

- WhatsApp link needs real phone number (currently `https://wa.me/`)
- Social media links point to `#`
- Email is display-only, not a `mailto:` link
- Stats (50+ projects, 5+ years, etc.) are placeholder values
