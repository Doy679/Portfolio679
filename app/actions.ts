'use server';

import nodemailer from 'nodemailer';
import { siteConfig } from './config/site';
import { validateContactForm, ContactFormData } from './lib/validation';

interface EmailResult {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof ContactFormData, string>>;
}

export async function sendEmail(formData: FormData): Promise<EmailResult> {
  const data: ContactFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
  };

  const validation = validateContactForm(data);

  if (!validation.isValid) {
    return { 
      success: false, 
      error: 'Please fix the errors in the form.',
      fieldErrors: validation.errors
    };
  }

  const { name, email, subject, message } = data;

  // Use SMTP_PASS (Server-only secret)
  const SMTP_PASS = process.env.SMTP_PASS || process.env.NEXT_PUBLIC_SMTP_PASS;

  if (!SMTP_PASS) {
    console.error('Missing SMTP_PASS environment variable.');
    return {
      success: false,
      error: 'Email configuration is missing. Please contact the site administrator.'
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: siteConfig.contact.smtp.host,
      port: siteConfig.contact.smtp.port,
      secure: siteConfig.contact.smtp.secure,
      auth: {
        user: siteConfig.contact.email,
        pass: SMTP_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"${name}" <${siteConfig.contact.email}>`,
      to: siteConfig.contact.email,
      replyTo: email,
      subject: `New Message: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #4F46E5; padding: 24px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">New Contact Inquiry</h2>
          </div>
          <div style="padding: 24px; background-color: #f9fafb;">
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
            <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; border-left: 4px solid #4F46E5; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">
              <p style="margin-top: 0; font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
              <p style="margin-bottom: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="background-color: #f3f4f6; padding: 12px; text-align: center; font-size: 12px; color: #9ca3af;">
            <p style="margin: 0;">Sent from your Portfolio Contact Form</p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    console.error('Error sending email:', err);

    if (err.code === 'EAUTH') {
      return { success: false, error: 'Authentication failed. Please check your email configuration.' };
    } else if (err.code === 'ECONNREFUSED') {
      return { success: false, error: 'Unable to connect to the email server.' };
    }
    
    return { success: false, error: 'An unexpected error occurred. Please try again later.' };
  }
}

