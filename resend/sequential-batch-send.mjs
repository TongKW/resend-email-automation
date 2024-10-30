import { sendSingleEmail } from "./single-send.mjs";
import { readHtmlToText } from "../utils/file-io.mjs";
import { sleep } from "../utils/time.mjs";
import { insertPreviewHtmlBlock, minimizeHtml } from "../utils/html-format.mjs";
import { replacePlaceholders } from "../utils/text-format.mjs";
import { previewTextHtmlBlock } from "../templates/preview-text-html.mjs";

// Function to validate inputs
function validateInputs({ lowerBoundSleepTime, upperBoundSleepTime, userObjects }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("API key not found in environment variables.");
  }
  if (!Array.isArray(userObjects) || !userObjects.every((obj) => "email" in obj && "name" in obj)) {
    throw new Error("Invalid userObjects format. Each object must have 'email' and 'name' properties.");
  }
  if (typeof lowerBoundSleepTime !== "number" || typeof upperBoundSleepTime !== "number") {
    throw new Error("Both lowerBoundSleepTime and upperBoundSleepTime must be numbers.");
  }
  if (lowerBoundSleepTime < 0 || upperBoundSleepTime < 0) {
    throw new Error("Sleep times must be non-negative.");
  }
  if (lowerBoundSleepTime >= upperBoundSleepTime) {
    throw new Error("lowerBoundSleepTime must be less than upperBoundSleepTime.");
  }
}

// Function to batch send emails
export const sendBatchEmails = async ({ lowerBoundSleepTime, upperBoundSleepTime, from, subject, text, previewText, sourceHtmlPath, userObjects, onSuccessfulSendCallback }) => {
  validateInputs({ lowerBoundSleepTime, upperBoundSleepTime, userObjects });

  for (const userObject of userObjects) {
    const { name, email } = userObject;

    const sourceHtmlString = await readHtmlToText(sourceHtmlPath);

    try {
      let html;
      // const html = await minimizeHtml(formattedHtmlString);
      html = await insertPreviewHtmlBlock(sourceHtmlString, previewTextHtmlBlock);
      html = replacePlaceholders(html, {
        name: name,
        email: email,
        previewText: replacePlaceholders(previewText, { name: name, email: email }),
      });

      await sendSingleEmail(process.env.RESEND_API_KEY, {
        from,
        to: email,
        subject,
        text: replacePlaceholders(text, { name: name, email: email }),
        html,
      });

      // Successful send callback
      if (onSuccessfulSendCallback) {
        await onSuccessfulSendCallback(userObject);
      }

      // Sleep randomly between the specified bounds
      const delay = Math.floor(Math.random() * (upperBoundSleepTime - lowerBoundSleepTime)) + lowerBoundSleepTime;
      await sleep(delay);
    } catch (error) {
      console.error("Error sending email to:", email, error);
    }
  }
};
