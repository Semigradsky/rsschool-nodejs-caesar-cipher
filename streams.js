import fs from 'fs'

export const createReadStream = (input) => {
  return input
    ? fs.createReadStream(input, {
      encoding: 'utf8',
      flags: 'r',
    })
    : process.stdin
}

export const createWriteStream = (output) => {
  return output
    ? fs.createWriteStream(output, {
      encoding: 'utf8',
      flags: 'a',
    })
    : process.stdout
}
