import mongoose from 'mongoose';

const headerSchema = new mongoose.Schema({
  type: {
    type: String,
    // enum: ['primary', 'secondary'],
    // default: 'primary',
    required: true,
    unique: true,
  },

  logo: {
    secure_url: String,
    public_id: String,
    fileName: String,
  },
  menuItems: [
    {
      label: {
        type: String,
        required: true,
      },
      href: {
        type: String,
        required: true,
      },
      order: {
        type: Number,
        default: 0,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
    },
  ],
  ctaButton: {
    label: String,
    href: String,
    isActive: {
      type: Boolean,
      default: false,
    },
  },
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

const Header = mongoose.models.Header || mongoose.model('Header', headerSchema);

export default Header;
