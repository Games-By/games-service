const Game = require('../models/Game');

module.exports = class WishListController {
   static async init(req, res) {
      res.send({ message: 'Welcome' });
   }
};
