'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    /** Max tilt in degrees at the card edges. */
    max?: number;
}

/**
 * Tilts its card in 3D toward the cursor on hover (rotationX/Y with element-local
 * perspective), easing back on leave. Transform-only via GSAP quickTo, so it
 * composes cleanly with the parent's scroll transform and adds no paint cost.
 * Disabled on touch devices and for reduced-motion users.
 */
export function TiltCard({ children, className, max = 8 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const el = ref.current;
        if (!el) return;

        const mm = gsap.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
            gsap.set(el, { transformPerspective: 900, transformOrigin: 'center' });
            const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' });
            const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' });

            const onMove = (e: MouseEvent) => {
                const rect = el.getBoundingClientRect();
                const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;   // -1..1
                const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;   // -1..1
                rotY(nx * max);
                rotX(-ny * max);
            };
            const onLeave = () => { rotX(0); rotY(0); };

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
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
