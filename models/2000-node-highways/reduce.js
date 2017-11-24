const { featureEach } = require('@turf/meta')
const tileToGeoJSON = require('../../utils/tile-to-geojson')

module.exports = (results, tile) => {
  process.stdout.write(JSON.stringify(tileToGeoJSON(tile)) + ',\n')

  featureEach(results, feature => {
    process.stdout.write(JSON.stringify(feature) + ',\n')
    global.osmlinter.total += 1
  })
}
