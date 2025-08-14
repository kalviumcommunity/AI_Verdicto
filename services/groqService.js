import { groq } from "../config/groqConfig.js";

export async function getAIResponse(messages) {
  return await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages,
    temperature: 0.3, // central place to change creativity
    top_p: 0.9,
    max_tokens: 500
  });
}
