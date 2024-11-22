import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const projects = {
  'blmty': {
    title: "THE BLMTY",
    category: "Interactive Experience",
    year: "2024",
    description: "An immersive digital experience exploring the intersection of technology and human interaction.",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=2400&q=80",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80"
    ],
    details: {
      client: "BLMTY Studios",
      services: ["Interactive Design", "Development", "Art Direction"],
      technology: ["Three.js", "WebGL", "React"]
    }
  },
  // Add more projects here
};

const ProjectPage = () => {
  const { slug } = useParams();
  const project = projects[slug as keyof typeof projects];

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="pt-32 px-4">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32"
        >
          <p className="text-xs tracking-wider text-gray-600 mb-4">
            {project.category}
          </p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-16">
            {project.title}
          </h1>
          <p className="text-xl font-light max-w-2xl">
            {project.description}
          </p>
        </motion.div>

        <div className="space-y-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <img 
              src={project.coverImage} 
              alt={project.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <h3 className="text-xs tracking-wider mb-4">CLIENT</h3>
              <p className="text-lg font-light">{project.details.client}</p>
            </div>
            <div>
              <h3 className="text-xs tracking-wider mb-4">SERVICES</h3>
              <ul className="space-y-2">
                {project.details.services.map((service, index) => (
                  <li key={index} className="text-lg font-light">{service}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs tracking-wider mb-4">TECHNOLOGY</h3>
              <ul className="space-y-2">
                {project.details.technology.map((tech, index) => (
                  <li key={index} className="text-lg font-light">{tech}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-16">
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <img 
                  src={image} 
                  alt={`${project.title} - ${index + 1}`}
                  className="w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;