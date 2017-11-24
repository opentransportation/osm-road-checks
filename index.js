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
 * @param {string} [options.output="osmlinter"] directory to store outputs results
 * @param {boolean} [options.debug=false] Enables DEBUG mode
 * @param {string} [options.map='map.js'] Map script filepath
 * @returns {EventEmitter} tile-reduce EventEmitter
 */
module.exports = function (mbtiles, options) {
  options = options || {}
  let map = options.map || path.join(__dirname, 'models', 'default', 'map.js')
  let reduce = options.reduce || path.join(__dirname, 'models', 'default', 'reduce.js')
  let end = options.end || path.join(__dirname, 'models', 'default', 'end.js')

  // Validation
  if (!fs.existsSync(map)) throw new Error('map.js filepath does not exist')
  if (!fs.existsSync(reduce)) throw new Error('reduce.js filepath does not exist')
  if (!fs.existsSync(end)) throw new Error('end.js filepath does not exist')

  // Load Tile Reduce operations
  reduce = require(reduce)
  end = require(end)

  // Tile Reduce options
  Object.assign(options, {
    zoom: 12,
    map,
    sources: [{name: 'qatiles', mbtiles, raw: true}]
  })

  // Run Tile Reduce Operations
  const ee = tileReduce(options)
  ee.on('reduce', reduce)
  ee.on('end', end)
  return ee
}
