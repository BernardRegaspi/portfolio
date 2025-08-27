import { Certificate } from "@/types/certificates";

export const certificatesData: Certificate[] = [
  {
    id: "1",
    title: "NodeJS",
    issuer: "Udemy",
    date: "2023",
    description: "Built scalable E-Commerce web applications with Node.js, Express, and MongoDB database integration.",
    imageUrl: "/certificates/nodejs.jpg",
    credentialUrl: "https://coursera.org/verify/certificate",
    skills: ["Nodejs", "MongoDB", "Express", "JWT", "Postman"]
  },
  {
    id: "2",
    title: "Frontend Web Development",
    issuer: "Pixel8 Web Solutions and Consultancy",
    date: "2023",
    description: "Developed responsive web applications using Vue.js and Quasar Framework technologies.",
    imageUrl: "/certificates/frontend.png",
    credentialUrl: "https://freecodecamp.org/certification",
    skills: ["VueJS", "Quasar Framework", "Bootstrap", "Axios"]
  },
  {
    id: "3",
    title: "Amazon Virtual Assistant Takeoff",
    issuer: "AmazeNation",
    date: "2025",
    description: "Mastered Amazon marketplace optimization and analytics using industry-standard tools.",
    imageUrl: "/certificates/amazon.png",
    credentialUrl: "https://aws.amazon.com/verification",
    skills: ["Amazon", "Tool4Seller", "Helium10", "Microsoft Excell"]
  },
  {
    id: "4",
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    description: "Advanced JavaScript programming with focus on algorithms and data structures.",
    imageUrl: "/certificates/js-algorithms-cert.jpg",
    credentialUrl: "https://freecodecamp.org/certification",
    skills: ["JavaScript", "Algorithms", "Data Structures", "Problem Solving"]
  },
  {
    id: "5",
    title: "UI/UX Design Professional",
    issuer: "Google",
    date: "2023",
    description: "User interface and user experience design principles and best practices.",
    imageUrl: "/certificates/uiux-cert.jpg",
    credentialUrl: "https://coursera.org/verify/certificate",
    skills: ["UI Design", "UX Design", "Figma", "Prototyping", "User Research"]
  }
];
