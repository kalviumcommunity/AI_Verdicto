import dotenv from "dotenv";
import Groq from "groq-sdk";
import { logTokens } from "../utils/logTokens.js";
dotenv.config({ path: '../.env' });
// dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = "You are AI Verdicto, a helpful assistant.";

// Example Q&A (one-shot learning)
const EXAMPLE_Q = "Question: What is 2+2?";
const EXAMPLE_A = "Answer: 4";

// ✅ Functions AI can call
const functions = [
  {
    name: "get_current_time",
    description: "Get the current time in ISO format",
    parameters: {
      type: "object",
      properties: {}
    }
  },
  {
    name: "calculate",
    description: "Perform a basic arithmetic operation",
    parameters: {
      type: "object",
      properties: {
        a: { type: "number" },
        b: { type: "number" },
        operator: { type: "string", enum: ["add", "subtract", "multiply", "divide"] }
      },
      required: ["a", "b", "operator"]
    }
  }
];

// ✅ Helper: One-shot message builder
function buildOneShotPrompt(userInput) {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: EXAMPLE_Q },
    { role: "assistant", content: EXAMPLE_A },
    { role: "user", content: `Question: ${userInput}` }
  ];
}

// ✅ Execute tool call
async function executeFunctionCall(toolCall) {
  const { name, arguments: argsStr } = toolCall.function;
  const args = argsStr ? JSON.parse(argsStr) : {};

  if (name === "get_current_time") {
    return new Date().toISOString();
  }

  if (name === "calculate") {
    const { a, b, operator } = args;
    switch (operator) {
      case "add": return a + b;
      case "subtract": return a - b;
      case "multiply": return a * b;
      case "divide": return b !== 0 ? a / b : "Error: divide by zero";
      default: return "Unknown operator";
    }
  }

  return "Unknown function";
}

// ✅ Main One-shot Prompt Function
export async function oneShotPrompt(userInput) {
  const messages = buildOneShotPrompt(userInput);

  const response = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages,
    tools: functions.map(fn => ({ type: "function", function: fn })),
    tool_choice: "auto"
  });

  const choice = response.choices[0].message;

  // If AI calls a function
  if (choice.tool_calls && choice.tool_calls.length > 0) {
    for (const toolCall of choice.tool_calls) {
      const result = await executeFunctionCall(toolCall);
      console.log(`🔧 Function ${toolCall.function.name} result:`, result);

      // Send function result back to AI for final answer
      const followup = await groq.chat.completions.create({
        model: "llama3-8b-8192",
        messages: [
          ...messages,
          choice, // model's function call
          { role: "tool", tool_call_id: toolCall.id, content: JSON.stringify(result) }
        ]
      });

      const finalAnswer = followup.choices[0].message.content;
      console.log(`✅ AI Final Answer:\n${finalAnswer}`);
      return finalAnswer;
    }
  }

  // Otherwise just return plain answer
  const answer = choice.content;
  console.log(`✅ AI Answer:\n${answer}`);
  return answer;
}

// ✅ CLI usage
if (process.argv[2]) {
  oneShotPrompt(process.argv.slice(2).join(" "));
}
else {
  console.log("Usage: node oneShotPrompting.js <your question>");
}