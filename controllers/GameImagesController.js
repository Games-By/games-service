const Game = require('../models/Game');

module.exports = class GameImagesController {
   static async updateGameImages(req, res) {
      const { name } = req.params;
      const { coverImage, wallpapers, secondaryCovers } = req.body;

      try {
         const game = await Game.findOne({ name: name });

         if (!game) {
            return res.status(404).json({ message: 'Game not found' });
         }

         if (coverImage) {
            game.images.coverImage = coverImage;
         }
         if (wallpapers) {
            game.images.wallpapers = wallpapers;
         }
         if (secondaryCovers) {
            game.images.secondaryCovers = secondaryCovers;
         }

         await game.save();

         res.status(200).json(game);
      } catch (error) {
         if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(
               (err) => err.message
            );
            return res.status(400).json({ error: errors });
         }
         res.status(500).json({ error: error.message });
      }
   }
   static async addGameImages(req, res) {
      const { name } = req.params;
      const { type, url } = req.body;

      try {
         const game = await Game.findOne({ name: name });

         if (!game) {
            return res.status(404).json({ message: 'Game not found' });
         }

         if (type === 'coverImage') {
            game.images.coverImage = url;
         } else if (type === 'wallpaper') {
            game.images.wallpapers.push({ type: 'wallpaper', url: url });
         } else if (type === 'secondaryCover') {
            game.images.secondaryCovers.push({
               type: 'secondaryCover',
               url: url,
            });
         } else {
            return res.status(400).json({ message: 'Invalid image type' });
         }

         await game.save();

         res.status(200).json(game);
      } catch (error) {
         if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(
               (err) => err.message
            );
            return res.status(400).json({ error: errors });
         }
         res.status(500).json({ error: error.message });
      }
   }
   static async removeGameImage(req, res) {
      const { name } = req.params;
      const { url, type } = req.body;

      try {
         const game = await Game.findOne({ name: name });

         if (!game) {
            return res.status(404).json({ message: 'Game not found' });
         }

         let imageRemoved = false;

         if (type === 'coverImage' && game.images.coverImage === url) {
            game.images.coverImage = null;
            imageRemoved = true;
         }

         if (type === 'wallpaper') {
            const originalWallpapersLength = game.images.wallpapers.length;
            game.images.wallpapers = game.images.wallpapers.filter(
               (image) => !(image.url === url && image.type === 'wallpaper')
            );
            if (game.images.wallpapers.length < originalWallpapersLength) {
               imageRemoved = true;
            }
         }

         if (type === 'secondaryCover') {
            const originalSecondaryCoversLength =
               game.images.secondaryCovers.length;
            game.images.secondaryCovers = game.images.secondaryCovers.filter(
               (image) =>
                  !(image.url === url && image.type === 'secondaryCover')
            );
            if (
               game.images.secondaryCovers.length <
               originalSecondaryCoversLength
            ) {
               imageRemoved = true;
            }
         }

         if (!imageRemoved) {
            return res.status(404).json({ message: 'Image not found in game' });
         }

         await game.save();

         res.status(200).json(game);
      } catch (error) {
         if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(
               (err) => err.message
            );
            return res.status(400).json({ error: errors });
         }
         res.status(500).json({ error: error.message });
      }
   }
};
