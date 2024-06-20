const mongoose = require('mongoose');
const { Schema } = mongoose;

const launchSchema = new Schema(
   {
      type: String,
      title: { type: String, required: true },
      description: { type: String, required: true },
      imageUrl: { type: String, required: true },
      linkUrl: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      gameTitle: { type: String, required: true },
      releaseDate: { type: Date, required: true },
      description: { type: String, required: true },
      trailerUrl: { type: String, required: true },
      developer: { type: String, required: true },
      publisher: { type: String, required: true },
      genre: { type: String, required: true },
      price: { type: Number, required: true },
   },
   { collection: 'banners' }
);

const LaunchBanner = mongoose.model('LaunchBanner', launchSchema);

module.exports = LaunchBanner;
