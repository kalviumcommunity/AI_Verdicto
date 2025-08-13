import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Example Q&A pairs to teach the AI the answer style
const examples = [
  {
    question: "What is the punishment for theft under IPC?",
    answer: `- IPC Section 378 defines theft.
- Punishment: Up to 3 years imprisonment, or fine, or both (Section 379 IPC).
- Applicable to movable property taken without consent.`
  },
  {
    question: "What is the process for filing an FIR in India?",
    answer: `- Approach the nearest police station.
- Provide details of the offence (written or oral).
- Obtain a copy of the FIR free of cost.`
  }
];

// Build the few-shot prompt
function buildFewShotPrompt(areaOfLaw, location, userQuery) {
  let prompt = `You are a legal advisor specializing in ${areaOfLaw} in ${location}.
Here are some example Q&A pairs to follow:\n\n`;

  examples.forEach((ex, idx) => {
    prompt += `Example ${idx + 1}:\nQ: ${ex.question}\nA: ${ex.answer}\n\n`;
  });

  prompt += `Now, answer this:\nQ: ${userQuery}\nA:`;
  return prompt;
}

async function runFewShotPrompting(areaOfLaw, location, userQuery) {
  const prompt = buildFewShotPrompt(areaOfLaw, location, userQuery);

  console.log("Generated Prompt:\n", prompt);

  const completion = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  console.log("\nAI Response:\n", completion.choices[0].message.content);
}

// CLI usage: node fewShotPrompting.js "Criminal Law" "India" "Summarize latest bail rulings"
const [,, areaOfLaw, location, ...queryParts] = process.argv;
const userQuery = queryParts.join(" ");
runFewShotPrompting(areaOfLaw, location, userQuery);
