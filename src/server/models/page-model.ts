import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['content-image'],
    required: true,
  },
  content: String,
  image: {
    secure_url: String,
    public_id: String,
    fileName: String,
  },
  imagePosition: {
    type: String,
    enum: ['left', 'right'],
    default: 'right',
  },
  order: {
    type: Number,
    required: true,
  },
});

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // SEO fields
  metaTitle: {
    type: String,
    required: [true, 'Meta Title is required'],
    trim: true,
  },
  metaDescription: {
    type: String,
    required: [true, 'Meta Description is required'],
    trim: true,
  },
  metaKeywords: {
    type: String,
    trim: true,
  },
  // Hero section
  hero: {
    title: {
      type: String,
      required: true,
    },
    content: String,
    backgroundImage: {
      secure_url: String,
      public_id: String,
      fileName: String,
    },
    ctaButton: {
      label: String,
      href: String,
    },
  },
  // Content sections
  sections: [sectionSchema],
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'draft',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Page = mongoose.models.Page || mongoose.model('Page', pageSchema);

export default Page;
