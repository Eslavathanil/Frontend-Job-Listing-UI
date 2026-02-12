export interface Job {
  id: number;
  title: string;
  company: string;
  location: "Remote" | "On-site";
  type: "Internship" | "Full-time";
  description: string;
  postedDaysAgo: number;
}

export const jobs: Job[] = [
  { id: 1, title: "Frontend Intern", company: "Acme Corp", location: "Remote", type: "Internship", description: "Build modern UIs with React and Tailwind CSS.", postedDaysAgo: 1 },
  { id: 2, title: "Web Developer", company: "Tech Solutions", location: "On-site", type: "Full-time", description: "Develop and maintain scalable web applications.", postedDaysAgo: 3 },
  { id: 3, title: "React Developer", company: "InnovateTech", location: "Remote", type: "Full-time", description: "Create high-performance React applications for SaaS products.", postedDaysAgo: 2 },
  { id: 4, title: "UI/UX Design Intern", company: "DesignHub", location: "On-site", type: "Internship", description: "Assist in designing user interfaces and improving UX flows.", postedDaysAgo: 5 },
  { id: 5, title: "Full Stack Developer", company: "CloudBase", location: "Remote", type: "Full-time", description: "Work on Node.js APIs and React frontends.", postedDaysAgo: 1 },
  { id: 6, title: "Backend Intern", company: "DataFlow Inc.", location: "On-site", type: "Internship", description: "Learn and build REST APIs with Express and PostgreSQL.", postedDaysAgo: 7 },
  { id: 7, title: "Mobile Developer", company: "AppWorks", location: "Remote", type: "Full-time", description: "Build cross-platform mobile apps using React Native.", postedDaysAgo: 4 },
  { id: 8, title: "DevOps Intern", company: "ScaleUp", location: "Remote", type: "Internship", description: "Set up CI/CD pipelines and manage cloud infrastructure.", postedDaysAgo: 2 },
  { id: 9, title: "Software Engineer", company: "Nexgen Labs", location: "On-site", type: "Full-time", description: "Design and implement backend microservices.", postedDaysAgo: 6 },
  { id: 10, title: "Data Analyst Intern", company: "InsightCo", location: "On-site", type: "Internship", description: "Analyze datasets and create visual dashboards.", postedDaysAgo: 3 },
  { id: 11, title: "QA Engineer", company: "BugFree Ltd.", location: "Remote", type: "Full-time", description: "Automate testing workflows and ensure product quality.", postedDaysAgo: 8 },
  { id: 12, title: "Machine Learning Intern", company: "AI Dynamics", location: "Remote", type: "Internship", description: "Train and evaluate ML models for production use.", postedDaysAgo: 1 },
];
