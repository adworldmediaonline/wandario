import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [200, 'Excerpt must be less than 200 characters'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  thumbnail: {
    secure_url: String,
    public_id: String,
    fileName: String,
  },
  destinations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
