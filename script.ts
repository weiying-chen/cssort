#!/usr/bin/env node
import readline from 'readline';
import postcss from 'postcss';
import cssDeclarationSorter from 'css-declaration-sorter';
import {
  cssToObj,
  getIndent,
  inputToObj,
  objToCSS,
  objToOutput,
} from './utils';

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
  const obj = inputToObj(input);
  const css = objToCSS(obj);

  try {
    const result = await postcss([
      cssDeclarationSorter({ order: 'smacss' }),
    ]).process(css, { from: undefined });

    const obj = cssToObj(result.css);
    const indent = getIndent(lines);
    const output = objToOutput(obj, indent);

    console.log(output);
  } catch (error) {
    console.error('PostCSS error:', error);
  }
});
