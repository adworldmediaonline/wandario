import { Model, Schema, model, models } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { IUserMethods, UserDocument } from './user.types';

type UserModel = Model<UserDocument, object, IUserMethods>;

// type UserRole = 'advertiser' | 'freelancer' | 'admin';

const userSchema = new Schema<UserDocument, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
    },
    image: String,
    emailVerified: {
      type: Date,
      default: null,
    },
    verificationToken: {
      type: String,
      select: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: ['advertiser', 'freelancer', 'admin'],
      required: [true, 'Role is required'],
    },
    companyName: {
      type: String,
      required: function (this: UserDocument) {
        return this.role === 'advertiser';
      },
      default: null,
    },
    gstNumber: {
      type: String,
      required: function (this: UserDocument) {
        return this.role === 'advertiser';
      },
      default: null,
    },
    address: {
      type: String,
      required: function (this: UserDocument) {
        return this.role === 'advertiser';
      },
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await hash(this.password, 12);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Add method to compare passwords
userSchema.methods.comparePassword = async function (
  this: UserDocument,
  candidatePassword: string
): Promise<boolean> {
  try {
    return await compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};

// Type-safe model
export const User = (models?.User || model('User', userSchema)) as UserModel;
