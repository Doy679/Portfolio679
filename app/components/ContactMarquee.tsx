'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// A single block containing enough text to overflow the screen width.
// We add pr-6/md:pr-8 so the spacing between the end of Block 1 and the start of Block 2 is perfectly uniform.
const MarqueeBlock = () => (
    <div className="flex items-center gap-6 md:gap-8 pr-6 md:pr-8">
        {/* Set 1 */}
        <span className="text-5xl md:text-7xl font-black font-montserrat tracking-tighter text-base-content uppercase whitespace-nowrap">
            GET IN TOUCH
        </span>
        <span className="text-2xl md:text-4xl text-primary/50">✦</span>
        <span className="text-5xl md:text-7xl font-black font-montserrat tracking-tighter uppercase whitespace-nowrap text-transparent [-webkit-text-stroke:2px_hsl(var(--p))] opacity-80">
            LET&apos;S CONNECT
        </span>
        <span className="text-2xl md:text-4xl text-primary/50">✦</span>
        <span className="text-5xl md:text-7xl font-black font-montserrat tracking-tighter text-primary uppercase whitespace-nowrap">
            LET&apos;S BUILD
        </span>
        <span className="text-2xl md:text-4xl text-primary/50">✦</span>
        
        {/* Set 2 (To ensure the block is extremely wide) */}
        <span className="text-5xl md:text-7xl font-black font-montserrat tracking-tighter text-base-content uppercase whitespace-nowrap">
            GET IN TOUCH
        </span>
        <span className="text-2xl md:text-4xl text-primary/50">✦</span>
        <span className="text-5xl md:text-7xl font-black font-montserrat tracking-tighter uppercase whitespace-nowrap text-transparent [-webkit-text-stroke:2px_hsl(var(--p))] opacity-80">
            LET&apos;S CONNECT
        </span>
        <span className="text-2xl md:text-4xl text-primary/50">✦</span>
        <span className="text-5xl md:text-7xl font-black font-montserrat tracking-tighter text-primary uppercase whitespace-nowrap">
            LET&apos;S BUILD
        </span>
        <span className="text-2xl md:text-4xl text-primary/50">✦</span>
    </div>
);

export default function ContactMarquee() {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!marqueeRef.current) return;
        
        // Animate exactly 50% of the container's width.
        // Because the container has exactly TWO identical blocks, translating by 50% 
        // seamlessly lines up the start of the second block with where the first block started.
        gsap.to(marqueeRef.current, {
            xPercent: -50,
            repeat: -1,
            duration: 15,
            ease: 'none',
        });
    }, { scope: marqueeRef });

    return (
        <div className="w-full overflow-hidden bg-base-200 pt-12 pb-4 md:pt-16 md:pb-6 border-t border-base-content/10 relative z-20 flex select-none">
            {/* Inner w-max container */}
            <div ref={marqueeRef} className="flex flex-nowrap w-max">
                {/* Exactly TWO identical blocks */}
                <MarqueeBlock />
                <MarqueeBlock />
            </div>
        </div>
    );
}