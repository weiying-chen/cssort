#!/usr/bin/env node
import readline from 'readline';
import postcss from 'postcss';
import cssDeclarationSorter from 'css-declaration-sorter';
import { cssToObj, getIndentation, objToCSS, objToIndented } from './utils';

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
  const indentation = getIndentation(lines);
  const obj = new Function(`return { ${input} }`)();
  const css = objToCSS(obj);

  try {
    const result = await postcss([
      cssDeclarationSorter({ order: 'smacss' }),
    ]).process(`{ ${css} }`, { from: undefined });

    const noCurlyCss = result.css.replace(/{|}/g, '').trim();
    const obj = cssToObj(noCurlyCss);
    const output = objToIndented(obj, indentation);

    console.log(obj);

    // console.log(output);
  } catch (error) {
    console.error('PostCSS error:', error);
  }
});
