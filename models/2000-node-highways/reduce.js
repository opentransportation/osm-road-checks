const { featureEach } = require('@turf/meta')
const tileToGeoJSON = require('../../utils/tile-to-geojson')
const totalNodes = require('../../utils/total-nodes')

module.exports = (results, tile) => {
  // process.stdout.write(JSON.stringify(tileToGeoJSON(tile)) + ',\n')

  featureEach(results, feature => {
    // process.stdout.write(JSON.stringify(feature) + ',\n')
    global.osmlinter.total += 1

    // Calculate how many nodes each feature has
    const results = global.osmlinter.results
    const id = feature.properties['@id']
    const nodes = totalNodes(feature)

    // Append results based on @id
    if (!results[id]) results[id] = nodes
    else results[id] += nodes
  })
}
