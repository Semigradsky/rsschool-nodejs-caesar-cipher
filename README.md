# Task 1. Caesar cipher CLI tool

The application encrypts and decrypts the text with Caesar's cipher. It affects only to letters of the Latin alphabet. All other characters remain unchanged.

## How to run
- Clone project to your pc:
```sh
$ git clone git@github.com:Semigradsky/rsschool-nodejs-caesar-cipher.git
```
- Change current working directory to directory with CLI:
```sh
$ cd rsschool-nodejs-caesar-cipher
```
- (Optional) Change current git branch to `task1/caesar-cipher` (do it if there is no code in `main` branch):
```sh
$ git checkout task1/caesar-cipher
```
- Install dependencies:
```sh
npm install
```


## Usage

File `test-assets/input`:
> Hello World!

File `test-assets/outpu` before:
> Let's start!

Run in console:
```bash
$ node cli.js -a encode -s 10 -i test-assets/input -o test-assets/output
```

File `test-assets/outpu` after:
> Let's start!Rovvy Gybvn!


## Flags

| Flag       | Alias |  Type    | Description                |
| :--------  | :---- | :------- | :------------------------- |
| `--action` | `-a`  | `string` | **Required**. What's to do with text: `encode` or `decode`.
| `--shift`  | `-s`  | `number` | **Required**. A shift of letters for encryption and decryption. Must be a positive integer.
| `--input`  | `-i`  | `string` | *Optional*. Path to input file. CLI will use `stdin` if not specified.
| `--output` | `-o`  | `string` | *Optional*. Path to output fiile. CLI will use `stdout` if not specified.


## Running Tests

To run tests, run the following command

```bash
$ npm run test
```
