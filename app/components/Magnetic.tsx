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

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = magnetic.current!.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * strength);
            yTo(y * strength);
        };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        magnetic.current.addEventListener("mousemove", mouseMove);
        magnetic.current.addEventListener("mouseleave", mouseLeave);

        return () => {
            if (magnetic.current) {
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
