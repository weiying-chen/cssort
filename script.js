#!/usr/bin/env node
import OpenAI from "openai";
import dotenv from 'dotenv';
import readline from 'readline'

dotenv.config();

const openai = new OpenAI({
     apiKey: process.env.OPENAI_API_KEY
});

async function queryChatGPT(prompt) {
    try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{"role": "user", "content": prompt }],
        });

        console.log(response.choices[0].message.content);
    } catch (error) {
        console.error('Error querying ChatGPT:', error);
    }
}

// queryChatGPT("Log 'Hello World' in JavaScript").then(() => process.exit());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (input) => {
  queryChatGPT(input).then(() => rl.close());
  // console.log("Thank you for your valuable feedback:", input.toLocaleLowerCase());
});

