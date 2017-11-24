#! /usr/bin/env node

const fs = require('fs')
const meow = require('meow')
const osmlinterReduce = require('../')

const cli = meow(`
  Usage:
    $ osmlinter <qa-tiles>
  Options:
    --output      [osmlinter] Filepath to store outputs
    --bbox        Excludes QATiles by BBox
    --tiles       Excludes QATiles by an Array of Tiles
    --debug       [false] Enables DEBUG mode
    --model       [default] Select pre-defined OSMLinter Model
    --map         [models/default/map.js] Map script filepath
    --reduce      [models/default/reduce.js] Reduce script filepath
    --end         [models/default/end.js] Reduce script filepath
    --mapOptions  Passes through arbitrary options to workers. Options are made available to map scripts as global.mapOptions
    --maxWorkers  By default, TileReduce creates one worker process per CPU. maxWorkers may be used to limit the number of workers created.
  Examples:
    $ osmlinter indonesia.mbtiles --tiles [[3258,2116,12],[3259,2117,12]] > results.geojson
    $ osmlinter indonesia.mbtiles --bbox [106.3,-6.0,106.4,-5.9] > results.geojson
`, {
  boolean: ['debug']
})

// Handle user Inputs
if (!cli.input[0]) throw new Error('must provide a QA Tiles filepath')
const mbtiles = cli.input[0]
if (!fs.existsSync(mbtiles)) throw new Error(mbtiles + ' does not exists')

// Handle Options
const options = cli.flags

// BBox
if (options.bbox) {
  options.bbox = JSON.parse(options.bbox)
  if (options.bbox && options.bbox.length !== 4) throw new Error('invalid bbox')
}

// Tiles
if (options.tiles) {
  options.tiles = JSON.parse(options.tiles)
  if (!Array.isArray(options.tiles[0]) || options.tiles[0].length !== 3) throw new Error('invalid tiles')
}

if (options.map) {
  if (!fs.existsSync(options.map)) throw new Error('map script filepath does not exist')
}

osmlinterReduce(mbtiles, options)
