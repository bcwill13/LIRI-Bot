var env = require('dotenv').config();
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.ombd = {
  api_key: process.env.OMBD_API_KEY
};
