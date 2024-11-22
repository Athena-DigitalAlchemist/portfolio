import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import ImageDistortion from './SelectedWorks/ImageDistortion';

const projects = [
    {
        title: "THE\nBLMTY",
        description: "An immersive interactive experience",
        src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
        link: "/work/blmty",
        technologies: ["Three.js", "WebGL", "React"]
    },
    {
        title: "ROOM\n237",
        description: "A cinematic journey into the unknown",
        src: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80",
        link: "/work/room-237",
        technologies: ["After Effects", "Cinema 4D", "DaVinci"]
    },
    {
        title: "FOGGY\nDREAMS",
        description: "A photographic exploration of dreams",
        src: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&w=1600&q=80",
        link: "/work/foggy-dreams",
        technologies: ["Photography", "Lightroom", "Photoshop"]
    }
];

export default function Work() {
    const [activeProject, setActiveProject] = useState<number | null>(0);

    useEffect(() => {
        setActiveProject(0);
    }, []);

    return (
        <section className="relative min-h-[80vh] w-full bg-white mt-[10vh] pb-[10vh]">
            <div className="absolute inset-0 right-0 w-1/2 ml-auto z-20">
                <Canvas>
                    <ImageDistortion
                        activeProject={activeProject}
                        projects={projects}
                    />
                </Canvas>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center pl-16 pr-[35%] pt-[5vh]">
                <h2 className="text-sm tracking-wider mb-8">SELECTED WORKS [{projects.length}]</h2>
                <div className="space-y-0.5">
                    {projects.map((project, index) => (
                        <React.Fragment key={project.title}>
                            <motion.div
                                className="cursor-none py-8"
                                onMouseEnter={() => setActiveProject(index)}
                                onMouseLeave={() => setActiveProject(0)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block"
                                >
                                    <h3 className="text-[clamp(1.5rem,4vw,3rem)] font-light tracking-[-0.02em] leading-[0.9] mb-3 whitespace-pre-line">
                                        {project.title}
                                    </h3>
                                    <p className="text-base text-black/60 mb-3 font-light">
                                        {project.description}
                                    </p>
                                    <div className="flex gap-3">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-xs tracking-wider text-black/40"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </a>
                            </motion.div>
                            {index < projects.length - 1 && (
                                <div className="w-full h-px bg-black/10" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}