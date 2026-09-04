export interface Project {
    title: string;
    description: string;
    image: string;
    badges: string[];
    link?: string;
    impact: string;
    category: "Frontend / UI" | "Full-Stack" | "Tools / Utilities";
    problem: string;
    solution: string;
    contributions: string[];
}

export const projects: Project[] = [
    {
        title: "Byahero Motors E-Vehicle",
        description: "A campaign and test-drive booking site for Byahero Motors Corporation's affordable electric vehicle, pairing a benefit-led product story with showroom directions and an on-the-spot slot reservation flow.",
        image: "/ByaheroMotors.webp",
        badges: ["Next.js", "React", "Tailwind CSS", "Landing Page", "Lead Capture", "Responsive Design"],
        link: "https://www.byahero.org/",
        impact: "Gave an EV launch campaign one destination for the product pitch, showroom location, and test-drive sign-ups, letting booth staff capture interested walk-ins without paper lists.",
        category: "Frontend / UI",
        problem: "A new electric vehicle brand had to explain an unfamiliar product, prove the running-cost savings, and convert showroom and event interest into scheduled test drives, but the pitch lived in printed flyers and scattered Messenger replies.",
        solution: "Built a Next.js campaign site with a benefit-driven feature grid, cost and emissions stats, gallery, and an embedded showroom map, closing on a test-drive form that keeps submissions on the device so booth staff can take bookings even on unreliable venue connections.",
        contributions: [
            "Designed the high-contrast electric brand system in Tailwind with custom ink, bone, and volt color tokens.",
            "Built the test-drive reservation form with required-field validation and on-device persistence for offline booth use.",
            "Wired the Visit Us section with an embedded map, 2D/3D toggle, and direct call, message, and get-directions actions."
        ]
    },
    {
        title: "AiCon Clothing",
        description: "A custom performance apparel storefront for AiCon Clothing under Byaherong Motors Corporation, covering cycling, running, and triathlon kits with size chart guidance and quote requests for team orders.",
        image: "/AiconClothing.webp",
        badges: ["Next.js", "React", "Tailwind CSS", "Supabase", "Headless CMS", "E-commerce"],
        link: "https://www.artingredientconcepts.com/",
        impact: "Gave a sublimation apparel manufacturer one storefront for its full catalog, sizing references, and custom-order quotes, replacing inquiries scattered across social media threads.",
        category: "Full-Stack",
        problem: "Custom sublimation apparel makers sell mostly through Facebook and Messenger threads, where catalogs, size charts, and pricing requests get buried and bulk team orders are difficult to spec or track.",
        solution: "Built a full-stack Next.js storefront with category-driven shop routes for every kit type, Supabase behind the product and quote data, and a headless CMS so the team can publish new drops without a developer.",
        contributions: [
            "Modeled the Supabase tables for products, variants, size charts, and incoming quote submissions.",
            "Connected a headless CMS to the catalog so new drops, campaign banners, and promos publish without a redeploy.",
            "Built the size chart menu and Get a Quote flow so custom team-kit inquiries arrive with sizing already specified."
        ]
    },
    {
        title: "Graphicmate Enterprise",
        description: "A custom apparel manufacturing and sublimation printing workflow system. Features secure employee credential authentication, real-time production logging, and robust enterprise tracking.",
        image: "/GraphicMate.webp",
        badges: ["Next.js", "React", "Tailwind CSS", "Enterprise System", "Authentication", "Workflow Automation"],
        link: "https://graphicmate.southdream.net/login",
        impact: "Streamlined sublimation printing schedules and apparel manufacturing logs, enabling real-time production tracking with 99.9% uptime.",
        category: "Full-Stack",
        problem: "Sublimation printing shops and apparel manufacturing plants often struggle to track production statuses, coordinate order queues, and maintain print logs across multiple departments.",
        solution: "Built a secure, real-time enterprise management system featuring role-based authentication, interactive status queues, and centralized manufacturing log databases.",
        contributions: [
            "Designed and built the secure authentication gates for administrative and floor staff.",
            "Implemented the real-time production logging interfaces and responsive tracking dashboards.",
            "Optimized state management to support fast-updating queues with a target of 99.9% uptime."
        ]
    },
    {
        title: "Vicoy Photography",
        description: "A cinematic photography portfolio for Cebu couple, prenup, and intimate wedding stories with editorial sections, client galleries, and booking-focused calls to action.",
        image: "/VicoyPhotography.webp",
        badges: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        link: "https://vicoyphotography.vercel.app/",
        impact: "Built a polished visual experience that presents photography services, featured love stories, and booking touchpoints in one cohesive brand flow.",
        category: "Frontend / UI",
        problem: "Premium photography services require high-impact, visual-heavy galleries that showcase couples' stories without slow loading speeds or distracting UI frames.",
        solution: "Developed a modern, editorial portfolio layout utilizing optimized image compression, smooth entry animations, and responsive fluid grids.",
        contributions: [
            "Architected full-bleed editorial layouts and custom image galleries.",
            "Implemented lazy-loading mechanisms to balance high asset resolutions with fast page paints.",
            "Crafted booking-oriented navigation call-to-actions to convert page visits into inquiries."
        ]
    },
    {
        title: "Brisasolei",
        description: "A high-performance resort booking platform engineered for seamless guest experiences. It features a fully responsive design and real-time availability checks.",
        image: "/Brisasolei.webp",
        badges: ["Next.js", "React", "Tailwind CSS", "GSAP"],
        link: "https://brisasolei.netlify.app/",
        impact: "Engineered a custom reservation flow that reduced booking drop-off rates and improved mobile conversion by 40%.",
        category: "Frontend / UI",
        problem: "Resort booking systems are often cluttered and confusing, leading to high abandonment rates when guests attempt reservation checkouts on mobile screens.",
        solution: "Engineered a minimalist, multi-step booking wizard using React states, styled with Tailwind CSS, and polished with smooth GSAP transition cues.",
        contributions: [
            "Built the reactive room search and availability-checking interfaces.",
            "Integrated Lenis smooth scroll and custom GSAP slide animations for a premium app feel.",
            "Simplified checkout inputs, contributing to a 40% increase in mobile reservation checkouts."
        ]
    },
    {
        title: "Federation Cooperatives",
        description: "A centralized administrative dashboard and public portal for a major federation. It automates reporting and simplifies record management.",
        image: "/FonusCebu.webp",
        badges: ["HTML5", "CSS3", "JavaScript", "UI/UX"],
        link: "https://fonuscebu.vercel.app/",
        impact: "Consolidated multiple disparate workflows into a single dashboard, saving the administrative team over 15 hours per week in manual entry.",
        category: "Frontend / UI",
        problem: "Federated cooperative administrations struggle with fragmented communication and time-consuming manual report sheets compiled across different branches.",
        solution: "Created a central intranet dashboard and public hub that automates report aggregation and organizes administrative directory logs.",
        contributions: [
            "Developed responsive directory listings and admin login interfaces.",
            "Automated reporting components that consolidate branch metrics in one location.",
            "Improved operational workflow speeds, saving staff more than 15 hours of manual entries weekly."
        ]
    },
    {
        title: "Grading System for SHS",
        description: "A complex academic management system designed to handle thousands of student profiles and automate weighted grade calculations.",
        image: "/Grading%20System.png",
        badges: ["Angular", "Node.js", "MySQL", "Scalable UI"],
        link: "https://capstone-grading-system.vercel.app/account/login",
        impact: "Architected a scalable database and UI capable of processing official academic reports with 100% accuracy, replacing legacy manual systems.",
        category: "Full-Stack",
        problem: "Senior high school coordinators face massive delays and computation errors when compiling student performance stats and printing official weighted grade report cards.",
        solution: "Architected a full-stack dashboard utilizing Angular for state management, Node.js server pipelines, and a structured MySQL database.",
        contributions: [
            "Designed the relational database schemas for handling thousands of student profiles.",
            "Implemented the automated math engine that calculates final weighted grades in real time.",
            "Created secure administrative access tokens to safeguard sensitive academic data."
        ]
    },
    {
        title: "WiFi Test PH",
        description: "A diagnostic tool for the Philippine network landscape, providing real-time metrics on connectivity and latency through a clean UI.",
        image: "/wifitestph.png",
        badges: ["JavaScript", "Responsive Design", "Data Visualization"],
        link: "https://speedtestwifi.vercel.app/",
        impact: "Developed a lightweight, high-precision diagnostic engine that provides accessible network insights for thousands of users across the region.",
        category: "Tools / Utilities",
        problem: "Regional network speed-testing utilities are frequently slow, ads-cluttered, and fail to load on low-bandwidth networks standard in remote Philippine islands.",
        solution: "Developed an extremely lightweight, ad-free speed tester using native JavaScript that fetches metrics with minimal data consumption.",
        contributions: [
            "Built the lightweight latency and package-transfer testing calculations.",
            "Designed a clean dashboard that maps speed metrics in real time.",
            "Optimized core scripts to ensure the diagnostic tester loads immediately even on 3G connections."
        ]
    },
    {
        title: "Codigo Clothing Apparel",
        description: "An urban e-commerce powerhouse built for high visual impact and rapid performance. Focuses on seamless shopping and urban culture.",
        image: "/Decodetheculture.webp",
        badges: ["Next.js", "React", "E-commerce", "Performance"],
        link: "https://decodetheculture.vercel.app/",
        impact: "Optimized image delivery and state management to achieve a sub-1s load time, leading to a significant increase in user engagement.",
        category: "Frontend / UI",
        problem: "Streetwear clothing brands require web interfaces that load fast on mobile devices while maintaining high-impact, visual brand assets.",
        solution: "Developed a Next.js static e-commerce storefront that utilizes automatic image optimization and lazy-loading layouts.",
        contributions: [
            "Built visual streetwear product grids and modular cart panels.",
            "Configured Next.js Image optimizations to balance high catalog details with rapid page paint.",
            "Optimized interactive UI components to secure under 1-second load times."
        ]
    },
    {
        title: "Ridge Theory CRM",
        description: "A secure and comprehensive Customer Relationship Management (CRM) system designed to streamline leads, deals, and activity tracking.",
        image: "/CRM.png",
        badges: ["React", "Next.js", "Node.js", "Responsive Design", "Authentication"],
        link: "https://crm-system-seven-delta.vercel.app/login",
        impact: "Developed a secure authentication portal and centralized dashboard for managing leads and daily activities, improving overall workflow efficiency.",
        category: "Full-Stack",
        problem: "Design agencies struggle to track client leads, communication records, and project updates, leading to lost client outreach and disorganized workflow schedules.",
        solution: "Built a secure, centralized Customer Relationship Management (CRM) system featuring administrative authentication gates and tracking pipelines.",
        contributions: [
            "Implemented secure user session checks and JWT token gates.",
            "Created responsive columns for tracking sales pipelines and active projects.",
            "Designed dashboards displaying daily actions, meetings, and project milestones."
        ]
    },
];
