import { Schema, model, models } from 'mongoose';
import slugify from 'slugify';

const categorySchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    slug: { type: String, unique: true, trim: true },
    description: {
      type: String,
      trim: true,
    },
    thumbnail: {
      secure_url: String,
      public_id: String,
      fileName: String,
    },
    destinations: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Destination',
        },
      ],
      required: [true, 'Destinations are required'],
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Category = models.Category || model('Category', categorySchema);

export default Category;
