const { featureEach } = require('@turf/meta')
const { featureCollection } = require('@turf/helpers')
const vectorTileToGeoJSON = require('../../utils/vector-tile-to-geojson')

/**
 * Map
 *
 * The map script operates on each individual tile. It's purpose is to receive one tile at a time,
 * do analysis or processing on the tile, and write data and send results to the reduce script.
 *
 * Fired just before a tile is sent to a worker.
 * Receives the tile and worker number assigned to process the tile.
 */
module.exports = (sources, tile, writeData, done) => {
  // Convert & Filter Vector Tile to GeoJSON
  const vectorTile = sources.qatiles.osm
  const geojson = vectorTileToGeoJSON(tile, vectorTile)

  // Save Results as GeoJSON FeatureCollection
  const results = featureCollection([])

  // Iterate over each GeoJSON Feature
  featureEach(geojson, feature => {
    // Perform analysis or filter out specific GeoJSON Features
    results.features.push(feature)
  })
  // Push GeoJSON FeatureCollection results to reduce.js
  done(null, results)
}
