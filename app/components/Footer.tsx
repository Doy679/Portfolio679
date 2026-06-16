'use client';
import React from 'react';
import { siteConfig } from '../config/site';

const Footer = () => {
    return (
        <footer className="footer footer-center p-6 bg-base-300 text-base-content/60 relative overflow-hidden">
            <div className="h-1 bg-primary absolute top-0 left-0 w-full"></div>
            
            <aside>
                <p className="font-medium text-sm">{siteConfig.name}</p> 
                <p className="text-xs mt-1">Copyright © {new Date().getFullYear()} - All rights reserved</p>
            </aside>
        </footer>
    );
};

export default Footer;