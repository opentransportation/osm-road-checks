const { featureEach } = require('@turf/meta')
const { featureCollection } = require('@turf/helpers')
const vectorTileFilters = require('./src/vector-tile-filters')

// QA Tile reducer script
module.exports = (sources, tile, writeData, done) => {
  // Filter Vector Tile
  const vectorTile = sources.qatiles.osm
  const highways = vectorTileFilters.highways(tile, vectorTile)

  // Save Results as GeoJSON FeatureCollection
  const results = featureCollection([])
  featureEach(highways, highway => {
    results.features.push(highway)
  })

  // Push GeoJSON FeatureCollection results to reduce.js
  done(null, results)
}
