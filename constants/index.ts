import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { FiClipboard, FiCode, FiCpu, FiGlobe, FiPackage, FiShield, FiTrendingUp, FiTruck } from "react-icons/fi";
import type {
  Achievement,
  CareerMilestones,
  Experiences,
  HeadingContent,
  NavigationLink,
  Project,
  SocialLink,
  TechStack,
  TimeLineItem,
} from "../types";

export const logo: string = "</ LEO >";

export const projects: Project[] = [
  {
    id: 0,
    title: "Blumen Consult",
    description:
      "A performance-focused consulting platform presenting organizational development, performance management, project execution, and professional training services with optimized conversion flows.",
    image: "/images/blumen.png",
    tags: ["Next.js", "TailwindCSS", "TypeScript", "Framer Motion"],
    source: "https://github.com/ProvLeon/blumen_consult",
    visit: "https://blumenconsult.com",
    category: "Professional Services",
    features: [
      "Service vertical architecture (OD, Performance, PM, Training)",
      "Conversion-optimized hero & CTA sections",
      "Structured contact & inquiry funnel",
      "Accessible responsive layout",
      "Animation-enhanced service segmentation",
      "SEO & performance tuned delivery",
    ],
    implementation: `
      Next.js hybrid rendering for SEO-strength + performance.
      TailwindCSS design tokens & utility composition for consistency.
      Framer Motion micro-interactions supporting clarity over novelty.
      Reusable service & metric components for future scaling.
    `,
    challenges: [
      "Balancing narrative authority with conversion clarity",
      "Maintaining UX performance with animation layers",
      "Ensuring semantic accessibility across interactive CTAs",
    ],
  },
  {
    id: 1,
    title: "Survey 360 Research Platform",
    description:
      "An institutional research and mentorship platform communicating evidence-based services, academic impact, and strategic development programs.",
    image: "/images/survey360.png",
    tags: ["Next.js", "TailwindCSS", "Framer Motion", "Lucide React", "shadcn/ui", "Radix UI"],
    source: "",
    visit: "https://survey360.org/",
    category: "Research & Development",
    features: [
      "Service taxonomy (Research, Mentorship, Business Coaching)",
      "Impact KPI sections (publications, mentees, partnerships, policy)",
      "Structured calls-to-action (Explore, Contact)",
      "Achievement & credibility storytelling",
      "Scalable section architecture",
      "Accessible semantic layout",
    ],
    implementation: `
      Next.js for SEO-aligned institutional presence.
      TailwindCSS utility layers for consistent academic tone.
      Framer Motion for tasteful contextual emphasis.
      Radix UI + shadcn/ui primitives for accessible component structure.
      Componentized impact metric blocks for future dynamic data.
    `,
    challenges: [
      "Condensing dense academic credibility clearly",
      "Maintaining typographic hierarchy across long-form sections",
      "Designing scalable impact and service modules",
    ],
  },
  {
    id: 2,
    title: "Agrinvest",
    description:
      "A platform amplifying smallholder farmer productivity and investment transparency with impact metrics and regional coverage storytelling.",
    image: "/images/agrinvest.png",
    tags: ["Next.js", "TailwindCSS", "Framer Motion", "Lucide React"],
    source: "https://github.com/ProvLeon/agrinvest_web",
    visit: "https://agrinvest-web.onrender.com",
    category: "Agriculture & Investment",
    features: [
      "Impact metrics & coverage visualization",
      "Service & value chain segmentation",
      "Partner credibility showcase",
      "Responsive investor–farmer messaging",
      "Scalable structured content sections",
      "Animation-enhanced engagement",
    ],
    implementation: `
      Next.js component-driven architecture for modular expansion.
      TailwindCSS design primitives for rapid iteration.
      Framer Motion subtle emphasis animations.
      Content sections architected for future program additions.
    `,
    challenges: [
      "Balancing investor vs. farmer narrative",
      "Presenting quantitative impact credibly",
      "Future-proofing service taxonomy",
    ],
  },
  {
    id: 3,
    title: "MechAfrica (Pre-Launch)",
    description:
      "A pre-launch engagement platform for a continental mechanization marketplace connecting farmers, service providers, and field agents.",
    image: "/images/mechafrica.png",
    tags: ["Next.js", "TailwindCSS", "Lucide React"],
    source: "",
    visit: "https://mechafrica.com",
    category: "AgriTech (Pre-Launch)",
    features: [
      "Projected impact metrics (farmers, providers, agents, jobs)",
      "Early access signup funnel",
      "Value proposition segmentation (Access, Matching, Community)",
      "Launch messaging & narrative framing",
      "Scalable metric presentation components",
      "Conversion-focused CTA hierarchy",
    ],
    implementation: `
      Lean Next.js marketing architecture optimized for speed.
      TailwindCSS rapid iteration for evolving pre-launch messaging.
      Lucide React reinforcing visual consistency.
      Modular metric & CTA sections for post-launch pivoting.
    `,
    challenges: [
      "Communicating future value without overselling",
      "Optimizing early signup conversion",
      "Designing extensible metric visualization",
    ],
  },
  {
    id: 4,
    title: "Seaton Logistics",
    description:
      "An industrial services platform highlighting equipment rental, maintenance, safety training, and logistics with emphasis on reliability and operational excellence.",
    image: "/images/seaton-logistics.png",
    tags: ["Next.js", "TailwindCSS", "GSAP", "Framer Motion", "Lucide React", "Radix UI", "MongoDB"],
    source: "",
    visit: "https://seaton-logistics-web.onrender.com",
    category: "Industrial Services",
    features: [
      "Service segmentation (Equipment, Maintenance, Training, Logistics)",
      "Core values storytelling (Reliability, Innovation, Safety, etc.)",
      "Metrics & credibility framing",
      "Testimonial & social proof module",
      "Quote & conversion-oriented CTAs",
      "Scalable card-driven layout",
    ],
    implementation: `
      Next.js architecture structured around credibility stacking (Hero → Services → Values → Metrics → Social Proof → CTA).
      TailwindCSS + Radix UI + Lucide React for accessible and consistent component design.
      Motion layer using GSAP + Framer Motion for nuanced stagger + controlled entrance animations.
      MongoDB (planned / optional) for scalable service & testimonial content.
    `,
    challenges: [
      "Balancing operational depth with marketing clarity",
      "Progressive enhancement of motion without harming performance",
      "Maintaining consistency across expanding service catalog",
    ],
  },
  {
    id: 5,
    title: "Singlespine",
    description:
      "A gifting and cross-border care platform enabling diaspora users to order and deliver items to loved ones back home through a streamlined, mobile-first experience.",
    image: "/images/singlespine.png",
    tags: ["Next.js", "TailwindCSS", "Framer Motion"],
    source: "",
    visit: "https://singlespine-web.onrender.com/",
    category: "E-Commerce / Gifting",
    features: [
      "Conversion-focused hero & CTA flow",
      "Curated gift catalog structure (extensible)",
      "Mobile-first responsive layout",
      "Clear trust & brand messaging",
      "Scalable component architecture",
      "Performance & accessibility conscious design",
    ],
    implementation: `
      Next.js leveraged for fast landing experience & future dynamic catalog.
      TailwindCSS utility-driven styling for rapid iteration.
      Framer Motion used for subtle entrance transitions enhancing perceived polish.
      Component structure prepared for future checkout / authentication integration.
    `,
    challenges: [
      "Communicating value proposition with minimal initial content",
      "Designing extensible layout for future commerce features",
      "Balancing visual appeal with fast load performance",
    ],
  },
  {
    id: 6,
    title: "Riel Films",
    description:
      "A cinematic storytelling and talent development platform showcasing African documentaries while enabling educational content publishing.",
    image: "/images/riel-films.png",
    tags: ["Next.js", "TailwindCSS", "MongoDB", "Framer Motion", "Rich Text", "Lucide React"],
    source: "https://github.com/ProvLeon/riel-films",
    visit: "https://riel-films-demo.onrender.com",
    category: "Media & Education",
    features: [
      "Featured film & trailer showcases",
      "Editorial & story publishing",
      "Talent & mission narrative sections",
      "Newsletter / community capture",
      "Rich text content management",
      "Scalable modular content model",
    ],
    implementation: `
      Next.js hybrid static + SSR for media + editorial balance.
      MongoDB flexible content document storage.
      Rich Text editor integration for non-technical updates.
      Framer Motion cinematic transitions for brand tone.
    `,
    challenges: [
      "Media richness vs. performance optimization",
      "Managing heterogeneous content sets",
      "Efficient delivery of visual assets",
    ],
  },
  {
    id: 7,
    title: "CodeWeave",
    description:
      "A cloud-based collaborative IDE enabling real-time code editing and sharing with secure authentication and multi-language support.",
    image: "/images/codeweave.png",
    tags: ["React", "Firebase", "Keycloak", "WebSockets", "TypeScript"],
    source: "https://github.com/ProvLeon/codeweave",
    visit: "https://codeweav.onrender.com",
    category: "Developer Tools",
    features: [
      "Real-time collaborative code editing",
      "Secure authentication & role-based access",
      "Multi-language syntax highlighting",
      "In-app realtime chat",
      "Project sharing & permissions",
      "Conflict-aware editing model",
    ],
    implementation: `
      React + TypeScript frontend with modular editor components.
      Firebase Realtime Database + custom WebSocket layer for low-latency sync.
      Keycloak for OAuth2 / OpenID Connect secured workflows.
      Monaco Editor integrated for multi-language development.
      Optimistic UI updates with reconciliation on conflict.
    `,
    challenges: [
      "Designing conflict-free realtime editing",
      "State synchronization across large sessions",
      "Performance tuning for large documents",
      "Graceful offline recovery & resync",
    ],
  },
  {
    id: 8,
    title: "OmniTask Plus",
    description:
      "A collaborative academic productivity platform offering realtime task coordination, analytics, and structured team workspaces.",
    image: "/images/omnitask.png",
    tags: ["React", "Python", "Flask", "WebSockets", "MongoDB", "TailwindCSS"],
    source: "https://github.com/ProvLeon/omnitask_plus_student_edition",
    visit: "https://omnitask-plus.onrender.com",
    category: "Productivity",
    features: [
      "Realtime task updates & presence",
      "Deadline & reminder engine",
      "Workspace & team segmentation",
      "File attachments",
      "Progress analytics dashboards",
      "Role-based collaboration",
    ],
    implementation: `
      React SPA with context + reducer state patterns.
      Flask backend exposing REST + WebSocket endpoints.
      MongoDB document models for flexible task structures.
      TailwindCSS for responsive UI & design velocity.
      Event-driven updates broadcast to active clients.
    `,
    challenges: [
      "Ensuring concurrency consistency",
      "Reducing websocket load spikes",
      "Intuitive interface for nested task hierarchies",
      "Maintaining low-latency analytics aggregation",
    ],
  },
  {
    id: 9,
    title: "Student Security System",
    description:
      "A mobile safety platform combining realtime geolocation streaming with ML-driven anomaly and risk detection for student protection.",
    image: "/images/security-system.png",
    tags: ["Flutter", "TensorFlow", "Python", "Firebase", "Socket.io", "Google Maps API"],
    source: "https://github.com/ProvLeon/prediction_model",
    visit: "https://student-security.app",
    category: "Security",
    features: [
      "Realtime GPS tracking",
      "ML-based anomaly detection",
      "Emergency escalation workflow",
      "Zone & geofence monitoring",
      "Guardian / authority dashboards",
      "Historical path & event logs",
    ],
    implementation: `
      Flutter cross-platform client for consistent UX.
      TensorFlow model for streaming anomaly scores.
      Firebase Authentication & secure datastore.
      Socket.io channel for low-latency location payloads.
      Python backend orchestrating ML inference & alert routing.
    `,
    challenges: [
      "Battery vs. tracking precision balancing",
      "Reducing false alarm noise",
      "Safeguarding sensitive positional data",
      "Handling weak/ intermittent connectivity gracefully",
    ],
  },
  {
    id: 10,
    title: "OmniBot - Intelligent Telegram Assistant",
    description:
      "A Telegram automation and intelligence bot leveraging NLP and custom ML pipelines for contextual insights and task automation.",
    image: "/images/omnibot.png",
    tags: ["Python", "Aiogram", "TensorFlow", "Pandas", "SQLite", "Socket.io"],
    source: "https://github.com/ProvLeon/telegram_bot",
    visit: "https://t.me/Omni_cBot",
    category: "AI & Automation",
    features: [
      "Natural language command parsing",
      "Context-aware responses",
      "Automated analytical reporting",
      "Realtime notifications",
      "Persistent conversation state",
      "ML-driven intent classification",
    ],
    implementation: `
      Aiogram for structured Telegram event handling.
      TensorFlow custom classification / response models.
      Pandas pipelines for feature extraction & aggregation.
      SQLite for lightweight durable state storage.
      Socket.io bridge for external realtime triggers.
    `,
    challenges: [
      "Low-latency inference at scale",
      "Session state coherence across bursts",
      "Optimizing model size vs. accuracy trade-offs",
    ],
  },
];

