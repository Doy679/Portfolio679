export const siteConfig = {
  name: "Rondether Gonzales",
  title: "Junior Web Developer | Front End Developer",
  description: "Portfolio of Rondether Gonzales, a Junior Web Developer passionate about building effective digital solutions.",
  url: "https://rondether-portfolio.vercel.app", // Update with actual URL
  ogImage: "https://rondether-portfolio.vercel.app/og.png",
  links: {
    github: "https://github.com/your-username", // Update with actual github
    linkedin: "https://linkedin.com/in/your-profile", // Update with actual linkedin
    facebook: "https://facebook.com/your-profile",
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
