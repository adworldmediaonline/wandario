import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  status: { type: String, default: 'active' },
  thumbnail: {
    secure_url: String,
    public_id: String,
    fileName: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Destination =
  mongoose.models.Destination ||
  mongoose.model('Destination', destinationSchema);

export default Destination;
