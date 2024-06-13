const express = require('express');
const router = express.Router();
const GetGamesController = require('../controllers/GetGamesController');

router.get('/', GetGamesController.init);

module.exports = router;
