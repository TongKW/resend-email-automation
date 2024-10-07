import { config } from "dotenv";
import { readJson, writeJson } from "./utils/file-io.mjs";
import { sendBatchEmails } from "./resend/sequential-batch-send.mjs";
import path from "path";

// Load environment variables from .env.local
config({ path: ".env.local" });

// Function to remove sent emails from the list
const removeSentEmails = async (emailsPath, userObjects) => {
  const existingEmails = await readJson(emailsPath);
  const updatedEmails = existingEmails.filter((existingEmail) => !userObjects.some((user) => user.email === existingEmail.email));
  await writeJson(emailsPath, updatedEmails);
};

// Main execution
(async () => {
  const emailsPath = path.resolve("./input/emails.json");
  const userObjects = await readJson(emailsPath);

  // Configuration object
  const config = {
    lowerBoundSleepTime: 5000,
    upperBoundSleepTime: 7000,
    from: "Your Name <your_email@gmail.com>",
    text: `Hi \${name},

<Email Content Here>

Best`,
    subject: "Subject line here",
    previewText: "Hi ${name}, this is the preview text shown.",
    sourceHtmlPath: path.resolve("./input/source.html"),
  };

  // Define a callback function to handle successful sends
  const onSuccessfulSendCallback = async (userObject) => {
    await removeSentEmails(emailsPath, [userObject]);
  };

  await sendBatchEmails({ ...config, userObjects, onSuccessfulSendCallback }); // Pass userObjects into the function
})();
