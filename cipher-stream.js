import { Transform } from 'stream'
import * as cipher from './cipher.js'

export const createCipher = (shift) => new Transform({
  transform(chunk, _encoding, callback) {
    callback(null, cipher.encode(chunk.toString(), shift))
  },
})

export const createDecipher = (shift) => new Transform({
  transform(chunk, _encoding, callback) {
    callback(null, cipher.decode(chunk.toString(), shift))
  },
})
