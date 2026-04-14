import "server-only";

type PasswordResetEmailInput = {
  toEmail: string;
  toName: string;
  resetUrl: string;
};

type DeliveryResult = {
  delivered: boolean;
  provider: "smtp" | "resend" | "none";
};

export async function sendPasswordResetEmail(input: PasswordResetEmailInput): Promise<DeliveryResult> {
  const subject = "PathFinder password reset";
  const text = `Hello ${input.toName}, use this secure link to reset your password: ${input.resetUrl}`;
  const html = `
    <p>Hello ${input.toName},</p>
    <p>Use this secure link to reset your PathFinder password:</p>
    <p><a href="${input.resetUrl}">${input.resetUrl}</a></p>
    <p>This link expires in 30 minutes.</p>
  `;
  const emailFrom = process.env.EMAIL_FROM;

  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey && emailFrom) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [input.toEmail],
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Resend delivery failed: ${response.status} ${errorBody}`);
    }

    return { delivered: true, provider: "resend" };
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpHost && smtpUser && smtpPass && emailFrom) {
    const nodemailerModule = await import("nodemailer");
    const nodemailer = nodemailerModule.default;
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: emailFrom,
      to: input.toEmail,
      subject,
      text,
      html,
    });

    return { delivered: true, provider: "smtp" };
  }

  console.warn(
    "[PathFinder Mailer] Delivery not configured. Set RESEND_API_KEY+EMAIL_FROM or SMTP_*+EMAIL_FROM.",
  );
  console.info("[PathFinder Mailer] Reset URL fallback", {
    to: input.toEmail,
    resetUrl: input.resetUrl,
  });
  return { delivered: false, provider: "none" };
}
