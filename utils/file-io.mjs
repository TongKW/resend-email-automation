import fs from "fs/promises";
import { readFile } from "fs/promises";

export async function readHtmlToText(filePath) {
  try {
    let data = await readFile(filePath, "utf8");
    return data;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}

export async function readJson(filePath) {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
}

export const writeJson = async (filePath, data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, "utf8");
  } catch (error) {
    console.error("Error writing JSON to file:", error);
    throw error;
  }
};
