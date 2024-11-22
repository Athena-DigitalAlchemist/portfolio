import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: "THE BLMTY",
    category: "Interactive Experience",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
    year: "2024",
    slug: "blmty"
  },
  {
    title: "ROOM 237",
    category: "Film Production",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80",
    year: "2023",
    slug: "room-237"
  },
  {
    title: "FOGGY DREAMS",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&w=1600&q=80",
    year: "2023",
    slug: "foggy-dreams"
  },
  // Add more projects here
];

const WorkPage = () => {
  return (
    <div className="pt-32 px-4">
      <div className="max-w-[1600px] mx-auto">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs tracking-wider mb-32"
        >
          ALL WORK
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projects.map((project, index) => (
            <Link 
              key={index}
              to={`/work/${project.slug}`}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="aspect-[4/3] overflow-hidden mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </motion.div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs tracking-wider text-gray-600 mb-1">
                      {project.category}
                    </p>
                    <h2 className="text-lg font-light tracking-tight">
                      {project.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs tracking-wider">{project.year}</span>
                    <motion.div
                      whileHover={{ x: 2, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkPage;