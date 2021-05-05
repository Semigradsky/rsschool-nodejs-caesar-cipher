import fs from 'fs'

export const createReadStream = (input) => {
  if (!input) {
    return process.stdin
  }

  return fs.createReadStream(input, { encoding: 'utf8' })
    .on('error', () => {
      console.error(`Failed! Can't open '${input}'.`)
      console.error(`File doesn't exist or not accessible, please ensure that path is correct.`)
      process.exit(2)
    })
}

export const createWriteStream = (output) => {
  if (!output) {
    return process.stdout
  }

  return fs.createWriteStream(output, {
    encoding: 'utf8',
    flags: 'a',
  })
    .on('error', () => {
      console.error(`Failed! Can't write to '${output}'.`)
      console.error(`File doesn't exist or not accessible, please ensure that path is correct.`)
      process.exit(2)
    })
}
