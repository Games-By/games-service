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
      try {
         const game = await Game.findById(id);
         if (!game) {
            return res.status(404).json({ message: 'Game not found' });
         }
         res.status(200).json(game);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   }
   static async addGame(req, res) {
      const { game } = req.body;

      if (!game) {
         return res.status(400).json({ error: 'No game data provided' });
      }

      try {
         const newGame = new Game(game);
         await newGame.save();
         return res.status(201).json(newGame);
      } catch (error) {
         return res
            .status(500)
            .json({
               error: 'Error when saving the game',
               details: error.message,
            });
      }
   }
};
