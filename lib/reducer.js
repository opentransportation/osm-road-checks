import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import write from 'write-json-file'
import bboxPolygon from '@turf/bbox-polygon'
import globalMercator from 'global-mercator'
import qaTilesFilter from './qa-tiles-filter'
import { featureCollection } from '@turf/helpers'

// Globals
const debug = global.mapOptions && global.mapOptions.debug
const output = global.mapOptions && global.mapOptions.output

// QA Tile reducer script
export default (sources, tile, writeData, done) => {
  // Main processing
  const quadkey = globalMercator.googleToQuadkey(tile)
  const features = sources.qatiles.osm
  const highways = qaTilesFilter(tile, features)

  // Create folder if does not exist
  if (!fs.existsSync(output)) mkdirp.sync(output)

  // Output Features for Testing purposes
  if (debug) {
    const debugPath = path.join(output, quadkey) + path.sep

    // GeoJSON
    write.sync(debugPath + 'highways.geojson', featureCollection(highways))
    write.sync(debugPath + 'tile.geojson', bboxPolygon(globalMercator.googleToBBox(tile)))

    // Additional Information
    write.sync(debugPath + 'stats.json', {
      tile,
      quadkey,
      features: features.length,
      highways: highways.length
    })
  }
  // Output Results
  // if (highways.length) fs.writeFileSync(path.join(output, quadkey + '.geojson'), JSON.stringify(featureCollection(highways), null, 4))
  done(null, highways)
}
