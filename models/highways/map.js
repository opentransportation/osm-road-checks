const vectorTileToGeoJSON = require('../../utils/vector-tile-to-geojson')

module.exports = (sources, tile, writeData, done) => {
  const highways = vectorTileToGeoJSON(tile, sources.qatiles.osm, {
    highway: true
  })
  done(null, highways)
}
