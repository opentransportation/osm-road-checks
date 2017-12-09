const { round } = require('@turf/helpers')
const { featureEach } = require('@turf/meta')

module.exports = (results, tile) => {
  featureEach(results, feature => {
    const id = feature.properties['@id']
    const type = feature.properties['@type']
    const nodes = feature.properties['@nodes']
    const length = round(feature.properties['@length'], 3) + 'km'
    const link = `http://www.openstreetmap.org/${type}/${id}`

    process.stdout.write([id, length, nodes, link].join(',') + '\n')
    global.osmlinter.total += 1
  })
}
