/**
 * Enviroment Configuration Parameters
 */

//Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Port
process.env.PORT = process.env.PORT || 3000;

// Database connection
process.env.DB_URI = (process.env.NODE_ENV === 'dev')?
  'mongodb://localhost:27017/cafe':
  process.env.MONGO_URI;

// Auth Seed
process.env.SEED = (process.env.NODE_ENV === 'dev')?
  'seed-dev':
  process.env.AUTH_SEED;

// Expire token
process.env.TOKEN_EXPIRES = '10d'

// Google clent id
process.env.CLIENT_ID = process.env.CLIENT_ID || '931683885974-f1cl7859bgi6c88fhbes5jt8fm1ils1m.apps.googleusercontent.com';
