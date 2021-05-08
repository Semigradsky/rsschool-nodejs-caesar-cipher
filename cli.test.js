import test from 'ava'
import execa from 'execa'
import fs from 'fs'

const runApp = (flags, options) => {
  return execa('./cli.js', Object.entries(flags).flat(), options)
}

const errorIsShown = async (t, execution) => {
  const error = await t.throwsAsync(execution)

  t.is(error.exitCode, 2)
  t.assert(error.stderr.length > 0)
}

test('Error should be shown if required flags are missing', async t => {
  await errorIsShown(t, () => runApp({}))
})

test('Error should be shown if required flag (--action) is missing', async t => {
  await errorIsShown(t, () => runApp({
    '--shift': 10,
  }))
})

test('Error should be shown if required flag (--shift) is missing', async t => {
  await errorIsShown(t, () => runApp({
    '--action': 'encode',
  }))
})

test('Error should be shown if --action flag is invalid', async t => {
  await errorIsShown(t, () => runApp({
    '--action': 'foo',
    '--shift': 10,
  }))
})

test('Error should be shown if --shift flag is invalid', async t => {
  await errorIsShown(t, () =>
    execa('./cli.js', ['--action', 'encode', '--shift', 2.3])
  )
})

const input = './test-assets/input'
const output = './test-assets/output'

test.serial.beforeEach(() => {
  fs.writeFileSync(output, '', {
    encoding: 'utf8',
    flag: 'w',
  })
})

test.serial('Should write to `stdout` if --output is not specified', async t => {
  const { stdout } = await runApp({
    '--action': 'encode',
    '--shift': 0,
    '--input': input,
  })
  t.is(stdout, 'This is secret. Message about "_" symbol!')
})

test.serial('Should read from `stdin` if --input is not specified', async t => {
  await runApp({
    '--action': 'encode',
    '--shift': 0,
    '--output': output,
  }, {
    input: 'Hello World!',
  })

  t.is(fs.readFileSync(output).toString(), 'Hello World!')
})

test.serial('Should corretly read from file and write to file', async t => {
  await runApp({
    '--action': 'encode',
    '--shift': 0,
    '--input': input,
    '--output': output,
  })

  t.is(fs.readFileSync(output).toString(), fs.readFileSync(input).toString())
})

test.serial('Shouldn\'t rewrite output file content', async t => {
  await runApp({
    '--action': 'encode',
    '--shift': 0,
    '--output': output,
  }, {
    input: 'Hello World!',
  })

  await runApp({
    '--action': 'encode',
    '--shift': 0,
    '--output': output,
  }, {
    input: 'Hello World!',
  })

  t.is(fs.readFileSync(output).toString(), 'Hello World!Hello World!')
})

test('Error should be shown if can\'t open input file', async t => {
  await errorIsShown(t, () => runApp({
    '--action': 'encode',
    '--shift': 0,
    '--input': 'foobar',
    '--output': output,
  }))
})

test.serial('Error should be shown if output file doesn\'t exist', async t => {
  fs.unlinkSync(output)

  await errorIsShown(t, () => runApp({
    '--action': 'encode',
    '--shift': 0,
    '--input': input,
    '--output': output,
  }))
})

test('Error should be shown if can\'t open output file', async t => {
  await errorIsShown(t, () => runApp({
    '--action': 'encode',
    '--shift': 0,
    '--input': input,
    '--output': '/',
  }))
})

test('Should correctly encode string', async t => {
  const { stdout } = await runApp({
    '--action': 'encode',
    '--shift': 10,
  }, {
    input: 'Hello World!',
  })

  t.is(stdout, 'Rovvy Gybvn!')
})

test('Should correctly encode string if shift is more than alphabet length', async t => {
  const { stdout } = await runApp({
    '--action': 'encode',
    '--shift': 36,
  }, {
    input: 'Hello World!',
  })

  t.is(stdout, 'Rovvy Gybvn!')
})

test('Should correctly encode string if shift is negative', async t => {
  const { stdout } = await runApp({
    '--action': 'encode',
    '--shift': -16,
  }, {
    input: 'Hello World!',
  })

  t.is(stdout, 'Rovvy Gybvn!')
})

test('Should correctly decode string', async t => {
  const { stdout } = await runApp({
    '--action': 'decode',
    '--shift': 10,
  }, {
    input: 'Rovvy Gybvn!',
  })

  t.is(stdout, 'Hello World!')
})

test('Should correctly decode string if shift is more than alphabet length', async t => {
  const { stdout } = await runApp({
    '--action': 'decode',
    '--shift': 36,
  }, {
    input: 'Rovvy Gybvn!',
  })

  t.is(stdout, 'Hello World!')
})

test('Should correctly decode string if shift is negative', async t => {
  const { stdout } = await runApp({
    '--action': 'decode',
    '--shift': -16,
  }, {
    input: 'Rovvy Gybvn!',
  })

  t.is(stdout, 'Hello World!')
})
