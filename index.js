const fs = require('fs')
const path = require('path')
const tileReduce = require('@mapbox/tile-reduce')

/**
 * OSMLinter using OSM QA Tiles
 *
 * @param {string} mbtiles filepath to QA Tiles
 * @param {*} [options] extra options
 * @param {BBox} [options.bbox] Filter by BBox
 * @param {Tile[]} [options.tiles] Filter by Tiles
 * @param {string} [options.model='default'] Select pre-defined OSMLinter Model
 * @param {string} [options.map='models/default/map.js'] map script filepath
 * @param {string} [options.reduce='models/default/reduce.js'] reduce script filepath
 * @param {string} [options.end='models/default/end.js'] end script filepath
 * @param {Object} [options.mapOptions={}] Passes through arbitrary options to workers. Options are made available to map scripts as global.mapOptions
 * @param {number} [options.maxWorkers] By default, TileReduce creates one worker process per CPU. maxWorkers may be used to limit the number of workers created.
 * @returns {EventEmitter} tile-reduce EventEmitter
 */
module.exports = function (mbtiles, options) {
  // Optional parameters
  options = options || {}
  let model = options.model
  const models = fs.readdirSync(path.join(__dirname, 'models'))
  if (model && models.indexOf(model) === -1) throw new Error(`--model '${model}' is invalid, select from the following: [${models.join(', ')}]`)

  let map = options.map || path.join(__dirname, 'models', model || 'default', 'map.js')
  let reduce = options.reduce || path.join(__dirname, 'models', model || 'default', 'reduce.js')
  let end = options.end || path.join(__dirname, 'models', model || 'default', 'end.js')

  // Validation
  if (!fs.existsSync(map)) throw new Error('map.js filepath does not exist')
  if (!fs.existsSync(reduce)) reduce = path.join(__dirname, 'models', 'default', 'reduce.js')
  if (!fs.existsSync(end)) end = path.join(__dirname, 'models', 'default', 'end.js')

  // OSMLinter Global variables
  global.osmlinter = {
    total: 0,
    results: {}
  }

  // Load Tile Reduce operations
  reduce = require(reduce)
  end = require(end)

  // Tile Reduce options
  Object.assign(options, {
    zoom: 12,
    map,
    sources: [{name: 'qatiles', mbtiles, raw: true}],
    mapOptions: options.mapOptions || {},
    maxWorkers: options.maxWorkers
  })

  // Run Tile Reduce Operations
  const ee = tileReduce(options)
  ee.on('reduce', reduce)
  ee.on('end', end)
  return ee
}
