#!/usr/bin/env node
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const lines: string[] = [];

rl.on('line', (line) => {
  lines.push(line);
});


rl.on('close', async () => {
  const prompt = lines.join(' ');

  try {
    console.log('Processing...');
    const result = await queryChatGPT(prompt);
    console.log(result);
  } catch (error) {
    console.error('Error querying ChatGPT:', error);
  }
});
