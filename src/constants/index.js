// src/constants/index.js
import { FaReact, FaNodeJs, FaPython, FaJava, FaGitAlt, FaDocker,FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiGraphql, 
  SiMongodb, 
  SiPostgresql, 

  SiTailwindcss,
  SiVite
} from 'react-icons/si';
export const navLinks = [
  { id: 'home', title: 'Home' },
  { id: 'about', title: 'About' },
  { id: 'skills', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'experience', title: 'Experience' },
  { id: 'education', title: 'Education' },
  { id: 'contact', title: 'Contact' },
];

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/yourusername', icon: FaGithub },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: FaLinkedin },
  { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: FaTwitter },
  // Add more social links as needed
];

export const skills = [
  { name: 'React', level: 90, icon: FaReact },
  { name: 'JavaScript', level: 85, icon: SiJavascript },
  { name: 'TypeScript', level: 80, icon: SiTypescript },
  { name: 'Node.js', level: 75, icon: FaNodeJs },
  { name: 'Python', level: 70, icon: FaPython },
  { name: 'Java', level: 65, icon: FaJava },
  { name: 'Git', level: 85, icon: FaGitAlt },
  { name: 'Docker', level: 70, icon: FaDocker },
  { name: 'GraphQL', level: 60, icon: SiGraphql },
  { name: 'MongoDB', level: 75, icon: SiMongodb },
  { name: 'PostgreSQL', level: 70, icon: SiPostgresql },
 // Now correctly imported
  { name: 'Tailwind CSS', level: 85, icon: SiTailwindcss },
  { name: 'Vite', level: 80, icon: SiVite },
];

export const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with React, Node.js, and MongoDB.',
    tags: ['React', 'Node.js', 'MongoDB', 'Redux'],
    image: null,
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com/yourusername/ecommerce',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A task management application with drag-and-drop functionality.',
    tags: ['React', 'TypeScript', 'Firebase'],
    image: null,
    liveUrl: 'https://example.com/task-app',
    codeUrl: 'https://github.com/yourusername/task-app',
  },
  // Add more projects
];