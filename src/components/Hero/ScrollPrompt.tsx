import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const ScrollPrompt = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !arrowRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power1.inOut" }
    });

    tl.to(containerRef.current, {
      y: 10,
      duration: 1.5,
      yoyo: true,
      repeat: 1
    })
    .to(arrowRef.current, {
      y: 5,
      opacity: 0.5,
      duration: 1,
      yoyo: true,
      repeat: 1
    }, 0);

  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="flex flex-col items-center gap-2 text-lg font-light cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={() => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }}
    >
      <span className="relative overflow-hidden">
        <motion.span
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          Scroll to explore
        </motion.span>
      </span>
      <svg 
        ref={arrowRef}
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="animate-bounce"
      >
        <motion.path 
          d="M12 4L12 20M12 20L18 14M12 20L6 14" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />
      </svg>
    </motion.div>
  );
};

export default ScrollPrompt;