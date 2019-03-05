// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var comment = require("./Models/Comment.js");
var article = require("./Models/Article.js");
// cant figure out how to actually do this correctly
//var htmlRouter = require("./controllers/htmlRoutes.js");
//var articleRouter = require("./controllers/articleRoutes.js");
// Scraping tools
var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;

// Initialize Express
var port = process.env.PORT || 3000;
var app = express();

// Use body parser with the app
app.use(bodyParser.urlencoded({
  extended: false
}));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use("/", htmlRouter);
app.use("/", articleRouter);


app.use(express.static("public"));

// Database configuration with mongoose
var URI = process.env.MONGODB_URI || ''; 
mongoose.connect(URI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
var db = mongoose.connection;


// throw errora
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// ensure connection
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Listen on port 8080
app.listen(port, function() {
  console.log("App running on port 8080");
});