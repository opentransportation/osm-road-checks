const vectorTileToGeoJSON = require('../../utils/vector-tile-to-geojson')

module.exports = (sources, tile, writeData, done) => {
  const buildings = vectorTileToGeoJSON(tile, sources.qatiles.osm, {
    building: true
  })
  done(null, buildings)
}
