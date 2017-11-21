const path = require('path')
const mkdirp = require('mkdirp')
const tileReduce = require('tile-reduce')
// const write = require('write-json-file')
// const { featureCollection } = require('@turf/helpers')

/**
 * OSMLinter using OSM QA Tiles
 *
 * @param {string} mbtiles filepath to QA Tiles
 * @param {*} [options] extra options
 * @param {BBox} [options.bbox] Filter by BBox
 * @param {string} [options.output="osmlinter"] directory to store outputs results
 * @param {Tile[]} [options.tiles] Filter by Tiles
 * @param {boolean} [options.debug=false] Enables DEBUG mode
 * @returns {EventEmitter} tile-reduce EventEmitter
 */
module.exports = function (mbtiles, options) {
  options = options || {}
  const output = options.output || 'osmlinter'
  const debug = options.debug

  // Create folder if not exists
  mkdirp.sync(output)

  // Tile Reduce options
  Object.assign(options, {
    zoom: 12,
    map: path.join(__dirname, 'lib', 'reducer.js'),
    sources: [{name: 'qatiles', mbtiles, raw: true}],
    mapOptions: {
      output,
      debug
    }
  })
  const ee = tileReduce(options)
  let total = 0
  // const highways = []

  // Execute the following after each tile is completed
  ee.on('reduce', (result, tile) => {
    total += result
    // result.forEach(highway => highways.push(highway))
  })
  ee.on('end', () => {
    // write.sync(
    //   path.join(output, path.parse(mbtiles).name + '.geojson'),
    //   featureCollection(highways)
    // )
    console.log('total:', total)
    console.log('done!')
  })
  return ee
}
