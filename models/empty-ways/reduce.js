const { featureEach } = require('@turf/meta')
const { round } = require('@turf/helpers')

module.exports = (results, tile) => {
  featureEach(results, feature => {
    const type = feature.properties['@type']
    const id = feature.properties['@id']
    const geometry = feature.geometry.type
    const length = round(feature.properties['@length'], 3) + 'km'
    const link = `http://www.openstreetmap.org/${type}/${id}`

    process.stdout.write(`${type}, ${id}, ${geometry}, ${length}, ${link}\n`)
    global.osmlinter.total += 1
  })
}
