import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useMousePosition from '../hooks/useMousePosition';

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.matches('a, button, input, [role="button"], [data-hover]');
      setIsHovered(isClickable);
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', () => setIsHovered(false));

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', () => setIsHovered(false));
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: x - 8,
          y: y - 8,
          scale: isHovered ? 1.5 : 1
        }}
        transition={{ type: "spring", mass: 0.3, stiffness: 800, damping: 40 }}
      >
        <div className="w-4 h-4 bg-black rounded-full" />
      </motion.div>

      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: x - 16,
          y: y - 16,
          scale: isHovered ? 2 : 1
        }}
        transition={{ type: "spring", mass: 0.7, stiffness: 400, damping: 30 }}
      >
        <div className="w-8 h-8 border border-black rounded-full opacity-50" />
      </motion.div>
    </>
  );
};

export default CustomCursor;