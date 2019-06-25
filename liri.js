//At the top of the liri.js file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();
//Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
//You should then be able to access your keys information like so
var spotify = new Spotify(keys.spotify);
var userInput = process.argv[2];
var fs = require("fs");

function spotifySearch(song){
    if (song === ""){
        song = "The Sign";
    }
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (var i = 0; i<  data.tracks.items.length; i++){
            console.log("Artist: " + data.tracks.items[i].artists[0].name);
            console.log("Song name: " + data.tracks.items[i].name);
            console.log("Link: " + data.tracks.items[i].external_urls.spotify);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("-------------------------");
        } 
    });
}

function concert(artist){
// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") 
// for an artist and render the following information about each event to the terminal:
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")


// Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist.trim() + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response) {
            console.log(artist.trim());
            for (var i =0; i< response.data.length; i++)
            {
                console.log("------------------------------");
                console.log(`Artist: ${artist}`);
                console.log(`Venue Name: ${response.data[i].venue.name}`);
                console.log(`Venue Location: ${response.data[i].venue.city}, ${response.data[i].venue.country}`);
                console.log(`Date of Event: ${moment(response.data[i].datetime).format("L")}`);
                console.log("------------------------------");
            } 
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

function movie(movieName) {
    if (movieName === ""){
        movieName = "Mr. Nobody";
    }
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    axios.get(queryUrl).then(
        function(response) {
            console.log("------------------------------");
            console.log(`Title: ${response.data.Title}`);// * Title of the movie.
            console.log(`Released: ${response.data.Released}`);//* Year the movie came out.
            console.log(`IMDB Rating: ${response.data.imdbRating}`);//* IMDB Rating of the movie.
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);//* Rotten Tomatoes Rating of the movie.
            console.log(`Country where it was produced: ${response.data.Country}`);//* Country where the movie was produced.
            //* Language of the movie.
            console.log(`Plot: ${response.data.Plot}`);//* Plot of the movie.
            console.log(`Actors: ${response.data.Actors}`);//* Actors in the movie.
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

function doWhat(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        for (var i =0; i<dataArr.length-1; i++){
            switch(dataArr[i]){
                case "spotify-this-song":
                    spotifySearch(dataArr[i+1]);
                    break;
                case "concert-this":
                    concert(dataArr[i+1]);
                    break;
                case "movie-this":
                    movie(dataArr[i+1]);
                    break;
                // default:
                //     console.log("Sorry, file is corrupt. Please make sure file has a format of [command],[argument].")

            }
        }
      
      });
}
switch (userInput) {
    case "spotify-this-song":
        spotifySearch(process.argv.slice(3).join(" ")); 
        break;
    case "concert-this":
        concert(process.argv.slice(3).join(" "));
        break;
    case "movie-this":
        movie(process.argv.slice(3).join(" "));
        break;
    case "do-what-it-says":
        doWhat();
        break;
    default:
        console.log("Please use spotify-this-song <arugment>, to search a song\nPlease use concert-this <argument>, to search a concert\nPlease use moive-this <argument>, to search a movie\nPlease use do-what-it-says to use a text file to search for you.")
}
       