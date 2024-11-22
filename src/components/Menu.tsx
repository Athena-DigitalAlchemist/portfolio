import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu = ({ isOpen, onClose }: MenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-white"
        >
          <div className="h-full px-4 py-4">
            <div className="flex justify-between items-center mb-16">
              <span className="font-mono text-sm tracking-tight">athbix®</span>
              <button 
                onClick={onClose}
                className="p-2 hover:opacity-60 transition-opacity"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="max-w-[1400px] mx-auto">
              <ul className="space-y-4 text-4xl md:text-6xl font-light">
                <li>
                  <a href="/work" className="hover:opacity-60 transition-opacity">All Work</a>
                </li>
                <li>
                  <a href="/about" className="hover:opacity-60 transition-opacity">About</a>
                </li>
                <li>
                  <a href="/contact" className="hover:opacity-60 transition-opacity">Let's Talk</a>
                </li>
              </ul>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;