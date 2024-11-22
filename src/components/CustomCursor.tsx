import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-1 h-1 bg-black rounded-full pointer-events-none z-50"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y
      }}
      transition={{ type: "spring", mass: 0.1, stiffness: 800, damping: 20 }}
    />
  );
};

export default CustomCursor;