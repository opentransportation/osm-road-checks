const { featureCollection } = require('@turf/helpers')

const geometryTypes = {
  'unknown': 0,
  'point': 1,
  'linestring': 2,
  'polygon': 3
}

/**
 * Multi-Purpose Vector Tile to GeoJSON Filter
 *
 * @param {Array<number>} tile The [x,y,z] tile the features exist in
 * @param {Object} vectorTile VectorTile layer of Features from a single OSM QA Tile
 * @param {Object} [options={}] Optional Parameters
 * @param {string} [options.geometry] Filter by Geometry Type
 * @param {Array<string>|boolean} [options.highway] Filter by Highway OSM Property Values
 * @param {Array<string>|boolean} [options.building] Filter by Building OSM Property Values
 * @returns {FeatureCollection<any>} filtered Highway LineString FeatureCollection
 * @example
 * const highways = vectorTileToGeoJSON(tile, vectorTile, {
 *   geometry: 'linestring',
 *   highway: ['primary', 'secondary', 'trunk']
 * })
 * //=highways
 */
module.exports = function vectorTileToGeoJSON (tile, vectorTile, options) {
  // Optional Parameters
  options = options || {}
  const highway = options.highway
  const building = options.building
  const geometry = (options.geometry || '').toLocaleLowerCase()

  // Input Validation
  if (geometry && !geometryTypes[geometry]) throw new Error('invalid options.geometry: Options are unknown/point/linestring/polygon')

  // Save results as GeoJSON FeatureCollection
  const geojson = featureCollection([])

  // Iterate over each Vector Feature
  for (let i = 0; i < vectorTile.length; i++) {
    const vectorFeature = vectorTile.feature(i)

    // Filter by Geometry Type
    if (geometry && vectorFeature.type !== geometryTypes[geometry]) continue

    // Filter by highway Tags
    if (highway === true && vectorFeature.properties.highway === undefined) continue
    if (highway && Array.isArray(highway) && highway.indexOf(vectorFeature.properties.highway) === -1) continue

    // Filter by highway Tags
    if (building === true && vectorFeature.properties.building === undefined) continue
    if (building && Array.isArray(building) && building.indexOf(vectorFeature.properties.building) === -1) continue

    // Convert Vector Tile to an Array of GeoJSON Features
    const feature = vectorFeature.toGeoJSON(tile[0], tile[1], tile[2])
    geojson.features.push(feature)
  }
  return geojson
}
