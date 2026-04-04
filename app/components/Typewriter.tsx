
'use client';
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

export default function Typewriter() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    const text = ".typewriter-text";
    const split = new SplitText(text, { type: "chars, words" });

    tl.from(split.chars, {
      opacity: 0,
      y: 20,
      duration: 0.05,
      stagger: {
        each: 0.05,
        from: "random",
      },
      ease: "power2.out",
    }).to(".cursor", {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
  }, { scope: container });

  return (
    <div ref={container} className="text-container p-8">
      
      <div className="typewriter-container">
        <h1 className="typewriter-text text-4xl font-bold">
          Hello, I&apos;m Rondether Gonzales, a Frontend Developer.
        </h1>
        <span className="cursor text-4xl">|</span>
      </div>
      
    </div>
  );
}
