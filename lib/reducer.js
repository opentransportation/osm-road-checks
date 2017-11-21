// const globalMercator = require('global-mercator')
const qaTilesFilter = require('./qa-tiles-filter')

// Globals
// const debug = global.mapOptions && global.mapOptions.debug
// const output = global.mapOptions && global.mapOptions.output

// QA Tile reducer script
module.exports = (sources, tile, writeData, done) => {
  // Main processing
  // const quadkey = globalMercator.googleToQuadkey(tile)
  const features = sources.qatiles.osm
  const highways = qaTilesFilter(tile, features)
  done(null, highways.length)
}
