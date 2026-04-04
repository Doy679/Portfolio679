'use client';
import React from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import ProjectCarousel from './ProjectCarousel';

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
                        { y: -10 },
                        {
                            y: 10,
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
                    <h2 className="text-2xl md:text-3xl font-bold font-montserrat tracking-[0.2em] uppercase text-base-content">My Featured Projects</h2>
                    <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-4 mb-8"></div>
                </div>

                <ProjectCarousel projects={projects} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 max-w-[90rem] mx-auto xl:px-8">
                    {projects && Array.isArray(projects) ? (
                        projects.map((project, index) => {
                            const CardWrapper = project.link ? 'a' : 'div';
                            const wrapperProps = project.link ? {
                                href: project.link,
                                target: "_blank",
                                rel: "noopener noreferrer"
                            } : {};

                            return (
                                <CardWrapper 
                                    key={index} 
                                    {...wrapperProps}
                                    className={`group relative bg-base-100 rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-3 flex flex-col project-card shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(var(--p),0.2)] ${project.link ? 'cursor-pointer' : 'cursor-default'}`}
                                >
                                    {/* Inner Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"></div>

                                    <div className="relative w-full aspect-[16/10] bg-base-300/50 overflow-hidden border-b border-white/5 p-2">
                                        {/* Subtle Image Overlay */}
                                        <div className="absolute inset-0 bg-base-100/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                        
                                        <Image 
                                            src={project.image} 
                                            alt={project.title} 
                                            fill
                                            className="object-contain p-2 transition-transform duration-700" 
                                        />
                                    </div>
                                    <div className="p-8 relative z-20 bg-base-100 flex flex-col flex-grow">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex gap-2">
                                                {project.title.includes("IN DEVELOPMENT") && (
                                                    <span className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 text-[10px] font-bold text-yellow-400 tracking-widest uppercase rounded-full flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                                                        In Dev
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2 text-base-content group-hover:text-primary transition-colors duration-300 font-montserrat tracking-tight">
                                            {project.title.replace(" (IN DEVELOPMENT)", "")}
                                        </h3>

                                        {/* Technologies directly under Title */}
                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {project.badges && Array.isArray(project.badges) ? (
                                                project.badges.map((badge, badgeIndex) => (
                                                    <span 
                                                        key={badgeIndex} 
                                                        className="px-2 py-0.5 bg-base-200 border border-base-content/10 text-base-content/70 rounded text-[10px] font-medium tracking-wide whitespace-nowrap"
                                                    >
                                                        {badge}
                                                    </span>
                                                ))
                                            ) : null}
                                        </div>

                                        <p className="text-base-content/70 text-sm mb-8 leading-relaxed">
                                            {project.description}
                                        </p>
                                        
                                        <div className="mt-auto pt-6 border-t border-white/5">
                                            {/* Minimal View Project Link - Only show if link exists */}
                                            {project.link ? (
                                                <div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                    <span>View Project</span>
                                                    <i className="fas fa-arrow-right text-xs"></i>
                                                </div>
                                            ) : (
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-base-content/30">
                                                    System Overview
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardWrapper>
                            );
                        })
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