#!/usr/bin/env node
import readline from 'readline';
import postcss from 'postcss';
import cssDeclarationSorter from 'css-declaration-sorter';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const lines: string[] = [];

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', async () => {
  const input = lines.join(' ');

  try {
    console.log('Processing...');

    const result = await postcss([
      cssDeclarationSorter({ order: 'smacss' }),
    ]).process(input, { from: undefined });

    console.log(result.css);
  } catch (error) {
    console.error('PostCSS error:', error);
  }
});
