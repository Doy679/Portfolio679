'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Slim gradient bar pinned at the top that fills left->right as the page scrolls.
// scaleX-only (compositor-cheap) and synced with the site's Lenis + ScrollTrigger.
export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!barRef.current) return;
        gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' });
        const tween = gsap.to(barRef.current, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: document.documentElement,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3,
            },
        });
        return () => { tween.scrollTrigger?.kill(); tween.kill(); };
    });

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
            <div ref={barRef} className="h-full w-full origin-left bg-gradient-to-r from-primary via-secondary to-accent will-change-transform" />
        </div>
    );
}
