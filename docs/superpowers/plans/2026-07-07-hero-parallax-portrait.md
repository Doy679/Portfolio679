# Hero Parallax Portrait Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static Hero portrait with a mouse-reactive, depth-layered "pop-out" portrait (landonorris.com-style Core parallax) using the GSAP already in the project.

**Architecture:** A self-contained `HeroPortrait` client component renders three stacked, absolutely-positioned layers (drifting gradient background, cut-out portrait, soft ground shadow). A single `mousemove` listener normalizes the pointer to `-1..1` and drives each layer via GSAP `quickTo` lerp setters at different strengths (the parallax illusion). `Hero.tsx` swaps its old split-screen `<Image>` block for `<HeroPortrait />`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4 + daisyUI, GSAP 3 + `@gsap/react` `useGSAP`, GSAP ScrollTrigger (touch fallback), Pillow (one-off asset optimization).

## Global Constraints

- **No new runtime dependencies.** Use only GSAP (already installed). No Three.js.
- **Respect `prefers-reduced-motion: reduce`** — layers render fully static. Reuse the `gsap.matchMedia` pattern already in `app/components/Hero.tsx`.
- **Theme-aware:** must read correctly in both light and dark daisyUI themes (`base-100`, `base-content`, `primary`, `secondary`).
- **Verification per task:** `npx tsc --noEmit` clean, `npm run lint` clean, `npm run build` succeeds, plus a browser visual check. No unit-test runner exists in this repo; do NOT add one (YAGNI).
- **Commits are LOCAL ONLY.** Do NOT `git push` (credential setup is the user's separate task). Plain `git add` + `git commit`.
- **Asset path:** the component references `/portrait.webp` (optimized). Original `public/portrait.png` (1888×2240 RGBA) stays as the source-of-truth backup.

---

### Task 1: Optimize the portrait asset

**Files:**
- Create: `public/portrait.webp` (from `public/portrait.png`)
- Keep: `public/portrait.png` (backup, untouched)

**Interfaces:**
- Produces: `/portrait.webp` — an alpha WebP, ~1200px wide, for the component to load.

- [ ] **Step 1: Write the optimization script to the scratchpad**

Create `/tmp/claude-1000/-home-gonzales-Desktop-Portfolio679/3e17af52-fda5-47ea-833d-f4a5227185fe/scratchpad/optimize_portrait.py`:

```python
from PIL import Image

SRC = "/home/gonzales/Desktop/Portfolio679/RondetherGonzales_portfolio/public/portrait.png"
DST = "/home/gonzales/Desktop/Portfolio679/RondetherGonzales_portfolio/public/portrait.webp"

im = Image.open(SRC).convert("RGBA")
target_w = 1200
if im.width > target_w:
    target_h = round(im.height * target_w / im.width)
    im = im.resize((target_w, target_h), Image.LANCZOS)

im.save(DST, "WEBP", quality=90, method=6)
print("wrote", DST, im.size)
```

- [ ] **Step 2: Run it**

Run: `python3 <scratchpad>/optimize_portrait.py`
Expected: `wrote .../public/portrait.webp (1200, 1424)`

- [ ] **Step 3: Verify the output is a valid alpha WebP and much smaller**

Run: `python3 -c "from PIL import Image; im=Image.open('public/portrait.webp'); print(im.size, im.mode)"` and `ls -lh public/portrait.webp`
Expected: size `(1200, 1424)`, mode `RGBA`, file well under 500 KB (down from 6.3 MB).

- [ ] **Step 4: Commit**

```bash
git add public/portrait.webp
git commit -m "chore: add optimized alpha WebP portrait for hero parallax"
```

---

### Task 2: Create `HeroPortrait` (static layers) and wire it into `Hero`

Build the layered structure and render it in the page so it's visually verifiable, before adding motion.

**Files:**
- Create: `app/components/HeroPortrait.tsx`
- Modify: `app/components/Hero.tsx` (replace the split-screen image block, lines ~61-75)

**Interfaces:**
- Produces: `HeroPortrait` — default-exported React component, no props. Renders an absolutely-positioned right-half container with `bgRef`, `shadowRef`, `portraitRef` layers.
- Consumes: `/portrait.webp` from Task 1.

- [ ] **Step 1: Create the component with static layers**

Create `app/components/HeroPortrait.tsx`:

```tsx
'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

const HeroPortrait = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const portraitRef = useRef<HTMLDivElement>(null);
    const shadowRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={rootRef}
            className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-[8] lg:z-[5] overflow-hidden pointer-events-none"
        >
            {/* Layer 1: drifting depth background */}
            <div ref={bgRef} className="absolute inset-[-12%] will-change-transform">
                <div className="absolute w-[60%] h-[50%] top-[10%] right-[8%] bg-primary/10 rounded-full blur-[90px]"></div>
                <div className="absolute w-[45%] h-[45%] bottom-[8%] left-[6%] bg-secondary/10 rounded-full blur-[90px]"></div>
            </div>

            {/* Layer 3 (behind portrait): soft ground shadow */}
            <div
                ref={shadowRef}
                className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[55%] h-[6%] bg-black/40 dark:bg-black/60 rounded-[50%] blur-2xl will-change-transform"
            ></div>

            {/* Layer 2: the cut-out portrait */}
            <div ref={portraitRef} className="absolute inset-0 will-change-transform">
                <Image
                    src="/portrait.webp"
                    alt="Rondether Gonzales"
                    fill
                    priority
                    className="object-contain object-bottom select-none"
                />
            </div>

            {/* Theme-aware fade so the portrait blends toward the text side */}
            <div className="absolute inset-0 bg-gradient-to-b from-base-100/10 via-transparent to-base-100/20 dark:from-base-100/25 dark:via-base-100/10 dark:to-base-100/35 lg:bg-gradient-to-r lg:from-base-100/90 lg:via-transparent dark:lg:via-base-100/20 lg:to-transparent transition-colors duration-500 pointer-events-none"></div>
        </div>
    );
};

export default HeroPortrait;
```

- [ ] **Step 2: Import and use it in `Hero.tsx`**

In `app/components/Hero.tsx`, add the import near the other imports:

```tsx
import HeroPortrait from './HeroPortrait';
```

Replace the entire "Split Screen Background Image" block (the `<div className="absolute top-0 right-0 w-full lg:w-1/2 h-full ...">` wrapper and its contents, currently ~lines 61-75) with:

```tsx
            {/* Cut-out portrait with mouse parallax */}
            <HeroPortrait />
```

- [ ] **Step 3: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build completes successfully.

- [ ] **Step 5: Visual check in browser**

Run `npm run dev`, open `http://localhost:3000`, screenshot the hero.
Expected: portrait appears on the right half, bottom-anchored, transparent background showing the page behind it, name/text on the left still readable. Toggle dark mode → still reads correctly. No motion yet.

- [ ] **Step 6: Commit**

```bash
git add app/components/HeroPortrait.tsx app/components/Hero.tsx
git commit -m "feat: add static HeroPortrait layered component to hero"
```

---

### Task 3: Add mouse parallax + reduced-motion & touch fallbacks

**Files:**
- Modify: `app/components/HeroPortrait.tsx`

**Interfaces:**
- Consumes: `rootRef`, `bgRef`, `portraitRef`, `shadowRef` from Task 2.
- Produces: no new exports; adds motion behavior inside the same component.

- [ ] **Step 1: Add the GSAP parallax logic**

In `app/components/HeroPortrait.tsx`, add imports:

```tsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
```

Inside the component body, above the `return`, add:

```tsx
    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Desktop with a real pointer + motion allowed: mouse parallax
        mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
            const bgX = gsap.quickTo(bgRef.current, 'xPercent', { duration: 0.9, ease: 'power3.out' });
            const bgY = gsap.quickTo(bgRef.current, 'yPercent', { duration: 0.9, ease: 'power3.out' });
            const pX = gsap.quickTo(portraitRef.current, 'xPercent', { duration: 0.6, ease: 'power3.out' });
            const pY = gsap.quickTo(portraitRef.current, 'yPercent', { duration: 0.6, ease: 'power3.out' });
            const pScale = gsap.quickTo(portraitRef.current, 'scale', { duration: 0.6, ease: 'power3.out' });
            const sX = gsap.quickTo(shadowRef.current, 'xPercent', { duration: 0.8, ease: 'power3.out' });

            const onMove = (e: MouseEvent) => {
                const nx = (e.clientX / window.innerWidth - 0.5) * 2;   // -1..1
                const ny = (e.clientY / window.innerHeight - 0.5) * 2;  // -1..1
                bgX(nx * -2.2);   // far layer drifts opposite, least
                bgY(ny * -1.6);
                pX(nx * 3.2);     // portrait moves most, toward cursor
                pY(ny * 2.4);
                pScale(1.04);
                sX(nx * 2);
            };
            const onLeave = () => { bgX(0); bgY(0); pX(0); pY(0); pScale(1); sX(0); };

            window.addEventListener('mousemove', onMove);
            document.documentElement.addEventListener('mouseleave', onLeave);
            return () => {
                window.removeEventListener('mousemove', onMove);
                document.documentElement.removeEventListener('mouseleave', onLeave);
            };
        });

        // Touch devices with motion allowed: gentle scroll parallax
        mm.add('(prefers-reduced-motion: no-preference) and (pointer: coarse)', () => {
            const tween = gsap.to(portraitRef.current, {
                yPercent: -5,
                ease: 'none',
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
            return () => { tween.scrollTrigger?.kill(); tween.kill(); };
        });

        // prefers-reduced-motion: no branch registered -> layers stay static.

        return () => mm.revert();
    }, { scope: rootRef });
```

- [ ] **Step 2: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build completes successfully.

- [ ] **Step 4: Visual/motion check in browser**

With `npm run dev` running, open the hero and move the mouse across the viewport.
Expected: portrait shifts toward the cursor and scales up slightly; background blobs drift the opposite way, less; shadow slides; motion is smooth (lerped, no jitter); returns to rest when the pointer leaves the window.

- [ ] **Step 5: Reduced-motion check**

In Chrome DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce", reload.
Expected: no mouse parallax; layers are static.

- [ ] **Step 6: Commit**

```bash
git add app/components/HeroPortrait.tsx
git commit -m "feat: add mouse parallax + reduced-motion/touch fallbacks to HeroPortrait"
```

---

### Task 4: Tune, clean up placeholder, and final verification

**Files:**
- Modify: `app/components/HeroPortrait.tsx` (visual tuning only)
- Reference: `public/new.png` (old asset — confirm nothing else uses it before any removal)

**Interfaces:**
- No interface changes; final polish + verification.

- [ ] **Step 1: Tune the feel by eye**

With the dev server running, adjust in `HeroPortrait.tsx` as needed (values only, no structural change):
- parallax strengths (`-2.2 / 3.2 / 2` etc.) if motion is too strong/weak;
- portrait `object-position` / container inset if the crop sits wrong on desktop vs. mobile;
- fade-overlay opacity if it clips the subject or over-darkens.
Re-screenshot after each change until it reads well in light AND dark themes, desktop AND mobile widths.

- [ ] **Step 2: Confirm no dangling references to the old asset**

Run: `grep -rn "new.png" app/`
Expected: no remaining references in `Hero.tsx`. (If other components still use `new.png`, leave the file in place.)

- [ ] **Step 3: Full verification gate**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all clean/successful.

- [ ] **Step 4: Final browser verification**

Load the production build (`npm run build && npm run start`) or dev server; verify:
- desktop mouse parallax smooth; portrait pops toward cursor;
- mobile width: gentle scroll parallax, no jitter;
- reduced-motion: static;
- light + dark themes both correct;
- hero text/buttons still readable and clickable (portrait layer is `pointer-events-none`).

- [ ] **Step 5: Commit**

```bash
git add app/components/HeroPortrait.tsx
git commit -m "polish: tune hero parallax strengths and portrait framing"
```

---

## Self-Review

**Spec coverage:**
- Layers 1-4 (bg / portrait / shadow / static frame) → Task 2 structure. ✓
- Lerp via `quickTo`, per-layer strengths → Task 3. ✓
- `prefers-reduced-motion` static → Task 3 (no branch registered for reduce). ✓
- Touch/no-pointer scroll parallax fallback → Task 3 `(pointer: coarse)` branch. ✓
- Light/dark theme correctness → verified in Tasks 2-4. ✓
- New `HeroPortrait.tsx`, modified `Hero.tsx`, `/portrait.webp` asset → Tasks 1-2. ✓
- Placeholder strategy: superseded — the real cut-out is already in place, so the component targets `/portrait.webp` directly (documented in Global Constraints). ✓
- SSR guard: `'use client'` + listeners attached inside `useGSAP` effect. ✓
- Cleanup on unmount: `mm.revert()` + listener/ScrollTrigger teardown. ✓

**Placeholder scan:** No TBD/TODO; every code step contains complete code. ✓

**Type consistency:** Ref names (`rootRef`, `bgRef`, `portraitRef`, `shadowRef`) are consistent across Tasks 2-3; `quickTo` setters are local consts. ✓

**Note on TDD:** Repo has no test runner and this is a visual feature; per Global Constraints, verification is typecheck + lint + build + browser check rather than unit tests. Adding a test framework is intentionally out of scope (YAGNI).
