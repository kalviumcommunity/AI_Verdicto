import { groq } from "../config/groqConfig.js";

/**
 * Get AI response from Groq with user-defined temperature, top_p, system/user prompts, and stop sequences
 * @param {Array} messages - Chat messages for the AI
 * @param {Object} options - Optional parameters from the user
 * @param {number} options.temperature - Controls creativity (0–1)
 * @param {number} options.top_p - Controls nucleus sampling (0–1)
 * @param {Array} options.stop - Stop sequences to cut off generation
 */
export async function getAIResponse(
  messages,
  { temperature = 0.3, top_p = 0.9, stop = [] } = {}
) {
  return await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages,    // includes system + user messages
    temperature, // user-provided or default
    top_p,       // user-provided or default
    max_tokens: 500,
    stop         // array of stop sequences
  });
}
