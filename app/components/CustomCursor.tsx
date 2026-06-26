'use client';
import { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isDesktop] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(pointer: fine)').matches;
        }
        return true;
    });
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') || 'dark';
        }
        return 'dark';
    });

    useEffect(() => {
        const getTheme = () => document.documentElement.getAttribute('data-theme') || 'dark';

        const observer = new MutationObserver(() => {
            setTheme(getTheme());
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Only run on desktop/devices with a precise pointer
        const mediaQuery = window.matchMedia('(pointer: fine)');
        if (!mediaQuery.matches) return;

        let requestRef: number;
        let mouseX = 0;
        let mouseY = 0;
        
        // Smooth cursor variables
        let cursorX = 0;
        let cursorY = 0;

        const updateCursor = () => {
            // Easing factor for smoothness
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.2;
            cursorY += dy * 0.2;
            
            setPosition({ x: cursorX, y: cursorY });
            requestRef = requestAnimationFrame(updateCursor);
        };

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isVisible) setIsVisible(true);
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        const checkHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovered element is clickable
            const isClickable = 
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                window.getComputedStyle(target).cursor === 'pointer';
            
            setIsHovering(isClickable);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousemove', checkHover);
        document.body.addEventListener('mouseleave', onMouseLeave);
        document.body.addEventListener('mouseenter', onMouseEnter);
        
        requestRef = requestAnimationFrame(updateCursor);

        // Hide default cursor gracefully by adding a class to body
        document.body.style.cursor = 'none';
        
        // Use a generic style tag for hover elements to ensure cursor: none
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                cursor: none !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousemove', checkHover);
            document.body.removeEventListener('mouseleave', onMouseLeave);
            document.body.removeEventListener('mouseenter', onMouseEnter);
            cancelAnimationFrame(requestRef);
            document.body.style.cursor = 'auto';
            document.head.removeChild(style);
        };
    }, [isVisible]);

    if (!isDesktop || !isVisible) return null;

    const isDark = theme === 'dark';

    // Style properties to increase contrast depending on the active theme
    const ringBorderColor = isDark ? 'border-primary/60' : 'border-neutral-900/60';
    const dotBgColor = isDark ? 'bg-primary' : 'bg-neutral-900';
    const ringShadow = isDark 
        ? 'shadow-[0_0_12px_rgba(99,102,241,0.5)]' 
        : 'shadow-[0_2px_8px_rgba(0,0,0,0.15)]';

    return (
        <>
            {/* Outer ring */}
            <div 
                className={`fixed top-0 left-0 w-8 h-8 rounded-full border ${ringBorderColor} ${ringShadow} z-[9999] pointer-events-none transition-transform duration-100 ease-out`}
                style={{ 
                    transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isHovering ? 1.5 : 1})`,
                    opacity: isHovering ? 0.95 : 0.6
                }}
            />
            {/* Inner dot */}
            <div 
                className={`fixed top-0 left-0 w-2 h-2 rounded-full ${dotBgColor} z-[9999] pointer-events-none transition-transform duration-100`}
                style={{ 
                    transform: `translate(${position.x - 4}px, ${position.y - 4}px) scale(${isHovering ? 0 : 1})`,
                }}
            />
        </>
    );
};

export default CustomCursor;