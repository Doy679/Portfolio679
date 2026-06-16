'use client';
import React from 'react';
import SkillCard from './SkillCard';
import HackerText from './HackerText';

const Skills = () => {
    const skillCategories = [
        {
            title: "Languages",
            icon: "fas fa-code",
            className: "md:col-span-5",
            skills: [
                { name: "JavaScript", icon: "fab fa-js-square", color: "#F7DF1E" },
                { name: "Typescript", icon: "fas fa-file-code", color: "#3178C6" },
                { name: "HTML, CSS", icon: "fab fa-html5", color: "#E34F26" }
            ]
        },
        {
            title: "Frameworks",
            icon: "fas fa-layer-group",
            className: "md:col-span-7",
            skills: [
                { name: "React", icon: "fab fa-react", color: "#61DAFB" },
                { name: "Next.js", icon: "fas fa-globe", color: "#FFFFFF" },
                { name: "Daisy UI", icon: "fas fa-fill-drip", color: "#EC4899" },
                { name: "Tailwind CSS", icon: "fab fa-css3-alt", color: "#06B6D4" }
            ]
        },
        {
            title: "Tools & Technologies",
            icon: "fas fa-tools",
            className: "md:col-span-6",
            skills: [
                { name: "Node.js", icon: "fab fa-node-js", color: "#339933" },
                { name: "npm", icon: "fab fa-npm", color: "#CB3837" },
                { name: "UI/UX Design", icon: "fas fa-pen-nib", color: "#A855F7" },
                { name: "Git/GitHub", icon: "fab fa-git-alt", color: "#F05032" },
                { name: "AI-Assisted Development", icon: "fas fa-robot", color: "#10B981" }
            ]
        },
        {
            title: "Core Competencies",
            icon: "fas fa-users",
            className: "md:col-span-6",
            skills: [
                { name: "Team Collaboration", icon: "fas fa-people-group", color: "#3B82F6" },
                { name: "Problem Solving", icon: "fas fa-lightbulb", color: "#FBBF24" },
                { name: "Agile/Scrum", icon: "fas fa-sync-alt", color: "#14B8A6" },
                { name: "Adaptability", icon: "fas fa-arrows-turn-to-dots", color: "#8B5CF6" }
            ]
        },
        {
            title: "OS & Environments",
            icon: "fas fa-desktop",
            className: "md:col-span-12",
            skills: [
                { name: "Windows", icon: "fab fa-windows", color: "#0078D4" },
                { name: "Linux", icon: "fab fa-linux", color: "#FCC624" },
                { name: "Command Line", icon: "fas fa-terminal", color: "#4D4D4D" }
            ]
        }
    ];

    return (
        <section id="skills" className="py-24 bg-base-200/50">
            <div className="container mx-auto px-6 md:px-10 lg:px-20">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-black font-montserrat tracking-[0.2em] uppercase text-base-content">
                        <HackerText text="My Skills" />
                    </h2>
                    <div className="w-16 h-1 bg-primary/30 mx-auto mt-6 rounded-full shadow-[0_0_20px_rgba(var(--p),0.2)]"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {skillCategories.map((cat, idx) => (
                        <SkillCard 
                            key={idx}
                            title={cat.title}
                            icon={cat.icon}
                            skills={cat.skills}
                            className={cat.className}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;