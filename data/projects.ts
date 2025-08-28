import { Project } from "@/types/projects";

export const fullstackProjectsData: Project[] = [
  {
    id: "1",
    title: "Cellphone Renting Admin",
    description:
      "A comprehensive admin dashboard for managing cellphone rental services. Features include inventory management, customer tracking, rental scheduling, and payment processing.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    imageUrl: "/fullstack-projects/CellphoneRentingAdmin/dashboard.png",
    galleryImages: [
      "/fullstack-projects/CellphoneRentingAdmin/dashboard.png",
      "/fullstack-projects/CellphoneRentingAdmin/manage-phone.png",
    ],
    githubUrl: "https://github.com/BernardRegaspi/cellphone-rental-system",
    category: "fullstack",
    featured: true,
    completedDate: "2024",
  },
  {
    id: "2",
    title: "Employee Monitoring System",
    description:
      "A robust employee management and monitoring system with task assignment, approval workflows, and comprehensive reporting. Includes role-based access control for administrators and employees.",
    technologies: [
      "NextJS",
      "ReactJS",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    imageUrl: "/fullstack-projects/EmployeeMonitoring/Employee Tab.png",
    galleryImages: [
      "/fullstack-projects/EmployeeMonitoring/Admin.png",
      "/fullstack-projects/EmployeeMonitoring/Email.png",
      "/fullstack-projects/EmployeeMonitoring/Employee Tab.png",
      "/fullstack-projects/EmployeeMonitoring/Employee Tab1.png",
      "/fullstack-projects/EmployeeMonitoring/Tasks - Approver2.png",
      "/fullstack-projects/EmployeeMonitoring/Tasks - Employee.png",
      "/fullstack-projects/EmployeeMonitoring/Tasks - Employee1.png",
      "/fullstack-projects/EmployeeMonitoring/Tasks - Employee2.png",
    ],
    githubUrl: "https://github.com/yourusername/employee-monitoring-system",
    category: "fullstack",
    featured: true,
    completedDate: "2024",
  },
  {
    id: "3",
    title: "POS Inventory System",
    description:
      "A complete Point of Sale and inventory management system for retail businesses. Features product management, sales tracking, inventory control, and comprehensive reporting dashboard.",
    technologies: ["NextJS", "FastAPI", "Python", "PostgreSQL", "Tailwind CSS"],
    imageUrl: "/fullstack-projects/PosInventory/Dashboard.png",
    galleryImages: [
      "/fullstack-projects/PosInventory/Dashboard.png",
      "/fullstack-projects/PosInventory/Add Products.png",
      "/fullstack-projects/PosInventory/Products.png",
    ],
    githubUrl: "https://github.com/yourusername/pos-inventory-system",
    category: "fullstack",
    featured: true,
    completedDate: "2024",
  },
];
