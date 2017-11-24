const { featureEach } = require('@turf/meta')
const tileToGeoJSON = require('../../utils/tile-to-geojson')

// Execute the following operation whenever the map.js operation is completed
module.exports = (results, tile) => {
  // pipe out streamed z12 tile
  process.stdout.write(JSON.stringify(tileToGeoJSON(tile)) + ',\n')

  // Iterate over each GeoJSON Feature in results
  featureEach(results, feature => {
    // pipe out streamed data to GeoJSON JSON Line
    process.stdout.write(JSON.stringify(feature) + ',\n')
  })
}
