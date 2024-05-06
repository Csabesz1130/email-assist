import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

export async function sendEmail(to, subject, text) {
  if (!to || !subject || !text) {
    console.error('Invalid email data:', { to, subject, text });
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_FROM}>`,
      to: to,
      subject: subject,
      text: text,
      // html: "<b>Hello world?</b>" // HTML body
    });

    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}