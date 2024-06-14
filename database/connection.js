const mongoose = require('mongoose');
require('dotenv').config();

const getDatabaseURL = async () => {
   if (process.env.NODE_ENV === 'production') {
      return process.env.PROD_DB_URL;
   } else if (process.env.NODE_ENV === 'staging') {
      return process.env.STAGING_DB_URL;
   } else if (process.env.NODE_ENV === 'development') {
      return process.env.DEV_DB_URL;
   }
};

const initializeEnvironment = async () => {
   const environment = await getDatabaseURL();
   if (!environment) {
      console.error(
         'Database credentials are missing. Please check your .env file.',
         environment
      );
      process.exit(1);
   }

   console.log('environment:', process.env.NODE_ENV);
   return environment;
};

initializeEnvironment().then((dbConnect) => {
   try {
      mongoose.connect(dbConnect);
      const connection = mongoose.connection;
      connection.on('error', (err) => {
         console.error('Error connecting to database', err);
      });
      connection.on('open', () => {
         console.log('MongoDB connected!');
      });
   } catch (error) {
      console.error('An error occurred while connecting to the database:', error);
   }
});

module.exports = mongoose;
