'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticProps {
    children: React.ReactNode;
    /** Fraction of the cursor-to-center distance the element follows (0-1). */
    strength?: number;
    className?: string;
}

/**
 * Wraps a child (e.g. a button/link) and pulls it toward the cursor while
 * hovered, springing back on leave. Transform-only (GPU-composited) so it adds
 * no layout/paint cost. Disabled for touch devices and reduced-motion users.
 */
export function Magnetic({ children, strength = 0.4, className }: MagneticProps) {
    const ref = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const el = ref.current;
        if (!el) return;

        const mm = gsap.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
            const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
            const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

            const onMove = (e: MouseEvent) => {
                const rect = el.getBoundingClientRect();
                const relX = e.clientX - (rect.left + rect.width / 2);
                const relY = e.clientY - (rect.top + rect.height / 2);
                xTo(relX * strength);
                yTo(relY * strength);
            };
            const onLeave = () => { xTo(0); yTo(0); };

            el.addEventListener('mousemove', onMove);
            el.addEventListener('mouseleave', onLeave);
            return () => {
                el.removeEventListener('mousemove', onMove);
                el.removeEventListener('mouseleave', onLeave);
            };
        });

        return () => mm.revert();
    }, { scope: ref });

    return (
        <span ref={ref} className={`inline-block will-change-transform ${className ?? ''}`}>
            {children}
        </span>
    );
}
