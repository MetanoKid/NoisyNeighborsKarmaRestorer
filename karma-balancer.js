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
		this.timeouts = {
			duration: {},
			interval: {}
		};
	};

	/**
	Stops playing any sound that was currently playing, if any.
	*/
	KarmaBalancer.prototype.stopFindingEquilibrium = function () {
		player.stop();

		// remove all timeouts, if any
		if(this.timeouts.duration.timeoutFunction !== undefined) {
			clearTimeout(this.timeouts.duration.timeoutFunction);
			this.timeouts.duration = {};
		}

		if(this.timeouts.interval.timeoutFunction !== undefined) {
			clearTimeout(this.timeouts.interval.timeoutFunction);
			this.timeouts.interval = {};
		}

		// clear date to stop
		this.dateToStop = undefined;

		console.log("Stopped playback and timeouts.");
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
				// play song
				player.add(path);
				player.play();

				// keep track of last played song
				this.lastSong = params.song;

				// time to stop
				if(params.timeToStop !== undefined) {
					this.setDateToStop(params.timeToStop);
				} else if(this.dateToStop !== undefined) {
					// we keep it!
				} else {
					params.timeToStop = {
						hours: 23,
						minutes: 59
					};
					this.setDateToStop(params.timeToStop);
				}

				// create timeouts to stop song and play again
				this.setTimeouts(params.duration, params.interval);

				console.log("Starts playback and timeouts.");

				return true;
			}
		} catch (ex) {
			// oops! it doesn't exist!
		}

		console.log("Can't find song %s", params.song);
		
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

		console.log("Modified volume to %f.", volume);
	};

	/**
	Returns a list of songs in the playback directory.
	*/
	KarmaBalancer.prototype.listEquilibriumProviders = function () {
		return fs.readdirSync(pathToKarmaBalancers).filter(function (fileName) {
			return fileName.endsWith(".mp3");
		});
	};

	/**
	Schedules song playback, stop and replay.
	*/
	KarmaBalancer.prototype.setTimeouts = function (duration, interval) {
		var that = this;

		if(duration === undefined) {
			duration = 60.0;
		}

		if(interval === undefined) {
			interval = 60 * 60;
		}

		this.timeouts.duration = {
			time: duration,
			timeoutFunction: setTimeout(function () {
				that.stopCurrentEquilibrium();
			}, duration * 1000)
		};

		this.timeouts.interval = {
			time: interval,
			timeoutFunction: setTimeout(function () {
				that.findEquilibriumAgain();
			}, interval * 1000)
		};
	};

	/**
	Stop current playback but keep timeouts.
	*/
	KarmaBalancer.prototype.stopCurrentEquilibrium = function () {
		player.stop();

		console.log("Stopped current playback.");
	};

	/**
	Replay last song with the same parameters.
	*/
	KarmaBalancer.prototype.findEquilibriumAgain = function () {
		// got to stop?
		if(new Date() > this.dateToStop) {
			this.stopFindingEquilibrium();
		} else {
			this.findEquilibrium({
				song: this.lastSong,
				duration: this.timeouts.duration.time,
				interval: this.timeouts.interval.time,
				timeToStop: {
					hours: this.dateToStop.getHours(),
					minutes: this.dateToStop.getMinutes()
				}
			});
		}
	};

	/**
	Checks if it's running (might not be playing at the moment, but
	it's scheduled).
	*/
	KarmaBalancer.prototype.isFindingEquilibrium = function () {
		var hasDuration = this.timeouts.duration !== undefined &&
						  this.timeouts.duration.timeoutFunction !== undefined;
		var hasInterval = this.timeouts.interval !== undefined &&
						  this.timeouts.interval.timeoutFunction !== undefined;

		return hasDuration && hasInterval;
	};

	/**
	Sets the maximum date at which we'll stop balancing karma.
	*/
	KarmaBalancer.prototype.setDateToStop = function (data) {
		// even more clear than the "variable = variable || default"
		// or the shorter "variable || (variable = default)"
		if(data === undefined) {
			data = {};
		}
		if(data.hours === undefined) {
			data.hours = 23;
		}
		if(data.hours === undefined) {
			data.minutes = 59;
		}

		var currentDate = new Date();
		currentDate.setHours(data.hours);
		currentDate.setMinutes(data.minutes);
		currentDate.setSeconds(0);

		this.dateToStop = currentDate;

		console.log("Set date to stop:", this.dateToStop);
	};

	return KarmaBalancer;
})();

module.exports = KarmaBalancer;