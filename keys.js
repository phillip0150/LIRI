//Make a JavaScript file named keys.js.
//Inside keys.js your file will look like this:
console.log('this is loaded');


exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};