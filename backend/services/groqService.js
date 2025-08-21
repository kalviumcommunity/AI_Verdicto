import { groq } from "../config/groqConfig.js";

/**
 * Get AI response from Groq with user-defined options.
 *
 * Supports:
 *  - temperature: controls creativity (0–1)
 *  - top_p: controls nucleus sampling (0–1)
 *  - stop: stop sequences
 *  - json: if true, forces structured JSON output
 *
 * @param {Array} messages - Chat messages for the AI
 * @param {Object} options - Optional parameters
 */
export async function getAIResponse(
  messages,
  { temperature = 0.3, top_p = 0.9, stop = [], json = false } = {}
) {
  return await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages,
    temperature,
    top_p,
    max_tokens: 500,
    stop,
    response_format: json ? { type: "json_object" } : undefined // ✅ JSON output mode
  });
}
