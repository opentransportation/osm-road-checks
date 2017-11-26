module.exports = () => {
  const results = global.osmlinter.results
  let total = 0
  process.stderr.write(`${total} GeoJSON Features scanned\n`)

  Object.keys(results).forEach(id => {
    const nodes = results[id]
    if (nodes > 1500) {
      const msg = `@id ${id} => ${nodes} Nodes\n`
      process.stdout.write(msg)
      total++
    }
  })
  process.stderr.write(`${total} GeoJSON Features with 1500+ nodes\n`)
}
