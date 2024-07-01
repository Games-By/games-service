const mongoose = require('mongoose');
const { Schema } = mongoose;

const DescriptionSchema = new Schema(
   {
      en: String,
      pt: String,
      zh: String,
      es: String,
      hi: String,
      fr: String,
      ar: String,
      bn: String,
      ru: String,
      id: String,
   },
   { _id: false }
);

const discountSchema = new Schema(
   {
      type: String,
      title: DescriptionSchema,
      description: DescriptionSchema,
      imageUrl: { type: String, required: true },
      linkUrl: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      gameTitle: { type: String, required: true },
      originalPrice: { type: Number, required: true },
      discountedPrice: { type: Number, required: true },
      validUntil: { type: Date, required: true },
      discount: { type: Number, required: true, min: 0, max: 100 },
      rating: { type: Number, required: true, min: 0, max: 100 },
   },
   { collection: 'banners' }
);
const DiscountBanner = mongoose.model('DiscountBanner', discountSchema);

module.exports = DiscountBanner
