'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// PORTRAIT SOURCE
const PORTRAIT_SRC = '/portrait.webp';
const PORTRAIT_IS_CUTOUT = true; // transparent cut-out active -> true depth pop-out

const HeroPortrait = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const portraitRef = useRef<HTMLDivElement>(null);
    const shadowRef = useRef<HTMLDivElement>(null);

    // Refs for individual holograms to animate their independent drift paths
    const hologram1Ref = useRef<HTMLDivElement>(null);
    const hologram2Ref = useRef<HTMLDivElement>(null);
    const hologram3Ref = useRef<HTMLDivElement>(null);

    // Live hex byte stream state for Hologram 1
    const [bytesStream, setBytesStream] = useState('00 00 00 00');
    useEffect(() => {
        const interval = setInterval(() => {
            const bytes = Array.from({ length: 4 }, () => 
                Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
            ).join(' ');
            setBytesStream(bytes);
        }, 700);
        return () => clearInterval(interval);
    }, []);

    // State to generate falling binary code streams in the background
    const [binaryCols, setBinaryCols] = useState<string[]>([]);
    useEffect(() => {
        // Generate 6 vertical columns of binary digits
        const generateCol = () => Array.from({ length: 35 }, () => Math.round(Math.random()).toString()).join('\n');
        setBinaryCols(Array.from({ length: 6 }, generateCol));

        const interval = setInterval(() => {
            setBinaryCols(prev => 
                prev.map(col => 
                    col.split('\n').map(bit => 
                        Math.random() > 0.90 ? Math.round(Math.random()).toString() : bit
                    ).join('\n')
                )
            );
        }, 450);

        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // 1. High-Animation Independent Hologram Drifts (Slow, offset floating pathways)
        const h1Tween = gsap.fromTo(hologram1Ref.current,
            { x: 0, y: 0 },
            {
                x: 10,
                y: -14,
                duration: 5.5,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            }
        );

        const h2Tween = gsap.fromTo(hologram2Ref.current,
            { x: 0, y: 0 },
            {
                x: -12,
                y: 8,
                duration: 6.2,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            }
        );

        const h3Tween = gsap.fromTo(hologram3Ref.current,
            { x: 0, y: 0 },
            {
                x: 8,
                y: -18,
                duration: 4.8,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            }
        );

        // 2. Desktop + precise pointer + motion allowed -> 3D Tilt Parallax on cursor move
        mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
            const tiltX = gsap.quickTo(portraitRef.current, 'rotateX', { duration: 0.8, ease: 'power2.out' });
            const tiltY = gsap.quickTo(portraitRef.current, 'rotateY', { duration: 0.8, ease: 'power2.out' });
            const scale = gsap.quickTo(portraitRef.current, 'scale', { duration: 0.8, ease: 'power2.out' });
            
            const bgX = gsap.quickTo(bgRef.current, 'xPercent', { duration: 1.2, ease: 'power2.out' });
            const bgY = gsap.quickTo(bgRef.current, 'yPercent', { duration: 1.2, ease: 'power2.out' });

            const onMouseMove = (e: MouseEvent) => {
                const nx = (e.clientX / window.innerWidth - 0.5) * 2;   // -1..1
                const ny = (e.clientY / window.innerHeight - 0.5) * 2;  // -1..1
                
                // rotateX is driven by vertical mouse offset, rotateY by horizontal offset
                tiltX(ny * -5); // subtle 5 degrees max tilt
                tiltY(nx * 5);
                scale(1.025); // tiny scale highlight

                // background glows move slightly in opposition for parallax depth
                bgX(nx * -1.8);
                bgY(ny * -1.2);
            };

            const onLeave = () => {
                tiltX(0);
                tiltY(0);
                scale(1);
                bgX(0);
                bgY(0);
            };

            window.addEventListener('mousemove', onMouseMove);
            document.documentElement.addEventListener('mouseleave', onLeave);
            return () => {
                window.removeEventListener('mousemove', onMouseMove);
                document.documentElement.removeEventListener('mouseleave', onLeave);
            };
        });

        // 3. Touch devices -> Scroll parallax
        mm.add('(prefers-reduced-motion: no-preference) and (pointer: coarse)', () => {
            const scrollTween = gsap.to(portraitRef.current, {
                yPercent: -3,
                ease: 'none',
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
            return () => {
                scrollTween.scrollTrigger?.kill();
                scrollTween.kill();
            };
        });

        return () => {
            h1Tween.kill();
            h2Tween.kill();
            h3Tween.kill();
            mm.revert();
        };
    }, { scope: rootRef });

    return (
        <div
            ref={rootRef}
            className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-[8] lg:z-[5] overflow-hidden pointer-events-none"
            style={{ perspective: 1200 }}
        >
            {/* Layer 1: drifting depth background */}
            <div ref={bgRef} className="absolute inset-[-12%] will-change-transform">
                <div className="absolute w-[60%] h-[50%] top-[10%] right-[8%] bg-primary/10 rounded-full blur-[90px]"></div>
                <div className="absolute w-[45%] h-[45%] bottom-[8%] left-[6%] bg-secondary/10 rounded-full blur-[90px]"></div>
            </div>

            {/* Layer 2 (behind portrait): static soft ground shadow */}
            <div
                ref={shadowRef}
                className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[55%] h-[6%] bg-black/40 dark:bg-black/60 rounded-[50%] blur-2xl will-change-transform opacity-45"
            ></div>

            {/* Layer 3: the portrait */}
            <div 
                ref={portraitRef} 
                className="absolute inset-0 flex items-end justify-center will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Inner aspect-ratio-locked container to guarantee overlays lock on coordinate at any viewport size */}
                <div className="relative h-[85%] lg:h-[90%] aspect-[1200/1424] max-w-full" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Dark-mode backlight so the dark-suited subject separates from the dark bg */}
                    <div
                        className="hero-rimlight absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 w-[72%] aspect-square rounded-full pointer-events-none"
                        style={{ 
                            background: 'radial-gradient(closest-side, rgba(99,102,241,0.35), rgba(99,102,241,0.1) 46%, transparent 72%)',
                            transform: 'translateZ(-25px)'
                        }}
                    />
                    
                    {/* --- FALLING BINARY CODE PANEL (Positioned behind your body) --- */}
                    <div 
                        className="absolute inset-x-2 inset-y-10 pointer-events-none select-none overflow-hidden font-mono text-[9px] sm:text-[10px] text-cyan-400/20 dark:text-cyan-500/15 flex justify-between px-8"
                        style={{ transform: 'translateZ(-15px)', transformStyle: 'preserve-3d' }}
                    >
                        {binaryCols.map((col, idx) => (
                            <div 
                                key={idx} 
                                className="whitespace-pre text-center leading-[1.3] tracking-widest will-change-transform"
                                style={{ 
                                    animation: `matrixFall ${14 + idx * 3}s linear infinite`,
                                    animationDelay: `${idx * -2.2}s`
                                }}
                            >
                                {col}
                            </div>
                        ))}
                    </div>

                    <Image
                        src={PORTRAIT_SRC}
                        alt="Rondether Gonzales"
                        fill
                        priority
                        className="object-contain object-bottom select-none"
                        style={{ transform: 'translateZ(0px)' }}
                    />

                    {/* Hologram 1: Tech Data Panel (High animation: glitch flicker, live hex feed, marching wave, sweeping laser) */}
                    <div 
                        ref={hologram1Ref}
                        className="absolute left-[-15%] bottom-[20%] w-[180px] p-3 rounded-lg border border-cyan-500/25 bg-base-950/75 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.15)] font-mono text-[9px] text-cyan-400 select-none hidden sm:block will-change-transform animate-hologram-flicker overflow-hidden"
                        style={{ transform: 'translateZ(40px)' }}
                    >
                        {/* Shimmer laser sweep overlay */}
                        <div className="absolute inset-0 w-full h-[1.5px] bg-cyan-400/30 blur-[1px] animate-scanline pointer-events-none"></div>

                        <div className="flex justify-between items-center border-b border-cyan-500/20 pb-1 mb-1.5 font-bold tracking-wider animate-chromatic">
                            <span>SYS_FEED: STABLE</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                        </div>
                        
                        {/* Animated waveform SVG graph */}
                        <div className="my-1.5 opacity-80">
                            <svg className="w-full h-8 text-cyan-400/70" viewBox="0 0 120 20" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M0,10 C20,-2 40,22 60,10 C80,-2 100,22 120,10" className="animate-dash-flow" />
                                <path d="M0,10 C20,22 40,-2 60,10 C80,22 100,-2 120,10" className="opacity-40 animate-dash-flow" style={{ animationDirection: 'reverse' }} />
                            </svg>
                        </div>

                        <div className="space-y-0.5 opacity-85">
                            <p>LOC: 127.0.0.1</p>
                            <p>SYS: REACT / NEXT.JS</p>
                            <p className="animate-chromatic">BYTE_STR: {bytesStream}</p>
                            <p>STAT: ACTIVE_DECODING</p>
                        </div>
                        <div className="mt-2 w-full h-[3px] bg-cyan-950 rounded-full overflow-hidden">
                            <div className="w-[85%] h-full bg-cyan-400 animate-[pulse_1.5s_infinite]"></div>
                        </div>
                    </div>

                    {/* Hologram 2: HUD Scanner Circle (High animation: double rotation, flickering, scanning) */}
                    <div 
                        ref={hologram2Ref}
                        className="absolute right-[-15%] top-[12%] w-24 h-24 rounded-full border border-indigo-500/20 flex items-center justify-center pointer-events-none hidden md:flex will-change-transform animate-hologram-flicker"
                        style={{ transform: 'translateZ(-25px)' }}
                    >
                        {/* Shimmer laser sweep overlay */}
                        <div className="absolute inset-0 w-full h-[1.5px] bg-indigo-400/25 blur-[1px] animate-scanline pointer-events-none"></div>

                        <div className="absolute inset-1.5 rounded-full border border-dashed border-cyan-400/40 animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-4 rounded-full border border-double border-indigo-400/30 animate-[spin_6s_linear_infinite_reverse]" />
                        <div className="absolute w-[80%] h-[1px] bg-cyan-500/20" />
                        <div className="absolute h-[80%] w-[1px] bg-cyan-500/20" />
                        <span className="font-mono text-[7px] text-indigo-400/50 mt-12 animate-chromatic">CYBER_GRID_V2</span>
                    </div>

                    {/* Hologram 3: Floating code brackets (High animation: slow bounce drift) */}
                    <div 
                        ref={hologram3Ref}
                        className="absolute right-[-10%] bottom-[30%] font-mono text-cyan-400/40 text-2xl font-bold select-none hidden sm:block animate-[bounce_3s_ease-in-out_infinite]"
                        style={{ transform: 'translateZ(50px)' }}
                    >
                        &#123;...&#125;
                    </div>
                </div>
            </div>

            {/* Theme-aware fade so the portrait blends toward the text side */}
            <div className="absolute inset-0 bg-gradient-to-b from-base-100/10 via-transparent to-base-100/20 dark:from-base-100/25 dark:via-base-100/10 dark:to-base-100/35 lg:bg-gradient-to-r lg:from-base-100/90 lg:via-transparent dark:lg:via-base-100/20 lg:to-transparent transition-colors duration-500 pointer-events-none"></div>
        </div>
    );
};

export default HeroPortrait;
