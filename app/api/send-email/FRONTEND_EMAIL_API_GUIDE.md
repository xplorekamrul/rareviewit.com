# Email API - Frontend Developer Guide

## For Frontend Projects Only (Vite, React, Next.js, Vue, etc.)

This guide shows you how to use the Email API in your frontend project. The backend API is already set up and ready to use.

---

## Table of Contents
1. [What You Need](#what-you-need)
2. [Setup (5 minutes)](#setup-5-minutes)
3. [Create Email Template](#create-email-template)
4. [Create Contact Form](#create-contact-form)
5. [Complete Working Example](#complete-working-example)
6. [How to Use in Your Project](#how-to-use-in-your-project)
7. [Troubleshooting](#troubleshooting)

---

## What You Need

### Backend API URL
The backend API is hosted at:
```
https://your-domain.com/api/send-email
```

**Examples:**
- Local development: `http://localhost:3000/api/send-email`
- Production: `https://rareviewit.com/api/send-email`
- Your domain: `https://your-domain.com/api/send-email`

### Email Service File
You need one file from the backend: `lib/email-service.ts`

That's it! No other dependencies needed.

---

## Setup (5 minutes)

### Step 1: Create Email Service File

Create `lib/email-service.ts` in your frontend project with this code:

**For Vite/React:**
```
your-project/
  src/
    lib/
      email-service.ts  ← Create here
```

**For Next.js:**
```
your-project/
  lib/
    email-service.ts  ← Create here
```

**Copy this complete code into `lib/email-service.ts`:**

```typescript
/**
 * Email Service Utility
 * Handles sending emails through the REST API
 * Works across applications (Next.js, Vite, React, Vue, etc.)
 */

interface UserEmailConfig {
   enabled: boolean;
   recipientEmail: string;
   subject: string;
   template: string;
}

interface AdminEmailConfig {
   recipientEmail: string;
   subject: string;
   template: string;
}

interface SendEmailOptions {
   formData: Record<string, any>;
   userEmail?: UserEmailConfig;
   adminEmail: AdminEmailConfig;
   senderName: string;
   apiUrl?: string;
   templateDesign?: (data: Record<string, any>, title: string) => string;
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
   const {
      formData,
      userEmail,
      adminEmail,
      senderName,
      apiUrl = "/api/send-email",
      templateDesign,
   } = options;

   if (!adminEmail?.recipientEmail) {
      console.error("Admin email recipient is required");
      return;
   }

   if (!adminEmail?.subject) {
      console.error("Admin email subject is required");
      return;
   }

   if (!adminEmail?.template) {
      console.error("Admin email template is required");
      return;
   }

   if (!formData || Object.keys(formData).length === 0) {
      console.error("Form data is required");
      return;
   }

   let finalAdminTemplate = adminEmail.template;
   let finalUserTemplate = userEmail?.template;

   if (templateDesign) {
      finalAdminTemplate = templateDesign(formData, adminEmail.subject);
      if (userEmail?.enabled) {
         finalUserTemplate = templateDesign(formData, userEmail.subject);
      }
   }

   const payload = {
      formData,
      userEmail: userEmail
         ? {
              ...userEmail,
              template: finalUserTemplate,
           }
         : undefined,
      adminEmail: {
         ...adminEmail,
         template: finalAdminTemplate,
      },
      senderName,
   };

   fetch(apiUrl, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
   })
      .then((response) => {
         if (!response.ok) {
            console.error("Email API error:", response.statusText);
         }
      })
      .catch((error) => {
         console.error("Failed to send email:", error);
      });

   return Promise.resolve();
}
```

### Step 2: Know Your API URL

Decide which API URL to use:

```typescript
// Local development
const API_URL = "http://localhost:3000/api/send-email";

// Production
const API_URL = "https://rareviewit.com/api/send-email";

// Your domain
const API_URL = "https://your-domain.com/api/send-email";
```

### Step 3: Done!

You're ready to use the API. No npm install needed!

---

## Create Email Template

### Step 1: Define Template Design

Create a file `lib/email-templates.ts`:

```typescript
// lib/email-templates.ts

export function contactFormTemplate(data: Record<string, any>, title: string): string {
  // Format form data into table rows
  const rows = Object.entries(data)
    .map(([key, value]) => `
      <tr>
        <td style="padding: 12px; font-weight: 600; color: #333;">
          ${formatLabel(key)}
        </td>
        <td style="padding: 12px; color: #666;">
          ${formatValue(value)}
        </td>
      </tr>
    `)
    .join("");

  // Return HTML email template
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: 'Segoe UI', sans-serif; 
            background: #f0f2f5; 
            margin: 0; 
            padding: 0; 
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white; 
            border-radius: 8px; 
            overflow: hidden; 
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: 600;
          }
          .content { 
            padding: 30px; 
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
          }
          td { 
            padding: 12px; 
            border-bottom: 1px solid #e0e0e0; 
          }
          .footer { 
            background: #f9f9f9; 
            padding: 20px; 
            text-align: center; 
            font-size: 12px; 
            color: #999; 
            border-top: 1px solid #e0e0e0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${title}</h1>
          </div>
          <div class="content">
            <table>
              ${rows}
            </table>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            <p>This is an automated email. Please do not reply directly.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Helper function to format label
function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

// Helper function to format value
function formatValue(value: any): string {
  if (value === null || value === undefined) return "-";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}
```

### Step 2: Customize the Design

Edit the CSS to match your brand:

```typescript
// Change colors
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// ↓
background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);

// Change fonts
font-family: 'Segoe UI', sans-serif;
// ↓
font-family: 'Your Font', sans-serif;

// Change spacing
padding: 30px;
// ↓
padding: 20px;

// Add logo
<h1>${title}</h1>
// ↓
<img src="your-logo.png" alt="Logo" style="max-width: 200px;">
<h1>${title}</h1>
```

---

## Create Contact Form

### Step 1: Create Form Component

Create `components/ContactForm.tsx`:

```typescript
"use client"; // For Next.js

import { sendEmail } from "@/lib/email-service";
import { contactFormTemplate } from "@/lib/email-templates";
import { useState } from "react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Get form data
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        message: formData.get("message") as string,
      };

      // Validate required fields
      if (!data.name || !data.email || !data.message) {
        setMessage("Please fill all required fields");
        setIsSubmitting(false);
        return;
      }

      // Send emails via API
      await sendEmail({
        formData: data,

        // User receives thank you email (optional)
        userEmail: {
          enabled: true,
          recipientEmail: data.email,
          subject: "Thank you for contacting us",
          template: "", // Generated by templateDesign
        },

        // Admin receives submission (required)
        adminEmail: {
          recipientEmail: "admin@company.com",
          subject: `New Contact from ${data.name}`,
          template: "", // Generated by templateDesign
        },

        // Who the email is from (required)
        senderName: "My Company",

        // Your custom email design (optional)
        templateDesign: contactFormTemplate,

        // Backend API endpoint (IMPORTANT!)
        apiUrl: "https://your-domain.com/api/send-email",
      });

      // Success!
      setIsSubmitting(false);
      setMessage("✅ Form submitted successfully! You'll receive a confirmation email shortly.");
      (e.target as HTMLFormElement).reset();

    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
      setMessage("❌ Failed to submit form. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {/* Message */}
      {message && (
        <div className={`p-4 rounded ${message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message}
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Full Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          required
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us more about your inquiry..."
          rows={6}
          required
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
      >
        {isSubmitting ? "Submitting..." : "Send Message"}
      </button>

      {/* Info Text */}
      <p className="text-sm text-gray-500 text-center">
        Your message will be sent instantly. You'll receive a confirmation email shortly.
      </p>
    </form>
  );
}
```

### Step 2: Use in Your Page

**For Vite/React:**

```typescript
import { ContactForm } from "./components/ContactForm";

export default function ContactPage() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <ContactForm />
    </div>
  );
}
```

**For Next.js:**

```typescript
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <ContactForm />
    </div>
  );
}
```

---

## Complete Working Example

### All Files You Need

**1. `lib/email-service.ts`** (copy from backend)
```typescript
// Copy from backend - no changes needed
```

**2. `lib/email-templates.ts`** (create new)
```typescript
export function contactFormTemplate(data, title) {
  // See "Create Email Template" section above
}
```

**3. `components/ContactForm.tsx`** (create new)
```typescript
// See "Create Contact Form" section above
```

**4. `pages/contact.tsx` or `app/contact/page.tsx`** (use component)
```typescript
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <ContactForm />
    </div>
  );
}
```

---

## How to Use in Your Project

### Step 1: Copy Email Service

Copy `lib/email-service.ts` from backend to your frontend project.

### Step 2: Create Email Template

Create `lib/email-templates.ts` with your custom design.

### Step 3: Create Form Component

Create `components/ContactForm.tsx` with the form.

### Step 4: Use Component

Import and use the component in your page:

```typescript
import { ContactForm } from "@/components/ContactForm";

