#!/usr/bin/env node
import meow from 'meow'

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

console.log(action, shift, input, output)
