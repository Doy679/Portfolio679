export interface Project {
    title: string;
    description: string;
    image: string;
    badges: string[];
    link?: string;
}

export const projects: Project[] = [
    {
        title: "Brisasolei Resort Booking (IN DEVELOPMENT)",
        description: "A modern resort booking and management platform designed for Brisasolei. Features a sleek UI for room selection and an upcoming booking engine. Currently in active development.",
        image: "/Brisasolei.png",
        badges: ["Resort Booking", "UI/UX", "Development", "Frontend", "React"],
        link: "https://brisasolei.netlify.app/",
    },
    {
        title: "FONUS Cebu Federation Cooperatives",
        description: "A comprehensive platform and admin dashboard built for the FONUS Cebu Federation of Cooperatives. Includes a public-facing portal and a secure admin management system (https://fc2025.netlify.app/admin).",
        image: "/FonusCebu.png",
        badges: ["Web Application", "Admin Dashboard", "UI/UX", "Frontend", "Backend"],
        link: "https://fc2025.netlify.app/",
    },
    {
        title: "Grading System for Senior High School",
        description: "A comprehensive grading system designed specifically for senior high school institutions, featuring grade calculation, student record management, and academic reporting capabilities.",
        image: "/Grading%20System.png",
        badges: ["HTML", "CSS", "JavaScript", "Angular", "Bootstrap", "Node.js", "WebSocket", "MySQL", "Postman", "VSCode"],
    },
];