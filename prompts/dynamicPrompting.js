import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' }); 
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


// Example variables that will change
const userQuery = "What are the latest Supreme Court rulings on environmental protection?";
const caseType = "Environmental Law";
const region = "India";
const formatPreference = "short bullet points";

async function dynamicPrompting() {
  // Build prompt dynamically
  const prompt = `
You are a legal expert in ${caseType}.
The query is from a user in ${region}.
Respond in ${formatPreference} format.

User query: ${userQuery}
  `;

  console.log("Generated Prompt:\n", prompt);

  // Send to LLM
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }]
  });

  console.log("AI Response:\n", response.choices[0].message.content);
}

dynamicPrompting();
