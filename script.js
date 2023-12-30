#!/usr/bin/env node
import OpenAI from "openai";
import dotenv from 'dotenv';

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

        console.log(response.choices[0].message);
    } catch (error) {
        console.error('Error querying ChatGPT:', error);
    }
}

queryChatGPT("What is dog in Spanish?").then(() => process.exit());
