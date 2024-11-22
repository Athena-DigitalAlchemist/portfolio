import { motion } from 'framer-motion';

const AboutPage = () => {
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
              Crafting digital experiences that inspire and engage
            </h1>
          </div>
          <div className="space-y-32">
            <div>
              <h2 className="text-xs tracking-wider mb-8">ABOUT</h2>
              <p className="text-xl font-light">
                I'm a digital designer and developer passionate about creating meaningful 
                experiences that connect with people. With a focus on clean aesthetics 
                and thoughtful interactions, I help brands establish their digital presence.
              </p>
            </div>
            <div>
              <h2 className="text-xs tracking-wider mb-8">APPROACH</h2>
              <p className="text-xl font-light">
                Every project begins with understanding the core objectives and user needs. 
                Through collaborative exploration and iterative design, we create solutions 
                that are both beautiful and functional.
              </p>
            </div>
            <div>
              <h2 className="text-xs tracking-wider mb-8">EXPERTISE</h2>
              <ul className="grid grid-cols-2 gap-4 text-lg font-light">
                <li>UI/UX Design</li>
                <li>Web Development</li>
                <li>Digital Strategy</li>
                <li>Creative Direction</li>
                <li>Motion Design</li>
                <li>Brand Identity</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;