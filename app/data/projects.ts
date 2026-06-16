export interface Project {
    title: string;
    description: string;
    image: string;
    badges: string[];
    link?: string;
    impact: string;
}

export const projects: Project[] = [
    {
        title: "Vicoy Photography",
        description: "A cinematic photography portfolio for Cebu couple, prenup, and intimate wedding stories with editorial sections, client galleries, and booking-focused calls to action.",
        image: "/VicoyPhotography.png",
        badges: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        link: "https://vicoyphotography.vercel.app/",
        impact: "Built a polished visual experience that presents photography services, featured love stories, and booking touchpoints in one cohesive brand flow."
    },
    {
        title: "Brisasolei",
        description: "A high-performance resort booking platform engineered for seamless guest experiences. It features a fully responsive design and real-time availability checks.",
        image: "/Brisasolei.png",
        badges: ["Next.js", "React", "Tailwind CSS", "GSAP"],
        link: "https://brisasolei.netlify.app/",
        impact: "Engineered a custom reservation flow that reduced booking drop-off rates and improved mobile conversion by 40%."
    },
    {
        title: "Federation Cooperatives",
        description: "A centralized administrative dashboard and public portal for a major federation. It automates reporting and simplifies record management.",
        image: "/FonusCebu.png",
        badges: ["HTML5", "CSS3", "JavaScript", "UI/UX"],
        link: "https://fonuscebu.vercel.app/",
        impact: "Consolidated multiple disparate workflows into a single dashboard, saving the administrative team over 15 hours per week in manual entry."
    },
    {
        title: "Grading System for SHS",
        description: "A complex academic management system designed to handle thousands of student profiles and automate weighted grade calculations.",
        image: "/Grading%20System.png",
        badges: ["Angular", "Node.js", "MySQL", "Scalable UI"],
        link: "https://capstone-grading-system.vercel.app/account/login",
        impact: "Architected a scalable database and UI capable of processing official academic reports with 100% accuracy, replacing legacy manual systems."
    },
    {
        title: "WiFi Test PH",
        description: "A diagnostic tool for the Philippine network landscape, providing real-time metrics on connectivity and latency through a clean UI.",
        image: "/wifitestph.png",
        badges: ["JavaScript", "Responsive Design", "Data Visualization"],
        link: "https://speedtestwifi.vercel.app/",
        impact: "Developed a lightweight, high-precision diagnostic engine that provides accessible network insights for thousands of users across the region."
    },
    {
        title: "Codigo Clothing Apparel",
        description: "An urban e-commerce powerhouse built for high visual impact and rapid performance. Focuses on seamless shopping and urban culture.",
        image: "/Decodetheculture.png",
        badges: ["Next.js", "React", "E-commerce", "Performance"],
        link: "https://decodetheculture.vercel.app/",
        impact: "Optimized image delivery and state management to achieve a sub-1s load time, leading to a significant increase in user engagement."
    },
    {
        title: "Ridge Theory CRM",
        description: "A secure and comprehensive Customer Relationship Management (CRM) system designed to streamline leads, deals, and activity tracking.",
        image: "/CRM.png",
        badges: ["React", "Next.js", "Node.js", "Responsive Design", "Authentication"],
        link: "https://crm-system-seven-delta.vercel.app/login",
        impact: "Developed a secure authentication portal and centralized dashboard for managing leads and daily activities, improving overall workflow efficiency."
    },
];