export const TimeLineData: TimeLineItem[] = [
  {
    year: "Pre-2020",
    text:
      "Foundational exploration: built small logic experiments, practiced problem decomposition, and developed core analytical habits that shaped later engineering depth.",
    highlight: ["Foundational Logic", "Problem Decomposition", "Analytical Mindset"],
  },
  {
    year: 2020,
    text:
      "Initiated formal software engineering journey—immersed in core computer science fundamentals and modern web technologies.",
    highlight: ["Core CS", "Web Foundations"],
  },
  {
    year: 2021,
    text:
      "Delivered first commercial freelance projects while solidifying full‑stack foundations and disciplined problem‑solving practices.",
    highlight: ["Freelance Delivery", "Full-Stack Growth"],
  },
  {
    year: 2022,
    text:
      "Joined the ALX Software Engineering Program; deepened expertise in scalable architectures and began mentoring emerging developers.",
    highlight: ["ALX Program", "Mentorship"],
  },
  {
    year: 2023,
    text:
      "Shipped flagship platforms (CodeWeave, OmniTask Plus) and expanded practical application of AI/ML within product feature development.",
    highlight: ["Flagship Platforms", "Applied AI/ML"],
  },
  {
    year: 2024,
    text:
      "Graduated ALX with honors; delivered OmniBot, the Student Security System, and foundational client platform work (Blumen Consult, Agrinvest, early Survey 360 scope) while deepening applied AI and automation capabilities.",
    highlight: ["AI Automation", "Client Platforms"],
  },
  {
    year: 2025,
    text:
      "Expanded portfolio with Seaton Logistics, MechAfrica (pre-launch), Singlespine, and Survey 360 enhancements; introduced scalable DevOps practices (containerized workflows, CI quality gates) and broadened mentorship and open-source engagement.",
    highlight: ["DevOps Scaling", "Client Expansion", "Mentorship & Open Source"],
  },
  {
    year: "Future",
    text:
      "Building AI-powered educational and developer enablement platforms, contributing to open source, and creating scalable tech for emerging markets.",
    highlight: ["AI Education", "Open Source Impact", "Emerging Markets"],
  },
];

