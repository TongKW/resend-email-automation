import { minify } from "html-minifier";
import * as cheerio from "cheerio";
import { promises as fs } from "fs";
import path from "path";

async function insertHtmlBlockAfterHtmlTag(htmlString, blockString) {
  // Load the main HTML string into cheerio
  const $ = cheerio.load(htmlString);

  // Insert the HTML block after the <html> tag
  $("html").after(blockString);

  // Return the modified HTML as a string
  return $.html();
}

export async function minimizeHtml(htmlString) {
  try {
    const minifiedHtml = minify(htmlString, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      minifyCSS: true,
      minifyJS: true,
    });
    return minifiedHtml;
  } catch (err) {
    console.error("Error reading HTML file:", err);
    throw err;
  }
}

export async function insertPreviewHtmlBlock(htmlString, previewBlockString) {
  const modifiedHtml = await insertHtmlBlockAfterHtmlTag(htmlString, previewBlockString);
  return modifiedHtml;
}
