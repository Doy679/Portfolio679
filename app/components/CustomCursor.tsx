'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile, { passive: true });

        if (isMobile) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        // Optimized initial state
        gsap.set([cursor, follower], { 
            xPercent: -50, 
            yPercent: -50,
            force3D: true
        });

        // Faster setters using quickTo for high-performance following
        const xCursorTo = gsap.quickTo(cursor, "x", { duration: 0.05, ease: "power3" });
        const yCursorTo = gsap.quickTo(cursor, "y", { duration: 0.05, ease: "power3" });
        const xFollowerTo = gsap.quickTo(follower, "x", { duration: 0.3, ease: "power2.out" });
        const yFollowerTo = gsap.quickTo(follower, "y", { duration: 0.3, ease: "power2.out" });

        // Subtle pulsing for the follower
        const pulse = gsap.to(follower, {
            scale: 1.1,
            repeat: -1,
            yoyo: true,
            duration: 1.2,
            ease: "sine.inOut",
            paused: false
        });

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            
            // Set opacity to 1 on first move if it was hidden
            if (gsap.getProperty(cursor, "opacity") === 0) {
                gsap.set([cursor, follower], { opacity: 1 });
            }

            xCursorTo(clientX);
            yCursorTo(clientY);
            xFollowerTo(clientX);
            yFollowerTo(clientY);
        };

        const onMouseEnter = () => {
            gsap.to([cursor, follower], { opacity: 1, duration: 0.2, ease: "power2.out" });
        };

        const onMouseLeave = () => {
            gsap.to([cursor, follower], { opacity: 0, duration: 0.2, ease: "power2.out" });
        };

        const onHoverEnter = () => {
            gsap.to(cursor, { scale: 0, duration: 0.2, ease: "power2.out" });
            gsap.to(follower, { 
                scale: 1.8, 
                backgroundColor: "rgba(var(--p), 0.15)", 
                borderColor: "rgba(var(--p), 0.6)",
                borderWidth: "1px",
                duration: 0.2,
                ease: "power2.out"
            });
            pulse.pause();
        };

        const onHoverLeave = () => {
            gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.out" });
            gsap.to(follower, { 
                scale: 1, 
                backgroundColor: "transparent", 
                borderColor: "rgba(var(--p), 0.3)",
                borderWidth: "2px",
                duration: 0.2,
                ease: "power2.out"
            });
            pulse.resume();
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseenter', onMouseEnter);
        window.addEventListener('mouseleave', onMouseLeave);

        // Track all interactive elements including project images
        const updateInteractives = () => {
            const interactives = document.querySelectorAll('a, button, .cursor-pointer, .project-image-link, .interactive-card');
            interactives.forEach(el => {
                el.removeEventListener('mouseenter', onHoverEnter);
                el.removeEventListener('mouseleave', onHoverLeave);
                el.addEventListener('mouseenter', onHoverEnter);
                el.addEventListener('mouseleave', onHoverLeave);
            });
        };

        // Run once and also after a short delay to catch late-rendering elements
        updateInteractives();
        const timeoutId = setTimeout(updateInteractives, 1000);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseenter', onMouseEnter);
            window.removeEventListener('mouseleave', onMouseLeave);
            clearTimeout(timeoutId);
            
            const interactives = document.querySelectorAll('a, button, .cursor-pointer, .project-image-link, .interactive-card');
            interactives.forEach(el => {
                el.removeEventListener('mouseenter', onHoverEnter);
                el.removeEventListener('mouseleave', onHoverLeave);
            });
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <>
            <div 
                ref={cursorRef} 
                className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] opacity-0 mix-blend-difference will-change-transform"
            />
            <div 
                ref={followerRef} 
                className="fixed top-0 left-0 w-10 h-10 border-2 border-primary/30 rounded-full pointer-events-none z-[9998] opacity-0 will-change-transform"
            />
        </>
    );
};

export default CustomCursor;
