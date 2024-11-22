import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingCounterProps {
  onComplete: () => void;
}

const LoadingCounter: React.FC<LoadingCounterProps> = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;
    const duration = 2000; // 2 seconds for the counter

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(Math.floor((progress / duration) * 100), 100);

      setCounter(percentage);

      if (percentage < 100) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 500);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-white flex items-center justify-center z-50"
    >
      <motion.div 
        className="text-center"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[16px] font-mono tracking-tight text-black">
          {counter}%
        </h1>
      </motion.div>
    </motion.div>
  );
};

export default LoadingCounter;