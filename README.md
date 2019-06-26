# LIRI
In order to meet the Employer Competitive standards and be ready to show your application to employers, the README.md file should meet the following criteria:
-Clearly state the problem the app is trying to solve (i.e. what is it doing and why)
Give a high-level overview of how the app is organized
Give start-to-finish instructions on how to run the app
Include screenshots, gifs or videos of the app functioning
Contain a link to a deployed version of the app
Clearly list the technologies used in the app
State your role in the app development
Because screenshots (and well-written READMEs) are extremely important in the context of GitHub, this will be part of the grading in this assignment.



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


