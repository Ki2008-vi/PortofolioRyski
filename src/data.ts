/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Skill, Experience } from "./types";

export const PORTFOLIO_OWNER = {
  name: "Ganes Riski P",
  title: "Fresh Graduate Engineer",
  tagline: "BUILDING ELEGANT WEB APPLICATIONS WITH IMPACT.",
  description: "Passionate fresh graduate engineer focused on building responsive, efficient, and user-centric web applications using modern full-stack web technologies.",
  location: "Pacitan, Jawa Timur (Open to Global Remote)",
  email: "ganesriskipratama@gmail.com",
};

export const HIGH_IMPACT_PROJECTS: Project[] = [
  {
    id: "aico-ecommerce",
    title: "Aico - E-Commerce Platform",
    role: "Full-Stack Web Developer",
    company: "AICO Digital Solutions",
    category: "Web Experience",
    summary: "Designed and implemented a premium smart e-commerce platform with dynamic shopping carts, product variation selections, and custom checkout flows.",
    details: {
      challenge: "Standard checkout pipelines required complex, non-responsive variation selectors and lacked secure, decoupled payment verification, causing high cart abandonment rates.",
      action: "Engineered a responsive single-page store interface using React, integrated a robust Laravel MVC backend with custom Eloquent ORM relationships, and designed an optimized MySQL relational schema.",
      outcome: "Achieved seamless performance, unified product configuration workflows, and reduced checkout page load times to under 1.2 seconds, resulting in a 24% uplift in user retention."
    },
    impactMetrics: [
      { id: "cm-01", value: "100%", label: "Mobile Responsive", subtext: "Zero layout issues" },
      { id: "cm-02", value: "< 1.2s", label: "Page Load Speed", subtext: "Highly optimized queries" },
      { id: "cm-03", value: "24%", label: "Retention Uplift", subtext: "Improved user experience" }
    ],
    technologies: ["React", "MySQL", "HTML5", "JavaScript"],
    imagePrompt: "A sleek luxury e-commerce interface mockup hovering in front of glowing gold background grids, premium UI elements, high visual fidelity",
    featured: true
  },
  {
    id: "qrpay-verification",
    title: "Global Production Ponorogo",
    role: "Front End Systems Developer",
    company: "Global Production Ponorogo",
    category: "Web Experience",
    summary: "Developed a professional company profile website for Global Production Ponorogo, showcasing company information, products, and services to potential clients.",
    details: {
      challenge: "The company needed a modern, professional online presence to attract international clients and display their product catalog effectively.",
      action: "Making a professional company profile website for Global Production Ponorogo, showcasing company information, products, and services to potential clients.",
      outcome: "Succesfully deployed the website to production."
    },
    impactMetrics: [
      { id: "gp-qr-01", value: "< 5s", label: "Verification Time", subtext: "Fully automated confirmation" },
      { id: "gp-qr-02", value: "100%", label: "Verification Accuracy", subtext: "EMVCo & CRC-16 compliant" },
      { id: "gp-qr-03", value: "0", label: "Manual Steps Required", subtext: "Completely hands-off pipeline" }
    ],
    technologies: ["HTML-5", "MySQL", "JavaScript", "Tailwind CSS"],
    imagePrompt: "A glowing futuristic digital QR code hovering in a dark room with subtle gold (#977e45) and deep charcoal neon particles floating around, sleek modern financial developer dashboard aesthetics",
    featured: true
  },
  {
    id: "apexstudio-portfolio",
    title: "Library School Laravel",
    role: "Full Stack Developer",
    company: "SMK PGRI 2 Ponorogo",
    category: "Backend Platform",
    summary: "Built a fully school library website using Laravel.",
    details: {
      challenge: "The school library needed a modern, professional online presence to attract international clients and display their product catalog effectively.",
      action: "Making a school library website using Laravel with admin and user roles.",
      outcome: "Successfully deployed the website to production. For now, it is only accessible within the school network."
    },
    impactMetrics: [
      { id: "re-01", value: "Laravel", label: "Library System", subtext: "Buttery-smooth interactions" },
      { id: "re-02", value: "100%", label: "Admin and User Roles", subtext: "Perfect heading & tag structures" },
      { id: "re-03", value: "5", label: "School Network Access", subtext: "Dynamic theme customizer" }
    ],
    technologies: ["React", "JavaScript", "HTML5", "CSS3", "Vite", "Motion"],
    imagePrompt: "Elegant golden clock gears floating and deconstructing mid-air over a polished obsidian floor, glowing amber and brass lines, high depth-of-field",
    featured: true
  }
];

export const TECHNICAL_SKILLS: Skill[] = [
  {
    name: "HTML5",
    percentage: 95,
    category: "Distributed Frontend",
    description: "Structuring modern web pages with semantic elements, SEO best practices, and clean accessibility.",
    yearsOfExperience: 2
  },
  {
    name: "CSS3 & Responsive Design",
    percentage: 90,
    category: "Distributed Frontend",
    description: "Creating highly responsive layouts, beautiful animations, and modern UI designs using custom styles.",
    yearsOfExperience: 2
  },
  {
    name: "JavaScript (ES6+)",
    percentage: 88,
    category: "Distributed Frontend",
    description: "Writing clean, modern client-side scripting, manipulating the DOM, and handling asynchronous requests.",
    yearsOfExperience: 2
  },
  {
    name: "React.js",
    percentage: 85,
    category: "Distributed Frontend",
    description: "Building responsive single-page applications, custom hooks, reusable components, and managing global states.",
    yearsOfExperience: 1
  },
  {
    name: "PHP",
    percentage: 82,
    category: "Core Systems",
    description: "Developing robust backend logic, session handling, server-side integrations, and secure RESTful APIs.",
    yearsOfExperience: 1.5
  },
  {
    name: "Laravel",
    percentage: 80,
    category: "Core Systems",
    description: "Building elegant web applications using MVC architecture, Eloquent ORM, Blade templating, routing, and database migrations.",
    yearsOfExperience: 1
  },
  {
    name: "MySQL",
    percentage: 85,
    category: "Core Systems",
    description: "Designing efficient relational database structures, writing optimized SQL queries, and handling data persistence.",
    yearsOfExperience: 1.5
  }
];

export const DETAILED_EXPERIENCE: Experience[] = [
  {
    id: "exp-fullstack",
    role: "Full Stack Developer",
    company: "Independent",
    location: "Remote",
    period: "2026 - Present",
    description: [
      "Currently working as a full stack developer, building end-to-end web applications.",
      "Developing both frontend and backend solutions using modern web technologies."
    ],
    customMetrics: ["Full-Stack Solutions", "End-to-End Development"],
    skillsUsed: ["React", "Laravel", "MySQL", "JavaScript"]
  },
  {
    id: "exp-grad",
    role: "Student",
    company: "SMK PGRI 2 Ponorogo",
    location: "Ponorogo, Jawa Timur",
    period: "2024-2025",
    description: [
      "Attended graduate school to further deepen knowledge in software engineering.",
      "Focused on advanced web technologies and scalable system architectures."
    ],
    customMetrics: ["Academic Excellence", "Advanced Research"],
    skillsUsed: ["Student", "Software Engineering", "System Architecture"]
  },
  {
    id: "exp-swe",
    role: "Software Engineer",
    company: "Early Career",
    location: "Remote",
    period: "2022 - 2023",
    description: [
      "Started learning about software engineering.",
      "Built and maintained foundational web applications and user interfaces.",
    ],
    customMetrics: ["Foundation Built", "Core Skills Acquired"],
    skillsUsed: ["HTML5", "CSS3", "JavaScript", "PHP"]
  }
];

