import { Resend } from "resend";

export async function sendSingleEmail(apiKey, { text, subject, html, from, to, replyTo }) {
  const email = to ?? replyTo;

  try {
    const resend = new Resend(apiKey);

    const response = await resend.emails.send({
      from: from,
      to: email,
      replyTo: replyTo ?? to,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Email sent successfully to:", email, response);
  } catch (error) {
    console.error("Error sending email to:", email, error);
  }
}
