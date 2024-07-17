const express = require('express');
const router = express.Router();
const GamesController = require('../controllers/GamesController');

router.get('/', GamesController.init);
router.get('/games', GamesController.getGames);
router.get('/game/:name', GamesController.getGamesByName);
router.get('/game/id/:id', GamesController.getGameById);
router.post('/game/add', GamesController.addGame);

module.exports = router;
