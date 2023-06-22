import mail from "@sendgrid/mail";
import { v4 } from "uuid";

import { Persona } from "./template";
import { generateHTML, generateSubject, generateText } from "./content";

export enum EmailType {
  Invite = "Invite",
}

const getBodyForEmailType = async (
  type: EmailType,
  metadata: Record<string, string>
) => {
  switch (type) {
    case EmailType.Invite:
      const html = generateHTML(EmailType.Invite, metadata);
      const text = generateText(EmailType.Invite, metadata);
      const subject = generateSubject(EmailType.Invite, metadata);
      return { html, text, subject };
  }
};

export const sendEmail = async (
  to: string,
  from: Persona,
  id: EmailType,
  metadata: Record<string, string>
) => {
  const key = process.env.SENDGRID_APP_KEY;
  if (!key) throw new Error("No SendGrid API key found.");
  mail.setApiKey(key);
  const correlationId = v4();

  const { html, text, subject } = await getBodyForEmailType(id, metadata);

  await mail.send({
    personalizations: [
      {
        to: [{ email: to }],
        from: {
          email: from.email,
          name: from.name,
        },
        subject,
        customArgs: { correlationId },
      },
    ],
    from: from.email,
    text: text.join("\n"),
    html,
  });

  return correlationId;
};
