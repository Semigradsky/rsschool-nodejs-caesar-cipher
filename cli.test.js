import test from 'ava'
import execa from 'execa'
import fs from 'fs'

test('Error should be shown if required flags are missing', async t => {
  const error = await t.throwsAsync(() => execa('./cli.js'))

  t.is(error.exitCode, 2)
  t.assert(error.stderr.length > 0)
})

test('Error should be shown if required flag (--action) is missing', async t => {
  const error = await t.throwsAsync(() => execa('./cli.js', ['--shift', '10']))

  t.is(error.exitCode, 2)
  t.assert(error.stderr.length > 0)
})

test('Error should be shown if required flag (--shift) is missing', async t => {
  const error = await t.throwsAsync(() => execa('./cli.js', ['--action', '10']))

  t.is(error.exitCode, 2)
  t.assert(error.stderr.length > 0)
})

test('Error should be shown if --action flag is invalid', async t => {
  const error = await t.throwsAsync(() => execa('./cli.js', ['--action', 'foo', '--shift', '10']))

  t.is(error.exitCode, 2)
  t.assert(error.stderr.length > 0)
})

test('Error should be shown if --shift flag is invalid', async t => {
  const error = await t.throwsAsync(() => execa('./cli.js', ['--action', 'encode', '--shift', '2.3']))

  t.is(error.exitCode, 2)
  t.assert(error.stderr.length > 0)
})

const input = './test-assets/input'
const output = './test-assets/output'

test.serial.beforeEach(() => {
  if (fs.existsSync(output)) {
    fs.rmSync(output)
  }
})

test.serial('Should write to `stdout` if --output is not specified', async t => {
  const { stdout } = await execa('./cli.js', ['--action', 'encode', '--shift', '0', '--input', input])
  t.is(stdout, 'This is secret. Message about "_" symbol!')
})

test.serial('Should read from `stdin` if --input is not specified', async t => {
  await execa('./cli.js', ['--action', 'encode', '--shift', '0', '--output', output], {
    input: 'Hello World!',
  })

  t.is(fs.readFileSync(output).toString(), 'Hello World!')
})

test.serial('Should corretly read from file and write to file', async t => {
  await execa('./cli.js', ['--action', 'encode', '--shift', '0', '--input', input, '--output', output])

  t.is(fs.readFileSync(output).toString(), fs.readFileSync(input).toString())
})

test.serial('Shouldn\'t rewrite output file content', async t => {
  await execa('./cli.js', ['--action', 'encode', '--shift', '0', '--output', output], {
    input: 'Hello World!',
  })

  await execa('./cli.js', ['--action', 'encode', '--shift', '0', '--output', output], {
    input: 'Hello World!',
  })

  t.is(fs.readFileSync(output).toString(), 'Hello World!Hello World!')
})

test('Error should be shown if can\'t open input file', async t => {
  const error = await t.throwsAsync(() =>
    execa('./cli.js', ['--action', 'encode', '--shift', '0', '--input', 'foobar', '--output', output])
  )
  t.is(error.exitCode, 2)
  t.assert(error.stderr.length > 0)
})

test('Error should be shown if can\'t create/open output file', async t => {
  const error = await t.throwsAsync(() =>
    execa('./cli.js', ['--action', 'encode', '--shift', '0', '--input', input, '--output', '/'])
  )
  t.is(error.exitCode, 2)
  t.assert(error.stderr.length > 0)
})
