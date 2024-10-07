# Resend Email Automation

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/automation-email-sender.git
   cd automation-email-sender
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Configuration

1. **Environment Variables:**

   Create a `.env.local` file in the root directory and add your environment variables:

   ```env
   # .env.local
   RESEND_API_KEY=your_resend_api_key
   ```

2. **Email List:**

   Prepare a JSON file with the list of users to email. Example structure (`./input/emails-test copy.json`):

   ```json
   [
     {
       "name": "John Doe",
       "email": "john.doe@example.com"
     },
     {
       "name": "Jane Smith",
       "email": "jane.smith@example.com"
     }
   ]
   ```

3. **Source HTML:**

   Place your HTML email template in `./input/source.html`.

## Usage

Run the email sending script using Node.js:

```bash
node run.js
```

## Configuration Options

Inside the script, you can adjust the following settings:

- **Sleep Time Between Batches:**

  - `lowerBoundSleepTime`: Minimum wait time (in milliseconds) between sending batches.
  - `upperBoundSleepTime`: Maximum wait time (in milliseconds) between sending batches.

- **Email Settings:**
  - `from`: Sender's name and email address.
  - `subject`: Subject line of the email.
  - `previewText`: Preview text displayed in email clients.
  - `text`: Plain text version of the email content. Supports template literals (e.g., `${name}`).
  - `sourceHtmlPath`: Path to the HTML template for the email content.

## Project Structure

```
├── input
│   ├── emails-test copy.json
│   └── source.html
├── utils
│   └── file-io.mjs
├── resend
│   └── sequential-batch-send.mjs
├── .env.local
├── package.json
└── your-script-file.js
```
