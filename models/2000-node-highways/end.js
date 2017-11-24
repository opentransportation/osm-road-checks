module.exports = () => {
  const results = global.osmlinter.results
  const total = Object.keys(results).length
  process.stderr.write(`${total} GeoJSON Features scanned\n`)

  Object.keys(results).forEach(id => {
    const nodes = results[id]
    if (nodes > 1000) {
      process.stderr.write(`@id ${id} => ${nodes} Nodes\n`)
    }
  })
}
