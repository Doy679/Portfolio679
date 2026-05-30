'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLogs = [
    "INITIALIZING KERNEL...",
    "MOUNTING VIRTUAL FILE SYSTEM...",
    "LOADING REACT & NEXT.JS BUNDLES...",
    "ESTABLISHING SECURE CONNECTION...",
    "COMPILING GSAP ANIMATIONS...",
    "BYPASSING FIREWALLS...",
    "ACCESS GRANTED.",
    "SYSTEM READY."
];

const IntroLoader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [totalBlocks, setTotalBlocks] = useState(20);

    useEffect(() => {
        setTotalBlocks(window.innerWidth < 768 ? 15 : 30);

        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);

        const duration = 2800; // 2.8s to reach 100%
        const intervalTime = 40;
        const steps = duration / intervalTime;
        let currentStep = 0;
        let currentLogsLength = 0;

        const interval = setInterval(() => {
            currentStep++;
            const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
            setProgress(newProgress);
            
            const expectedLogCount = Math.floor((newProgress / 100) * bootLogs.length);
            if (expectedLogCount > currentLogsLength && expectedLogCount <= bootLogs.length) {
                currentLogsLength = expectedLogCount;
                setLogs(bootLogs.slice(0, expectedLogCount));
            }

            if (currentStep >= steps) {
                clearInterval(interval);
                
                // Wait at 100% for 500ms so the user sees it finish
                setTimeout(() => {
                    setIsLoading(false);
                    // Give time for exit animation before enabling scroll
                    setTimeout(() => {
                        document.body.style.overflow = '';
                    }, 500); 
                }, 500);
            }
        }, intervalTime);

        return () => {
            clearInterval(interval);
            document.body.style.overflow = '';
        };
    }, []);

    // Generate ASCII progress bar
    const filledBlocks = Math.floor((progress / 100) * totalBlocks);
    const emptyBlocks = Math.max(0, totalBlocks - filledBlocks);
    const progressBar = `[${'#'.repeat(filledBlocks)}${'-'.repeat(emptyBlocks)}]`;

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ 
                        y: '-100%',
                        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } 
                    }}
                    className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center p-6 md:p-12 font-mono"
                >
                    <div className="w-full max-w-4xl text-primary text-sm md:text-lg leading-relaxed flex flex-col gap-2 relative z-10">
                        <div className="mb-6 opacity-70">
                            <p className="text-white/60">RONDETHER_OS [Version 2.0.26]</p>
                            <p className="text-white/40">(c) 2026 Rondether Gonzales. All rights reserved.</p>
                        </div>

                        <div className="flex flex-col gap-2 min-h-[250px] md:min-h-[300px]">
                            {logs.map((log, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex gap-4"
                                >
                                    <span className="opacity-50 text-secondary">{`>`}</span>
                                    <span className="text-primary/90">{log}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 text-primary">
                            <div className="flex justify-between items-end mb-2 text-white/50 text-xs tracking-[0.2em]">
                                <span>BOOT SEQUENCE</span>
                                <span className="text-primary">{progress}%</span>
                            </div>
                            <div className="text-lg md:text-3xl tracking-widest font-bold text-primary">
                                {progressBar}
                            </div>
                        </div>

                        {/* Blinking cursor */}
                        <motion.div 
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-3 md:w-4 h-5 md:h-6 bg-primary inline-block mt-6"
                        />
                    </div>
                    
                    {/* Glowing Orb Background to match landing page */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
                    </div>
                    
                    {/* Scanline overlay effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMCwgMjU1LCAwLCAwLjA1KSIvPjwvc3ZnPg==')] opacity-50 z-20"></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroLoader;