'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let ww = canvas.width = window.innerWidth;
        let wh = canvas.height = window.innerHeight;

        const particles: Particle[] = [];
        const amount = 100;
        const mouse = { x: -9999, y: -9999 };

        class Particle {
            x: number;
            y: number;
            dest: { x: number; y: number };
            r: number;
            vx: number;
            vy: number;
            accX: number;
            accY: number;
            friction: number;
            color: string;

            constructor(x: number, y: number) {
                this.x = Math.random() * ww;
                this.y = Math.random() * wh;
                this.dest = { x: x, y: y };
                this.r = Math.random() * 2 + 1;
                this.vx = (Math.random() - 0.5) * 5;
                this.vy = (Math.random() - 0.5) * 5;
                this.accX = 0;
                this.accY = 0;
                this.friction = Math.random() * 0.05 + 0.94;
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
            }

            render() {
                if (!ctx) return;
                this.accX = (this.dest.x - this.x) / 1000;
                this.accY = (this.dest.y - this.y) / 1000;
                this.vx += this.accX;
                this.vy += this.accY;
                this.vx *= this.friction;
                this.vy *= this.friction;

                this.x += this.vx;
                this.y += this.vy;

                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, Math.PI * 2, false as any);
                ctx.fill();

                const a = this.x - mouse.x;
                const b = this.y - mouse.y;
                const distance = Math.sqrt(a * a + b * b);
                if (distance < 70) {
                    this.accX = (this.x - mouse.x) / 100;
                    this.accY = (this.y - mouse.y) / 100;
                    this.vx += this.accX;
                    this.vy += this.accY;
                }
            }
        }

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        };

        const onTouchEnd = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };

        const init = () => {
            ww = canvas.width = window.innerWidth;
            wh = canvas.height = window.innerHeight;
            particles.length = 0;
            for (let i = 0; i < amount; i++) {
                particles.push(new Particle(Math.random() * ww, Math.random() * wh));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, ww, wh);
            particles.forEach(p => p.render());
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', init);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchend', onTouchEnd);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', init);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10" />;
};

export default ParticleBackground;