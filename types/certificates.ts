export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl: string;
  credentialUrl?: string;
  skills: string[];
}

export interface CertificateGalleryProps {
  certificates: Certificate[];
  autoPlayDelay?: number;
  showControls?: boolean;
}
