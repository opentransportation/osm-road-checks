const { coordReduce } = require('@turf/meta')

/**
 * Convert Tile To GeoJOSN Polygon
 *
 * @param {GeoJSON} geojson GeoJSON
 * @returns {number} Total number of nodes in GeoJSON
 * @example
 * const line = turf.lineString([[10, 5], [-10, 0]])
 * totalNodes(line) // => 2
 */
module.exports = function totalNodes (geojson) {
  return coordReduce(geojson, total => total + 1, 0)
}
