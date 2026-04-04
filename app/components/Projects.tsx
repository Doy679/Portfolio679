'use client';
import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const projectsRef = React.useRef<HTMLElement>(null);

    useGSAP(() => {
        // High-end Scrubbed Parallax Effect for the Section
        gsap.fromTo(projectsRef.current,
            { opacity: 0.2, y: 50 },
            {
                opacity: 1,
                y: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: projectsRef.current,
                    start: 'top bottom',
                    end: 'top 40%',
                    scrub: true,
                }
            }
        );

        // Exit Animation - Fades out as it leaves the top
        gsap.to(projectsRef.current, {
            opacity: 0,
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: projectsRef.current,
                start: 'bottom center',
                end: 'bottom top',
                scrub: true,
            }
        });

        const projectCards = gsap.utils.toArray<HTMLElement>('.project-card');
        
        if (projectCards && Array.isArray(projectCards)) {
            projectCards.forEach((card, i) => {
                // Determine a slight stagger/speed difference based on column/index
                const yOffset = (i % 3) * 50 + 100; // Parallax stagger

                gsap.fromTo(card,
                    { y: yOffset, opacity: 0 },
                    { 
                        y: 0, 
                        opacity: 1, 
                        ease: 'none', 
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom-=100',
                            end: 'top center',
                            scrub: 1, // Smooth scrub
                        }
                    }
                );

                // Internal Image Parallax
                const img = card.querySelector('img');
                if (img) {
                    gsap.fromTo(img,
                        { scale: 1.2, y: -20 },
                        {
                            scale: 1,
                            y: 0,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true,
                            }
                        }
                    );
                }
            });
        }
    }, { scope: projectsRef });

    return (
        <section id="projects" className="py-20 bg-base-200" ref={projectsRef}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">My Featured Projects</h2>
                    <div className="w-20 h-1 bg-primary mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 max-w-[90rem] mx-auto xl:px-8">
                    {projects && Array.isArray(projects) ? (
                        projects.map((project, index) => (
                            <a 
                                key={index} 
                                href={project.link || "#"} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group relative bg-base-100 rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-3 block cursor-pointer project-card shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(var(--p),0.2)]"
                            >
                                {/* Inner Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"></div>

                                <div className="relative w-full aspect-[16/10] bg-base-300/50 overflow-hidden border-b border-white/5">
                                    {/* Subtle Image Overlay */}
                                    <div className="absolute inset-0 bg-base-100/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                    
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-[1.03]" 
                                    />
                                </div>
                                <div className="p-8 relative z-20 bg-base-100 flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex gap-2">
                                            {project.title.includes("IN DEVELOPMENT") && (
                                                <span className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 text-xs font-bold text-yellow-400 tracking-wider uppercase rounded-full flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                                                    In Dev
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-base-content group-hover:text-primary transition-colors duration-300 font-montserrat tracking-tight">
                                        {project.title.replace(" (IN DEVELOPMENT)", "")}
                                    </h3>
                                    <p className="text-base-content/70 text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">
                                        {project.description}
                                    </p>
                                    
                                    <div className="flex flex-col gap-6 mt-auto">
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.badges && Array.isArray(project.badges) ? (
                                                project.badges.map((badge, badgeIndex) => (
                                                    <span 
                                                        key={badgeIndex} 
                                                        className="px-2 py-0.5 bg-base-200 border border-base-content/10 text-base-content/70 rounded text-[10px] font-medium tracking-wide"
                                                    >
                                                        {badge}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-[10px] text-base-content/50">No badges</span>
                                            )}
                                        </div>
                                        
                                        {/* Minimal View Project Link */}
                                        <div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                            <span>View Project</span>
                                            <i className="fas fa-arrow-right text-xs"></i>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10">
                            <p className="text-base-content/60">No projects to display</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;