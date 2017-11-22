const { featureCollection } = require('@turf/helpers')

/**
 * Vector Tile Filter for Highways LineStrings
 *
 * @param {Array<number>} tile The [x,y,z] tile the features exist in
 * @param {object} vectorTile VectorTile layer of Features from a single OSM QA Tile
 * @returns {FeatureCollection<LineString>} filtered Highway LineString FeatureCollection
 * @example
 * const highways = vectorTileFilters.highways(tile, vectorTile)
 */
function highways (tile, vectorTile) {
  const geojson = featureCollection([])

  for (let i = 0; i < vectorTile.length; i++) {
    const vectorFeature = vectorTile.feature(i)

    // Only include lines
    if (vectorFeature.type !== 2) continue

    // Only include highway OSM data
    if (!vectorFeature.properties.highway) continue

    // Only include highway OSM data
    if (['primary', 'trunk', 'secondary', 'motorway', 'tertiary'].indexOf(vectorFeature.properties.highway) === -1) continue

    // Convert Vector Tile to an Array of GeoJSON Features
    const feature = vectorFeature.toGeoJSON(tile[0], tile[1], tile[2])
    geojson.features.push(feature)
  }
  return geojson
}

module.exports = {
  highways
}
