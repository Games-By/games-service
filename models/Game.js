const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DescriptionSchema = new Schema(
   {
      'en-US': String,
      'pt-BR': String,
      'es-ES': String,
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
   description: DescriptionSchema,
});

const AwardSchema = new Schema({
   name: String,
   category: String,
   winner: Boolean,
});

const SocialMediaSchema = new Schema(
   {
      twitter: String,
      facebook: String,
      instagram: String,
   },
   { _id: false }
);

const CommunitySchema = new Schema(
   {
      website: String,
      forums: String,
      socialMedia: SocialMediaSchema,
   },
   { _id: false }
);

const SystemRequirementsSchema = new Schema(
   {
      os: String,
      processor: String,
      memory: String,
      graphics: String,
      storage: String,
   },
   { _id: false }
);

const PlayTimeSchema = new Schema(
   {
      mainStory: Number,
      fullCompletion: Number,
   },
   { _id: false }
);

const AgeRatingSchema = new Schema(
   {
      ratingSystem: String,
      rating: String,
   },
   { _id: false }
);

const UpdateSchema = new Schema({
   version: String,
   releaseDate: Date,
   notes: String,
});

const UserReviewSchema = new Schema({
   username: String,
   rating: Number,
   comment: String,
   date: Date,
});

const MultiplayerSupportSchema = new Schema(
   {
      crossPlay: Boolean,
      maxPlayers: Number,
   },
   { _id: false }
);

const GameSchema = new Schema({
   name: String,
   description: DescriptionSchema,
   images: ImageSchema,
   genres: DescriptionSchema,
   releaseYear: Number,
   releaseDate: Date,
   rating: Number,
   metacriticScore: Number,
   platforms: [String],
   ageRating: AgeRatingSchema,
   supportedLanguages: [String],
   playTime: PlayTimeSchema,
   systemRequirements: {
      minimum: SystemRequirementsSchema,
      recommended: SystemRequirementsSchema,
   },
   prices: {
      'en-US': PriceSchema,
      'pt-BR': PriceSchema,
      'es-ES': PriceSchema,
   },
   discount: Number,
   trailer: String,
   developer: String,
   publisher: String,
   gameModes: [GameModeSchema],
   dlcs: [DlcSchema],
   awards: [AwardSchema],
   community: CommunitySchema,
   updates: [UpdateSchema],
   userReviews: [UserReviewSchema],
   multiplayerSupport: MultiplayerSupportSchema,
   pegiRating: String,
   esrbRating: String,
});

const Game = mongoose.model('Game', GameSchema, 'games');

module.exports = Game;
