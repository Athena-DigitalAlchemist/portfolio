import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section className="px-4 py-32 bg-black text-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-light mb-8">
            Let's bring your vision
            <br />
            to life
          </h2>
          <a 
            href="mailto:hello@athbix.com"
            className="inline-block text-sm tracking-wider hover:opacity-60 transition-opacity"
          >
            START A PROJECT
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;