const express = require('express');
const router = express.Router();
const GameImagesController = require('../controllers/GameImagesController');

router.put('/game/:name/images', GameImagesController.updateGameImages);
router.post('/game/:name/images/add', GameImagesController.addGameImages);
router.delete('/game/:name/images/remove', GameImagesController.removeGameImage);

module.exports = router;
