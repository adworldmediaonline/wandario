export interface IDestination {
  _id: string;
  name: string;
  description: string;
  excerpt: string;
  status: string;
  categoryId: string;
  thumbnail: {
    secure_url: string;
    public_id: string;
    fileName: string;
  };
  createdAt: Date;
}

export interface ICategory {
  _id: string;
  name: string;
  description: string;
  excerpt: string;
  status: string;
  thumbnail: {
    secure_url: string;
    public_id: string;
    fileName: string;
  };
  destinations: IDestination[];
  createdAt: Date;
}
