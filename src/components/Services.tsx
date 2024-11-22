import { motion } from 'framer-motion';

const services = [
  {
    title: 'UI/UX DESIGN',
    description: 'Creating intuitive and engaging user experiences that blend aesthetics with functionality. Every interaction is crafted to delight and guide users effectively.'
  },
  {
    title: 'DEVELOPMENT',
    description: 'Building robust, scalable web applications using modern technologies. From interactive websites to complex web applications, I deliver solutions that perform.'
  },
  {
    title: 'DIGITAL STRATEGY',
    description: 'Developing comprehensive digital strategies that align with business objectives. I help brands establish a strong online presence and connect with their audience.'
  },
  {
    title: 'CREATIVE DIRECTION',
    description: 'Guiding the visual and conceptual elements of digital projects. I ensure every aspect of the design serves the overall vision while maintaining consistency.'
  }
];

const Services = () => {
  return (
    <section className="px-6 md:px-12 py-20 bg-gray-50">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-lg tracking-tight mb-12"
      >
        SERVICES
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg tracking-tight">{service.title}</h3>
            <p className="text-gray-600">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;