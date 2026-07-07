'use client';

import { useState } from 'react';
import { Icon } from '../lib/icons';

const socialLinks = [
  { id: 'github', icon: 'fa-brands fa-github', url: 'https://github.com/Doy679', label: 'GitHub' },
  { id: 'linkedin', icon: 'fa-brands fa-linkedin-in', url: 'https://www.linkedin.com/in/ron-dether-gonzales-6551942b8/', label: 'LinkedIn' },
  { id: 'facebook', icon: 'fa-brands fa-facebook-f', url: 'https://www.facebook.com/Gonzales.rondether.2001?mibextid=ZbWKwL', label: 'Facebook' },
  { id: 'instagram', icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/ron.gzls/', label: 'Instagram' },
  { id: 'email', icon: 'fa-solid fa-envelope', url: 'mailto:gonzales.rondether.2001@gmail.com', label: 'Email' },
];

export default function SocialShareMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-[90]">
      <div
        className={`glass-card rounded-full shadow-2xl flex items-center p-1.5 cursor-pointer relative overflow-hidden transition-all duration-300 ${isOpen ? 'w-auto' : 'w-[3.5rem]'} h-[3.5rem]`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Main Share Button Icon */}
        <div className="w-11 h-11 shrink-0 bg-primary text-primary-content rounded-full flex items-center justify-center z-20">
          <Icon name="fa-share-nodes" className={`text-lg transition-transform duration-300 ${isOpen ? '-rotate-180 scale-110' : ''}`} />
        </div>

        {/* Social Icons Container */}
        <div className={`flex items-center h-full transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
          {isOpen && (
            <div className="flex items-center gap-1 pl-3 pr-2 relative">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 flex items-center justify-center text-base-content/80 hover:text-primary transition-colors duration-300 z-10"
                  aria-label={social.label}
                >
                  <span className="flex items-center justify-center">
                    <Icon name={social.icon} className="text-[1.1rem]" />
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}