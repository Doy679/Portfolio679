export interface Project {
    title: string;
    description: string;
    image: string;
    badges: string[];
    link?: string;
}

export const projects: Project[] = [
    {
        title: "Grading System for Senior High School",
        description: "A comprehensive grading system designed specifically for senior high school institutions, featuring grade calculation, student record management, and academic reporting capabilities.",
        image: "/Grading%20System.png",
        badges: ["HTML", "CSS", "JavaScript", "Angular", "Bootstrap", "Node.js", "WebSocket", "MySQL", "Postman", "VSCode"],
    },
];