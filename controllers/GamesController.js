const Game = require('../models/Game');

module.exports = class GamesController {
   static async init(req, res) {
      res.send({ message: 'Welcome' });
   }
   static async getGames(req, res) {
      try {
         const games = await Game.find();
         res.status(200).json(games);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   }
   static async getGamesByName(req, res) {
      const { name } = req.params;
      try {
         const regex = new RegExp(name, 'i');
         const games = await Game.find({ name: { $regex: regex } });
         if (games.length === 0) {
            return res.status(404).json({ message: 'Game not found' });
         }
         res.status(200).json(games);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   }
   static async getGameById(req, res) {
      const { id } = req.params;
      console.log('1', id)
      try {
         const game = await Game.findById(id);
         console.log('2',game)
         if (!game) {
            return res.status(404).json({ message: 'Game not found' });
         }
         res.status(200).json(game);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   }
};
