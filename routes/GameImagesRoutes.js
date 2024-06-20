const express = require('express');
const router = express.Router();
const GamesController = require('../controllers/GameImagesController');

router.put('/game/:name/images', GamesController.updateGameImages);
router.post('/game/:name/images/add', GamesController.addGameImages);
router.delete('/game/:name/images/remove', GamesController.removeGameImage);

module.exports = router;
