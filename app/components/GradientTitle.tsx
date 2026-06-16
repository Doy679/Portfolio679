'use client';
import React from 'react';

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
}) => {
    return (
        <span className={`gradient-text-animate inline-block ${className}`}>
            {text}
        </span>
    );
};

export default GradientTitle;
