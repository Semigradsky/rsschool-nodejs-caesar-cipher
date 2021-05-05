#!/usr/bin/env node
import { getInput } from './input.js'
import { createCipher, createDecipher } from './cipher-stream.js'
import { createReadStream, createWriteStream } from './streams.js'

const { action, shift, input, output } = getInput()

const readable = createReadStream(input)
const writable = createWriteStream(output)

readable
  .pipe(action === 'encode'
    ? createCipher(shift)
    : createDecipher(shift)
  )
  .pipe(writable)
