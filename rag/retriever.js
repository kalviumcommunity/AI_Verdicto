import fs from "fs";
import path from "path";

// Simple retrieval: read all docs and do keyword scoring
export function retrieveRelevantDocs(query, topK = 2) {
    const docsDir = path.join(process.cwd(), "documents");
    const files = fs.readdirSync(docsDir);
    const docs = files.map(file => {
        const content = fs.readFileSync(path.join(docsDir, file), "utf8");
        return { file, content };
    });

    // Score by keyword match count
    const scored = docs.map(doc => {
        const score = query
            .toLowerCase()
            .split(/\s+/)
            .reduce((acc, word) => acc + (doc.content.toLowerCase().includes(word) ? 1 : 0), 0);
        return { ...doc, score };
    });

    // Return top matches
    return scored.sort((a, b) => b.score - a.score).slice(0, topK);
}
