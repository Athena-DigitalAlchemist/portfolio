import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HeaderProps {
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 ${
        isScrolled ? 'bg-white' : ''
      }`}
    >
      <nav className="max-w-[1400px] mx-auto flex justify-between items-center">
        <Link to="/" className="font-mono text-sm tracking-tight">athena®</Link>
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xs tracking-wider hover:opacity-60 transition-opacity uppercase">Index</Link>
          <Link to="/about" className="text-xs tracking-wider hover:opacity-60 transition-opacity uppercase">About</Link>
          <Link to="/work" className="text-xs tracking-wider hover:opacity-60 transition-opacity uppercase">Work</Link>
          <Link 
            to="/contact" 
            className="text-xs tracking-wider uppercase px-4 py-2 bg-black text-white transform transition-transform hover:scale-105"
          >
            Let's Talk
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;