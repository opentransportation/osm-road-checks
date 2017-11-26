const vectorTileToGeoJSON = require('../../utils/vector-tile-to-geojson')

module.exports = (sources, tile, writeData, done) => {
  const highways = vectorTileToGeoJSON(tile, sources.qatiles.osm, {
    building: true
  })
  done(null, highways)
}
