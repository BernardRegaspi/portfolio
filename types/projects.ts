export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  galleryImages: string[];
  demoUrl?: string;
  githubUrl?: string;
  category: "fullstack" | "mobile" | "frontend" | "backend";
  featured: boolean;
  completedDate: string;
}

export interface ProjectGalleryProps {
  projects: Project[];
  autoPlayDelay?: number;
  showControls?: boolean;
}
