const { googleToQuadkey, googleToBBox } = require('global-mercator')
const bboxPolygon = require('@turf/bbox-polygon').default

/**
 * Convert Tile To GeoJOSN Polygon
 *
 * @param {[number, number, number]} tile [x, y, z] GoogleMaps Tile
 * @returns {Feature<Polygon>} Tile as GeoJSON Polygon
 * @example
 * const tilePolygon = tileToGeoJSON([3265,2116,12])
 * //=tilePolygon
 */
function tileToGeoJSON (tile) {
  const quadkey = googleToQuadkey(tile)
  const geojson = bboxPolygon(googleToBBox(tile))
  geojson.properties = {
    quadkey,
    tile,
    stroke: '#F00',
    'fill-opacity': '0.1'
  }
  return geojson
}

module.exports = {
  tileToGeoJSON
}
