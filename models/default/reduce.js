const { featureEach } = require('@turf/meta')
const tileToGeoJSON = require('../../utils/tile-to-geojson')

/**
 * Reduce
 *
 * The reduce script serves both to initialize TileReduce with job options,
 * and to handle reducing results returned by the map script for each tile.
 *
 * Fired when a tile has finished processing.
 * Receives data returned in the map function's done callback (if any), and the tile.
 */
module.exports = (results, tile) => {
  // pipe out streamed z12 tile
  process.stdout.write(JSON.stringify(tileToGeoJSON(tile)) + ',\n')

  // Iterate over each GeoJSON Feature in results
  featureEach(results, feature => {
    // pipe out streamed data to GeoJSON JSON Line
    process.stdout.write(JSON.stringify(feature) + ',\n')

    // Count the total amount of features processed
    // Total outputs will happen in 'end.js'
    if (!global.osmlinter.total) global.osmlinter.total = 1
    else global.osmlinter.total += 1
  })
}
