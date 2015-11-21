"use strict";

/**
Balances Karma by playing sound files in time intervals.
*/
var KarmaBalancer = (function () {
	// Player's configuration
	var Player = require("player");
	var player = new Player();

	player.on("error", function (error) {
		console.log("Error:", error);
	}).on("playend", function (item) {
		console.log("PlayEnd:", item);
	}).on("playing", function (item) {
		console.log("Playing:", item);
	});	

	var KarmaBalancer = function () {
		
	};

	/**
	Stops playing any sound that was currently playing, if any.
	*/
	KarmaBalancer.prototype.stopFindingEquilibrium = function () {
		player.stop();

		// TODO: stop timeout for next song, if any
	};

	/**
	Starts aligning stars to find karma balance.

	@param {Object} params [Configuration for the system]
	*/
	KarmaBalancer.prototype.findEquilibrium = function (params) {
		// stop it if it was running
		this.stopFindingEquilibrium();

		player.add("demo.mp3");
		player.play();

		// TODO: set up timeout for next playback
	};

	/**
	Modifies playback volume.

	@param {Number} volume [Normalized volume for the playback]
	*/
	KarmaBalancer.prototype.modulateEquilibrium = function (volume) {
		// no volume means full volume
		if(volume === undefined) {
			volume = 1.0;
		}

		player.setVolume(volume);
	};

	return KarmaBalancer;
})();

module.exports = KarmaBalancer;