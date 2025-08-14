import readline from "readline";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Choose temperature (0.0 to 1.0): ", async (temp) => {
  let temperature = parseFloat(temp);

  // ✅ Validation
  if (isNaN(temperature) || temperature < 0.0 || temperature > 1.0) {
    console.log("❌ Invalid value. Please choose a number between 0.0 and 1.0.");
    rl.close();
    return;
  }

  const response = await client.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Tell me a joke." }
    ],
    temperature: temperature
  });

  console.log("\n✅ Output:");
  console.log(response.choices[0].message.content);
  rl.close();
});
