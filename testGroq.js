import readline from "readline";
dotenv.config({ path: '../.env' }); 
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Choose temperature (0.0 to 1.0): ", (temp) => {
  let temperature = parseFloat(temp);

  // Validate temperature
  if (isNaN(temperature) || temperature < 0.0 || temperature > 1.0) {
    console.log("❌ Invalid temperature. Please choose a number between 0.0 and 1.0.");
    rl.close();
    return;
  }

  rl.question("Choose top_p (0.0 to 1.0): ", async (topPInput) => {
    let top_p = parseFloat(topPInput);

    // Validate top_p
    if (isNaN(top_p) || top_p < 0.0 || top_p > 1.0) {
      console.log("❌ Invalid top_p. Please choose a number between 0.0 and 1.0.");
      rl.close();
      return;
    }

    const response = await client.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Tell me 3 different unique jokes, never repeating old ones." }
      ],
      temperature: temperature,
      top_p: top_p
    });

    console.log("\n✅ Output:");
    console.log(response.choices[0].message.content);
    rl.close();
  });
});
