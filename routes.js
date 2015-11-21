"use strict";

module.exports = function (app, karmaBalancer) {
	// GET routes

	app.get("/", function (request, response) {
		// because server is running, it's always okay
		response.status(418).send();
	});

	app.get("/songs", function (request, response) {
		response.status(501).send();
	});

	// POST routes

	app.post("/play", function (request, response) {
		karmaBalancer.findEquilibrium({});

		response.status(201).send();
	});

	app.post("/stop", function (request, response) {
		karmaBalancer.stopFindingEquilibrium();

		response.status(200).send();
	});

	app.post("/limit_time", function (request, response) {
		response.status(501).send();
	});

	app.post("/volume", function (request, response) {
		karmaBalancer.modulateEquilibrium(request.body.volume);

		response.status(200).send();
	});
};