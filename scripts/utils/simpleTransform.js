const fs = require('fs')
const { Transform } = require('stream')

const simpleTransform = (entryUrl, outputUrl, transform, callBack) => {
  const readStream = fs.createReadStream(entryUrl)
  const writeStream = fs.createWriteStream(outputUrl)
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      transform.call(this, chunk, encoding, callback)
    }
  })

  readStream.on('end', (err) => {
    callBack(err)
  })
  readStream.pipe(transformStream).pipe(writeStream)
}
module.exports = {
  simpleTransform
}
