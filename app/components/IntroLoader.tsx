'use client';
import React, { useEffect, useState } from 'react';

const IntroLoader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [coordX, setCoordX] = useState("0.00");
    const [coordY, setCoordY] = useState("0.00");
    const [scene1Fading, setScene1Fading] = useState(false);
    const [scene1Hidden, setScene1Hidden] = useState(false);
    const [scene2Active, setScene2Active] = useState(false);

    useEffect(() => {
        // Initial setup for body to match their CSS body block
        document.body.style.overflow = 'hidden';
        
        const interval = setInterval(() => {
            setCoordX((Math.random() * 100 - 50).toFixed(2));
            setCoordY((Math.random() * 100).toFixed(2));
        }, 3000);

        return () => {
            clearInterval(interval);
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (!isLoading) {
            document.body.style.overflow = '';
        }
    }, [isLoading]);

    const handleBegin = () => {
        setScene1Fading(true);
        
        setTimeout(() => {
            setScene1Hidden(true);
            setScene2Active(true);
            
            setTimeout(() => {
                // add smooth fade out to black
                const el = document.getElementById('loader-wrapper');
                if (el) {
                    el.style.transition = 'opacity 1.5s ease';
                    el.style.opacity = '0';
                }
                
                setTimeout(() => {
                    setIsLoading(false);
                }, 1500);

            }, 4500);
        }, 1000);
    };

    if (!isLoading) return null;

    return (
        <div id="loader-wrapper" className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#1d232a] text-[#d3ccc0] select-none" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Teko:wght@400;600;700&family=Rajdhani:wght@400;600;700&display=swap');
                
                .noise-overlay {
                    position: fixed;
                    top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none;
                    z-index: 50;
                    opacity: 0.04;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    transform: translateZ(0);
                    will-change: transform;
                }

                .scanlines {
                    position: fixed;
                    top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none;
                    z-index: 49;
                    background: linear-gradient(
                        to bottom,
                        rgba(255,255,255,0),
                        rgba(255,255,255,0) 50%,
                        rgba(0,0,0,0.1) 50%,
                        rgba(0,0,0,0.1)
                    );
                    background-size: 100% 4px;
                    opacity: 0.3;
                    transform: translateZ(0);
                    will-change: transform;
                }

                .vignette {
                    position: fixed;
                    top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none;
                    z-index: 48;
                    background: radial-gradient(circle, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%);
                    transform: translateZ(0);
                    will-change: transform;
                }

                .font-title {
                    font-family: 'Teko', sans-serif;
                    letter-spacing: 0.05em;
                    line-height: 0.85;
                    background: linear-gradient(180deg, #e6e2d8 0%, #a39e93 40%, #7a766c 60%, #c4c0b5 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0px 4px 10px rgba(0,0,0,0.8));
                }

                .font-subtitle {
                    font-family: 'Rajdhani', sans-serif;
                    letter-spacing: 0.2em;
                }

                .glass-panel {
                    background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%);
                    border-top: 1px solid rgba(255,255,255,0.1);
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    box-shadow: 0 0 30px rgba(0,0,0,0.5) inset;
                    position: relative;
                }
                
                .glass-panel::before, .glass-panel::after {
                    content: '';
                    position: absolute;
                    width: 5px; height: 1px;
                    background: rgba(255,255,255,0.3);
                }
                .glass-panel::before { top: 0; left: 0; }
                .glass-panel::after { bottom: 0; right: 0; }

                .btn-glow {
                    position: relative;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(211, 204, 192, 0.3);
                    background: rgba(0,0,0,0.4);
                    overflow: hidden;
                }
                
                .btn-glow:hover {
                    background: rgba(211, 204, 192, 0.1);
                    border-color: rgba(211, 204, 192, 0.8);
                    box-shadow: 0 0 15px rgba(211, 204, 192, 0.2);
                    text-shadow: 0 0 5px rgba(255,255,255,0.5);
                    cursor: pointer;
                }

                .btn-glow::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    transition: transform 0.5s ease;
                    transform: translateX(-100%);
                    will-change: transform;
                }
                
                .btn-glow:hover::before {
                    transform: translateX(100%);
                }

                .fade-out {
                    animation: fadeOut 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    pointer-events: none;
                }
                @keyframes fadeOut {
                    0% { opacity: 1; filter: blur(0px); transform: scale(1); }
                    100% { opacity: 0; filter: blur(10px); transform: scale(1.05); }
                }

                #scene-2 {
                    opacity: 0;
                    pointer-events: none;
                    transform: scale(0.95);
                    transition: opacity 1.5s ease, transform 2s cubic-bezier(0.1, 0.8, 0.2, 1);
                }

                #scene-2.active {
                    opacity: 1;
                    pointer-events: auto;
                    transform: scale(1);
                }

                .anim-element {
                    opacity: 0;
                    transform: translateY(20px);
                    filter: blur(5px);
                }

                #scene-2.active .anim-device { animation: revealDevice 2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s forwards; }
                @keyframes revealDevice {
                    0% { opacity: 0; transform: scale(0.8) rotate(-15deg); filter: blur(10px); }
                    100% { opacity: 1; transform: scale(1) rotate(0deg); filter: blur(0px); }
                }

                #scene-2.active .anim-text-1 { animation: textReveal 1s cubic-bezier(0.2, 0.8, 0.2, 1) 1.2s forwards; }
                #scene-2.active .anim-text-2 { animation: textReveal 1s cubic-bezier(0.2, 0.8, 0.2, 1) 1.4s forwards; }
                #scene-2.active .anim-text-3 { animation: textReveal 1s cubic-bezier(0.2, 0.8, 0.2, 1) 1.6s forwards; }
                
                @keyframes textReveal {
                    0% { opacity: 0; transform: translateY(40px) scale(0.95); filter: blur(8px); }
                    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
                }

                #scene-2.active .anim-nav { animation: fadeIn 1s ease 2s forwards; }
                #scene-2.active .anim-desc { animation: slideUpFade 1s ease 2.2s forwards; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUpFade {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .spin-slow { animation: spin 40s linear infinite; transform-origin: center; }
                .spin-slow-reverse { animation: spinReverse 60s linear infinite; transform-origin: center; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                @keyframes spinReverse { 100% { transform: rotate(-360deg); } }

                .blink { animation: blinker 1s linear infinite; }
                @keyframes blinker { 50% { opacity: 0; } }
            `}} />

            <div className="noise-overlay"></div>
            <div className="scanlines"></div>
            <div className="vignette"></div>

            <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 opacity-30 text-[10px] tracking-widest text-[#a8a398]">
                <div className="flex justify-between w-full">
                    <div className="flex items-center gap-2">
                        <span>X: {coordX}</span>
                        <span className="w-1 h-1 bg-current rounded-full"></span>
                        <span>Y: {coordY}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>SYS. ONLINE</span>
                        <span className="w-1 h-1 bg-current rounded-full blink"></span>
                    </div>
                </div>
                <div className="flex justify-between w-full items-end">
                    <div className="flex gap-4">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 2 22 22 22"></polygon></svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle></svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>
                    </div>
                    <div>
                        <span>SEC: ALPHA</span>
                    </div>
                </div>
            </div>

            {!scene1Hidden && (
                <div id="scene-1" className={`absolute inset-0 z-30 flex flex-col items-center justify-center w-full h-full ${scene1Fading ? 'fade-out' : ''}`}>
                    
                    <div className="text-center z-10 px-4 mb-8">
                        <h1 className="font-subtitle text-2xl md:text-4xl text-[#d3ccc0] mb-2 font-bold tracking-[0.15em]" style={{ textShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
                            LOADING
                        </h1>
                        <h1 className="font-subtitle text-2xl md:text-4xl text-[#d3ccc0] font-bold tracking-[0.15em]" style={{ textShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
                            PORTFOLIO
                        </h1>
                        <h1 className="font-subtitle text-2xl md:text-4xl text-[#d3ccc0] font-bold tracking-[0.15em] mb-8" style={{ textShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
                            WORKSPACE...
                        </h1>
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-6 mt-4">
                        <button onClick={handleBegin} className="btn-glow px-10 py-4 text-sm tracking-[0.3em] text-[#d3ccc0] uppercase pointer-events-auto bg-[#0a0f18]/80 backdrop-blur-sm shadow-[0_0_20px_rgba(74,111,165,0.2)]">
                            Begin Journey
                        </button>
                        <div className="text-[10px] tracking-widest text-gray-500 flex items-center gap-3">
                            <span className="text-[#888]">CALIBRATION</span>
                            <span className="text-[#a0a0a0] flex items-center gap-1">COMPLETE <span className="inline-block w-2 h-2 bg-[#4ade80] rounded-sm blink shadow-[0_0_5px_#4ade80]"></span></span>
                        </div>
                    </div>

                </div>
            )}

            <div id="scene-2" className={`absolute inset-0 z-20 flex flex-col w-full h-full ${scene2Active ? 'active' : ''}`}>
                
                <nav className="anim-element anim-nav absolute top-0 w-full px-8 py-6 flex justify-between items-center z-40 text-[11px] tracking-widest text-[#a8a398]">
                    <div className="flex items-center gap-3">
                        <span>R. GONZALES</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.006 4.316l-14.012 0c-0.655 0-1.187 0.532-1.187 1.187 0 0.316 0.125 0.619 0.348 0.842l3.415 3.415c0.223 0.223 0.526 0.348 0.842 0.348l14.012 0c0.655 0 1.187-0.532 1.187-1.187 0-0.316-0.125-0.619-0.348-0.842l-3.415-3.415c-0.223-0.223-0.526-0.348-0.842-0.348l-14.012 0c-0.655 0-1.187 0.532-1.187 1.187 0 0.316 0.125 0.619 0.348 0.842l3.415 3.415c0.223 0.223 0.526 0.348 0.842 0.348l14.012 0c0.655 0 1.187-0.532 1.187-1.187 0-0.316-0.125-0.619-0.348-0.842l-3.415-3.415c-0.223-0.223-0.526-0.348-0.842-0.348zM4.994 19.684l14.012 0c0.655 0 1.187-0.532 1.187-1.187 0-0.316-0.125-0.619-0.348-0.842l-3.415-3.415c-0.223-0.223-0.526-0.348-0.842-0.348l-14.012 0c-0.655 0-1.187 0.532-1.187 1.187 0 0.316 0.125 0.619 0.348 0.842l3.415 3.415c0.223 0.223 0.526 0.348 0.842 0.348zM19.006 11.831l-14.012 0c-0.655 0-1.187 0.532-1.187 1.187 0 0.316 0.125 0.619 0.348 0.842l3.415 3.415c0.223 0.223 0.526 0.348 0.842 0.348l14.012 0c0.655 0 1.187-0.532 1.187-1.187 0-0.316-0.125-0.619-0.348-0.842l-3.415-3.415c-0.223-0.223-0.526-0.348-0.842-0.348z"/></svg>
                    </div>
                    
                    <div className="text-center">
                        <h2 className="font-subtitle text-sm text-[#d3ccc0] font-bold">PORTFOLIO<br/>TERMINAL</h2>
                    </div>
                    
                    <div className="flex gap-6 pointer-events-auto">
                        <span className="hover:text-white transition-colors cursor-pointer">PROJECTS</span>
                        <span className="hover:text-white transition-colors cursor-pointer">ABOUT</span>
                        <span className="hover:text-white transition-colors text-[#5a7b9c] cursor-pointer">CONTACT</span>
                    </div>
                </nav>

                <div className="flex-1 flex flex-col items-center justify-center relative">
                    
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none anim-element anim-device z-10">
                        <div className="relative w-[85vw] max-w-[450px] aspect-square flex items-center justify-center opacity-80 mix-blend-screen" style={{ willChange: 'transform' }}>
                            <div className="absolute w-[60vw] max-w-[300px] aspect-square bg-[#1a2b4c] rounded-full blur-[80px] opacity-50"></div>
                            
                            <svg viewBox="0 0 500 500" className="w-full h-full absolute" style={{ willChange: 'transform' }}>
                                <defs>
                                    <radialGradient id="metalGrad" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="#4a5d7c" />
                                        <stop offset="70%" stopColor="#1e2a3a" />
                                        <stop offset="100%" stopColor="#0a0f18" />
                                    </radialGradient>
                                    <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="rgba(100, 180, 255, 0.8)" />
                                        <stop offset="50%" stopColor="rgba(50, 100, 200, 0.2)" />
                                        <stop offset="100%" stopColor="transparent" />
                                    </radialGradient>
                                </defs>

                                <circle cx="250" cy="250" r="240" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                                <line x1="250" y1="0" x2="250" y2="500" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                                <line x1="0" y1="250" x2="500" y2="250" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                                <g className="spin-slow" style={{ willChange: 'transform' }}>
                                    <circle cx="250" cy="250" r="210" fill="none" stroke="#3a4b6c" strokeWidth="2" strokeDasharray="4 8" />
                                    <circle cx="250" cy="250" r="210" fill="none" stroke="#7a9bcd" strokeWidth="4" strokeDasharray="1 40" />
                                    <circle cx="250" cy="250" r="180" fill="none" stroke="#2a3b5c" strokeWidth="15" opacity="0.5" />
                                    <circle cx="250" cy="250" r="180" fill="none" stroke="#5a7b9c" strokeWidth="1" strokeDasharray="2 2" />
                                    <g stroke="#4a6fa5" strokeWidth="1">
                                        <line x1="250" y1="65" x2="250" y2="75" /><line x1="250" y1="425" x2="250" y2="435" />
                                        <line x1="65" y1="250" x2="75" y2="250" /><line x1="425" y1="250" x2="435" y2="250" />
                                    </g>
                                </g>

                                <g className="spin-slow-reverse" style={{ willChange: 'transform' }}>
                                    <circle cx="250" cy="250" r="140" fill="url(#metalGrad)" stroke="#111" strokeWidth="5" />
                                    <circle cx="250" cy="250" r="130" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                    <circle cx="250" cy="250" r="100" fill="#0f1520" stroke="#2a3b5c" strokeWidth="2" />
                                    <path d="M250 140 L255 245 L360 250 L255 255 L250 360 L245 255 L140 250 L245 245 Z" fill="#1e2a3a" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                                    <path d="M 180 180 A 100 100 0 0 1 320 180" fill="none" stroke="#4a6fa5" strokeWidth="2" strokeDasharray="5 5" />
                                    <path d="M 180 320 A 100 100 0 0 0 320 320" fill="none" stroke="#4a6fa5" strokeWidth="2" strokeDasharray="5 5" />
                                </g>

                                <circle cx="250" cy="250" r="40" fill="url(#glowGrad)" />
                                <circle cx="250" cy="250" r="20" fill="#0a0f18" stroke="#4a6fa5" strokeWidth="2" />
                                <circle cx="250" cy="250" r="5" fill="#fff" />
                                <path d="M250 238 L250 245 M242 242 L246 248 M258 242 L254 248" stroke="#7a9bcd" strokeWidth="1.5" fill="none" />
                            </svg>
                        </div>
                    </div>

                    <div className="relative z-20 text-center flex flex-col items-center pointer-events-none mt-12">
                        <h1 className="font-title text-[10vw] md:text-[140px] m-0 anim-element anim-text-1">FRONTEND</h1>
                        <h1 className="font-title text-[12vw] md:text-[160px] m-0 -mt-[4%] anim-element anim-text-2">SYSTEMS</h1>
                        <h1 className="font-title text-[10vw] md:text-[140px] m-0 -mt-[4%] anim-element anim-text-3">ONLINE</h1>
                    </div>

                </div>

                <div className="anim-element anim-desc pb-12 px-8 flex flex-col items-center text-center z-30 pointer-events-auto">
                    <h3 className="font-subtitle tracking-[0.3em] text-[#d3ccc0] mb-4 text-sm md:text-base border-b border-white/20 pb-2 inline-block">
                        WELCOME USER //
                    </h3>
                    <p className="max-w-2xl text-[10px] md:text-xs leading-relaxed tracking-widest text-[#7a7771] uppercase">
                        You are accessing the digital workspace of R. Gonzales. Specializing in<br/>
                        high-fidelity interfaces, seamless user experiences, and modern web engineering.<br/>
                        Bridging logic with design.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default IntroLoader;