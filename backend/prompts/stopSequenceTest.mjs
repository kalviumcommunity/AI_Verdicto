import { getAIResponse } from "../services/groqService.js";

async function run() {
  const messages = [
    { role: "system", content: "You are a concise assistant." },
    { role: "user", content: "Explain the water cycle in 3 steps. END" }
  ];

  const response = await getAIResponse(messages, {
    temperature: 0.5,
    top_p: 0.9,
    stop: ["END"]   // 👈 AI will stop generating once it hits "END"
  });

  console.log("AI Response:\n", response.choices[0].message.content);
}

run();
