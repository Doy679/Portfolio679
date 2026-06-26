'use client';
import React from 'react';

interface Skill {
    name: string;
    icon: string;
    color: string;
}

interface SkillCardProps {
    title: string;
    icon: string;
    skills: Skill[];
    className?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, icon, skills, className = "" }) => {
    return (
        <div 
            className={`skill-card group relative p-8 rounded-3xl glass-card border border-base-content/10 transition-all duration-500 overflow-hidden will-change-transform ${className}`}
        >
            {/* Animated Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-500 shadow-lg shadow-primary/5 shrink-0">
                        <i className={`${icon} text-2xl`}></i>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black font-montserrat uppercase tracking-tight text-base-content leading-[1.1] flex-1 min-w-[200px]">
                        {title}
                    </h3>
                </div>

                <div className="flex flex-wrap gap-4 mt-auto">
                    {skills.map((skill, i) => (
                        <div 
                            key={i} 
                            className="skill-logo flex items-center gap-3 bg-base-300/30 backdrop-blur-md px-4 py-2.5 rounded-xl border border-base-content/5 hover:border-primary/30 hover:bg-base-300/50 transition-all duration-300 group/item will-change-transform"
                            title={skill.name}
                        >
                            <i className={`${skill.icon} text-xl transition-transform duration-300 group-hover/item:scale-110`} style={{ color: skill.color }}></i>
                            <span className="text-xs font-bold uppercase tracking-widest text-base-content/60 group-hover/item:text-primary transition-colors">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillCard;
