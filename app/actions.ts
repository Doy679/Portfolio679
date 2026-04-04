'use server';

import nodemailer from 'nodemailer';

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !subject || !message) {
    return { success: false, error: 'Please fill in all fields.' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: 'gonzalesrondether86@gmail.com',
      replyTo: email,
      subject: `New Message: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // Fallback for old clients
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          
          <!-- Header -->
          <div style="background-color: #4F46E5; padding: 24px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">New Contact Inquiry</h2>
          </div>
          
          <!-- Content -->
          <div style="padding: 24px; background-color: #f9fafb;">
            
            <!-- Details Table -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; width: 80px; font-weight: bold; color: #6b7280;">Name:</td>
                <td style="padding: 8px 0; color: #111827;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; width: 80px; font-weight: bold; color: #6b7280;">Email:</td>
                <td style="padding: 8px 0;">
                  <a href="mailto:${email}" style="color: #4F46E5; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; width: 80px; font-weight: bold; color: #6b7280;">Subject:</td>
                <td style="padding: 8px 0; color: #111827;">${subject}</td>
              </tr>
            </table>

            <!-- Message Box -->
            <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; border-left: 4px solid #4F46E5; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">
              <p style="margin-top: 0; font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
              <p style="margin-bottom: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f3f4f6; padding: 12px; text-align: center; font-size: 12px; color: #9ca3af;">
            <p style="margin: 0;">Sent from your Portfolio Contact Form</p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    // ... error handling
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email. Please try again later.' };
  }
}
