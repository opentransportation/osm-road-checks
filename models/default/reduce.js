const { featureEach } = require('@turf/meta')

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
  // Iterate over each GeoJSON Feature in results
  featureEach(results, feature => {
    // pipe out streamed data to GeoJSON JSON Line
    process.stdout.write(JSON.stringify(feature) + ',\n')

    // Count the total amount of features processed
    // Total outputs will happen in 'end.js'
    global.osmlinter.total += 1
  })
}
