# Noisy Neighbors Karma Balancer

Ever had some noisy neighbors that didn't let you sleep or bothered you for a long while? Did you want to pay them back with their own coin, but you aren't home most of the day?

Noisy Neighbors Karma Restorer is your ally!

Just turn it on, command it to play a song in given intervals, and leave home!

## What is it?

This is just a side project I started when I was in a similar situation.

It is a Node.js application that uses Express to spawn a server and a REST API to play songs.

## Getting started

    git clone https://github.com/MetanoKid/NoisyNeighborsKarmaRestorer.git
    cd NoisyNeighborsKarmaRestorer
    npm install
    npm start

## API

  * GET /

  Response:

    200 OK
    {
      "running": false
    }

  * GET /songs

  Response:

    200 OK
    [
      "demo.mp3"
    ]

  * POST /play

  Request:

    {
      "song": "demo.mp3",
      "duration": 50,
      "interval": 900,
      "timeToEnd": {
        "hours": 22,
        "minutes": 15
      }
    }

  Response:

    201 Created / 400 Bad Request

  * POST /stop

  Response:

    200 OK

  * POST /limit_time

  Request:

    {
      "timeToEnd": {
        "hours": 22,
        "minutes": 15
      }
    }

  Response:

    201 Created

  * POST /volume

  Request:

    {
      "volume": 0.5
    }

  Response:

    201 Created