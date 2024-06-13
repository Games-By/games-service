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

const GetGamesRoutes = require('./routes/GetGamesRoutes');

app.use(GetGamesRoutes);

const port = process.env.PORT || 3002;

app.listen(port, () => {
   console.log(`Server running on the port ${port}`);
});

require('./database/connection');
