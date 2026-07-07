'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// Tech-skills marquee (replaces the old "GET IN TOUCH" band). Star-separator
// design ported from the provided snippet, restyled to the site theme
// (indigo primary + Montserrat). Infinite scroll via GSAP with two identical
// blocks translated -50% for a seamless loop.
const WORDS = [
    'FRONTEND DEVELOPMENT', 'REACT', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND CSS',
    'GSAP', 'UI/UX', 'JAVASCRIPT', 'RESPONSIVE DESIGN', 'API INTEGRATION',
    'PERFORMANCE', 'ANIMATION', 'WEB DESIGN', 'GIT',
];

const Star = () => (
    <span className="inline-flex items-center px-2 text-primary drop-shadow-[0_0_5px_rgba(99,102,241,0.55)]" aria-hidden>
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none">
            <path
                d="M12 0 C12 6.5 13 9.5 14.5 11 C16 12.5 19 13.5 24 13.5 C19 13.5 16 14.5 14.5 16 C13 17.5 12 20.5 12 27 C12 20.5 11 17.5 9.5 16 C8 14.5 5 13.5 0 13.5 C5 13.5 8 12.5 9.5 11 C11 9.5 12 6.5 12 0 Z"
                fill="currentColor"
            />
        </svg>
    </span>
);

const MarqueeBlock = () => (
    <div className="flex items-center">
        {WORDS.map((word) => (
            <React.Fragment key={word}>
                <span className="font-montserrat font-black uppercase tracking-tight text-primary text-[clamp(20px,3.4vw,34px)] px-4 leading-none whitespace-nowrap">
                    {word}
                </span>
                <Star />
            </React.Fragment>
        ))}
    </div>
);

export default function ContactMarquee() {
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!trackRef.current) return;
        const mm = gsap.matchMedia();
        // Only animate when motion is allowed; otherwise the words render static.
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            const tween = gsap.to(trackRef.current, {
                xPercent: -50,
                repeat: -1,
                duration: 40,
                ease: 'none',
            });
            return () => tween.kill();
        });
        return () => mm.revert();
    }, { scope: trackRef });

    return (
        <div className="w-full overflow-hidden bg-base-200 py-5 md:py-7 border-y border-primary/20 relative z-20 flex select-none">
            {/* Two identical blocks; translating the track -50% loops seamlessly. */}
            <div ref={trackRef} className="flex flex-nowrap w-max will-change-transform">
                <MarqueeBlock />
                <MarqueeBlock />
            </div>
        </div>
    );
}
