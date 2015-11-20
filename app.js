// dependencies
var express = require("express");

// systems we'll be using
var app = express();

// routing
require("./routes.js")(app);

// start server
var server = app.listen(1337, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("NoisyNeighborsKarmaRestorer listening at http://%s:%s", host, port);
});