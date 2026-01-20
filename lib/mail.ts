import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
} = process.env;

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT ?? 587),
  secure: (SMTP_SECURE ?? "false") === "true",
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  // Performance optimizations
  pool: true, // Use connection pooling
  maxConnections: 5, // Limit concurrent connections
  maxMessages: 100, // Messages per connection
  rateDelta: 1000, // Rate limiting
  rateLimit: 5, // Max 5 emails per second
  // Timeout settings
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 5000, // 5 seconds
  socketTimeout: 30000, // 30 seconds
});

function wrapHtml(title: string, body: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        :root {
          --primary: oklch(23.906% 0.15189 265.596);
          --primary-foreground: oklch(0.99 0.005 250);
          --secondary: oklch(0.92 0.02 250);
          --secondary-foreground: oklch(0.2 0.03 250);
          --border: oklch(0.88 0.01 250);
          --muted-foreground: oklch(0.45 0.03 250);
        }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
          line-height: 1.6; 
          color: oklch(0.15 0.04 250);
          background-color: oklch(0.98 0.005 250);
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
          border: 1px solid oklch(0.88 0.01 250); 
          border-radius: 8px;
          background-color: white;
        }
        .header { 
          text-align: center; 
          margin-bottom: 20px; 
          border-bottom: 1px solid oklch(0.88 0.01 250); 
          padding-bottom: 10px;
          color: oklch(23.906% 0.15189 265.596);
        }
        .footer { 
          font-size: 12px; 
          color: oklch(0.45 0.03 250); 
          text-align: center; 
          margin-top: 20px; 
          border-top: 1px solid oklch(0.88 0.01 250); 
          padding-top: 10px; 
        }
        .button { 
          display: inline-block; 
          background-color: oklch(23.906% 0.15189 265.596); 
          color: oklch(0.99 0.005 250); 
          padding: 10px 20px; 
          text-decoration: none; 
          border-radius: 5px; 
          margin-top: 10px; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>${title}</h2>
        </div>
        <div>
          ${body}
        </div>
        <div class="footer">
          <p>© 2025 ${process.env.COMPANY_NAME || "Your Company"}. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendOtpMail(to: string, otp: string) {
  const from = SMTP_FROM || "no-reply@example.com";
  const body = `
    <p>Your one-time code is:</p>
    <p style="font-size: 24px; letter-spacing: 5px; font-weight: bold; color: #0070f3;">${otp}</p>
    <p>This code expires in ${process.env.RESET_TOKEN_TTL_MIN ?? 15} minutes.</p>
    <p>If you didn't request this, you can safely ignore this email.</p>
  `;

  await transporter.sendMail({
    to,
    from,
    subject: "Your password reset code",
    html: wrapHtml("Password Reset", body),
  });
}

export async function sendWelcomeEmail(to: string, name: string) {
  const from = SMTP_FROM || "no-reply@example.com";
  const body = `
    <p>Hi <strong>${name}</strong>,</p>
    <p>Welcome to ${process.env.COMPANY_NAME || "Our Platform"}! We are excited to have you on board.</p>
    <p>Your account has been successfully created. You can now explore our platform.</p>
  `;

  await transporter.sendMail({
    to,
    from,
    subject: `Welcome to ${process.env.COMPANY_NAME || "Our Platform"}!`,
    html: wrapHtml("Welcome Aboard!", body),
  });
}

export async function sendLoginAlertEmail(to: string, name: string, time: string) {
  const from = SMTP_FROM || "no-reply@example.com";
  const body = `
    <p>Hi <strong>${name}</strong>,</p>
    <p>We noticed a new login to your account.</p>
    <p><strong>Time:</strong> ${time}</p>
    <p>If this was you, you can safely ignore this email. If not, please reset your password immediately.</p>
  `;

  await transporter.sendMail({
    to,
    from,
    subject: "New Login into your account",
    html: wrapHtml("Login Alert", body),
  });
}

// ===== Contact Form Emails =====

interface EmailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail(options: EmailOptions) {
  try {
    const result = await transporter.sendMail({
      from: SMTP_FROM || "no-reply@example.com",
      ...options,
    })
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export function generateAdminEmailHTML(data: {
  fullName: string
  email: string
  phone?: string
  subject: string
  message: string
  submittedAt: string
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: oklch(0.15 0.04 250);
            background-color: oklch(0.98 0.005 250);
          }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { 
            background: linear-gradient(135deg, oklch(23.906% 0.15189 265.596) 0%, oklch(0.55 0.14 265) 100%); 
            color: oklch(0.99 0.005 250); 
            padding: 30px; 
            border-radius: 8px 8px 0 0; 
          }
          .content { 
            background: oklch(0.96 0.01 250); 
            padding: 30px; 
            border-radius: 0 0 8px 8px; 
          }
          .field { margin-bottom: 20px; }
          .label { 
            font-weight: bold; 
            color: oklch(23.906% 0.15189 265.596); 
            font-size: 12px; 
            text-transform: uppercase; 
            letter-spacing: 1px; 
          }
          .value { 
            margin-top: 5px; 
            padding: 10px; 
            background: white; 
            border-left: 3px solid oklch(23.906% 0.15189 265.596); 
          }
          .footer { 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 1px solid oklch(0.88 0.01 250); 
            font-size: 12px; 
            color: oklch(0.45 0.03 250); 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Submitted At</div>
              <div class="value">${data.submittedAt}</div>
            </div>
            
            <div class="field">
              <div class="label">From</div>
              <div class="value">${data.fullName} (${data.email})</div>
            </div>
            
            ${data.phone ? `
            <div class="field">
              <div class="label">Phone</div>
              <div class="value">${data.phone}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${data.subject}</div>
            </div>
            
            <div class="field">
              <div class="label">Message</div>
              <div class="value" style="white-space: pre-wrap;">${data.message}</div>
            </div>
            
            <div class="footer">
              <p>Reply directly to this email to respond to the sender.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

export function generateUserEmailHTML(data: {
  fullName: string
  subject: string
  companyName: string
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: oklch(0.15 0.04 250);
            background-color: oklch(0.98 0.005 250);
          }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { 
            background: linear-gradient(135deg, oklch(23.906% 0.15189 265.596) 0%, oklch(0.55 0.14 265) 100%); 
            color: oklch(0.99 0.005 250); 
            padding: 30px; 
            border-radius: 8px 8px 0 0; 
            text-align: center; 
          }
          .content { 
            background: oklch(0.96 0.01 250); 
            padding: 30px; 
            border-radius: 0 0 8px 8px; 
          }
          .message { 
            background: white; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0;
            border-left: 3px solid oklch(23.906% 0.15189 265.596);
          }
          .footer { 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 1px solid oklch(0.88 0.01 250); 
            font-size: 12px; 
            color: oklch(0.45 0.03 250); 
            text-align: center; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">We've Received Your Message</h1>
          </div>
          <div class="content">
            <p>Hi ${data.fullName},</p>
            
            <p>Thank you for reaching out to us! We've received your message and appreciate you taking the time to contact ${data.companyName}.</p>
            
            <div class="message">
              <strong>Your Message Subject:</strong><br>
              ${data.subject}
            </div>
            
            <p>Our team will review your inquiry and get back to you as soon as possible, typically within 1-24 hours.</p>
            
            <p>If you have any urgent matters, please don't hesitate to reach out directly.</p>
            
            <div class="footer">
              <p>Best regards,<br><strong>${data.companyName}</strong></p>
              <p style="margin-top: 20px; color: oklch(0.45 0.03 250);">This is an automated response. Please do not reply to this email.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

