import { Schema, model, models } from 'mongoose';
import slugify from 'slugify';

const destinationSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  slug: { type: String, unique: true, trim: true },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
});

destinationSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Destination =
  models.Destination || model('Destination', destinationSchema);

export default Destination;
