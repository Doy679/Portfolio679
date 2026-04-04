'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroLoader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [terminalLines, setTerminalLines] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    const logs = [
        "> sudo systemctl start portfolio.service",
        "> Loading kernel modules...",
        "> Initializing React 19 Engine",
        "> Mounting GSAP Animation Driver",
        "> Optimizing assets...",
        "> Fetching credentials: RONDETHER_GONZALES",
        "> Injecting 3D components",
        "> Compiling featured projects...",
        "> Launching main interface..."
    ];

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);

        logs.forEach((log, index) => {
            setTimeout(() => {
                setTerminalLines(prev => [...prev, log]);
            }, index * 200);
        });

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev < 100) return prev + 1;
                clearInterval(interval);
                return 100;
            });
        }, 30);

        const timer = setTimeout(() => {
            setIsLoading(false);
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 1000);
        }, 3800);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ 
                        y: '-100%', 
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
                    }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] font-mono text-xs md:text-sm"
                >
                    <div className="w-full max-w-2xl px-6">
                        <div className="flex items-center gap-2 mb-4 opacity-50">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            <span className="ml-2 text-[10px] tracking-widest uppercase text-white">system_console — 80x24</span>
                        </div>

                        <div className="min-h-[180px] mb-8 space-y-1">
                            {terminalLines.map((line, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-primary/90"
                                >
                                    <span className="text-white/30 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                    {line}
                                </motion.div>
                            ))}
                            <motion.div 
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2 h-4 bg-primary inline-block align-middle ml-1"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                                <span>Deployment Progress</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-primary"
                                />
                            </div>
                        </div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: progress > 85 ? 1 : 0 }}
                            className="mt-12 text-center"
                        >
                            <h1 className="text-2xl md:text-3xl font-black font-montserrat tracking-tighter text-white">
                                RONDETHER <span className="text-primary">GONZALES</span>
                            </h1>
                        </motion.div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,100,0.06))] bg-[length:100%_2px,3px_100%] z-[10000]"></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroLoader;
