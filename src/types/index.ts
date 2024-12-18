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
  description: string;
  excerpt: string;
  status: string;
  slug: string;
  thumbnail: ICloudinaryImage;
  destinations: IDestination[];
  createdAt: Date;
}
