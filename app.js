"use strict";

// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var KarmaBalancer = require("./karma-balancer.js");
var ip = require("ip");

// systems we'll be using
var app = express();
var karmaBalancer = new KarmaBalancer();

// enable JSON parsing
app.use(bodyParser.json());

// routing
require("./routes.js")(app, karmaBalancer);

// start server
const port = 1337;
var server = app.listen(port, function() {
	console.log(`NoisyNeighborsKarmaRestorer listening at http://${ip.address()}:${port}`);
});