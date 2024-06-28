const Banner = require('../models/Banners');
const DiscountBanner = require('../models/Banners/DiscountBanner');
const LaunchBanner = require('../models/Banners/LaunchBanner');

class BannerController {
   static async getBanners(req, res) {
      try {
         const banners = await Banner.find();

         const launchBanners = banners.filter(
            (banner) => banner.type === 'launch'
         );
         const discountBanners = banners.filter(
            (banner) => banner.type === 'discount'
         );

         const organizedBanners = {
            launchBanners,
            discountBanners,
         };

         res.json(organizedBanners);
      } catch (err) {
         res.status(500).json({ error: err.message });
      }
   }

   static async addBanner(req, res) {
      try {
         let newBanner;
         const { type } = req.body;
         switch (type) {
            case 'launch':
               newBanner = new LaunchBanner(req.body);
               break;
            case 'discount':
               newBanner = new DiscountBanner(req.body);
               break;
            default:
               throw new Error('No valid type of banner');
         }

         await newBanner.save();

         res.status(201).json(newBanner);
      } catch (err) {
         res.status(400).json({ error: err.message });
      }
   }

   static async updateBanner(req, res) {
      try {
         const { id, type } = req.body;

         if (!type || (type !== 'launch' && type !== 'discount')) {
            throw new Error('Tipo de banner inválido');
         }

         let updatedBanner;

         switch (type) {
            case 'launch':
               updatedBanner = await LaunchBanner.findByIdAndUpdate(
                  id,
                  req.body,
                  { new: true }
               );
               break;
            case 'discount':
               updatedBanner = await DiscountBanner.findByIdAndUpdate(
                  id,
                  req.body,
                  { new: true }
               );
               break;
            default:
               throw new Error('Tipo de banner inválido');
         }

         if (!updatedBanner) {
            return res.status(404).json({ error: 'Banner not found' });
         }

         res.json(updatedBanner);
      } catch (err) {
         res.status(400).json({ error: err.message });
      }
   }

   static async removeBanner(req, res) {
      try {
         const { id, type } = req.body;

         if (!type || (type !== 'launch' && type !== 'discount')) {
            throw new Error('Tipo de banner inválido');
         }

         let deletedBanner;

         switch (type) {
            case 'launch':
               deletedBanner = await LaunchBanner.findByIdAndDelete(id);
               break;
            case 'discount':
               deletedBanner = await DiscountBanner.findByIdAndDelete(id);
               break;
            default:
               throw new Error('Tipo de banner inválido');
         }

         if (!deletedBanner) {
            return res.status(404).json({ error: 'Banner not found' });
         }

         res.json({ message: 'Banner deleted successfully' });
      } catch (err) {
         res.status(400).json({ error: err.message });
      }
   }
}

module.exports = BannerController;
