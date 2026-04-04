'use client';
import React, { useState, useEffect } from 'react';

interface HackerTextProps {
    text: string;
    className?: string;
    delay?: number;
    trigger?: boolean;
}

const HackerText: React.FC<HackerTextProps> = ({ text, className, delay = 0, trigger = true }) => {
    const [scrambledText, setScrambledText] = useState(text);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

    useEffect(() => {
        if (!trigger) {
            // Use a small timeout or just skip to avoid synchronous setState in effect warning
            const timer = setTimeout(() => {
                setScrambledText(text.split("").map(l => l === " " ? " " : letters[Math.floor(Math.random() * letters.length)]).join(""));
            }, 0);
            return () => clearTimeout(timer);
        }

        let iteration = 0;
        let interval: NodeJS.Timeout;

        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                setScrambledText(() => 
                    text.split("").map((letter, index) => {
                        if (letter === " ") return " ";
                        if (index < iteration) return text[index];
                        return letters[Math.floor(Math.random() * letters.length)];
                    }).join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        }, delay);

        return () => {
            clearTimeout(timeout);
            if (interval) clearInterval(interval);
        };
    }, [text, delay, trigger]);

    return (
        <span 
            className={className} 
            style={{ willChange: 'contents' }}
            aria-label={text}
        >
            <span aria-hidden="true">{scrambledText}</span>
        </span>
    );
};

export default HackerText;
