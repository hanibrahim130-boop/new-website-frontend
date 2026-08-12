# Qvo.tech — Cinematic Systems Direction

## Intent

Qvo.tech will move away from the current polished-agency page pattern and become an **immersive, systems-led studio experience**. The reference’s sense of arrival, pacing, deep space, and narrative transition will be translated into an original Qvo language: **signal, trajectory, operational clarity, and momentum**. It will not reuse the reference’s branding, copy, assets, entertainment framing, planetary imagery, or scene compositions.

> **Brand promise:** Qvo turns scattered ambition into digital systems that move with purpose.

The experience should feel authored and high-value because each visual state belongs to one continuous system, not because every section contains a new decorative trick.

| Design layer | Qvo implementation |
|---|---|
| Core metaphor | A signal moves through a field, resolving from uncertainty into direction and momentum |
| Tone | Precise, cinematic, grounded, confident; never neon, sci-fi stock, or generic AI dashboard |
| Color | Near-black `#09090f`, warm ivory `#f4efe8`, mineral coral `#eb7354`, deep ultraviolet `#5753b7`, selective soft haze |
| Type | Keep the existing Bodoni Moda for dramatic editorial statements; use DM Sans and DM Mono for operating information |
| Entry | A lightweight on-page “calibration” sequence with a skip control, not a video loader |
| Artwork | Custom CSS/SVG signal field, orbital routing lines, color bleed, and dimensional product planes; no borrowed visual assets |
| Motion | GSAP + existing Lenis stack; pinned chapter transitions, text masks, line drawing, magnetic pointer response, and respectful reduced-motion fallbacks |
| Conversion | “Start a project” remains consistently visible; the final scene resolves into a direct email invitation |

## Homepage sequence

The current `hero → cards → work → console → playground → process → contact` page will be reshaped into a continuous five-chapter sequence without removing the useful content or routes.

| Chapter | Narrative job | Signature experience |
|---|---|---|
| 00 — Calibration | Establish Qvo as a studio that creates direction from complexity | Full viewport black field, live coordinate notation, progressive signal calibration, statement reveal, custom radial cursor |
| 01 — Resolve | Explain the category of work | One large editorial statement is interrupted by three “system surfaces” that sequentially come into focus: web, product, agent |
| 02 — Build momentum | Demonstrate selected work | A pinned case-study scene where two project planes enter on separate trajectories, then resolve to case-study CTAs |
| 03 — Orchestrate | Make AI tangible without looking like an AI site | Signal Lab reframed as an orchestration field: input becomes nodes, routing, and an outcome trace; explicit simulated-demo label remains |
| 04 — Move together | Explain engagement and invite contact | The process appears as a three-stage trajectory; a final expansive contact scene collapses noise into the Qvo wordmark and email CTA |

## Interaction architecture

The hero signal field will be a custom, original visual built from SVG and CSS primitives. It will have fine circular / coordinate elements, a soft grain layer, line paths, reactive markers, and a distinctive Q-shaped trajectory rather than a generic “AI orb.” Scroll will cause the object to gather, stretch, and resolve into the chapter title. Desktop pointer movement will gently move the focal field; touch devices retain the main composition without requiring interaction.

Navigation will use a slim fixed top bar with a menu overlay whose reveal is a simple expanding signal aperture. Chapter identifiers and a vertical progress indicator will offer orientation without turning the site into a dashboard. Horizontal or pinned content will be used only for the project narrative, so standard reading and accessibility are never sacrificed.

## Implementation boundaries

- Preserve current case-study, portal, and Signal Lab routes and their functional interactions.
- Replace visual styling and homepage structure where needed; do not copy reference source, imagery, text, logos, video, or distinctive page layouts.
- Maintain keyboard focus, semantic headings, visible calls to action, and `prefers-reduced-motion` support.
- Keep all agent behavior clearly labeled as simulated in the absence of a backend integration.
- Use only existing project dependencies unless a narrowly scoped package is indispensable.

## Acceptance test

The completed page should read as **a Qvo world with a cinematic arc**, not an Orbyt clone and not a generic AI product landing page. A visitor should understand what Qvo makes in the first viewport, feel consistent movement through the five chapters, reach working case studies and portal routes, and have a frictionless route to contact the studio.

## Reference

The creative principles above derive from the user-provided [Orbyt Theater reference](https://orbyt.theater/kr.php?sound=on), observed on 2026-08-12. The reference is used only for high-level inspiration about pacing, cinematic transitions, and immersive storytelling.