export default function Page() {
  return <ContactForm />;
}
```

### Step 5: Update API URL

Change the API URL to your backend:

```typescript
apiUrl: "https://your-domain.com/api/send-email"
```

### Step 6: Test

1. Fill out the form
2. Click Submit
3. Check your email inbox
4. You should receive both user and admin emails

---

## Troubleshooting

### Problem 1: CORS Error

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:** Use full API URL, not relative path

```typescript
// ✅ Correct
apiUrl: "https://your-domain.com/api/send-email"

// ❌ Wrong
apiUrl: "/api/send-email"
```

### Problem 2: Emails Not Sending

**Check:**
1. API URL is correct
2. Admin email is valid
3. Backend server is running
4. Check browser console for errors

**Debug:**
```typescript
// Add console logs
console.log("1. Form submitted");
console.log("2. Calling sendEmail...");
await sendEmail(options);
console.log("3. sendEmail completed");
```

### Problem 3: Form Not Closing

**Solution:** Make sure you're using `await`

```typescript
// ✅ Correct
await sendEmail(options);
setIsSubmitting(false);

// ❌ Wrong
sendEmail(options); // Missing await
setIsSubmitting(false);
```

### Problem 4: Template Not Rendering

**Solution:** Make sure `templateDesign` is passed

```typescript
// ✅ Correct
await sendEmail({
  formData: data,
  adminEmail: { template: "" }, // Empty template
  templateDesign: contactFormTemplate, // Function provided
});

