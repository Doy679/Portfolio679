# Mobile Project Cinematic Focus Implementation Plan

> **For Gemini:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement a "Cinematic Focus" animation for the mobile projects list, mirroring the desktop "active focus" feel.

**Architecture:** Use individual GSAP `ScrollTrigger` instances for each `ProjectItemMobile` to scale, fade, and add a "glow" to the project currently in the center of the viewport.

**Tech Stack:** React, GSAP, ScrollTrigger, Tailwind CSS.

---

### Task 1: Refine `ProjectItemMobile` Visuals

**Files:**
- Modify: `RondetherGonzales_portfolio/app/components/Projects.tsx`

**Step 1: Update the wrapper with initial states and glass glow**
Update `ProjectItemMobile` to include a container for the "active" glow effect and ensure initial scale/opacity properties are ready for GSAP.

```tsx
// Inside ProjectItemMobile
<div className="project-item-mobile w-full flex flex-col gap-5 py-10 border-b border-primary/10 last:border-0 relative opacity-60 scale-[0.95]">
    {/* Background Glow Container - only visible when active */}
    <div className="active-glow absolute inset-0 bg-primary/10 blur-[60px] rounded-full opacity-0 pointer-events-none transition-opacity duration-500"></div>
    
    <div className="w-full flex flex-col gap-3 relative z-10">
        {/* ... existing header and image container ... */}
    </div>

    <div className="space-y-4 px-1 mt-2 relative z-10">
        {/* ... existing title, badges, and description ... */}
    </div>
</div>
```

**Step 2: Commit**
```bash
git add RondetherGonzales_portfolio/app/components/Projects.tsx
git commit -m "style: add initial states and glow container for mobile cinematic focus"
```

---

### Task 2: Implement GSAP Focus Logic

**Files:**
- Modify: `RondetherGonzales_portfolio/app/components/Projects.tsx`

**Step 1: Replace simple batch logic with focus trigger**
Update the mobile `matchMedia` block to use individual `ScrollTrigger` instances that "focus" the project in the center of the screen.

```tsx
// Inside useGSAP in Projects.tsx
mm.add("(max-width: 1023px)", () => {
    // Remove existing ScrollTrigger.batch for project-item-mobile
    
    const items = gsap.utils.toArray('.project-item-mobile');
    items.forEach((item: any) => {
        const glow = item.querySelector('.active-glow');
        
        // Focus Animation - Using Scrub for smoothness if preferred, 
        // or toggleActions for distinct focus/unfocus.
        gsap.to(item, {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "top 20%",
                scrub: 0.5,
                toggleActions: "play reverse play reverse"
            }
        });

        // Glow Animation
        if (glow) {
            gsap.to(glow, {
                opacity: 1,
                scrollTrigger: {
                    trigger: item,
                    start: "top 60%",
                    end: "top 40%",
                    scrub: 0.5,
                    toggleActions: "play reverse play reverse",
                }
            });
        }

        // Parallax Logic (Keep as is)
        const image = item.querySelector('.mobile-parallax-image');
        if (image) {
            gsap.to(image, {
                yPercent: 10,
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5
                }
            });
        }
    });
});
```

**Step 2: Verify and Commit**
- Scroll through the mobile view and ensure the current project "pops" as it enters the center.
- Ensure previous/next projects are slightly dimmed.

```bash
git add RondetherGonzales_portfolio/app/components/Projects.tsx
git commit -m "feat: implement mobile cinematic focus scroll trigger"
```
