import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS set?", !!process.env.EMAIL_PASS);

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Teste de envio Nodemailer",
      text: "Olá, este é um teste de envio de email com Nodemailer e Outlook SMTP.",
    });
    console.log("Email enviado:", info);
  } catch (error) {
    console.error("Erro ao enviar email:", error);
  }
}

sendTestEmail();
