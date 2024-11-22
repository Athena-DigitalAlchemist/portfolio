import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div className="pt-32 px-4">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-32"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-light leading-[0.9] mb-8">
              Let's create something amazing together
            </h1>
          </div>
          <div className="space-y-32">
            <div>
              <h2 className="text-xs tracking-wider mb-8">GET IN TOUCH</h2>
              <a 
                href="mailto:hello@neundex.com"
                className="text-xl font-light hover:opacity-60 transition-opacity"
              >
                hello@neundex.com
              </a>
            </div>
            <div>
              <h2 className="text-xs tracking-wider mb-8">LOCATION</h2>
              <p className="text-xl font-light">
                Barcelona, Spain
              </p>
            </div>
            <div>
              <h2 className="text-xs tracking-wider mb-8">SOCIALS</h2>
              <div className="space-y-4">
                <a 
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xl font-light hover:opacity-60 transition-opacity"
                >
                  Instagram
                </a>
                <a 
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xl font-light hover:opacity-60 transition-opacity"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;