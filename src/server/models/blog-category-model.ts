import mongoose from 'mongoose';

const blogCategorySchema = new mongoose.Schema({
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
    required: true,
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
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
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

const BlogCategory =
  mongoose.models.BlogCategory ||
  mongoose.model('BlogCategory', blogCategorySchema);

export default BlogCategory;