// ❌ Wrong
await sendEmail({
  formData: data,
  adminEmail: { template: "<h1>Test</h1>" }, // Hardcoded
  // templateDesign not provided
});
```

### Problem 5: "senderName is required" Error

**Solution:** Always provide `senderName`

```typescript
await sendEmail({
  formData: data,
  adminEmail: { /* ... */ },
  senderName: "My Company", // Required
  templateDesign: contactFormTemplate,
  apiUrl: "https://your-domain.com/api/send-email",
});
```

### Problem 6: Testing Locally

**Use localhost API:**

```typescript
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/send-email";

await sendEmail({
  formData: data,
  adminEmail: { /* ... */ },
  senderName: "My App",
  templateDesign: contactFormTemplate,
  apiUrl: API_URL,
});
```

**Create `.env.local`:**

```
REACT_APP_API_URL=http://localhost:3000/api/send-email
```

---

## Quick Reference

### Required Parameters

```typescript
{
  formData: { /* your form data */ },
  adminEmail: {
    recipientEmail: "admin@company.com",
    subject: "New Submission",
    template: "",
  },
  senderName: "My Company",
  apiUrl: "https://your-domain.com/api/send-email",
}
```

### Optional Parameters

```typescript
{
  userEmail: {
    enabled: true,
    recipientEmail: data.email,
    subject: "Thank you",
    template: "",
  },
  templateDesign: contactFormTemplate,
}
```

### API URLs

```
Local: http://localhost:3000/api/send-email
Production: https://your-domain.com/api/send-email
```

### Response Times

- Form submission: < 100ms (instant)
- Email sending: 1-3 seconds (background)
- User experience: No delay

---

## Best Practices

1. **Always use full API URL**
   ```typescript
   apiUrl: "https://your-domain.com/api/send-email" // ✅
   ```

2. **Validate form data before sending**
   ```typescript
   if (!data.email || !data.name) {
     alert("Please fill all fields");
     return;
   }
   ```

3. **Show loading state**
   ```typescript
   const [isSubmitting, setIsSubmitting] = useState(false);
   ```

4. **Handle errors gracefully**
   ```typescript
   try {
     await sendEmail(options);
   } catch (error) {
     console.error("Error:", error);
   }
   ```

5. **Use environment variables for API URL**
   ```typescript
   const API_URL = process.env.REACT_APP_API_URL;
   ```

6. **Define templates in separate files**
   ```typescript
   // lib/email-templates.ts
   export function contactFormTemplate(data, title) { /* ... */ }
   ```

7. **Test emails in different clients**
   - Gmail
   - Outlook
   - Apple Mail
   - Mobile clients

---

## Summary

### What You Need
- ✅ `lib/email-service.ts` (copy from backend)
- ✅ Email template design
- ✅ Contact form component
- ✅ Backend API URL

### What You Do
1. Copy email service file
2. Create email template
3. Create form component
4. Use component in your page
5. Update API URL
6. Test

### What Happens
1. User fills form
2. User clicks Submit
3. Form data sent to backend API
4. Form closes instantly
5. Emails sent in background (1-3 seconds)
6. User receives confirmation

---

## Files Needed

```
your-project/
├── lib/
│   ├── email-service.ts      ← Copy from backend
│   └── email-templates.ts    ← Create new
├── components/
│   └── ContactForm.tsx       ← Create new
└── pages/ or app/
    └── contact.tsx or page.tsx ← Use component
```

---

**Version:** 2.0.0  
**Status:** Ready to Use  
**Last Updated:** February 28, 2026  
**For:** Frontend Developers Only
