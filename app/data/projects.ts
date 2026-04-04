export interface Project {
    title: string;
    description: string;
    image: string;
    badges: string[];
    link?: string;
}

export const projects: Project[] = [
    {
        title: "Brisasolei Resort Booking",
        description: "A modern resort booking platform for Brisasolei. Features a sleek UI for room selection and an integrated booking engine.",
        image: "/Brisasolei.png",
        badges: ["Next.js", "React", "Tailwind CSS", "TypeScript", "UI/UX"],
        link: "https://brisasolei.netlify.app/",
    },
    {
        title: "FONUS Cebu Federation Cooperatives",
        description: "A comprehensive platform and admin dashboard for the FONUS Cebu Federation. Includes a public portal and a secure management system.",
        image: "/FonusCebu.png",
        badges: ["HTML", "CSS", "JavaScript", "Bootstrap", "Web Application", "Admin Dashboard"],
        link: "https://fonuscebu.vercel.app/",
    },
    {
        title: "Grading System for Senior High School",
        description: "A high-performance system for senior high schools, featuring automated grade calculation, student records, and academic reporting.",
        image: "/Grading%20System.png",
        badges: ["HTML", "CSS", "JavaScript", "Angular", "Bootstrap", "Node.js", "WebSocket", "MySQL", "Postman", "VSCode"],
        link: "#",
    },
    {
        title: "WiFi Test PH",
        description: "A responsive web tool for testing network performance in the Philippines. Provides real-time insights into speed and stability.",
        image: "/wifitestph.png",
        badges: ["HTML", "CSS", "JavaScript", "Responsive Design", "Web Application"],
        link: "https://wifitestph.vercel.app/",
    },
    {
        title: "Decode the Culture (Codigo Street)",
        description: "An e-commerce platform for streetwear and urban culture. Features product collections and a seamless shopping experience.",
        image: "/Decodetheculture.png",
        badges: ["E-commerce", "Next.js", "React", "Tailwind CSS", "Brand Identity"],
        link: "https://decodetheculture.vercel.app/",
    },
];