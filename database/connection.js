const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

console.log('Express server configured successfully');

app.use(
   cors({
      origin: function (origin, callback) {
         console.log('Origin:', origin);
         if (origin === 'http://localhost:3000' || '*') {
            console.log('Allowed by CORS');
            callback(null, true);
         } else {
            console.log('Not allowed by CORS');
            callback(new Error('Not allowed by CORS'));
         }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
   })
);

console.log('CORS configured successfully');

const GetGamesRoutes = require('./routes/GetGamesRoutes');
app.use('/api', GetGamesRoutes);

console.log('API routes included successfully');

const port = process.env.PORT || 3002;

console.log(`Server will listen on port ${port}`);

app.listen(port, () => {
   console.log(`Server running on the port ${port}`);
});

require('./database/connection');
