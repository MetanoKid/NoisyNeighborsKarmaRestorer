"use strict";

module.exports = function (app, karmaBalancer) {
	// GET routes

	app.get("/", function (request, response) {
		// because server is running, it's always okay
		response.status(200).send({
			running: karmaBalancer.isFindingEquilibrium()
		});
	});

	app.get("/songs", function (request, response) {
		var songs = karmaBalancer.listEquilibriumProviders();
		response.status(200).send(songs);
	});

	// POST routes

	app.post("/play", function (request, response) {
		var couldPlay = karmaBalancer.findEquilibrium(request.body);

		response.status(couldPlay ? 201 : 400).send();
	});

	app.post("/stop", function (request, response) {
		karmaBalancer.stopFindingEquilibrium();

		response.status(200).send();
	});

	app.post("/limit_time", function (request, response) {
		karmaBalancer.setDateToStop(request.body.timeToStop);

		response.status(201).send();
	});

	app.post("/volume", function (request, response) {
		karmaBalancer.modulateEquilibrium(request.body.volume);

		response.status(200).send();
	});
};