export const siteConfig = {
  name: "Rondether Gonzales",
  title: "Frontend Engineer | UI/UX Specialist",
  description: "Crafting high-performance, accessible, and visually stunning digital experiences with React, Next.js, and GSAP. Focused on bridging the gap between design and functionality.",
  url: "https://rgonzales.netlify.app/",
  ogImage: "https://rgonzales.netlify.app/og-image.png",
  links: {
    github: "https://github.com/Doy679",
    linkedin: "https://www.linkedin.com/in/ron-dether-gonzales-6551942b8/",
    facebook: "https://www.facebook.com/Doy679", // Updated based on probable profile
  },
  contact: {
    email: "gonzalesrondether86@gmail.com",
    smtp: {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
    }
  }
};

export type SiteConfig = typeof siteConfig;