// Add a new section for career milestones and future goals
export const careerMilestones: CareerMilestones = {
  completed: [
    {
      year: "2023-2024",
      project: "CodeWeave Platform",
      description:
        "Architected and launched a realtime collaborative IDE enabling seamless multi-user coding with secure auth and conflict-aware editing.",
      link: "https://codeweav.onrender.com",
      metrics: ["1000+ Active Users", "500+ Projects", "4.8/5 User Rating"],
      icon: FiCode,
      impact: [
        "Accelerated team onboarding via shared live sessions",
        "Maintained 99.9% realtime sync stability",
        "Improved developer collaboration efficiency measurably",
      ],
      techs: ["React", "Firebase", "Keycloak", "WebSockets", "TypeScript"],
      category: "Platform",
      status: "completed",
    },
    {
      year: "2024",
      project: "Blumen Consult Website",
      description:
        "Delivered a performance-first consulting presence site emphasizing service clarity, conversion pathways, and SEO authority.",
      link: "https://blumenconsult.com",
      metrics: ["150% Engagement Increase", "3s Load Time", "98% SEO Score"],
      icon: FiGlobe,
      impact: [
        "Significant uplift in qualified inquiry conversions",
        "Improved organic discoverability with structured content",
        "Established scalable component system for future content",
      ],
      techs: ["Next.js", "TailwindCSS", "Framer Motion", "TypeScript"],
      category: "Client",
      status: "completed",
    },
    {
      year: "2024",
      project: "OmniTask Plus",
      description:
        "Engineered a student-centric productivity platform integrating realtime task orchestration, role-based collaboration and analytics.",
      link: "https://omnitask-plus.onrender.com",
      metrics: ["800+ Active Users", "25K+ Tasks Managed", "92% User Satisfaction"],
      icon: FiClipboard,
      impact: [
        "Increased task completion velocity for student teams",
        "Reduced coordination overhead through realtime presence",
        "Established extensible data model for analytics features",
      ],
      techs: ["React", "Flask", "MongoDB", "WebSockets", "TailwindCSS"],
      category: "Productivity",
      status: "completed",
    },
    {
      year: "2024",
      project: "OmniBot",
      description:
        "Built an intelligent Telegram automation assistant leveraging custom ML + NLP pipelines for contextual responses and insight delivery.",
      link: "https://t.me/Omni_cBot",
      metrics: ["10K+ Daily Requests", "95% Accuracy", "24/7 Availability"],
      icon: FiCpu,
      impact: [
        "Automated high-volume inquiries reducing manual effort",
        "Achieved high intent classification precision",
        "Established scalable command + response framework",
      ],
      techs: ["Python", "TensorFlow", "Aiogram", "SQLite", "Pandas"],
      category: "AI",
      status: "completed",
    },
    {
      year: "2024",
      project: "Student Security System",
      description:
        "Developed an ML-assisted realtime geolocation safety platform with anomaly detection and responsive escalation workflows.",
      metrics: ["5+ Institutions", "1000+ Students Protected", "99.9% Uptime"],
      icon: FiShield,
      impact: [
        "Delivered sub-second alert propagation under load",
        "Enhanced guardian & authority situational visibility",
        "Established privacy-conscious data handling model",
      ],
      techs: ["Flutter", "TensorFlow", "Firebase", "Socket.io", "Python"],
      category: "Security",
      status: "completed",
    },
    {
      year: "2025",
      project: "Seaton Logistics Platform",
      description:
        "Implemented a scalable industrial services web platform with structured service taxonomy, motion-enhanced UX, and modular content architecture.",
      link: "https://seaton-logistics-web.onrender.com",
      metrics: ["4 Core Service Verticals", "Motion-Enhanced UX", "Modular CMS-ready Components"],
      icon: FiTruck,
      impact: [
        "Unified equipment, maintenance, training & logistics presentation",
        "Improved perceived performance via optimized motion sequencing",
        "Established extensible card-driven service architecture",
      ],
      techs: ["Next.js", "TailwindCSS", "Framer Motion", "GSAP", "Radix UI"],
      category: "Client",
      status: "completed",
    },
    {
      year: "2025",
      project: "Singlespine Gifting Platform",
      description:
        "Delivered a mobile-first gifting & diaspora care presence with conversion-focused layout and progressive enhancement for future commerce flows.",
      link: "https://singlespine-web.onrender.com/",
      metrics: ["Mobile-First Layout", "CTA Conversion Funnel", "Extensible Catalog Shell"],
      icon: FiPackage,
      impact: [
        "Optimized hero & CTA structure for early-user acquisition",
        "Prepared component skeleton for upcoming transactional modules",
        "Ensured consistent responsive performance across breakpoints",
      ],
      techs: ["Next.js", "TailwindCSS", "Framer Motion"],
      category: "Client",
      status: "completed",
    },
    {
      year: "2025",
      project: "Survey 360 Enhancements",
      description:
        "Extended research & mentorship platform with refined impact metrics, hierarchical service layering, and performance/accessibility tuning.",
      link: "https://survey360.org/",
      metrics: ["Enhanced KPI Sections", "Service Layer Refinement", "Improved CLS/SEO"],
      icon: FiTrendingUp,
      impact: [
        "Strengthened credibility through reorganized metric hierarchy",
        "Reduced layout shift via optimized media loading strategy",
        "Improved semantic accessibility across long-form sections",
      ],
      techs: ["Next.js", "TailwindCSS", "Framer Motion", "Radix UI", "shadcn/ui"],
      category: "Client",
      status: "completed",
    },
    {
      year: "2025",
      project: "MechAfrica Pre-Launch",
      description:
        "Shipped validated pre-launch presence emphasizing clear value proposition and early interest capture for continental mechanization services.",
      link: "https://mechafrica.com",
      metrics: ["Early Access Funnel", "Impact Projection Modules", "Lean Bundle Size"],
      icon: FiTruck,
      impact: [
        "Clarified triad value messaging (Access • Matching • Community)",
        "Implemented scalable metrics component for future live data",
        "Maintained fast initial load with minimized payload",
      ],
      techs: ["Next.js", "TailwindCSS", "Lucide React"],
      category: "Pre-Launch",
      status: "completed",
    },
  ],
  ongoing: [
    {
      project: "AI Education Platform",
      description:
        "Developing an adaptive learning environment leveraging ML-driven personalization and progress intelligence.",
      expectedCompletion: "2027 Q3",
      status: "in-progress",
      techs: ["Next.js", "Python", "FastAPI", "PostgreSQL", "LangChain"],
      progress: 55,
    },
    {
      project: "Open Source ML Tools",
      description:
        "Maintaining and extending utility libraries for accessible model experimentation and deployment ergonomics.",
      status: "Active Development",
      techs: ["Python", "TypeScript", "Docker", "CI/CD"],
      progress: 40,
    },
  ],
  futureGoals: [
    "Launch an AI-powered code review and mentoring platform",
    "Contribute to educational technology advancement in Africa",
    "Build sustainable and scalable solutions for emerging markets",
    "Mentor and guide the next generation of software engineers",
  ],
};

