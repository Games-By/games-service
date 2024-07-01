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

const BannerSchema = new Schema(
   {
      title: DescriptionSchema,
      description: DescriptionSchema,
      imageUrl: { type: String, required: true },
      linkUrl: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      type: { type: String, required: true },
   },
   { discriminatorKey: 'type', collection: 'banners' }
);

const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;
