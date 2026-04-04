'use client';
import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
    const [theme, setTheme] = useState('dark');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showFullName, setShowFullName] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const logoRef = useRef<HTMLDivElement>(null);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        const sectionId = target.replace('#', '');
        setActiveSection(sectionId);
        gsap.to(window, { duration: 1, scrollTo: { y: target, autoKill: false }, ease: "power4.inOut" });
        
        // Close mobile dropdown if open
        const elem = document.activeElement as HTMLElement;
        if (elem) {
            elem.blur();
        }
        
        if (target === '#home') {
            setShowFullName(true);
            setTimeout(() => setShowFullName(false), 3000);
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            
            // Detect active section
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            const current = sections.find(section => {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animate the name reveal
    useEffect(() => {
        if (logoRef.current && showFullName) {
            gsap.fromTo(logoRef.current, 
                { opacity: 0, x: -10 }, 
                { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
            );
        }
    }, [showFullName]);

    return (
        <div className={`navbar fixed top-0 left-0 right-0 z-[100] transition-all duration-500 min-h-16 px-6 lg:px-12 ${isScrolled ? 'bg-base-100/60 backdrop-blur-xl border-b border-primary/10 py-2' : 'bg-transparent py-4'}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-primary/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-4 shadow-2xl bg-base-100/95 backdrop-blur-md rounded-2xl w-64 uppercase tracking-[0.2em] font-black border border-primary/10 gap-2">
                        <li><a className={activeSection === 'about' ? 'text-primary' : ''} href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
                        <li><a className={activeSection === 'skills' ? 'text-primary' : ''} href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a></li>
                        <li><a className={activeSection === 'projects' ? 'text-primary' : ''} href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
                        <li><a className={activeSection === 'contact' ? 'text-primary' : ''} href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
                    </ul>
                </div>
                
                {/* Interactive Logo */}
                <a 
                    href="#home" 
                    onClick={(e) => handleNavClick(e, '#home')} 
                    className={`btn btn-ghost transition-all duration-500 flex items-center gap-3 px-2 group ${showFullName ? 'w-auto' : 'btn-circle'}`}
                    onMouseEnter={() => setShowFullName(true)}
                    onMouseLeave={() => setShowFullName(false)}
                >
                    <div className="relative flex items-center justify-center shrink-0">
                        <div className="absolute w-10 h-10 border border-primary/20 rounded-full group-hover:border-primary/60 group-hover:scale-110 transition-all duration-500"></div>
                        <span className="text-2xl font-black font-montserrat text-primary group-hover:scale-90 transition-transform">R</span>
                    </div>
                    {showFullName && (
                        <div ref={logoRef} className="overflow-hidden whitespace-nowrap pr-2">
                            <span className="text-sm font-black font-montserrat tracking-[0.2em] uppercase text-base-content">
                                ondether Gonzales
                            </span>
                        </div>
                    )}
                </a>
            </div>
            
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 uppercase tracking-[0.25em] font-black text-[11px] gap-2">
                    <li><a href="#about" className={`hover:text-primary transition-all px-6 relative group ${activeSection === 'about' ? 'text-primary' : ''}`} onClick={(e) => handleNavClick(e, '#about')}>
                        About
                        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${activeSection === 'about' ? 'w-1/2' : 'w-0 group-hover:w-1/3'}`}></span>
                    </a></li>
                    <li><a href="#skills" className={`hover:text-primary transition-all px-6 relative group ${activeSection === 'skills' ? 'text-primary' : ''}`} onClick={(e) => handleNavClick(e, '#skills')}>
                        Skills
                        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${activeSection === 'skills' ? 'w-1/2' : 'w-0 group-hover:w-1/3'}`}></span>
                    </a></li>
                    <li><a href="#projects" className={`hover:text-primary transition-all px-6 relative group ${activeSection === 'projects' ? 'text-primary' : ''}`} onClick={(e) => handleNavClick(e, '#projects')}>
                        Projects
                        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${activeSection === 'projects' ? 'w-1/2' : 'w-0 group-hover:w-1/3'}`}></span>
                    </a></li>
                    <li><a href="#contact" className={`hover:text-primary transition-all px-6 relative group ${activeSection === 'contact' ? 'text-primary' : ''}`} onClick={(e) => handleNavClick(e, '#contact')}>
                        Contact
                        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${activeSection === 'contact' ? 'w-1/2' : 'w-0 group-hover:w-1/3'}`}></span>
                    </a></li>
                </ul>
            </div>
            
            <div className="navbar-end">
                <label className="swap swap-rotate btn btn-ghost btn-circle hover:bg-primary/10 transition-colors">
                    <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                    <svg className="swap-on fill-current w-5 h-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                    <svg className="swap-off fill-current w-5 h-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;