const { featureEach } = require('@turf/meta')
const { featureCollection } = require('@turf/helpers')
const vectorTileToGeoJSON = require('../../utils/vector-tile-to-geojson')

// Apply this operation in parallel over processes to each individual QA Tile
module.exports = (sources, tile, writeData, done) => {
  // Convert & Filter Vector Tile to GeoJSON
  const vectorTile = sources.qatiles.osm
  const geojson = vectorTileToGeoJSON(tile, vectorTile)

  // Save Results as GeoJSON FeatureCollection
  const results = featureCollection([])

  // Iterate over each GeoJSON Feature
  featureEach(geojson, feature => {
    // Perform analysis
    results.features.push(feature)
  })

  // Push GeoJSON FeatureCollection results to reduce.js
  done(null, results)
}
