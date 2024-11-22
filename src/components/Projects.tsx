import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Project One',
    category: 'Development',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800&auto=format'
  },
  {
    title: 'Project Two',
    category: 'Design',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format'
  },
  {
    title: 'Project Three',
    category: 'Development',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format'
  }
];

const Projects = () => {
  return (
    <section className="py-32 px-8 bg-[#f5f5f5]" data-scroll-section>
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          className="mb-24"
          data-scroll
          data-scroll-speed="1"
        >
          <h2 className="text-4xl md:text-6xl tracking-tight">Selected Work</h2>
        </motion.div>

        <div className="grid gap-32">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              data-scroll
              data-scroll-speed={0.5}
            >
              <div className="relative overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  className="aspect-[16/9]"
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl md:text-3xl">{project.title}</h3>
                    <span className="text-sm text-gray-600">{project.year}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{project.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;