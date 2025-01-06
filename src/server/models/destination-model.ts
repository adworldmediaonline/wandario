import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },

  heading: {
    type: String,
    required: [true, 'Heading is required'],
    trim: true,
  },

  // metadata
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

  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [400, 'Excerpt must be less than 400 characters'],
    trim: true,
  },

  description: {
    type: String,
    required: [true, 'Description is required'],
  },

  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  status: {
    type: String,
    default: 'active',
  },

  thumbnail: {
    secure_url: String,
    public_id: String,
    fileName: String,
  },
  images: {
    type: [
      {
        secure_url: String,
        public_id: String,
        fileName: String,
      },
    ],
  },

  faqs: {
    type: [
      {
        question: String,
        answer: String,
      },
    ],
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

const Destination =
  mongoose.models.Destination ||
  mongoose.model('Destination', destinationSchema);

export default Destination;
