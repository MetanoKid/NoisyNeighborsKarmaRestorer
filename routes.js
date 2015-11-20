module.exports = function (app) {
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
		response.status(501).send();
	});

	app.post("/stop", function (request, response) {
		response.status(501).send();
	});

	app.post("/limit_time", function (request, response) {
		response.status(501).send();
	});

	app.post("/volume", function (request, response) {
		response.status(501).send();
	});
};