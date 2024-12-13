import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import type {
  Achievement,
  HeadingContent,
  Project,
  SocialLink,
  TimeLineItem,
} from "@/types";

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
    tags: ["React", "Python", "Flask", "PostgreSQL", "TailwindCSS"],
    source: "https://github.com/ProvLeon/omnitask-plus",
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
      "Mobile application for real-time location tracking and anomaly detection, utilizing Flutter for the frontend and a custom ML model for threat detection. Features robust backend architecture for data handling.",
    image: "/images/security-system.png",
    tags: ["Flutter", "ML", "Python", "Firebase", "Google Maps API"],
    source: "https://github.com/ProvLeon/student-security",
    visit: "https://student-security.app",
    category: "Security",
    features: [
      "Real-time location tracking",
      "Anomaly detection using ML",
      "Emergency alert system",
      "Geofencing capabilities",
      "Parent/Guardian dashboard",
      "Historical location data",
    ],
    implementation: `
      Built mobile app using Flutter for cross-platform support.
      Implemented custom ML model using TensorFlow for anomaly detection.
      Used Firebase for real-time location tracking and notifications.
      Integrated Google Maps API for location visualization.
      Backend services built with Python for data processing.
    `,
    challenges: [
      "Balancing battery life with tracking accuracy",
      "Implementing accurate anomaly detection",
      "Managing privacy concerns",
      "Handling real-time location updates",
    ],
  },
  {
    id: 3,
    title: "Blumen Consult",
    description:
      "Modern, responsive website for a consulting firm built with Next.js and Tailwind CSS. Optimized for performance and accessibility across all devices.",
    image: "/images/blumen.png",
    tags: ["Next.js", "TailwindCSS", "TypeScript", "Framer Motion"],
    source: "https://github.com/ProvLeon/blumen-consult",
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
];

export const TimeLineData: TimeLineItem[] = [
  {
    year: 2020,
    text: "Started my journey",
  },
  {
    year: 2021,
    text:
      "Steadied all Front-End and Back-End skills including HTML, CSS, JavaScript, MySQL, APIs, Python and Django",
  },
  {
    year: 2022,
    text: "Joined ALX Software Engineering School to further my skills",
  },
  {
    year: 2023,
    text: "Built my first Dashboard App and also published my own portfolio",
  },
];

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

export const navigationLinks = [
  { name: "Projects", path: "#projects" },
  { name: "Technologies", path: "#tech" },
  { name: "About", path: "#about" },
] as const;

// Tech stack configuration
export const techStack = {
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
  location: "Ejisu, Kumasi",
  slogan: "Innovating one project at a time to transform the world",
} as const;
