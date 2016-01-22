const test = require('tape')
const mock = require('mock-fs')
const testBlobCreate = require('./test-blob-create')

const optionsCuid = {
  blobStoreRoot: '/tmp/cuidBlobs',
  idType: 'cuid',
  dirDepth: 5,
  dirWidth: 10
}
const optionsUuid = {
  blobStoreRoot: '/tmp/uuidBlobs',
  idType: 'uuid',
  dirDepth: 5,
  dirWidth: 10
}

test('blob-store tests', t => {
  mock()

  t.plan(6)
  return testBlobCreate(optionsCuid, 505)
  .then(resultsCuid => {
    t.equal(resultsCuid.totalDirectories, 55, 'Correct total number of CUID directories')
    t.equal(resultsCuid.totalFiles, 505, 'Correct total number of CUID files')
    t.equal(resultsCuid.totalBytes, 22220, 'Correct total number of bytes')
  }).then(() => {
    return testBlobCreate(optionsUuid, 505)
  }).then(resultsUuid => {
    t.equal(resultsUuid.totalDirectories, 55, 'Correct total number of UUID directories')
    t.equal(resultsUuid.totalFiles, 505, 'Correct total number of UUID files')
    t.equal(resultsUuid.totalBytes, 22220, 'Correct total number of bytes')
  }).then(() => {
    mock.restore()
  })
})
