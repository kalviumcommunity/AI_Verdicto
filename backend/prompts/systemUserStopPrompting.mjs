import { getAIResponse } from "../services/groqService.js";

// Example function to test system, user, and stop sequence
async function systemUserStopPrompting(userInput) {
  const messages = [
    {
      role: "system",
      content: "You are AI_Verdicto, a helpful assistant. Always explain step by step."
    },
    {
      role: "user",
      content: userInput + " END" // Add END so stop sequence can work
    }
  ];

  const response = await getAIResponse(messages, {
    temperature: 0.5,
    top_p: 0.9,
    stop: ["END"] // tell model to stop at END
  });

  console.log("\nAI Response:\n");
  console.log(response.choices[0].message.content);
}

// Take input from CLI
const userInput = process.argv[2] || "What is 15 * 12?";
systemUserStopPrompting(userInput);