export const achievements: Achievement[] = [
  { number: 35, text: "Open Source Projects" },
  { number: 130, text: "Mentees" },
  { number: 126, text: "Github Repositories" },
  { number: 50, text: "Github Stars" },
];

export const heading: HeadingContent[] = [
  {
    title: "Full Stack Developer",
    description:
      "I specialize in building modern web applications using cutting-edge technologies. My expertise spans both frontend and backend development, with a focus on creating scalable and maintainable solutions.",
    small: "Let&apos;s build something amazing together!",
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/ProvLeon",
    icon: AiFillGithub,
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/emmanuellomotey",
    icon: AiFillLinkedin,
  },
  {
    platform: "Instagram",
    url: "https://instagram.com/lomoteyokantah",
    icon: AiFillInstagram,
  },
];

export const navigationLinks: NavigationLink[] = [
  { name: "Projects", path: "#projects" },
  { name: "Technologies", path: "#tech" },
  { name: "Milestones", path: "#milestones" }, // Add this
  { name: "About", path: "#about" },
] as const;

// Tech stack configuration
export const techStack: TechStack = {
  frontend: {
    title: "Frontend Development",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Material-UI",
    ],
  },
  backend: {
    title: "Backend Development",
    skills: [
      "Node.js",
      "Python",
      "Django",
      "PostgreSQL",
      "MongoDB",
      "Express.js",
      "REST APIs",
      "GraphQL",
    ],
  },
  tools: {
    title: "Tools & Platforms",
    skills: [
      "Git",
      "Docker",
      "Kubernetes",
      "AWS",
      "Firebase",
      "Vercel",
      "Linux",
      "VS Code",
    ],
  },
  design: {
    title: "Design & Collaboration",
    skills: [
      "Figma",
      "Adobe XD",
      "Photoshop",
      "Jira",
      "Trello",
      "Slack",
      "Zoom",
    ],
  },
} as const;

export const experiencesDetails: Experiences[] = [
  {
    skill: "Frontend Development",
    years: 4,
    color:
      "bg-gradient-to-r from-[#13ADC7] via-[#15B8D4] to-[#18C3E1]/50 opacity-90", // Professional blue gradient
  },
  {
    skill: "Backend Development",
    years: 3,
    color:
      "bg-gradient-to-r from-[#945DD6] via-[#A66DE8] to-[#B87DFA]/50 opacity-90", // Rich purple gradient
  },
  {
    skill: "DevOps & Cloud",
    years: 3,
    color:
      "bg-gradient-to-r from-[#F46737] via-[#F87D54] to-[#FC9371]/50 opacity-90", // Warm orange gradient
  },
  {
    skill: "AI & ML",
    years: 2,
    color:
      "bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#93C5FD]/50 opacity-90", // Modern blue gradient
  },
] as const;

// Contact information
export const contactInfo = {
  email: "lomotey.eokantah@gmail.com",
  phone: "(+233) 550 735 691",
  whatsapp: "+233550735691",
  location: "Ejisu, Kumasi",
  slogan: "Innovating one project at a time to transform the world",
} as const;
