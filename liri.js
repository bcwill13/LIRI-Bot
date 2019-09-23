require("dotenv").config();

var fs = require("fs");
var keys = require("./keys");
var request = require("request");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
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
}

function concertThis() {
  request(
    "https://rest.bandsintown.com/artists/" +
      userInput +
      "/events?app_id=codingbootcamp",
    function(err, response, body) {
      if (!err && response.statusCode === 200) {
      }
      console.log(userInput + " concert info:");
      console.log("Venue: " + JSON.parse(body).name);
      console.log("Location: " + JSON.parse(body).city);
      console.log("Date: " + JSON.parse(body).datetime);
    }
  );
}

function showSong() {
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: "track", query: userInput, limit: 1 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error" + err);
    }
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song's Name: " + data.tracks.items[0].name);
    console.log(
      "Preview Link of the Song: " + data.tracks.items[0].preview_url
    );
    console.log("Album the Song is From: " + data.tracks.items[0].album.name);
  });
}

function showMovie() {
  request(
    "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy",
    function(err, response, body) {
      if (!err && response.statusCode === 200) {
        console.log("Title of the Movie: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMBD Rating: " + JSON.parse(body).imdbRating0);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1]);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      }
    }
  );
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      console.log("Error");
    } else {
      var dataArr = data.split(",");
      if (dataArr[0] === "spotify") {
        spotifyThis(dataArr[1]);
      }
    }
  });
}
