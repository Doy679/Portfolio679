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
        <footer className="footer footer-center p-10 bg-base-300 text-base-content relative overflow-hidden" ref={footerRef}>
            <div className="glowing-line h-1 bg-primary absolute top-0 left-0"></div>
            
            <nav className="grid grid-flow-col gap-4">
                <a href="https://www.facebook.com/Gonzales.rondether.2001?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle hover:text-primary transition-colors">
                    <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a href="https://www.linkedin.com/in/ron-dether-gonzales-6551942b8/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle hover:text-primary transition-colors">
                    <i className="fab fa-linkedin-in text-xl"></i>
                </a>
                <a href="https://github.com/Doy679" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle hover:text-primary transition-colors">
                    <i className="fab fa-github text-xl"></i>
                </a>
            </nav>
            
            <aside>
                <p className="font-bold">Rondether Gonzales</p> 
                <p>Copyright © 2026 - All rights reserved</p>
            </aside>
        </footer>
    );
};

export default Footer;