import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface CurtainRevealProps {
  children: React.ReactNode;
  isReady: boolean;
}

const CurtainReveal = ({ children, isReady }: CurtainRevealProps) => {
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isReady) return;

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      delay: 0.2
    });

    // Reset initial state
    gsap.set([leftCurtainRef.current, rightCurtainRef.current], {
      scaleX: 1,
      xPercent: 0
    });
    
    gsap.set(contentRef.current, {
      opacity: 0,
      scale: 1.1
    });

    // Animate sequence
    tl.to(leftCurtainRef.current, {
      xPercent: -100,
      duration: 1.8,
      ease: "power4.inOut"
    })
    .to(rightCurtainRef.current, {
      xPercent: 100,
      duration: 1.8,
      ease: "power4.inOut"
    }, "<")
    .to(contentRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power3.out"
    }, "-=1.5");

    return () => {
      tl.kill();
    };
  }, [isReady]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.div
        ref={leftCurtainRef}
        className="fixed top-0 left-0 w-1/2 h-full bg-black origin-right z-[150]"
        initial={{ scaleX: 1 }}
      />
      <motion.div
        ref={rightCurtainRef}
        className="fixed top-0 right-0 w-1/2 h-full bg-black origin-left z-[150]"
        initial={{ scaleX: 1 }}
      />
      <motion.div 
        ref={contentRef}
        className="relative z-[100] overflow-x-hidden"
        initial={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CurtainReveal;