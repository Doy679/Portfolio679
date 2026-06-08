'use client';
import React, { useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticProps {
    children: ReactNode;
    strength?: number;
}

const Magnetic = ({ children, strength = 0.5 }: MagneticProps) => {
    const magnetic = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!magnetic.current) return;

        const xTo = gsap.quickTo(magnetic.current, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
        const yTo = gsap.quickTo(magnetic.current, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

        let bounds: DOMRect | null = null;

        const mouseEnter = () => {
            if (magnetic.current) {
                bounds = magnetic.current.getBoundingClientRect();
            }
        };

        const mouseMove = (e: MouseEvent) => {
            if (!bounds) return;
            const { clientX, clientY } = e;
            const x = clientX - (bounds.left + bounds.width / 2);
            const y = clientY - (bounds.top + bounds.height / 2);
            xTo(x * strength);
            yTo(y * strength);
        };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
            bounds = null;
        };

        magnetic.current.addEventListener("mouseenter", mouseEnter);
        magnetic.current.addEventListener("mousemove", mouseMove);
        magnetic.current.addEventListener("mouseleave", mouseLeave);

        return () => {
            if (magnetic.current) {
                magnetic.current.removeEventListener("mouseenter", mouseEnter);
                magnetic.current.removeEventListener("mousemove", mouseMove);
                magnetic.current.removeEventListener("mouseleave", mouseLeave);
            }
        };
    }, { scope: magnetic });

    return (
        <div ref={magnetic} className="inline-block">
            {children}
        </div>
    );
};

export default Magnetic;
