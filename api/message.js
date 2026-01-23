import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website Message" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // your Gmail
      subject: "New Website Message",
      text: `Name: ${name}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to send message" });
  }
}
