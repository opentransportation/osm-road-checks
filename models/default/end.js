/**
 * End
 *
 * Fired when all queued tiles have been processed.
 * Use this event to output final reduce results.
 */
module.exports = () => {
  process.stderr.write(`${global.osmlinter.total} GeoJSON Features saved\n`)
}
