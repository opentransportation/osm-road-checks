const { featureEach } = require('@turf/meta')
const { totalNodes } = require('osmlinter')

module.exports = (results, tile) => {
  featureEach(results, feature => {
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
