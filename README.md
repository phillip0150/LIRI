# LIRI
In order to meet the Employer Competitive standards and be ready to show your application to employers, the README.md file should meet the following criteria:
Clearly state the problem the app is trying to solve (i.e. what is it doing and why)
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
