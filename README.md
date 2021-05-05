# Task 1. Caesar cipher CLI tool

## Running Tests

To run tests, run the following command

```bash
$ npm run test
```

## Usage

```bash
$ node cli.js -a encode -s 10 -i test-assets/input
```

## Flags

| Flag       | Alias |  Type    | Description                |
| :--------  | :---- | :------- | :------------------------- |
| `--action` | `-a`  | `string` | **Required**. `encode` or `decode`
| `--shift`  | `-s`  | `number` | **Required**.
| `--input`  | `-i`  | `string` | *Optional*. Path to input file. CLI will use `stdin` if not specified.
| `--output` | `-o`  | `string` | *Optional*. Path to output fiile. CLI will use `stdout` if not specified.
