import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT);
const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;
const emailFrom = process.env.EMAIL_FROM;

if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword || !emailFrom) {
  throw new Error("Missing email environment variables");
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
});

export const sendPasswordResetEmail = async (
  to: string,
  resetUrl: string
) => {
  await transporter.sendMail({
    from: emailFrom,
    to,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Password Reset</h2>

        <p>You requested to reset your password.</p>

        <p>
          <a href="${resetUrl}" 
             style="background:#000;color:#fff;padding:12px 18px;text-decoration:none;border-radius:6px;">
            Reset Password
          </a>
        </p>

        <p>This link will expire in 15 minutes.</p>

        <p>If you did not request this, you can ignore this email.</p>
      </div>
    `,
  });
};