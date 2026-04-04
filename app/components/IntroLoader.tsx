'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroLoader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Lock scrolling while loading and force to top
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);

        // Automatically hide the loader after the animation completes
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Wait for the Framer Motion exit animation to finish before unlocking the body
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 1000);
        }, 2800); // Slightly longer for the staggered effect

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = ''; // Cleanup on unmount
        };
    }, []);

    // Animation variants for the container to stagger children
    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
            },
        },
        exit: {
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any, delay: 0.3 }
        }
    };

    // Animation variants for individual letters
    const letterVariants = {
        hidden: { y: '120%', opacity: 0, rotateY: 45, filter: 'blur(10px)' },
        visible: {
            y: 0,
            opacity: 1,
            rotateY: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as any }
        },
        exit: {
            y: '-120%',
            opacity: 0,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as any }
        }
    };

    const word1 = "MY".split('');
    const word2 = "PORTFOLIO".split('');

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
                >
                    <div className="flex items-center justify-center space-x-6 md:space-x-12 overflow-hidden perspective-[1000px]">
                        {/* Word 1: MY */}
                        <div className="flex overflow-hidden pb-4">
                            {word1.map((letter, index) => (
                                <motion.span
                                    key={`w1-${index}`}
                                    variants={letterVariants}
                                    className="text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] font-montserrat font-black text-base-content uppercase inline-block"
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>

                        {/* Word 2: PORTFOLIO */}
                        <div className="flex overflow-hidden pb-4">
                            {word2.map((letter, index) => (
                                <motion.span
                                    key={`w2-${index}`}
                                    variants={letterVariants}
                                    className="text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] font-montserrat font-black text-primary uppercase inline-block"
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                    
                    {/* Minimalist Progress Line */}
                    <motion.div 
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/10"
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    >
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 2.2, ease: "easeInOut" }}
                            className="w-full h-full bg-white origin-left"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroLoader;