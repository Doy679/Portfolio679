# Mobile Project Parallax Implementation Plan

> **For Gemini:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a vertical shift parallax effect to project images in the mobile view.

**Architecture:** Use GSAP `ScrollTrigger` with `scrub` to move images vertically within their containers as they scroll through the viewport.

**Tech Stack:** React, GSAP, ScrollTrigger, Tailwind CSS.

---

### Task 1: Update `ProjectItemMobile` Structure

**Files:**
- Modify: `RondetherGonzales_portfolio/app/components/Projects.tsx`

**Step 1: Add parallax wrapper to images**
Update the image container in `ProjectItemMobile` to include an `overflow-hidden` wrapper and a scaled inner container for the parallax movement.

```tsx
// Inside ProjectItemMobile
<div className="relative w-full aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden shadow-xl border border-primary/10 bg-base-300">
    <div className="h-6 bg-base-300/90 border-b border-white/5 flex items-center px-3 gap-1.5 shrink-0 z-20 relative">
        <div className="w-2 h-2 rounded-full bg-error/50"></div>
        <div className="w-2 h-2 rounded-full bg-warning/50"></div>
        <div className="w-2 h-2 rounded-full bg-success/50"></div>
    </div>
    {/* Parallax Wrapper Starts Here */}
    <div className="mobile-parallax-container w-full h-[calc(100%-1.5rem)] relative overflow-hidden bg-base-100">
        <div className="mobile-parallax-image w-full h-[120%] relative -top-[10%]">
            {project.link && project.link !== "#" ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                    <Image src={project.image} alt={project.title} fill className="object-contain object-center p-4" sizes="100vw" />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 active:opacity-100 transition-opacity"></div>
                </a>
            ) : (
                <div className="w-full h-full relative">
                    <Image src={project.image} alt={project.title} fill className="object-contain object-center p-4" sizes="100vw" />
                </div>
            )}
        </div>
    </div>
</div>
```

**Step 2: Commit**
```bash
git add RondetherGonzales_portfolio/app/components/Projects.tsx
git commit -m "feat: add parallax structure to mobile project items"
```

---

### Task 2: Implement GSAP Parallax Logic

**Files:**
- Modify: `RondetherGonzales_portfolio/app/components/Projects.tsx`

**Step 1: Add ScrollTrigger to the mobile matchMedia block**
Update the `mm.add("(max-width: 1023px)", ...)` block to include the parallax animation.

```tsx
// Inside useGSAP in Projects.tsx
mm.add("(max-width: 1023px)", () => {
    // ... existing ScrollTrigger.batch logic ...

    // New Parallax Logic
    const items = gsap.utils.toArray('.project-item-mobile');
    items.forEach((item: any) => {
        const image = item.querySelector('.mobile-parallax-image');
        if (image) {
            gsap.to(image, {
                yPercent: 20,
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
- Ensure images move smoothly as you scroll.
- Check that `overflow-hidden` prevents edges from showing.

```bash
git add RondetherGonzales_portfolio/app/components/Projects.tsx
git commit -m "feat: implement mobile parallax scroll trigger"
```
