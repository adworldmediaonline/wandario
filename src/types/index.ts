export interface ICloudinaryImage {
  secure_url: string;
  public_id: string;
  fileName?: string;
}

export interface IFAQ {
  question: string;
  answer: string;
}

export interface IDestination {
  _id: string;
  name: string;
  slug: string;
  heading: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  description: string;
  excerpt: string;
  categoryId: ICategory;
  images: ICloudinaryImage[];
  thumbnail: ICloudinaryImage;
  status: string;
  createdAt: string;
  updatedAt: string;
  faqs: IFAQ[];
}

export interface ICategory {
  _id: string;
  name: string;
  heading: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  description: string;
  excerpt: string;
  status: string;
  slug: string;
  images: ICloudinaryImage[];
  thumbnail: ICloudinaryImage;
  destinations: IDestination[];
  createdAt: Date;
}

export interface IBlog {
  _id: string;
  name: string;
  slug: string;
  heading: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  description: string;
  excerpt: string;
  categoryId: ICategory;
  images: ICloudinaryImage[];
  thumbnail: ICloudinaryImage;
  status: string;
  createdAt: string;
  updatedAt: string;
  faqs: IFAQ[];
}

export interface IBlogCategory {
  _id: string;
  name: string;
  description: string;
  excerpt: string;
  status: string;
  slug: string;
  thumbnail: ICloudinaryImage;
  blogs: IBlog[];
  createdAt: Date;
}

export interface IContact {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: Date;
  updatedAt: Date;
}

export interface IImage {
  secure_url?: string;
  public_id?: string;
  fileName?: string;
}

export interface IMenuItem {
  label: string;
  href: string;
  order: number;
  isActive: boolean;
}

export interface ICTAButton {
  label: string;
  href: string;
  isActive: boolean;
}

export interface IHeader {
  _id: string;
  logo?: IImage;
  menuItems?: IMenuItem[];
  ctaButton?: ICTAButton;
  status: 'published' | 'draft';
  type: 'primary' | 'secondary';
  createdAt: string;
  updatedAt: string;
}

export interface ISection {
  type: 'content-image';
  content: string;
  image: IImage;
  imagePosition: 'left' | 'right';
  order: number;
}

export interface IHero {
  title: string;
  content?: string;
  backgroundImage: IImage;
  ctaButton?: {
    label: string;
    href: string;
  };
}

export interface IPage {
  _id: string;
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;
  hero: IHero;
  sections: ISection[];
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}
