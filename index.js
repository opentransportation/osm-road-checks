import path from 'path'
import mkdirp from 'mkdirp'
import tileReduce from 'tile-reduce'
import write from 'write-json-file'
import { featureCollection } from '@turf/helpers'
import globalMercator from 'global-mercator'

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
export default function (mbtiles, options) {
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
  const highways = []

  // Execute the following after each tile is completed
  ee.on('reduce', (result, tile) => {
    result.forEach(highway => highways.push(highway))
  })
  ee.on('end', () => {
    write.sync(
      path.join(output, path.parse(mbtiles).name + '.geojson'),
      featureCollection(highways)
    )
    console.log('done')
  })
  return ee
}
