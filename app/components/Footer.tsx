'use client';
import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const Footer = () => {
    const footerRef = React.useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo('.glowing-line', {
            width: '0%',
        }, {
            width: '100%',
            duration: 2,
            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    }, { scope: footerRef });

    return (
        <footer className="footer footer-center p-4 bg-base-300 text-base-content" ref={footerRef}>
            <div className="glowing-line h-1 bg-primary absolute top-0 left-0"></div>
            <aside>
                <p>Copyright © 2025 - All right reserved by Rondether Gonzales</p>
            </aside>
        </footer>
    );
};

export default Footer;