const { featureEach } = require('@turf/meta')
const { featureCollection } = require('@turf/helpers')
const vectorTileToGeoJSON = require('../../utils/vector-tile-to-geojson')

module.exports = (sources, tile, writeData, done) => {
  const highways = vectorTileToGeoJSON(tile, sources.qatiles.osm, {
    highway: true
  })

  const results = featureCollection([])
  featureEach(highways, highway => {
    results.features.push(highway)
  })

  done(null, results)
}
