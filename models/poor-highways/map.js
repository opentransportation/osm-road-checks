const length = require('@turf/length').default
const {totalNodes} = require('osmlinter')
const { featureCollection } = require('@turf/helpers')
const vectorTileToGeoJSON = require('../../utils/vector-tile-to-geojson')

module.exports = (sources, tile, writeData, done) => {
  const results = featureCollection([])
  const highways = vectorTileToGeoJSON(tile, sources.qatiles.osm, {
    highway: true
  })
  highways.features.forEach((highway, index) => {
    const highwayLength = length(highway)
    const nodes = totalNodes(highway)
    if (highwayLength > 10 && nodes < 50) {
      highway.properties['@length'] = highwayLength
      highway.properties['@nodes'] = nodes
      results.features.push(highway)
    }
  })
  done(null, results)
}
