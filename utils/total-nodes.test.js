const test = require('tape')
const { lineString } = require('@turf/helpers')
const totalNodes = require('./total-nodes')

test('total-nodes', t => {
  const line = lineString([[10, 5], [-10, 0]])
  t.equal(totalNodes(line), 2)
  t.end()
})
