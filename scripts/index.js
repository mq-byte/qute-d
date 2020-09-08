#!/usr/bin/env node
const { Command } = require('commander')
const program = new Command()
const version = require('../package').version
program.version(version)
const { createComponents } = require('./create')

program
  .option('-v', 'output the version number')
  .option('-c, --component [name]', 'add component')

program.parse(process.argv)

if (program.v) console.log(version)
if (typeof program.component === 'string') {
  createComponents(program.component)
}
