const mongoose = require('mongoose');
const { Schema } = mongoose;

const BannerSchema = new Schema(
   {
      title: { type: String, required: true },
      description: { type: String, required: true },
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
