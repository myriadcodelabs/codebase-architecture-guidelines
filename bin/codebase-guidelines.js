#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PACKAGE_ROOT = path.resolve(__dirname, '..');
const SOURCE_DIRECTORIES = ['frontend', 'backend', 'browser-extension'];
const OUTPUT_DIRECTORY_NAME = 'codebase-architecture-guidelines';

function printHelp() {
  console.log(`codebase-guidelines\n\nUsage:\n  codebase-guidelines copy <target...> [--force]\n\nTargets:\n  backend\n  frontend\n  browser-extension\n\nBehavior:\n  Copies selected directories from this package into:\n  <current-working-directory>/codebase-architecture-guidelines/\n\nOptions:\n  --force        Overwrite existing files/directories\n  -h, --help     Show this help\n\nExamples:\n  codebase-guidelines copy backend\n  codebase-guidelines copy frontend browser-extension --force\n`);
}

function parseCopyArgs(args) {
  const targets = [];
  let force = false;

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (arg === '--force') {
      force = true;
      continue;
    }

    if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    }

    if (arg.startsWith('-')) {
      throw new Error(`Unknown option: ${arg}`);
    }

    targets.push(arg);
  }

  if (targets.length === 0) {
    throw new Error('You must provide at least one target directory.');
  }

  const uniqueTargets = [...new Set(targets)];
  uniqueTargets.forEach((target) => {
    if (!SOURCE_DIRECTORIES.includes(target)) {
      throw new Error(`Unknown target: ${target}. Valid targets: ${SOURCE_DIRECTORIES.join(', ')}`);
    }
  });

  return { targets: uniqueTargets, force };
}

function copyDirectory(directoryName, outputRoot, force) {
  const absoluteSource = path.join(PACKAGE_ROOT, directoryName);
  const absoluteDestination = path.join(outputRoot, directoryName);

  if (fs.existsSync(absoluteDestination) && !force) {
    throw new Error(`Destination already exists: ${absoluteDestination}. Re-run with --force to overwrite.`);
  }

  fs.mkdirSync(outputRoot, { recursive: true });
  fs.cpSync(absoluteSource, absoluteDestination, { recursive: true, force });

  return {
    source: absoluteSource,
    destination: absoluteDestination
  };
}

function runCopy(args) {
  const { targets, force } = parseCopyArgs(args);
  const outputRoot = path.join(process.cwd(), OUTPUT_DIRECTORY_NAME);
  const copied = targets.map((directoryName) => copyDirectory(directoryName, outputRoot, force));

  console.log(`Copied ${copied.length} director${copied.length === 1 ? 'y' : 'ies'} to ${outputRoot}`);
  copied.forEach((entry) => {
    console.log(`- ${path.basename(entry.destination)} -> ${entry.destination}`);
  });
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '-h' || command === '--help') {
    printHelp();
    return;
  }

  if (command === 'copy') {
    runCopy(args.slice(1));
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
