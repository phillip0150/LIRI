//At the top of the liri.js file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();
//Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
//You should then be able to access your keys information like so
var spotify = new Spotify(keys.spotify);
var userInput = process.argv[2];


if (userInput === "spotify-this-song"){
    for (var i = 2; i < process.argv.length; i++) {
        song += process.argv[i] + " ";
    }
   
    spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    for (var i = 0; i<  data.tracks.items.length; i++){
        console.log("Artist: " + data.tracks.items[i].artists[0].name);
        console.log("Song name: " + data.tracks.items[i].name);
        console.log("Link: " + data.tracks.items[i].href);
        console.log("Album: " + data.tracks.items[i].album.name);
        console.log("-------------------------");
    } 

    //need to add If no song is provided then your program will default to "The Sign" by Ace of Base.
});}

if (userInput === "concert-this"){
// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") 
// for an artist and render the following information about each event to the terminal:
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

    for (var i = 2; i < process.argv.length; i++) {
        artist += process.argv[i] + " ";
    }

    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response) {
            console.log("response");
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
}

if (userInput === "movie-this"){
    for (var i = 2; i < process.argv.length; i++) {
        movieName += process.argv[i] + " ";
    }
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
//     * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
axios.get(queryUrl).then(
    function(response) {
        console.log("------------------------------");
        console.log(`Title: ${response.data.Title}`);
        console.log(`Released: ${response.data.Released}`);
        console.log(`IMDB Rating: ${response.data.imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
        console.log(`Country where it was produced: " + ${response.data.Country}`);
        console.log(`Plot: ${response.data.Plot}`);
        console.log(`Actors: ${response.data.Actors}`);
        console.log("------------------------------");
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });


}




if (userInput === "do-what-it-says"){

}