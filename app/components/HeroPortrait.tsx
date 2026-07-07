'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// PORTRAIT SOURCE.
// `/portrait.webp` is the transparent cut-out (rembg from the source photo),
// so the portrait floats over the page for the true depth pop-out.
// PORTRAIT_IS_CUTOUT drives object-fit + overscan:
//   true  -> object-contain object-bottom, inset-0   (transparent edges, no gap)
//   false -> object-cover object-top,      inset-[-8%] (opaque fallback w/ overscan)
const PORTRAIT_SRC = '/portrait.webp';
const PORTRAIT_IS_CUTOUT = true; // transparent cut-out active -> true depth pop-out

const HeroPortrait = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const portraitRef = useRef<HTMLDivElement>(null);
    const shadowRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Desktop + real pointer + motion allowed -> mouse parallax
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
                bgX(nx * -3.2);   // far layer drifts opposite, least
                bgY(ny * -2.4);
                pX(nx * 4.8);     // portrait moves most, toward cursor
                pY(ny * 3.6);
                pScale(1.07);
                sX(nx * 3);
            };
            const onLeave = () => { bgX(0); bgY(0); pX(0); pY(0); pScale(1); sX(0); };

            window.addEventListener('mousemove', onMove);
            document.documentElement.addEventListener('mouseleave', onLeave);
            return () => {
                window.removeEventListener('mousemove', onMove);
                document.documentElement.removeEventListener('mouseleave', onLeave);
            };
        });

        // Touch devices + motion allowed -> gentle scroll parallax
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

            {/* Layer 2 (behind portrait): soft ground shadow */}
            <div
                ref={shadowRef}
                className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[55%] h-[6%] bg-black/40 dark:bg-black/60 rounded-[50%] blur-2xl will-change-transform"
            ></div>

            {/* Layer 3: the portrait. Negative inset = overscan so parallax never reveals
                container edges while the placeholder is an opaque rectangle. */}
            <div ref={portraitRef} className={`absolute ${PORTRAIT_IS_CUTOUT ? 'inset-0' : 'inset-[-8%]'} will-change-transform`}>
                {/* Dark-mode backlight so the dark-suited subject separates from the dark bg */}
                <div
                    className="hero-rimlight absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 w-[72%] aspect-square rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.40), rgba(99,102,241,0.12) 46%, transparent 72%)' }}
                />
                <Image
                    src={PORTRAIT_SRC}
                    alt="Rondether Gonzales"
                    fill
                    priority
                    className={`${PORTRAIT_IS_CUTOUT ? 'object-contain object-bottom' : 'object-cover object-top'} select-none`}
                />
            </div>

            {/* Theme-aware fade so the portrait blends toward the text side */}
            <div className="absolute inset-0 bg-gradient-to-b from-base-100/10 via-transparent to-base-100/20 dark:from-base-100/25 dark:via-base-100/10 dark:to-base-100/35 lg:bg-gradient-to-r lg:from-base-100/90 lg:via-transparent dark:lg:via-base-100/20 lg:to-transparent transition-colors duration-500 pointer-events-none"></div>
        </div>
    );
};

export default HeroPortrait;
