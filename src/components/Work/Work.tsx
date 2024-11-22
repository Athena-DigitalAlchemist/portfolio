import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import ImageDistortion from './ImageDistortion';
import { Project } from './types';

const projects: Project[] = [
    {
        id: 1,
        title: "Project One",
        description: "Description of project one",
        image: "/path/to/image1.jpg",
        link: "https://example.com",
        category: "Web Development",
        technologies: ["React", "TypeScript", "Three.js"],
        year: 2023
    },
    // Add more projects here
];

export default function Work() {
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="min-h-screen w-full relative flex items-center justify-center">
            <div className="absolute inset-0">
                <Canvas>
                    <Suspense fallback={null}>
                        <ImageDistortion
                            activeProject={activeProject}
                            projects={projects}
                        />
                    </Suspense>
                </Canvas>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="group relative"
                            onHoverStart={() => {
                                setActiveProject(index);
                                setIsHovered(true);
                            }}
                            onHoverEnd={() => {
                                setActiveProject(null);
                                setIsHovered(false);
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="flex flex-col md:flex-row items-start gap-4">
                                <div className="w-full md:w-1/2">
                                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
