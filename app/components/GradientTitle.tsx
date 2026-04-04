'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface GradientTitleProps {
    text: string;
    className?: string;
    delay?: number;
    initialX?: number;
    initialY?: number;
    inView?: boolean;
}

const GradientTitle: React.FC<GradientTitleProps> = ({ 
    text, 
    className = "", 
    delay = 0, 
    initialX = 0, 
    initialY = 20,
    inView = true 
}) => {
    const animationProps = inView 
        ? { whileInView: { opacity: 1, x: 0, y: 0 }, viewport: { once: true } }
        : { animate: { opacity: 1, x: 0, y: 0 } };

    return (
        <motion.span 
            initial={{ opacity: 0, x: initialX, y: initialY }}
            {...animationProps}
            transition={{ duration: 0.8, delay }}
            className={`gradient-text-animate inline-block ${className}`}
        >
            {text}
        </motion.span>
    );
};

export default GradientTitle;
