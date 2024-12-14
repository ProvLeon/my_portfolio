import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import type {
  Achievement,
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
    title: "CodeWeave",
    description:
      "A cloud-based collaborative IDE enabling real-time code editing and sharing. Built with React and Firebase, featuring secure authentication via Keycloak and real-time collaboration capabilities.",
    image: "/images/codeweave.png",
    tags: ["React", "Firebase", "Keycloak", "WebSockets", "TypeScript"],
    source: "https://github.com/ProvLeon/codeweave",
    visit: "https://codeweav.onrender.com",
    category: "Developer Tools",
    features: [
      "Real-time collaborative code editing",
      "Secure authentication with Keycloak",
      "Multiple programming language support",
      "Code syntax highlighting",
      "Real-time chat and collaboration tools",
      "Project sharing and permissions management",
    ],
    implementation: `
      Built using React for the frontend with TypeScript for type safety.
      Implemented real-time collaboration using Firebase Realtime Database and WebSocket connections.
      Integrated Keycloak for secure authentication and authorization.
      Used Monaco Editor for code editing with support for multiple programming languages.
      Implemented collaborative features using custom WebSocket handlers.
    `,
    challenges: [
      "Implementing real-time collaboration without conflicts",
      "Managing complex state with multiple users",
      "Optimizing performance for large code files",
      "Handling offline capabilities and sync",
    ],
  },
  {
    id: 1,
    title: "OmniTask Plus",
    description:
      "A collaborative task management platform designed for students, featuring task tracking, deadline management, and team collaboration tools. Implemented with React frontend and Python Flask backend.",
    image: "/images/omnitask.png",
    tags: [
      "React",
      "Python",
      "Flask",
      "WebSockets",
      "MongoDB",
      "TailwindCSS",
      "REST",
    ],
    source: "https://github.com/ProvLeon/omnitask_plus_student_edition",
    visit: "https://omnitask-plus.onrender.com",
    category: "Productivity",
    features: [
      "Intuitive task management interface",
      "Real-time collaboration features",
      "Deadline tracking and notifications",
      "Team workspace management",
      "File sharing and attachments",
      "Progress tracking and analytics",
    ],
    implementation: `
      Developed using React with modern hooks and context for state management.
      Backend built with Python Flask for RESTful API endpoints.
      PostgreSQL database for reliable data storage.
      Implemented real-time updates using WebSocket connections.
      Styled with TailwindCSS for responsive design.
    `,
    challenges: [
      "Implementing complex task relationships",
      "Managing real-time updates across teams",
      "Optimizing database queries for performance",
      "Building intuitive user interfaces",
    ],
  },
  {
    id: 2,
    title: "Student Security System",
    description:
      "Mobile application for real-time location tracking and anomaly detection, utilizing Flutter for the frontend and a custom ML model for threat detection. Features Socket.io for real-time communication and robust backend architecture for data handling.",
    image: "/images/security-system.png",
    tags: [
      "Flutter",
      "ML",
      "Python",
      "Firebase",
      "Socket.io",
      "Google Maps API",
    ],
    source: "https://github.com/ProvLeon/prediction_model",
    visit: "https://student-security.app",
    category: "Security",
    features: [
      "Real-time location tracking with Socket.io",
      "Anomaly detection using ML",
      "Emergency alert system",
      "Geofencing capabilities",
      "Parent/Guardian dashboard",
      "Historical location data",
      "Real-time threat prediction and alerting",
      "Instant police and guardian notification system",
    ],
    implementation: `
          Built mobile app using Flutter for cross-platform support.
          Implemented custom ML model using TensorFlow for anomaly detection.
          Used Firebase for user authentication and data storage.
          Integrated Socket.io for real-time location tracking and threat alerts.
          Implemented real-time communication between students, parents, and authorities.
          Integrated Google Maps API for location visualization.
          Backend services built with Python for data processing and ML predictions.
        `,
    challenges: [
      "Balancing battery life with tracking accuracy",
      "Implementing accurate anomaly detection",
      "Managing privacy concerns",
      "Handling real-time location updates",
      "Ensuring reliable Socket.io connections",
      "Coordinating multiple real-time data streams",
    ],
  },
  {
    id: 3,
    title: "Blumen Consult",
    description:
      "Modern, responsive website for a consulting firm built with Next.js and Tailwind CSS. Optimized for performance and accessibility across all devices.",
    image: "/images/blumen.png",
    tags: ["Next.js", "TailwindCSS", "TypeScript", "Framer Motion"],
    source: "https://github.com/ProvLeon/blumen_consult",
    visit: "https://blumenconsult.com",
    category: "Web Development",
    features: [
      "Responsive design for all devices",
      "Modern UI with smooth animations",
      "Server-side rendering",
      "Blog section with CMS integration",
      "Contact form with email notifications",
      "SEO optimization",
    ],
    implementation: `
      Built using Next.js for optimal performance and SEO.
      Implemented responsive design using TailwindCSS.
      Added smooth animations with Framer Motion.
      Integrated headless CMS for content management.
      Optimized images and assets for fast loading.
    `,
    challenges: [
      "Optimizing performance across devices",
      "Implementing smooth animations",
      "Managing content updates efficiently",
      "Ensuring accessibility compliance",
    ],
  },
  {
    id: 4,
    title: "OmniBot - Intelligent Telegram Assistant",
    description:
      "A sophisticated Telegram bot powered by Python and Machine Learning, offering real-time data analysis, predictive insights, and automated assistance. Features natural language processing and integrated data management.",
    image: "/images/omnibot.png", // Add appropriate image
    tags: [
      "Python",
      "Numpy",
      "Pandas",
      "TensorFlow",
      "SQLite",
      "Aiogram",
      "Socket.io",
    ],
    source: "https://github.com/ProvLeon/telegram_bot",
    visit: "https://t.me/Omni_cBot",
    category: "AI & Automation",
    features: [
      "Natural Language Processing capabilities",
      "Real-time data analysis and visualization",
      "Automated response system",
      "Interactive command interface",
      "Data persistence with SQLite",
      "Real-time notifications using Socket.io",
      "Custom ML model integration",
      "Automated report generation",
    ],
    implementation: `
        Developed using Python with Aiogram framework for Telegram API integration.
        Implemented data processing pipeline using Numpy and Pandas.
        Built custom ML models using TensorFlow for intelligent responses.
        Integrated SQLite for efficient data storage and retrieval.
        Used Socket.io for real-time updates and notifications.
        Implemented custom command handlers and conversation flows.
        Created automated data visualization and reporting features.
      `,
    challenges: [
      "Implementing efficient NLP algorithms",
      "Managing concurrent user sessions",
      "Optimizing response times for ML predictions",
      "Handling large-scale data processing",
      "Ensuring reliable real-time communication",
      "Managing bot resource consumption",
    ],
  },
];

