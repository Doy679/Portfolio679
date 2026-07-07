# Hero Parallax Portrait — Design Spec

**Date:** 2026-07-07
**Author:** Rondether Gonzales (with Claude)
**Status:** Approved direction, pending spec review
**Reference:** landonorris.com (cut-out subject + multi-layer mouse parallax)

## Goal

Replace the static right-side Hero portrait with a mouse-reactive, depth-layered
portrait that "pops" toward the cursor — capturing ~90% of the landonorris.com
"3D" feel using the GSAP already installed in the project. No new heavy
dependencies for this scope.

## Non-goals (YAGNI)

- No true WebGL / Three.js (that was the rejected "wireframe accent" option).
- No 3D wireframe/particle head overlay.
- No changes to About / Skills / Projects / Contact in this spec (separate work).
- No redesign of the Hero text/layout — the name reveal animation stays as-is.

## Layers (back → front)

1. **Depth background** — soft drifting contour lines + the existing gradient
   blobs; moves *opposite* the pointer at low strength (feels far).
2. **Portrait (cut-out `portrait.png`)** — transparent PNG of the subject;
   scales up slightly and shifts *toward* the pointer at higher strength
   (feels near). The star of the effect.
3. **Soft ground shadow** — blurred ellipse beneath the portrait that shifts
   with the tilt to ground the depth.
4. **Static frame** — existing name/subtitle/buttons; unchanged.

## Interaction

- Single `mousemove` (pointer) listener on the Hero root → normalized `-1..1`
  X/Y from element center.
- Each layer is driven by a GSAP `quickTo` **lerp** toward its target every
  frame, each with a distinct strength multiplier (the parallax illusion).
  Indicative strengths: bg `~0.02`, portrait `~0.06`, shadow `~0.04`
  (final values tuned by eye during build).
- Portrait also gets a small `scale` (e.g. 1.0 → ~1.04) toward cursor proximity.

## Responsive & accessibility

- **Touch / no-pointer devices:** no mouse parallax; fall back to a gentle
  *scroll-driven* parallax on the portrait + background layers via the existing
  ScrollTrigger/Lenis setup. Keep it subtle; `smoothTouch` stays off (matches
  current setup).
- **`prefers-reduced-motion: reduce`:** layers render flat/static — reuse the
  exact `gsap.matchMedia` pattern already in `Hero.tsx`.
- Must look correct in both light and dark daisyUI themes.

## Components / files

- **New:** `app/components/HeroPortrait.tsx` — owns the layered markup +
  parallax logic, isolating it from `Hero.tsx`.
- **Modified:** `app/components/Hero.tsx` — replace the current split-screen
  `<Image src="/new.png">` block with `<HeroPortrait />`; keep everything else.
- **Asset (user-provided):** `public/portrait.png` — transparent cut-out via
  remove.bg. **Placeholder fallback:** until it exists, `HeroPortrait` points at
  `/new.png` so the motion is testable immediately; swapping the file in turns
  on true pop-out depth with no code change.

## Data flow

Pointer event → normalized vector (state/ref) → per-layer GSAP `quickTo`
setters → transforms on layer DOM nodes. No global state, no network, no
persistence. Self-contained in `HeroPortrait`.

## Error / edge handling

- If `portrait.png` is missing, `next/image` falls back to the placeholder path;
  no runtime error (we control the src string).
- Guard the pointer listener for SSR (`'use client'`, attach in effect only).
- Clean up listeners + GSAP context on unmount (match existing `useGSAP` /
  `mm.revert()` pattern).

## Testing / verification

- Manual: run `npm run dev`, move mouse across Hero → layers parallax smoothly
  at 60fps; portrait pops toward cursor.
- Toggle light/dark theme → portrait + shadow read correctly on both.
- Emulate `prefers-reduced-motion` → layers freeze flat.
- Mobile viewport → scroll parallax fallback, no jitter.
- Swap placeholder → `portrait.png` → confirm true cut-out pop-out.

## Out-of-scope follow-ups (noted, not now)

- Optional Three.js wireframe accent (the higher-fidelity option) could be a
  future enhancement.
- Broader page animation polish (Projects, Skills, section transitions) —
  separate spec.
