#!/usr/bin/env node
import readline from 'readline';
import postcss from 'postcss';
import cssDeclarationSorter from 'css-declaration-sorter';

function cssToObj(css: string): Record<string, string> {
  const obj = {};
  const rules = css.split(';');

  rules.forEach((rule) => {
    const [prop, value] = rule.split(':').map((part) => part.trim());
    if (prop && value) {
      const camelCaseProp = prop.replace(/-\w/g, (match) =>
        match[1].toUpperCase(),
      );
      obj[camelCaseProp] = value;
    }
  });

  return obj;
}

function objToCSS(obj: Record<string, string>): string {
  let css = '';

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const kebabCaseKey = key.replace(
        /[A-Z]/g,
        (match) => '-' + match.toLowerCase(),
      );

      css += `${kebabCaseKey}: ${obj[key]}; `;
    }
  }

  return css.trim();
}

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
  // const input = lines.join(' ');

  try {
    console.log('Processing...');
    // const result = (input);
    // console.log(result);
    const result = await postcss([cssDeclarationSorter({ order: 'smacss' })])
      // .process(input, { from: undefined });
      // TODO: must convert CSS object to CSS string
      .process('{ color: hyperblue; display: block; }', { from: undefined });

    // Log the result.css
    console.log(result.css);
  } catch (error) {
    console.error('Error querying ChatGPT:', error);
  }
});
