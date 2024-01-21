#!/usr/bin/env node
import OpenAI from "openai";
import dotenv from 'dotenv';
import readline from 'readline'

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function queryChatGPT(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error querying ChatGPT:', error);
    throw error;
  }
}

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
