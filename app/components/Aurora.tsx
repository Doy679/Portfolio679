'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// Slow-drifting gradient glow for a section background. Animates transform
// (x/y/scale) on pre-blurred blobs, so the blur is rasterized once and only the
// cheap compositor transform moves each frame — no per-frame blur cost.
// Static for reduced-motion users.
export function Aurora({ className = '' }: { className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            const blobs = gsap.utils.toArray<HTMLElement>('.aurora-blob', ref.current);
            blobs.forEach((b, i) => {
                gsap.to(b, {
                    x: () => gsap.utils.random(-90, 90),
                    y: () => gsap.utils.random(-60, 60),
                    scale: () => gsap.utils.random(0.9, 1.3),
                    duration: () => gsap.utils.random(9, 15),
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                    delay: i * 0.6,
                });
            });
        });
        return () => mm.revert();
    }, { scope: ref });

    return (
        <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
            <div className="aurora-blob absolute w-[45%] h-[55%] top-[4%] left-[6%] bg-primary/20 rounded-full blur-[110px] will-change-transform" />
            <div className="aurora-blob absolute w-[40%] h-[50%] bottom-[6%] right-[8%] bg-secondary/20 rounded-full blur-[110px] will-change-transform" />
            <div className="aurora-blob absolute w-[35%] h-[42%] top-[34%] left-[44%] bg-accent/15 rounded-full blur-[120px] will-change-transform" />
        </div>
    );
}
