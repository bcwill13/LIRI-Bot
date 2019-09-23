require("dotenv").config();

var fs = require("fs");
var keys = require("./keys");
var request = require("request");
var Spotify = require("node-spotify-api");

const command = process.argv[2];
const userInput = process.argv[3];

switch (command) {
  case "concert-this":
    concertThis();
    break;
  case "spotify-this-song":
    showSong();
    break;
  case "movie-this":
    showMovie();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("Error");
    break;
};

function showSong() {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: 'userInput'}, function(err,data) {
        if (err) {
            return console.log("Error" + err);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name +
        "\nSong's Name: " + data.tracks.items[0].name +
        "\nPreview Link of the Song: " + data.tracks.items[0].preview_url +
        "\nAlbum the Song is From: " + data.tracks.items[0].album.name);
    });
};
