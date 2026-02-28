import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email transporter configuration
const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
   },
});

// Verify transporter connection on startup
transporter.verify((error) => {
   if (error) {
      console.error("Email transporter error:", error);
   } else {
      console.log("Email transporter ready");
   }
});

interface EmailPayload {
   // Form data
   formData: Record<string, any>;

   // User email configuration (optional)
   userEmail?: {
      enabled: boolean;
      recipientEmail: string;
      subject: string;
      template: string; // HTML template or plain text
   };

   // Admin email configuration (required)
   adminEmail: {
      recipientEmail: string;
      subject: string;
      template: string; // HTML template or plain text
   };

   // Sender name (required - must be passed from frontend)
   senderName: string;
}

/**
 * Sends emails asynchronously without blocking the response
 * Supports both user and admin email notifications
 */
async function sendEmailsAsync(payload: EmailPayload): Promise<void> {
   try {
      const { formData, userEmail, adminEmail, senderName } = payload;

      // Send admin email (required)
      const adminMailOptions = {
         from: `${senderName} <${process.env.SMTP_USER}>`,
         to: adminEmail.recipientEmail,
         subject: adminEmail.subject,
         html: adminEmail.template,
         replyTo: formData.email || process.env.SMTP_USER,
      };

      await transporter.sendMail(adminMailOptions);
      console.log("Admin email sent successfully");

      // Send user email (optional)
      if (userEmail?.enabled && userEmail?.recipientEmail) {
         const userMailOptions = {
            from: `${senderName} <${process.env.SMTP_USER}>`,
            to: userEmail.recipientEmail,
            subject: userEmail.subject,
            html: userEmail.template,
         };

         await transporter.sendMail(userMailOptions);
         console.log("User email sent successfully");
      }
   } catch (error) {
      console.error("Error sending emails:", error);
      // Don't throw - we want the form submission to succeed even if email fails
   }
}

export async function POST(request: NextRequest) {
   try {
      const payload: EmailPayload = await request.json();

      // Validate required fields
      if (!payload.adminEmail?.recipientEmail) {
         return NextResponse.json(
            { error: "Admin email recipient is required" },
            { status: 400 }
         );
      }

      if (!payload.adminEmail?.subject) {
         return NextResponse.json(
            { error: "Admin email subject is required" },
            { status: 400 }
         );
      }

      if (!payload.adminEmail?.template) {
         return NextResponse.json(
            { error: "Admin email template is required" },
            { status: 400 }
         );
      }

      if (!payload.formData || Object.keys(payload.formData).length === 0) {
         return NextResponse.json(
            { error: "Form data is required" },
            { status: 400 }
         );
      }

      if (!payload.senderName) {
         return NextResponse.json(
            { error: "Sender name is required" },
            { status: 400 }
         );
      }

      // Send emails asynchronously without awaiting
      // This ensures the response is sent immediately
      sendEmailsAsync(payload).catch((error) => {
         console.error("Async email sending failed:", error);
      });

      // Return success immediately
      return NextResponse.json(
         {
            success: true,
            message: "Form submitted successfully. Emails will be sent shortly.",
         },
         { status: 200 }
      );
   } catch (error) {
      console.error("API error:", error);
      return NextResponse.json(
         { error: "Failed to process request" },
         { status: 500 }
      );
   }
}

// CORS headers for cross-origin requests
export async function OPTIONS(request: NextRequest) {
   return new NextResponse(null, {
      status: 200,
      headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "POST, OPTIONS",
         "Access-Control-Allow-Headers": "Content-Type",
      },
   });
}
