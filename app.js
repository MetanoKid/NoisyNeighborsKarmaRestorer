"use strict";

// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var KarmaBalancer = require("./karma-balancer.js");

// systems we'll be using
var app = express();
var karmaBalancer = new KarmaBalancer();

// enable JSON parsing
app.use(bodyParser.json());

// routing
require("./routes.js")(app, karmaBalancer);

// start server
var server = app.listen(1337, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("NoisyNeighborsKarmaRestorer listening at http://%s:%s", host, port);
});