export interface Project {
    title: string;
    description: string;
    src: string;
    link: string;
    technologies: string[];
}

export const projects: Project[] = [
    {
        title: "Project One",
        description: "A brief description of project one",
        src: "/images/works/project1.jpg",
        link: "https://project1.com",
        technologies: ["React", "TypeScript", "Three.js"]
    },
    {
        title: "Project Two",
        description: "A brief description of project two",
        src: "/images/works/project2.jpg",
        link: "https://project2.com",
        technologies: ["Next.js", "TailwindCSS", "Framer Motion"]
    },
    {
        title: "Project Three",
        description: "A brief description of project three",
        src: "/images/works/project3.jpg",
        link: "https://project3.com",
        technologies: ["React", "Three.js", "GSAP"]
    }
];
