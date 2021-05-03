import test from 'ava'
import execa from 'execa'

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
  const error = await t.throwsAsync(() => execa('./cli.js', ['--action', 'foo']))

  t.is(error.exitCode, 2)
  t.assert(error.stderr.length > 0)
})

test('Error should be shown if --shift flag is invalid', async t => {
  const error = await t.throwsAsync(() => execa('./cli.js', ['--shift', '2.3']))

  t.is(error.exitCode, 2)
  t.assert(error.stderr.length > 0)
})
