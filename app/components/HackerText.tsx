'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}\\/|";

interface HackerTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    gradient?: boolean;
    start?: string;
    characters?: string;
}

const createScrambledText = (text: string, characters: string, revealedCount = 0) => {
    return text
        .split('')
        .map((character, index) => {
            if (character === ' ') return ' ';
            if (index < revealedCount) return character;

            return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');
};

const HackerText: React.FC<HackerTextProps> = ({
    text,
    className = "",
    delay = 0,
    duration = 1.15,
    gradient = true,
    start = "top 86%",
    characters = DEFAULT_CHARACTERS
}) => {
    const rootRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const frameRef = useRef<number | null>(null);
    const timeoutRef = useRef<number | null>(null);

    useGSAP(() => {
        const root = rootRef.current;
        const target = textRef.current;

        if (!root || !target) return;

        const prefersReducedMotion = typeof window !== 'undefined'
            ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
            : false;

        if (prefersReducedMotion) {
            target.textContent = text;
            return;
        }

        const clearTimers = () => {
            if (frameRef.current !== null) {
                window.cancelAnimationFrame(frameRef.current);
                frameRef.current = null;
            }

            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };

        const animateScramble = () => {
            const startedAt = performance.now();
            const totalDuration = duration * 1000;

            const tick = (now: number) => {
                const progress = Math.min((now - startedAt) / totalDuration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const revealedCount = Math.floor(easedProgress * text.length);

                target.textContent = createScrambledText(text, characters, revealedCount);

                if (progress < 1) {
                    frameRef.current = window.requestAnimationFrame(tick);
                    return;
                }

                target.textContent = text;
                frameRef.current = null;
            };

            frameRef.current = window.requestAnimationFrame(tick);
        };

        target.textContent = createScrambledText(text, characters);

        const trigger = ScrollTrigger.create({
            trigger: root,
            start,
            once: true,
            onEnter: () => {
                clearTimers();
                timeoutRef.current = window.setTimeout(animateScramble, delay * 1000);
            }
        });

        return () => {
            trigger.kill();
            clearTimers();
        };
    }, { scope: rootRef });

    return (
        <span ref={rootRef} className={`hacker-text ${gradient ? 'gradient-text-animate' : ''} ${className}`}>
            <span ref={textRef} className="hacker-text-inner" aria-hidden="true">
                {text}
            </span>
            <span className="sr-only">{text}</span>
        </span>
    );
};

export default HackerText;
