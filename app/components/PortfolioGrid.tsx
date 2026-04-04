
'use client';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import Image from "next/image";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioGrid() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    tl.from(".scroll-item", {
      y: 100,
      opacity: 0,
      scale: 0.8,
      rotation: -5,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
    });
  }, { scope: container });

  return (
    <div ref={container} className="p-10">
        <h2 id="projects" className="text-4xl font-bold text-center mb-10">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {projects.map((project, index) => (
            <div key={index} className="card w-96 bg-base-100 shadow-xl scroll-item">
              <figure><Image src={project.image} alt={project.title} width={500} height={500} /></figure>
              <div className="card-body">
                  <h2 className="card-title">{project.title}</h2>
                  <p>{project.description}</p>
                  <div className="card-actions justify-end">
                  <a href={project.link} className="btn btn-primary">View Project</a>
                  </div>
              </div>
            </div>
          ))}

        </div>
    </div>
  );
}
