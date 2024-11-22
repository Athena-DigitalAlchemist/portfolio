import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SplitType from 'split-type';
import gsap from 'gsap';
import { useCursorHover } from '../hooks/useCursorHover';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useCursorHover(titleRef);

  const heroText = [
    'Creative',
    'Solutions for',
    'Modern Websites',
    'and Brands'
  ];

  useEffect(() => {
    if (!titleRef.current) return;

    const text = new SplitType(titleRef.current, { 
      types: 'lines, chars',
      lineClass: 'overflow-hidden'
    });

    gsap.fromTo(
      text.chars,
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power4.out',
        delay: 2
      }
    );

    return () => {
      text.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center px-4 overflow-hidden"
    >
      <div className="max-w-[1400px] w-full mx-auto translate-y-[20vh]">
        <h1 
          ref={titleRef}
          className="text-[clamp(2rem,8vw,7.5rem)] font-bold tracking-[-0.02em] leading-[0.9] uppercase text-black cursor-none mb-8"
        >
          {heroText.map((line, index) => (
            <span key={index}>
              {line}
              {index < heroText.length - 1 && <br />}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="text-[10px] font-mono tracking-wider"
        >
          PORTFOLIO® / 2024
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;