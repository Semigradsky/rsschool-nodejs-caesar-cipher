#!/usr/bin/env node
import meow from 'meow'
import { createReadStream, createWriteStream } from './streams.js'

const cli = meow(`
  Usage
    $ caesar-cipher-cli --action encode --shift <number> [--input "./input.txt"] [--output "./output.txt"]
    $ caesar-cipher-cli --action decode --shift <number> [--input "./input.txt"] [--output "./output.txt"]
`, {
  flags: {
    action: {
      alias: 'a',
      type: 'string',
      isRequired: true,
    },
    shift: {
      alias: 's',
      type: 'number',
      isRequired: true,
    },
    input: {
      alias: 'i',
      type: 'string',
    },
    output: {
      alias: 'o',
      type: 'string',
    },
  },
})

const {action, shift, input, output} = cli.flags

if (action !== 'encode' && action !== 'decode') {
  console.error(`Invalid --action flag: '${action}'. Valid actions: 'encode' and 'decode'.`)
  process.exit(2)
}

if (!Number.isFinite(shift) || Math.ceil(shift) !== shift) {
  console.error('Invalid --shift flag. Shift must be integer.')
  process.exit(2)
}

const readable = createReadStream(input)
  .on('error', () => {
    console.error(`Failed! Can't open '${input}'.`)
    console.error(`File doesn't exist or not accessible, please ensure that path is correct.`)
    process.exit(2)
  })

const writable = createWriteStream(output)

readable
  .pipe(writable)
  .on('error', () => {
    console.error(`Failed! Can't write to '${output}'.`)
    console.error(`File doesn't exist or not accessible, please ensure that path is correct.`)
    process.exit(2)
  })
