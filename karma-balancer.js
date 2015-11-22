"use strict";

/**
Balances Karma by playing sound files in time intervals.
*/
var KarmaBalancer = (function () {
	// we need to have access to String.endsWith
	// taken from: http://stackoverflow.com/a/2548133
	String.prototype.endsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};

	// access file system
	var fs = require("fs");

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

	// path to songs
	var pathToKarmaBalancers = "karma_balancers/";

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

		// does the file even exist?
		try {
			var path = pathToKarmaBalancers + params.song;
			// it could be a directory ending with .mp3 (who knows)
			if(fs.statSync(path).isFile()) {
				player.add(path);
				player.play();

				// TODO: set up timeout for next playback

				return true;
			}
		} catch (ex) {
			// oops! it doesn't exist!
		}
		
		return false;
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

	/**
	Returns a list of songs in the playback directory.
	*/
	KarmaBalancer.prototype.listEquilibriumProviders = function () {
		return fs.readdirSync(pathToKarmaBalancers).filter(function (fileName) {
			console.log("File:", fileName);
			return fileName.endsWith(".mp3");
		});
	};

	return KarmaBalancer;
})();

module.exports = KarmaBalancer;