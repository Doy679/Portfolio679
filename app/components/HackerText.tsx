"use client";

import React, { useState, useEffect, useRef } from "react";

interface HackerTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function HackerText({
  text,
  speed = 30,
  className = "",
}: HackerTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [inView, setInView] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#_";

  // Detect when the text scrolls into the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false); // Resets so it can animate again when scrolled back
        }
      },
      { threshold: 0.1 } // Triggers when 10% of the element is visible
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // The animation loop
  useEffect(() => {
    if (!inView) return; // Do nothing if not on screen

    let interval: NodeJS.Timeout;
    let iteration = 0;

    interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            // Ignore spaces so words don't shift randomly
            if (letter === " ") return " ";
            
            if (index < iteration) {
              return text[index]; // Reveal correct letter
            }
            // Show random hacker character
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text); // Lock in final text
      }

      iteration += 1 / 3; // Speed of decoding (lower divisor = faster)
    }, speed);

    return () => clearInterval(interval);
  }, [inView, text, speed]);

  return (
    <span ref={textRef} className={className}>
      {displayText}
    </span>
  );
}
