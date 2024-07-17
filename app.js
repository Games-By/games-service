const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(
   cors({
      origin: function (origin, callback) {
         if (origin === 'http://localhost:3000' || '*') {
            callback(null, true);
         } else {
            callback(new Error('Not allowed by CORS'));
         }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
   })
);

const GamesRoutes = require('./routes/GamesRoutes');
const GameImagesRoutes = require('./routes/GameImagesRoutes');
const BannerRoutes = require('./routes/BannerRoutes');

app.use('/api', GamesRoutes);
app.use('/api', GameImagesRoutes);
app.use('/api', BannerRoutes);

const port = process.env.PORT || 3002;

app.listen(port, () => {
   console.log(`Server running on the port ${port}`);
});

require('./database/connection');
