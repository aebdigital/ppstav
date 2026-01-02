export interface Project {
  slug: string;
  folderName: string;
  title: string;
  location: string;
  year: string;
  scope: string;
  images: string[];
  imageCount: number;
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  icon: string;
  image: string;
}

export interface ContactInfo {
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  email: string;
  workingHours: string;
  businessInfo: {
    name: string;
    ico: string;
    dic: string;
  };
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
  };
}
