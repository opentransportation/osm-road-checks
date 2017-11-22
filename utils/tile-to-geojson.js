const { googleToQuadkey, googleToBBox } = require('global-mercator')
const bboxPolygon = require('@turf/bbox-polygon').default

/**
 * Convert Tile To GeoJOSN Polygon
 *
 * @param {[number, number, number]} tile [x, y, z] GoogleMaps Tile
 * @param {Object} [properties={}] GeoJSON Properties
 * @returns {Feature<Polygon>} Tile as GeoJSON Polygon
 * @example
 * const tilePolygon = tileToGeoJSON([3265,2116,12])
 * //=tilePolygon
 */
module.exports = function tileToGeoJSON (tile, properties) {
  const quadkey = googleToQuadkey(tile)
  const geojson = bboxPolygon(googleToBBox(tile))
  geojson.properties = properties || {
    quadkey,
    tile,
    stroke: '#F00',
    'fill-opacity': '0.1'
  }
  return geojson
}
