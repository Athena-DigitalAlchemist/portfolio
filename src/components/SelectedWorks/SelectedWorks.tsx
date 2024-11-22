import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { projects } from './data';
import ImageDistortion from './ImageDistortion';
import { motion } from 'framer-motion';

export default function SelectedWorks() {
    const [activeProject, setActiveProject] = useState<number | null>(null);

    return (
        <section className="relative h-screen w-full bg-white">
            <div className="absolute inset-0">
                <Canvas>
                    <ImageDistortion
                        activeProject={activeProject}
                        projects={projects}
                    />
                </Canvas>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center px-20">
                <h2 className="text-5xl font-bold mb-16">Selected Works</h2>
                <div className="space-y-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            className="cursor-none"
                            onMouseEnter={() => setActiveProject(index)}
                            onMouseLeave={() => setActiveProject(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                            >
                                <h3 className="text-3xl font-medium mb-2 group-hover:text-black/70">
                                    {project.title}
                                </h3>
                                <p className="text-lg text-black/60 mb-2">
                                    {project.description}
                                </p>
                                <div className="flex gap-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-sm text-black/40"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