export const TimeLineData: TimeLineItem[] = [
  {
    year: 2020,
    text:
      "Embarked on my software development journey, diving deep into web technologies and computer science fundamentals",
  },
  {
    year: 2021,
    text:
      "Mastered full-stack development essentials while building my first commercial projects as a freelancer",
  },
  {
    year: 2022,
    text:
      "Joined ALX Software Engineering School, where I discovered my passion for building scalable solutions and mentoring others",
  },
  {
    year: 2023,
    text:
      "Developed several major projects including CodeWeave and OmniTask Plus, while growing my expertise in AI and ML",
  },
  {
    year: 2024,
    text:
      "Graduated from ALX Software Engineering School with honors, launched OmniBot and the Student Security System, currently working on innovative AI-driven solutions",
  },
  {
    year: "Future",
    text:
      "Working towards building AI-powered educational platforms and contributing to open-source projects that make a difference",
  },
];

// Add a new section for career milestones and future goals
export const careerMilestones = {
  completed: [
    {
      year: "2023-2024",
      project: "CodeWeave Platform",
      description:
        "Built a revolutionary collaborative coding platform that transformed how teams write and share code in real-time, serving over 1000 active users.",
      link: "https://codeweav.onrender.com",
      metrics: ["1000+ Active Users", "500+ Projects", "4.8/5 User Rating"],
      icon: "💻",
    },
    {
      year: "2024",
      project: "Blumen Consult Website",
      description:
        "Designed and developed a high-performance consulting firm website that increased client engagement by 150% and improved lead generation significantly.",
      link: "https://blumenconsult.com",
      metrics: ["150% Engagement Increase", "3s Load Time", "98% SEO Score"],
      icon: "🌐",
    },
    {
      year: "2024",
      project: "OmniTask Plus",
      description:
        "Developed a comprehensive task management solution that helped hundreds of students improve their productivity and collaboration skills.",
      link: "https://omnitask-plus.onrender.com",
      metrics: [
        "800+ Active Users",
        "25K+ Tasks Managed",
        "92% User Satisfaction",
      ],
      icon: "📋",
    },
    {
      year: "2024",
      project: "OmniBot",
      description:
        "Created an intelligent Telegram bot that leverages ML to provide automated assistance and data analysis, processing over 10,000 requests daily.",
      link: "https://t.me/Omni_cBot",
      metrics: ["10K+ Daily Requests", "95% Accuracy", "24/7 Availability"],
      icon: "🤖",
    },
    {
      year: "2024",
      project: "Student Security System",
      description:
        "Engineered a cutting-edge security solution using ML and real-time tracking to enhance student safety across multiple institutions.",
      metrics: ["5+ Institutions", "1000+ Students Protected", "99.9% Uptime"],
      icon: "🔒",
    },
  ],
  ongoing: [
    {
      project: "AI Education Platform",
      description:
        "Developing an adaptive learning platform that personalizes education using AI algorithms",
      expectedCompletion: "2024 Q3",
    },
    {
      project: "Open Source ML Tools",
      description:
        "Contributing to and maintaining several open-source machine learning tools for developers",
      status: "Active Development",
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
  { number: 5, text: "Open Source Projects" },
  { number: 87, text: "Mentees" },
  { number: 90, text: "Github Repositories" },
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

// Contact information
export const contactInfo = {
  email: "lomotey.eokantah@gmail.com",
  phone: "(+233) 550 735 691",
  whatsapp: "+233550735691",
  location: "Ejisu, Kumasi",
  slogan: "Innovating one project at a time to transform the world",
} as const;
