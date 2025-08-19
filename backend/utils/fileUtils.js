// utils/fileUtils.js
import fs from "fs";
import path from "path";

export function loadDocumentsFromFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  return files.map(file => {
    const filePath = path.join(folderPath, file);
    return fs.readFileSync(filePath, "utf-8");
  });
}
