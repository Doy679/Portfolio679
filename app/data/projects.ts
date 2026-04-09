export interface Project {
    title: string;
    description: string;
    image: string;
    badges: string[];
    link?: string;
    role: string;
    impact: string;
}

export const projects: Project[] = [
    {
        title: "Brisasolei",
        description: "A high-performance resort booking platform engineered for seamless guest experiences. It features a fully responsive design and real-time availability checks.",
        image: "/Brisasolei.png",
        badges: ["Next.js", "React", "Tailwind CSS", "GSAP"],
        link: "https://brisasolei.netlify.app/",
        role: "Lead Frontend Developer",
        impact: "Engineered a custom reservation flow that reduced booking drop-off rates and improved mobile conversion by 40%."
    },
    {
        title: "FONUS Cebu",
        description: "A centralized administrative dashboard and public portal for a major federation. It automates reporting and simplifies record management.",
        image: "/FonusCebu.png",
        badges: ["HTML5", "CSS3", "JavaScript", "UI/UX"],
        link: "https://fonuscebu.vercel.app/",
        role: "Frontend Developer",
        impact: "Consolidated multiple disparate workflows into a single dashboard, saving the administrative team over 15 hours per week in manual entry."
    },
    {
        title: "SHS Grading System",
        description: "A complex academic management system designed to handle thousands of student profiles and automate weighted grade calculations.",
        image: "/Grading%20System.png",
        badges: ["Angular", "Node.js", "MySQL", "Scalable UI"],
        link: "https://capstone-grading-system.vercel.app/account/login",
        role: "Full Stack Developer",
        impact: "Architected a scalable database and UI capable of processing official academic reports with 100% accuracy, replacing legacy manual systems."
    },
    {
        title: "WiFi Test PH",
        description: "A diagnostic tool for the Philippine network landscape, providing real-time metrics on connectivity and latency through a clean UI.",
        image: "/wifitestph.png",
        badges: ["JavaScript", "Responsive Design", "Data Visualization"],
        link: "https://wifitestph.vercel.app/",
        role: "Lead Developer",
        impact: "Developed a lightweight, high-precision diagnostic engine that provides accessible network insights for thousands of users across the region."
    },
    {
        title: "Decode the Culture",
        description: "An urban e-commerce powerhouse built for high visual impact and rapid performance. Focuses on seamless shopping and urban culture.",
        image: "/Decodetheculture.png",
        badges: ["Next.js", "React", "E-commerce", "Performance"],
        link: "https://decodetheculture.vercel.app/",
        role: "Lead Frontend Engineer",
        impact: "Optimized image delivery and state management to achieve a sub-1s load time, leading to a significant increase in user engagement."
    },
];