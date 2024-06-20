const express = require('express');
const router = express.Router();
const BannerController = require('../controllers/BannerController');

router.get('/banners', BannerController.getBanners);
router.post('/banners/add', BannerController.addBanner);
router.put('/banners/update', BannerController.updateBanner);
router.delete('/banners/remove', BannerController.removeBanner);

module.exports = router;
