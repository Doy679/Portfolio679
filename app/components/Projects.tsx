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
        gsap.fromTo(projectsRef.current,
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: projectsRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        const projectCards = gsap.utils.toArray<HTMLElement>('.project-card');
        console.log(projectCards);
        if (projectCards && Array.isArray(projectCards)) {
            projectCards.forEach(card => {
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 80%',
                    onEnter: () => {
                        gsap.fromTo(card,
                            { opacity: 0, y: 50, willChange: 'transform, opacity' },
                            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'all' }
                        );
                    },
                    once: true,
                });
            });
        }
    }, { scope: projectsRef });

    return (
        <section id="projects" className="py-20 bg-base-200 opacity-0" ref={projectsRef}>
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
                                className="group bg-base-100 rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-all hover:-translate-y-2 block cursor-pointer project-card shadow-2xl"
                            >
                                <div className="relative w-full aspect-video bg-base-300/30 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-base-100/40 to-transparent z-10 opacity-30"></div>
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105 p-2" 
                                    />
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex gap-2">
                                            {project.title.includes("IN DEVELOPMENT") && (
                                                <span className="text-sm font-medium text-yellow-400 tracking-wider uppercase flex items-center gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                                                    In Development
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                                        {project.title.replace(" (IN DEVELOPMENT)", "")}
                                    </h3>
                                    <p className="text-slate-400 text-base mb-8 leading-relaxed line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {project.badges && Array.isArray(project.badges) ? (
                                            project.badges.slice(0, 5).map((badge, badgeIndex) => (
                                                <span 
                                                    key={badgeIndex} 
                                                    className="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-300 rounded-md text-sm font-medium"
                                                >
                                                    {badge}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-sm text-slate-500">No badges</span>
                                        )}
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10">
                            <p className="text-slate-400">No projects to display</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;