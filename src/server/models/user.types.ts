import { Document } from 'mongoose';

interface BaseUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  state: string;
  image?: string;
  emailVerified: Date | null;
  verificationToken?: string;
  role: 'advertiser' | 'freelancer' | 'admin';
}

interface AdvertiserFields {
  companyName: string;
  gstNumber: string;
  address: string;
}

type AdminFields = Record<string, never>;

type FreelancerFields = Record<string, never>;

export type IUser = BaseUser &
  (
    | (AdvertiserFields & { role: 'advertiser' })
    | (FreelancerFields & { role: 'freelancer' })
    | (AdminFields & { role: 'admin' })
  );

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

export type UserDocument = Document & IUser & IUserMethods;
