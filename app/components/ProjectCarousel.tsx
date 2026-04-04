'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../data/projects';

interface ProjectCarouselProps {
    projects: Project[];
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Only show projects that have links or are particularly featured
    const featuredProjects = projects.filter(p => p.link);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    };

    // Auto-advance logic
    useEffect(() => {
        if (featuredProjects.length <= 1) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // 5 seconds interval

        return () => clearInterval(interval);
    }, [currentIndex, featuredProjects.length]);

    if (featuredProjects.length === 0) return null;

    const currentProject = featuredProjects[currentIndex];

    return (
        <div className="relative w-full max-w-6xl mx-auto mb-20 px-4">
            <div className="relative overflow-hidden rounded-3xl bg-base-300 shadow-2xl border border-white/5 aspect-[16/9] md:aspect-[21/9]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
                        <Image 
                            src={currentProject.image} 
                            alt={currentProject.title}
                            fill
                            priority
                            className="object-cover object-top"
                        />
                        
                        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <div className="flex gap-2 mb-4">
                                    {currentProject.badges.slice(0, 3).map((badge, i) => (
                                        <span key={i} className="px-2 py-1 bg-primary/20 border border-primary/30 text-[10px] uppercase font-bold text-primary tracking-tighter rounded">
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                                <h4 className="text-xl md:text-3xl lg:text-5xl font-black mb-4 text-white font-montserrat leading-tight">
                                    {currentProject.title.replace(" (IN DEVELOPMENT)", "")}
                                </h4>
                                <p className="text-gray-300 text-[12px] md:text-sm lg:text-base mb-8 line-clamp-3 md:line-clamp-none max-w-lg">
                                    {currentProject.description}
                                </p>
                                {currentProject.link && (
                                    <a 
                                        href={currentProject.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="btn btn-primary btn-md md:btn-lg rounded-full px-8 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all group"
                                    >
                                        Visit Website
                                        <i className="fas fa-external-link-alt ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                                    </a>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                <div className="absolute bottom-8 right-8 z-30 flex gap-3">
                    <button 
                        onClick={prevSlide}
                        className="btn btn-circle btn-ghost bg-white/10 backdrop-blur-md hover:bg-white/20 border-white/10 text-white"
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="btn btn-circle btn-ghost bg-white/10 backdrop-blur-md hover:bg-white/20 border-white/10 text-white"
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>

                {/* Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                    {featuredProjects.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === i ? 'w-8 bg-primary' : 'w-2 bg-white/30'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCarousel;
