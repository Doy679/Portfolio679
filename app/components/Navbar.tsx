'use client';
import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
    const [theme, setTheme] = useState('dark');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showFullName, setShowFullName] = useState(false);
    const logoRef = useRef<HTMLDivElement>(null);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        gsap.to(window, { duration: 1, scrollTo: target });
        
        // If they click the logo, show the name briefly
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
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animate the name reveal
    useEffect(() => {
        if (logoRef.current) {
            gsap.fromTo(logoRef.current, 
                { opacity: 0, x: -10 }, 
                { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
            );
        }
    }, [showFullName]);

    return (
        <div className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 min-h-12 py-0 px-4 ${isScrolled ? 'bg-base-100/80 backdrop-blur-md shadow-md glass-navbar' : 'bg-transparent'}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 uppercase tracking-widest font-bold">
                        <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
                        <li><a href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a></li>
                        <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
                        <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
                    </ul>
                </div>
                
                {/* Interactive Logo */}
                <a 
                    href="#home" 
                    onClick={(e) => handleNavClick(e, '#home')} 
                    className={`btn btn-ghost transition-all duration-500 flex items-center gap-3 px-2 ${showFullName ? 'w-auto' : 'btn-circle'}`}
                    onMouseEnter={() => setShowFullName(true)}
                    onMouseLeave={() => setShowFullName(false)}
                >
                    <div className="relative flex items-center justify-center shrink-0">
                        <div className="absolute w-8 h-8 border border-primary/30 rounded-full group-hover:border-primary transition-all duration-500"></div>
                        <span className="text-xl font-black font-montserrat text-primary">R</span>
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
                <ul className="menu menu-horizontal px-1 uppercase tracking-[0.2em] font-bold text-[10px]">
                    <li><a href="#about" className="hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
                    <li><a href="#skills" className="hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a></li>
                    <li><a href="#projects" className="hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
                    <li><a href="#contact" className="hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
                </ul>
            </div>
            
            <div className="navbar-end">
                <label className="swap swap-rotate btn btn-ghost btn-circle">
                    <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                    <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                    <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;