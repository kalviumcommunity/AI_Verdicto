import { getAIResponse } from '../services/groqService.js';
import readline from 'readline';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config({ path: '../.env', quiet: true });

export async function chainOfThoughtPrompting(userQuestion) {
  const systemPrompt = `
You are an AI assistant that explains your reasoning step by step before giving the final answer.
For every question, break down your thought process into clear steps.
End your response with "Final Answer: <result>" on a new line.
Example:
Step 1: Multiply 12 by 7.
Step 2: 12 * 7 = 84.
Final Answer: 84

Now, answer the following question step by step:
`;

  // 👇 Construct messages because getAIResponse expects "messages"
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userQuestion }
  ];

  const response = await getAIResponse(messages);
  return response;
}

// ✅ Main execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv[2]) {
    const userInput = process.argv.slice(2).join(' ');
    chainOfThoughtPrompting(userInput).then((answer) => {
  console.log('\nAI Response:\n', answer.choices[0].message.content);
});
  } else {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter your question: ', async (userInput) => {
      try {
        const answer = await chainOfThoughtPrompting(userInput);
        console.log('\nAI Response:\n', answer);
      } catch (err) {
        console.error('Error:', err);
      }
      rl.close();
    });
  }
}
