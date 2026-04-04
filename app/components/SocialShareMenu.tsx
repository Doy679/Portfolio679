'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const socialLinks = [
  { id: 'github', icon: 'fa-brands fa-github', url: 'https://github.com/Doy679', label: 'GitHub' },
  { id: 'linkedin', icon: 'fa-brands fa-linkedin-in', url: 'https://www.linkedin.com/in/ron-dether-gonzales-6551942b8/', label: 'LinkedIn' },
  { id: 'facebook', icon: 'fa-brands fa-facebook-f', url: 'https://www.facebook.com/Gonzales.rondether.2001?mibextid=ZbWKwL', label: 'Facebook' },
  { id: 'instagram', icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/ron.gzls/', label: 'Instagram' },
  { id: 'email', icon: 'fa-solid fa-envelope', url: 'mailto:gonzales.rondether.2001@gmail.com', label: 'Email' },
];

export default function SocialShareMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-[90]">
      <motion.div
        className="glass-card rounded-full shadow-2xl flex items-center p-1.5 cursor-pointer relative overflow-hidden"
        initial={false}
        animate={{
          width: isOpen ? 'auto' : '3.5rem',
          height: '3.5rem',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Main Share Button Icon */}
        <motion.div
          className="w-11 h-11 shrink-0 bg-primary text-primary-content rounded-full flex items-center justify-center z-20"
          layout
        >
          <motion.i 
            className="fa-solid fa-share-nodes text-lg"
            animate={{ rotate: isOpen ? -180 : 0, scale: isOpen ? 1.1 : 1 }}
            transition={{ duration: 0.4, type: 'spring' }}
          />
        </motion.div>

        {/* Social Icons Container */}
        <div className="flex items-center h-full">
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                className="flex items-center gap-1 pl-3 pr-2 relative"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30, filter: 'blur(5px)' }}
                transition={{ duration: 0.3, type: 'spring', bounce: 0 }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-10 h-10 flex items-center justify-center text-base-content/80 hover:text-primary transition-colors duration-300 z-10"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {/* The Magic Sliding Indicator */}
                    {hoveredIndex === index && (
                      <motion.div
                        layoutId="magic-indicator-share"
                        className="absolute inset-0 bg-primary/20 rounded-full -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    {/* Wrapped in a span so FontAwesome replacing <i> with <svg> doesn't break React */}
                    <span className="flex items-center justify-center">
                      <i className={`${social.icon} text-[1.1rem]`}></i>
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}