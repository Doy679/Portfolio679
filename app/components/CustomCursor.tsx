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
        window.addEventListener('resize', checkMobile);

        if (isMobile) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            
            // Direct follow for the small dot
            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: "power2.out"
            });
            
            // Delayed follow for the outer ring
            gsap.to(follower, {
                x: clientX,
                y: clientY,
                duration: 0.4,
                ease: "power2.out"
            });
        };

        const onMouseEnter = () => {
            gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
        };

        const onMouseLeave = () => {
            gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
        };

        const onHoverEnter = () => {
            gsap.to(cursor, { scale: 0, duration: 0.3 });
            gsap.to(follower, { 
                scale: 2.5, 
                backgroundColor: "rgba(var(--p), 0.1)", 
                borderColor: "rgba(var(--p), 0.5)",
                borderWidth: "1px",
                duration: 0.3 
            });
        };

        const onHoverLeave = () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(follower, { 
                scale: 1, 
                backgroundColor: "transparent", 
                borderColor: "rgba(var(--p), 0.3)",
                borderWidth: "2px",
                duration: 0.3 
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseenter', onMouseEnter);
        window.addEventListener('mouseleave', onMouseLeave);

        // Track all interactive elements
        const interactives = document.querySelectorAll('a, button, .cursor-pointer, .edu-card, .project-image-block');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', onHoverEnter);
            el.addEventListener('mouseleave', onHoverLeave);
        });

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseenter', onMouseEnter);
            window.removeEventListener('mouseleave', onMouseLeave);
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
                className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] opacity-0 mix-blend-difference"
            />
            <div 
                ref={followerRef} 
                className="fixed top-0 left-0 w-10 h-10 border-2 border-primary/30 rounded-full pointer-events-none z-[9998] opacity-0"
            />
        </>
    );
};

export default CustomCursor;
