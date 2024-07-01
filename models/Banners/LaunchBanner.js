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

const launchSchema = new Schema(
   {
      type: String,
      title: DescriptionSchema,
      description: DescriptionSchema,
      imageUrl: { type: String, required: true },
      linkUrl: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      gameTitle: { type: String, required: true },
      releaseDate: { type: Date, required: true },
      trailerUrl: { type: String, required: true },
      developer: { type: String, required: true },
      publisher: { type: String, required: true },
      genre: [DescriptionSchema],
      price: { type: Number, required: true },
   },
   { collection: 'banners' }
);

const LaunchBanner = mongoose.model('LaunchBanner', launchSchema);

module.exports = LaunchBanner;
