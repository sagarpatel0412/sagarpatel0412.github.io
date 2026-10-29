export const profile = {
  name: 'Sagar Patel',
  role: 'Full-stack JavaScript Developer',
  location: 'Ahmedabad, India',
  headline: 'I build digital products that feel as good as they work.',
  summary: 'I turn complex ideas into fast, intuitive and scalable web experiences — from polished frontends to reliable APIs and cloud deployments.',
  email: '', // Add your public contact email
  resumeUrl: '', // Add a PDF path like /resume.pdf in public/ or a hosted URL
  linkedinUrl: '', // Add your LinkedIn profile URL
  availability: 'Open to opportunities',
  skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'AWS', 'Docker'],
};

// Replace demo copy and URLs with your actual case studies and screenshots.
// featured project cards can link to a private-work case study without exposing source.
export const featuredProjects = [
  { id: 'myka', title: 'Myka Jewels', category: 'Full-stack', description: 'A commerce management experience with product collections, advanced filters, and an intuitive admin workflow.', stack: ['React', 'Node.js', 'MySQL', 'Sequelize'], theme: 'violet', eyebrow: 'COMMERCE PLATFORM', number: '01', demoUrl: '', githubUrl: '', featured: true },
  { id: 'agent', title: 'AI Job Agent', category: 'AI / Automation', description: 'An AI-assisted job workflow that explores role matching and developer productivity with modern backend services.', stack: ['NestJS', 'TypeScript', 'AI', 'React'], theme: 'orange', eyebrow: 'AI + AUTOMATION', number: '02', demoUrl: '', githubUrl: '', featured: true },
  { id: 'iskcon', title: 'Community Platform', category: 'Full-stack', description: 'A multi-app platform concept for events, journals, subscriptions, and community experiences.', stack: ['React', 'Node.js', 'API', 'Cloud'], theme: 'blue', eyebrow: 'COMMUNITY SOFTWARE', number: '03', demoUrl: '', githubUrl: '', featured: true },
];

export const experience = [
  {
    role: "Software Developer",
    company: "Bitontree",
    location: "Ahmedabad, India",
    period: "Dec 2025 — Mar 2026",
    details: [
      "Built full-stack apps with React and NestJS for workflow automation.",
      "Integrated third-party AI APIs into automated workflows.",
      "Implemented NestJS microservices and optimized backend processes.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Gateway Group of Companies",
    location: "Ahmedabad, India",
    period: "May 2025 — Nov 2025",
    details: [
      "Built Node.js and TypeScript microservices serving React and Next.js apps.",
      "Used Azure Entra, AKS and Artifacts for identity and deployment workflows.",
      "Created reusable npm packages and Docker-based deployment workflows.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "IFlair Web Technologies",
    location: "Ahmedabad, India",
    period: "Jan 2022 — May 2025",
    details: [
      "Built scalable React, Next.js, Angular and Node.js applications.",
      "Designed REST and GraphQL services with NestJS, PostgreSQL and MySQL.",
      "Deployed services on AWS, Firebase and DigitalOcean.",
    ],
  },
];
export const skillGroups = [
  { title: "Languages", items: ["Python", "JavaScript", "TypeScript", "SQL"] },
  {
    title: "Frontend & backend",
    items: ["React", "Angular", "Next.js", "Node.js", "NestJS", "Flask"],
  },
  {
    title: "Databases & APIs",
    items: ["PostgreSQL", "MySQL", "REST APIs", "GraphQL", "Microservices"],
  },
  {
    title: "Cloud & tooling",
    items: ["AWS", "Azure", "Docker", "Git", "Linux"],
  },
];
export const education = [
  {
    school: "IIIT Bangalore",
    program: "Master of Science in Artificial Intelligence",
    period: "Aug 2025 — Pursuing",
    note: "In progress (as stated on resume)",
  },
  {
    school: "SVMIT, Bharuch",
    program: "Bachelor of Technology — Information Technology",
    period: "Aug 2017 — Jun 2021",
    note: "GPA 8.4",
  },
];
export const certifications = [
  {
    name: "Executive Postgraduate Programme in AI",
    issuer: "IIIT Bangalore",
    date: "Aug 2025",
  },
  {
    name: "Front-End Web Development with React",
    issuer: "Coursera",
    date: "Aug 2019",
  },
  { name: "IoT Program", issuer: "Expertshub", date: "Jul 2018" },
];
