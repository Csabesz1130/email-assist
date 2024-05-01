import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',  // Replace with your SMTP host
  port: 587,
  secure: false,  // True for 465, false for other ports
  auth: {
    user: 'example@example.com',  // Your SMTP username
    pass: 'password'  // Your SMTP password
  }
});

export async function sendEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: '"Your App Name" <noreply@example.com>',  // Sender address
      to: to,  // List of receivers
      subject: subject,  // Subject line
      text: text,  // Plain text body
      // html: "<b>Hello world?</b>"  // HTML body
    });

    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
