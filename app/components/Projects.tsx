'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import HackerText from './HackerText';
import { projects, Project } from '../data/projects';
import { Icon } from '../lib/icons';
import { TiltCard } from './TiltCard';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const detailsModalRef = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState<'All' | 'Frontend / UI' | 'Full-Stack' | 'Tools / Utilities'>('All');
  const [displayedProjects, setDisplayedProjects] = useState(projects);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState<Project | null>(null);

  const categories = ['All', 'Frontend / UI', 'Full-Stack', 'Tools / Utilities'] as const;

  const handleCategoryChange = (category: typeof activeCategory) => {
    if (category === activeCategory) return;
    
    // Animate current cards out
    gsap.to(cardsContainerRef.current?.children || [], {
      opacity: 0,
      y: 15,
      scale: 0.98,
      duration: 0.25,
      stagger: 0.03,
      ease: 'power2.in',
      onComplete: () => {
        setActiveCategory(category);
        const filtered = category === 'All' ? projects : projects.filter(p => p.category === category);
        setDisplayedProjects(filtered);
      }
    });
  };

  const closeLightbox = () => {
    if (lightboxRef.current) {
      gsap.to(lightboxRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => setSelectedImage(null)
      });
      gsap.to(lightboxRef.current.querySelector('.lightbox-content'), {
        scale: 0.95,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      });
    } else {
      setSelectedImage(null);
    }
  };

  const closeDetailsModal = () => {
    if (detailsModalRef.current) {
      gsap.to(detailsModalRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => setSelectedProjectDetails(null)
      });
      gsap.to(detailsModalRef.current.querySelector('.modal-content'), {
        scale: 0.95,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      });
    } else {
      setSelectedProjectDetails(null);
    }
  };

  useEffect(() => {
    if (selectedImage && lightboxRef.current) {
      gsap.fromTo(lightboxRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(lightboxRef.current.querySelector('.lightbox-content'),
        { scale: 0.93, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' }
      );
    }
  }, [selectedImage]);

  useEffect(() => {
    if (selectedProjectDetails && detailsModalRef.current) {
      gsap.fromTo(detailsModalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(detailsModalRef.current.querySelector('.modal-content'),
        { scale: 0.93, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' }
      );
    }
  }, [selectedProjectDetails]);

  // Lock root scroll when lightbox or case-study modals are active
  useEffect(() => {
    const isLocked = !!selectedImage || !!selectedProjectDetails;
    if (isLocked) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedImage, selectedProjectDetails]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    
    if (!cardsContainerRef.current) return;
    
    // Animate in the new filtered cards
    gsap.fromTo(cardsContainerRef.current.children,
      { opacity: 0, y: 25, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
        overwrite: 'auto'
      }
    );
  }, [displayedProjects]);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    
    mm.add(
      {
        reduceMotion: '(prefers-reduced-motion: reduce)',
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)'
      },
      (context) => {
        const { reduceMotion, isDesktop } = context.conditions as { reduceMotion: boolean; isDesktop: boolean };
        const cards = cardsContainerRef.current?.querySelectorAll('.project-card-wrapper') || [];

        if (reduceMotion) {
          gsap.set(cards, { x: 0, y: 0, opacity: 1 });
          return;
        }

        cards.forEach((card, index) => {
          const isEven = index % 2 === 0;
          
          if (isDesktop) {
            // Staggered slide left/right on Desktop
            gsap.fromTo(card,
              { 
                x: isEven ? -100 : 100, 
                y: 0,
                opacity: 0 
              },
              {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                }
              }
            );
          } else {
            // Clean Slide-Up on Mobile/Tablet to completely avoid horizontal wiggles
            gsap.fromTo(card,
              { 
                x: 0,
                y: 40,
                opacity: 0 
              },
              {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 1.0,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 88%',
                  toggleActions: 'play none none none',
                }
              }
            );
          }
        });
      }
    );
    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [displayedProjects] });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-base-200 overflow-hidden py-24 lg:py-32"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] bottom-1/4 left-10"></div>
        <div className="absolute w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] top-1/4 right-10"></div>
      </div>

      <div className="container mx-auto px-6 md:px-10 lg:px-20 relative z-10">
        <div className="mb-12 lg:mb-16 text-center lg:text-left">
          <h2 className="text-3xl lg:text-5xl font-black font-montserrat uppercase tracking-tight text-base-content">
            <HackerText text="Selected Works" />
          </h2>
          <div className="w-12 h-1 bg-primary mt-3 mx-auto lg:mx-0"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 lg:mb-20 max-w-2xl mx-auto">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-primary-content shadow-[0_8px_20px_rgba(var(--p),0.25)] border-transparent'
                    : 'bg-base-100/50 backdrop-blur-sm border border-base-content/10 text-base-content/75 hover:bg-base-content/5 hover:border-base-content/20'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects Alternating Grid */}
        <div 
          ref={cardsContainerRef}
          className="grid gap-16 lg:gap-24 max-w-5xl mx-auto"
        >
          {displayedProjects.map((project, index) => (
            <div key={project.title} className="project-card-wrapper">
              <TiltCard
                max={3}
                className={`group flex flex-col ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } bg-base-100/40 backdrop-blur-md rounded-3xl border border-base-content/10 shadow-2xl overflow-hidden transition-all duration-500 hover:border-primary/30`}
              >
                {/* Browser Mockup Header & Image Section */}
                <div className="flex flex-col w-full lg:w-[45%] bg-base-300 border-r border-base-content/5 relative min-h-[240px] lg:min-h-auto">
                  <div className="bg-base-200/80 px-4 py-2.5 flex items-center gap-1.5 border-b border-base-content/5 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-error/60"></div>
                    <div className="w-2 h-2 rounded-full bg-warning/60"></div>
                    <div className="w-2 h-2 rounded-full bg-success/60"></div>
                    <div className="text-[9px] font-mono text-base-content/40 ml-4 overflow-hidden text-ellipsis whitespace-nowrap max-w-[180px] bg-base-100 px-3 py-0.5 rounded-md border border-base-content/5 select-none">
                      {project.link ? project.link.replace('https://', '').replace('/', '') : 'project.local'}
                    </div>
                  </div>
                  <div 
                    className="relative flex-grow w-full aspect-[16/10] lg:aspect-auto overflow-hidden bg-base-900/40 p-1.5 sm:p-2.5 flex items-center justify-center cursor-zoom-in"
                    onClick={() => setSelectedImage(project.image)}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 500px"
                        priority={index < 2}
                      />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-grow lg:w-[55%] min-h-[300px] lg:min-h-auto">
                  <div>
                    {/* Category Label */}
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/80 font-bold mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-montserrat tracking-tight uppercase text-base-content mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-base-content/75 font-medium leading-relaxed mb-5 text-xs sm:text-sm lg:text-base">
                      {project.description}
                    </p>
                    <div className="text-primary/95 text-xs sm:text-sm italic font-semibold border-l-2 border-primary/45 pl-4 mb-6">
                      <span className="uppercase text-[9px] tracking-widest block mb-1 opacity-50 font-mono">Impact:</span>
                      {project.impact}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-5 border-t border-base-content/5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.badges.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-base-content/5 border border-base-content/10 rounded-lg text-base-content/70 transition-all duration-300 hover:bg-primary/10 hover:border-primary/20 hover:text-primary cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProjectDetails(project)}
                        className="inline-flex items-center justify-between gap-2.5 py-2 px-4 rounded-xl bg-base-content/15 border border-base-content/10 text-base-content hover:bg-primary hover:text-primary-content hover:border-transparent font-black uppercase tracking-wider text-[9px] sm:text-[10px] shadow-lg shadow-black/5 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                      >
                        Details <Icon name="fa-code" className="text-[9px] sm:text-[10px]" />
                      </button>
                      {project.link && project.link !== '#' && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-between gap-2.5 py-2 px-4 rounded-xl bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-wider text-[9px] sm:text-[10px] shadow-lg shadow-primary/5 transition-all duration-300 hover:bg-primary/20 hover:scale-[1.03]"
                        >
                          Explore <Icon name="fa-arrow-up-right-from-square" className="text-[9px] sm:text-[10px]" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          ref={lightboxRef}
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8 cursor-zoom-out opacity-0"
          onClick={closeLightbox}
        >
          {/* Floating Close Button */}
          <button 
            className="absolute top-5 right-5 z-[210] bg-black/60 backdrop-blur-md text-white border border-white/15 hover:border-primary/50 hover:bg-black/80 w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-black/40 text-lg"
            onClick={closeLightbox}
          >
            <Icon name="fa-xmark" className="text-white" />
          </button>
          
          {/* Lightbox Content Container (Click anywhere to close) */}
          <div 
            className="lightbox-content relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center p-2 opacity-0"
          >
            <Image
              src={selectedImage}
              alt="Project Preview"
              width={1400}
              height={900}
              className="object-contain max-h-[80vh] rounded-2xl shadow-2xl border border-white/10 select-none bg-base-950 p-1"
            />
          </div>
        </div>
      )}

      {/* Project Details Modal (Case Studies) */}
      {selectedProjectDetails && (
        <div 
          ref={detailsModalRef}
          data-lenis-prevent
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 md:p-8 overflow-y-auto opacity-0"
          onClick={closeDetailsModal}
        >
          {/* Modal Container */}
          <div 
            data-lenis-prevent
            className="modal-content bg-base-100 border border-base-content/10 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative my-auto flex flex-col opacity-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-5 right-5 z-30 bg-black/50 backdrop-blur-md text-white border border-white/10 hover:border-primary/50 hover:bg-black/75 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
              onClick={closeDetailsModal}
            >
              <Icon name="fa-xmark" className="text-white" />
            </button>

            {/* Top Showcase Image Banner */}
            <div className="relative w-full h-[180px] sm:h-[240px] bg-base-300 overflow-hidden">
              <Image
                src={selectedProjectDetails.image}
                alt={selectedProjectDetails.title}
                fill
                className="object-cover object-top opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/30 to-transparent"></div>
              
              {/* Category & Title */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md font-bold inline-block mb-2">
                  {selectedProjectDetails.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-montserrat tracking-tight uppercase text-base-content">
                  {selectedProjectDetails.title}
                </h3>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div data-lenis-prevent className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto space-y-6">
              {/* Description */}
              <div>
                <p className="text-sm sm:text-base text-base-content/80 leading-relaxed font-medium">
                  {selectedProjectDetails.description}
                </p>
              </div>

              {/* Challenge (Problem) */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-error/80 font-bold flex items-center gap-2">
                  <Icon name="fa-exclamation-circle" className="text-[11px]" /> The Challenge
                </h4>
                <p className="text-sm text-base-content/75 leading-relaxed bg-error/5 border border-error/10 p-4 rounded-2xl font-medium">
                  {selectedProjectDetails.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-success/80 font-bold flex items-center gap-2">
                  <Icon name="fa-check-circle" className="text-[11px]" /> The Solution
                </h4>
                <p className="text-sm text-base-content/75 leading-relaxed bg-success/5 border border-success/10 p-4 rounded-2xl font-medium">
                  {selectedProjectDetails.solution}
                </p>
              </div>

              {/* Key Contributions */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-primary/80 font-bold">
                  Key Accomplishments & Contributions
                </h4>
                <ul className="space-y-2.5">
                  {selectedProjectDetails.contributions.map((item, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-base-content/80 flex items-start gap-3 leading-relaxed">
                      <span className="text-primary mt-1 font-bold">✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Badges / Tech stack */}
              <div className="pt-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-base-content/40 font-bold mb-3">
                  Technologies Applied
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProjectDetails.badges.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2.5 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-base-content/5 border border-base-content/10 rounded-lg text-base-content/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 bg-base-200/50 border-t border-base-content/5 rounded-b-3xl flex items-center justify-between gap-4">
              <p className="text-[10px] sm:text-xs text-base-content/50 font-semibold hidden md:block max-w-[40%]">
                Impact: {selectedProjectDetails.impact}
              </p>
              
              <div className="flex items-center gap-3 w-full md:w-auto ml-auto">
                <button 
                  onClick={closeDetailsModal}
                  className="btn btn-sm btn-outline border-base-content/10 text-base-content hover:bg-base-content/5 w-1/2 md:w-auto px-6 cursor-pointer"
                >
                  Close
                </button>
                {selectedProjectDetails.link && selectedProjectDetails.link !== '#' && (
                  <a
                    href={selectedProjectDetails.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary w-1/2 md:w-auto px-6 cursor-pointer shadow-lg shadow-primary/10"
                  >
                    Launch Live
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
