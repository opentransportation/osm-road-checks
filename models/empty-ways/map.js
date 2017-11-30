const length = require('@turf/length')
const { featureEach } = require('@turf/meta')
const { featureCollection } = require('@turf/helpers')
const vectorTileToGeoJSON = require('../../utils/vector-tile-to-geojson')

module.exports = (sources, tile, writeData, done) => {
  const emptyFeatures = featureCollection([])
  const features = vectorTileToGeoJSON(tile, sources.qatiles.osm)

  featureEach(features, feature => {
    const props = JSON.parse(JSON.stringify(feature.properties))
    const type = props['@type']
    delete props[type]
    delete props['@type']
    delete props['@id']
    delete props['@version']
    delete props['@uid']
    delete props['@changeset']
    delete props['@user']
    delete props['@timestamp']

    // Only push features without any other attributes
    if (!Object.keys(props).length) {
      const featureLength = length(feature)
      if (featureLength < 0.1) {
        feature.properties['@length'] = featureLength
        emptyFeatures.features.push(feature)
      }
    }
  })
  done(null, emptyFeatures)
}
