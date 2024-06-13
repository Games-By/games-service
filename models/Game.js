const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const ImageSchema = new Schema(
   {
      coverImage: String,
      wallpapers: [
         {
            type: { type: String, enum: ['wallpaper'] },
            url: String,
         },
      ],
      secondaryCovers: [
         {
            type: { type: String, enum: ['secondaryCover'] },
            url: String,
         },
      ],
   },
   { _id: false }
);

const PriceSchema = new Schema(
   {
      currencyCode: String,
      amount: Number,
   },
   { _id: false }
);

const GameModeSchema = new Schema(
   {
      mode: String,
   },
   { _id: false }
);

const DlcSchema = new Schema({
   name: String,
   releaseDate: Date,
   description: {
      en: String,
   },
});

const GameSchema = new Schema({
   name: String,
   description: DescriptionSchema,
   images: ImageSchema,
   genres: DescriptionSchema,
   releaseYear: Number,
   rating: Number,
   prices: DescriptionSchema,
   trailer: String,
   developer: String,
   publisher: String,
   gameModes: [GameModeSchema],
   dlcs: [DlcSchema],
   awards: [
      {
         name: String,
         category: String,
         winner: Boolean,
      },
   ],
   community: {
      website: String,
      forums: String,
      socialMedia: {
         twitter: String,
         facebook: String,
         instagram: String,
      },
   },
});

const Game = mongoose.model('Game', GameSchema, 'games');

module.exports = Game;
