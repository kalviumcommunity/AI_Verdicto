import { getAIResponse } from '../services/groqService.js';
import { fileURLToPath } from 'url';

// Function to test structured output
export async function structuredOutputPrompt(userQuestion) {
  const messages = [
    {
      role: "system",
      content: `
      You are a JSON generator. 
      Always respond ONLY with valid JSON.
      The JSON should include:
      - "steps": array of reasoning steps
      - "final_answer": the final concise answer
      `
    },
    {
      role: "user",
      content: userQuestion
    }
  ];

  // Call AI with json: true
  const response = await getAIResponse(messages, { json: true });
  
  const content = response.choices[0].message.content;

  try {
    const parsed = JSON.parse(content);
    return parsed;
  } catch (err) {
    console.error("❌ Failed to parse JSON:", content);
    return null;
  }
}

// ✅ Run directly with CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const userInput = process.argv.slice(2).join(" ") || "What is 7 multiplied by 8?";
  
  structuredOutputPrompt(userInput).then((result) => {
    console.log("\n📦 Structured JSON Output:\n", JSON.stringify(result, null, 2));
  });
}
