import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function zeroShotPrompting(userQuery) {
  const response = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      {
        role: "system",
        content: "You are a legal AI assistant that provides concise, factual answers with case citations when possible."
      },
      { role: "user", content: userQuery }
    ],
    temperature: 0.2
  });

  console.log("AI Response:\n", response.choices[0].message.content);
}

zeroShotPrompting("What are the latest Supreme Court rulings on privacy rights in India?");
