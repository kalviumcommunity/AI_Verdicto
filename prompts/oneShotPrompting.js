import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import Groq from "groq-sdk";

import { logTokens } from "../utils/logTokens.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = "You are AI Verdicto, a helpful assistant.";

// Example Q&A
const EXAMPLE_Q = "Question: What is 2+2?";
const EXAMPLE_A = "Answer: 4";

// One-shot prompt builde
function buildOneShotPrompt(userInput) {
    return [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: EXAMPLE_Q },
        { role: "assistant", content: EXAMPLE_A },
        { role: "user", content: `Question: ${userInput}` }
    ];
}

export async function oneShotPrompt(userInput) {
    const messages = buildOneShotPrompt(userInput);

    const response = await groq.chat.completions.create({
        model: "llama3-8b-8192", // or your preferred model
        messages
    });

    logTokens(response.usage);

    // Always respond with "Answer: <response>"
    const answer = response.choices[0].message.content;
    console.log(`AI Answer:\n${answer}`);
    return answer;
}

// Example usage:
if (process.argv[2]) {
    oneShotPrompt(process.argv.slice(2).join(" "));
}