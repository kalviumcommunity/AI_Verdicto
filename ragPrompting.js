import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Step 1: Scrape latest rulings
async function fetchLatestBailRulings() {
    const url = "https://main.sci.gov.in/judgments"; // Supreme Court Judgments page
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let results = [];
    $("table tr").each((i, el) => {
        const caseTitle = $(el).find("td").eq(1).text().trim();
        const date = $(el).find("td").eq(2).text().trim();
        if (caseTitle.toLowerCase().includes("bail")) {
            results.push({ caseTitle, date });
        }
    });

    return results.slice(0, 5); // Return top 5
}

// Step 2: Send retrieved info + user query to GPT
async function generateSummary(userQuery) {
    const rulings = await fetchLatestBailRulings();
    const context = rulings.map(r => `${r.caseTitle} (${r.date})`).join("\n");

    const prompt = `
You are a legal expert in Indian Criminal Law.
Using ONLY the information below, answer the user's query:
---
${context}
---
User Query: ${userQuery}
    `;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
    });

    console.log("AI Response:\n", completion.choices[0].message.content);
}

// Run with: node ragPrompting.js "Summarize latest bail rulings"
const userQuery = process.argv.slice(2).join(" ") || "Summarize latest bail rulings";
generateSummary(userQuery);
