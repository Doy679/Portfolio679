'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DigitalDust = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: { x: number; y: number; s: number; v: number; a: number }[] = [];
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                s: Math.random() * 2,
                v: Math.random() * 0.5 + 0.2,
                a: Math.random() * Math.PI * 2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(129, 140, 248, 0.15)";
            particles.forEach(p => {
                p.y -= p.v;
                if (p.y < 0) p.y = canvas.height;
                ctx.beginPath();
                ctx.arc(p.x + Math.sin(p.a) * 10, p.y, p.s, 0, Math.PI * 2);
                ctx.fill();
                p.a += 0.01;
            });
            requestAnimationFrame(animate);
        };

        animate();
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};

const IntroLoader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);

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
        }, 4200);

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
                        opacity: 0,
                        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
                    }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080808] overflow-hidden"
                >
                    <DigitalDust />

                    {/* Layered Background Glows */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px]"
                        />
                        <motion.div 
                            animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[160px]"
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center w-full">
                        
                        {/* Central Ethereal Line */}
                        <div className="relative h-64 md:h-80 flex flex-col md:flex-row items-center justify-center w-full">
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: 200 }}
                                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                                className="w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent relative"
                            >
                                {/* Glowing Core Dot */}
                                <motion.div 
                                    animate={{ 
                                        scale: [1, 1.5, 1],
                                        boxShadow: ["0 0 20px #818cf8", "0 0 50px #c084fc", "0 0 20px #818cf8"]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full z-20"
                                />
                            </motion.div>

                            {/* Name Reveal - Desktop (Side) & Mobile (Under) */}
                            <div className="md:absolute md:left-full md:ml-8 mt-8 md:mt-0 overflow-hidden text-center md:text-left">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: progress > 40 ? 0 : 20, opacity: progress > 40 ? 1 : 0 }}
                                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                                    className="flex flex-col"
                                >
                                    <h1 className="text-4xl md:text-6xl font-black font-montserrat tracking-tighter text-white uppercase leading-[0.8]">
                                        RONDETHER
                                    </h1>
                                    <h1 className="text-4xl md:text-6xl font-black font-montserrat tracking-tighter text-primary uppercase leading-[0.8] mt-2">
                                        GONZALES
                                    </h1>
                                </motion.div>
                            </div>

                            {/* Role Reveal - Desktop (Side) & Mobile (Under) */}
                            <div className="md:absolute md:right-full md:mr-8 mt-4 md:mt-0 overflow-hidden">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: progress > 60 ? 0 : 20, opacity: progress > 60 ? 1 : 0 }}
                                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                                    className="text-center md:text-right"
                                >
                                    <span className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.5em] whitespace-nowrap">
                                        Frontend Engineer
                                    </span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Minimalist Progress Indicator */}
                        <div className="mt-24 flex flex-col items-center gap-4">
                            <div className="flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0.1 }}
                                        animate={{ opacity: progress > (i * 20) ? 1 : 0.1 }}
                                        className="w-12 h-[2px] bg-primary/40 rounded-full overflow-hidden"
                                    >
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: progress > (i * 20) ? '100%' : '0%' }}
                                            className="h-full bg-primary"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em]">
                                <span className="text-white/20">System Load</span>
                                <span className="text-primary font-bold">{progress}%</span>
                            </div>
                        </div>

                    </div>

                    {/* High-End Finish: Subtle Vignette */}
                    <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-50"></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroLoader;
