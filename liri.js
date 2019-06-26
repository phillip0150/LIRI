//At the top of the liri.js file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();
//Adding keys, as well as npm packages
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
//creating a new spofity 
var spotify = new Spotify(keys.spotify);
//Index 2 in the array is the command or the userInput (spotify-this-song, movie-this, etc.)
var userInput = process.argv[2];
//adding for filing reading
var fs = require("fs");

//Spotify Function
function spotifySearch(song){
    //if the user doesn't enter a song, we assign song as "The Sign"
    if (song === ""){
        song = "The Sign";
    }
    //setting up the search
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //if this is 0, we know that we coudln't find a song
        if(data.tracks.items.length === 0){
            console.log("Sorry, no results. Please search another song.");
        }
        //for loop to display all the songs found
        for (var i = 0; i<  data.tracks.items.length; i++){
            console.log("-------------------------");
            console.log("Artist: " + data.tracks.items[i].artists[0].name);
            console.log("Song name: " + data.tracks.items[i].name);
            console.log("Link: " + data.tracks.items[i].external_urls.spotify);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("-------------------------");
        } 
    });
}

//concert-this function
function concert(artist){
    //if the artist is blank, user didn't enter anything
    //set artist to "Lil Pump"
    if (artist === ""){
        artist = "Lil Pump";
    }
    //setting the query
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist.trim() + "/events?app_id=codingbootcamp";
    //using axios to get repsonse
    axios.get(queryUrl).then(
        function(response) {
            //if response lenght is 0, we know that the artist doesn't have a concert coming up
            if(response.data.length === 0){
                return console.log("Sorry, no concert for " +artist.trim());
            }
            //console.log the artist name
            //then for loop to display all info
            console.log(artist.trim() + " concert list");
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

//movie-this function
function movie(movieName) {
    //if the user enters a blank movie, we set movie to Mr. Nobody
    if (movieName === ""){
        movieName = "Mr. Nobody";
    }
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    axios.get(queryUrl).then(
        function(response) {
            //if response length is 0, we didn't get a result
            if(response.data.length === 0){
                console.log("Sorry, no results. Please search another movie.");
            }
            //displaying movie info
            console.log("------------------------------");
            console.log(`Title: ${response.data.Title}`);// * Title of the movie.
            console.log(`Released: ${response.data.Released}`);//* Year the movie came out.
            console.log(`IMDB Rating: ${response.data.imdbRating}`);//* IMDB Rating of the movie.
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);//* Rotten Tomatoes Rating of the movie.
            console.log(`Country where it was produced: ${response.data.Country}`);//* Country where the movie was produced.
            console.log(`Movie language: ${response.data.Language}`);//* Language of the movie.
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

//switch case to see what the userInput is
//then calling the correct function
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
        console.log("-------------------------");
        console.log("Please use spotify-this-song <input>, to search a song\nPlease use concert-this <input>, to search a concert\nPlease use moive-this <input>, to search a movie\nPlease use do-what-it-says to use a text file to search for you.")
        console.log("-------------------------");
}
       