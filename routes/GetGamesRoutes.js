const express = require('express');
const router = express.Router();
const GamesController = require('../controllers/GamesController');

router.get('/', GamesController.init);
router.get('/games', GamesController.getGames);
router.get('/game/:name', GamesController.getGamesByName);
router.get('/game/id/:id', GamesController.getGameById);
router.put('/game/:name/images', GamesController.updateGameImages);
router.post('/game/:name/images/add', GamesController.addGameImages);
router.delete('/game/:name/images/remove', GamesController.removeGameImage);

module.exports = router;
