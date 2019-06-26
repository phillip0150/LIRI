# LIRI
The current problem with devices, like SIRI, is that you cannot give SIRI commands in text. LIRI solves this problem. 
LIRI is a *Language Interpretation and Recognition Interface*.  LIRI can give you search results based on a written command. LIRI can search spotify songs, search events that an artist is performing at, search for a movie, and finally answering commands in a text file. 

LIRI was written with `javascript`, `node.js`, `axios`, `node-spotify-api`, `moment.js`.

## How to use
[App in action](https://drive.google.com/file/d/1fU0dCr0G2C1ELdFc5IGHCohnhX6IQ9sO/view)

To run the program, you need to open your computer's terminal and enter the follow command:

```bash
  node liri.js
```
![screenShot](https://github.com/phillip0150/LIRI/blob/master/images/1.png?raw=true)

From there, you are presented with a list of commands that the program can do.

### Searching a song

To search a song, type `spotify-this-song` with a song name. For example:
```bash
  node liri.js spotify-this-song Wake Up in The Sky
```
![screenShot](https://github.com/phillip0150/LIRI/blob/master/images/2.png?raw=true)

Once you enter a search, you are presented with a list. The list will contain a `Artist`, `Song name`, `Link`, and a `Album`. Hovering over `Link` and using the following shortcut `cmd + mouse click`, will take you to spotify song page.

![screenShot](https://github.com/phillip0150/LIRI/blob/master/images/3.png?raw=true)


### Searching a concert

To search a concert, type `concert-this` with a artist. For example:
```bash
  node liri.js concert-this Lil Pump
```
![screenShot](https://github.com/phillip0150/LIRI/blob/master/images/4.png?raw=true)

Once you enter a search, you are presented with a list. The list will contain the `Artist`, `Venue Name`, `Venue Location`, and the `Date of Event`.

### Searching a movie

To search a movie, type `movie-this` with a movie name. For example:
```bash
  node liri.js concert-this Fight Club
```
![screenShot](https://github.com/phillip0150/LIRI/blob/master/images/5.png?raw=true)

From there, you are presented with a list. The list will contain the `Title`, `Release date`, `IMDB Rating`, `Rotten Tomatoe Rating`, `Country where it was produced`, `Movie language`, `The plot`, and the `Actors`.

### Searching with a file

To search with a file, type `do-what-it-says`. You need to make sure that you have a text file named `random.txt` in the folder where LIRI lives. In `random.txt` the text format needs to be `<command>,<input>`. For example:
```text
  spotify-this-song,Killing in the Name of
```

Once your text file is in the correct format, type:

```bash
  node liri.js do-what-it-says
```

![screenShot](https://github.com/phillip0150/LIRI/blob/master/images/6.png?raw=true)

From there, you are presented with the results. You can have multiple searches in the the text file. 
```text
  spotify-this-song,Killing in the Name of,movie-this,Forrest Gump
```


### Error handling

#### Searching a song

If the user doesn't enter a song name, the program defaults to "The Sign"

```bash
  node liri.js spotify-this-song
```

![screenShot](https://github.com/phillip0150/LIRI/blob/master/images/6.png?raw=true)

If the program cannot find a song, it will display a message

```text
  node liri.js spotify-this-song fjkdls;ajfkdls;a
  Sorry, no results. Please search another song.
```

#### Searching a concert

If the user doesn't enter a artist, the program defaults to "Lil Pump"

```bash
  node liri.js concert-this
```

![screenShot](https://github.com/phillip0150/LIRI/blob/master/images/8.png?raw=true)

If the program cannot find a concert, it will display a message

```text
  node liri.js concert-this Taylor Swift
  Sorry, no concert for Taylor Swift
```

#### Searching a movie

If the user doesn't enter a movie, the program defaults to "Mr. Nobody"

```bash
  node liri.js movie-this
```

![screenShot](https://github.com/phillip0150/LIRI/blob/master/images/8.png?raw=true)

If the program cannot find a concert, it will display a message

```text
  node liri.js movie-this fjdklsafjdsa
  Sorry, no results. Please search another movie.
```


## Organization

### Functions

#### Spotify Function
```javascript
    function spotifySearch(song){
        if (song === ""){
            song = "The Sign";
        }
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            if(data.tracks.items.length === 0){
                console.log("Sorry, no results. Please search another song.");
            }
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
```

#### Movie Function

```javascript
    function movie(movieName) {
    if (movieName === ""){
        movieName = "Mr. Nobody";
    }
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    axios.get(queryUrl).then(
        
        function(response) {
            if(response.data.length === 0){
                console.log("Sorry, no results. Please search another movie.");
            }
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
```

#### Concert Function

```javascript
    function concert(artist){
    // This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?     app_id=codingbootcamp") 
    // for an artist and render the following information about each event to the terminal:
    // Name of the venue
    // Venue location
    // Date of the Event (use moment to format this as "MM/DD/YYYY")


    // Then run a request with axios to the OMDB API with the movie specified
    if (artist === ""){
        artist = "Lil Pump";
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist.trim() + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response) {
            if(response.data.length === 0){
                return console.log("Sorry, no concert for " +artist.trim());
            }
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
```

#### Do What It Says Function
The doWhat Function reads the file, then puts all the text in the array
We look through the array and run the commands.
Once we found the correct command, we run their function
``` javascript
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
```


