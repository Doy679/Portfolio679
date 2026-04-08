export interface Project {
    title: string;
    description: string;
    image: string;
    badges: string[];
    link?: string;
}

export const projects: Project[] = [
    {
        title: "Brisasolei",
        description: "A high-performance resort booking platform built with Next.js, designed to streamline guest reservations. It features a fully responsive layout, real-time room availability checks, and an intuitive administrative interface for managing bookings and customer data efficiently.",
        image: "/Brisasolei.png",
        badges: ["Next.js", "React", "Tailwind CSS", "Responsive Design", "Web Application"],
        link: "https://brisasolei.netlify.app/",
    },
    {
        title: "FONUS Cebu",
        description: "A centralized web portal and administrative dashboard developed for the FONUS Cebu Federation. The platform simplifies cooperative management by providing secure access to member records, automated financial reporting, and a public portal for federation announcements and updates.",
        image: "/FonusCebu.png",
        badges: ["HTML", "CSS", "JavaScript", "Responsive Design", "Web Application"],
        link: "https://fonuscebu.vercel.app/",
    },
    {
        title: "SHS Grading System",
        description: "A comprehensive academic management system tailored for Senior High Schools. This tool automates complex grade calculations, maintains detailed student profiles, and generates official academic reports, significantly reducing the administrative workload for faculty and staff.",
        image: "/Grading%20System.png",
        badges: ["Angular", "Node.js", "MySQL", "Responsive Design", "Web Application"],
        link: "https://capstone-grading-system.vercel.app/account/login",
    },
    {
        title: "WiFi Test PH",
        description: "A specialized diagnostic web tool designed to evaluate internet connectivity performance across the Philippines. It provides users with real-time metrics on upload and download speeds, latency, and network stability, presented through a clean and accessible user interface.",
        image: "/wifitestph.png",
        badges: ["HTML", "CSS", "JavaScript", "Responsive Design", "Web Application"],
        link: "https://wifitestph.vercel.app/",
    },
    {
        title: "Decode the Culture",
        description: "A modern e-commerce storefront dedicated to urban fashion and street culture. Built with a focus on speed and visual impact, it offers a seamless shopping experience with dynamic product categories, optimized image loading, and a secure checkout workflow.",
        image: "/Decodetheculture.png",
        badges: ["Next.js", "React", "Tailwind CSS", "Responsive Design", "Web Application"],
        link: "https://decodetheculture.vercel.app/",
    },
];