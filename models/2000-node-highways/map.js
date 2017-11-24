const { featureEach } = require('@turf/meta')
const { featureCollection } = require('@turf/helpers')
const vectorTileToGeoJSON = require('../../utils/vector-tile-to-geojson')

module.exports = (sources, tile, writeData, done) => {
  const highways = vectorTileToGeoJSON(tile, sources.qatiles.osm, {
    highway: true
  })

  // Save Results as GeoJSON FeatureCollection
  const results = featureCollection([])
  featureEach(highways, highway => {
    results.features.push(highway)
  })

  // Push GeoJSON FeatureCollection results to reduce.js
  done(null, results)
}
