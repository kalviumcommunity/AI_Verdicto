// import dotenv from "dotenv";
// dotenv.config({ path: '../../.env' }); 
import Groq from "groq-sdk";
import { retrieveRelevantDocs } from "./rag/retriever.js";
import { logTokens } from "./utils/logTokens.js";
import dotenv from "dotenv";
dotenv.config();


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
    const question = "What are the latest bail rulings?";

    // Step 1: Retrieve relevant docs
    const retrieved = retrieveRelevantDocs(question);
    const context = retrieved.map(d => `From ${d.file}:\n${d.content}`).join("\n\n");

    // Step 2: Ask Groq with strict grounding
    const prompt = `
You are a legal assistant. Use ONLY the provided case documents to answer the question.
If the answer is not found in the documents, say "I cannot find this information in the provided case files."

Documents:
${context}

Question:
${question}

Answer:
`;

    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama3-8b-8192" // or another Groq-supported model
    });
    // ...after your AI call...
    logTokens(chatCompletion.usage);

    console.log("AI Answer:\n", chatCompletion.choices[0].message.content);
}

main();
