# Email API - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [How It Works](#how-it-works)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Creating Email Templates](#creating-email-templates)
7. [Using the API](#using-the-api)
8. [Complete Examples](#complete-examples)
9. [API Reference](#api-reference)
10. [Troubleshooting](#troubleshooting)
11. [Best Practices](#best-practices)

---

## Overview

The Email API is a REST API that sends emails asynchronously without blocking form submissions. It works across different applications (Next.js, Vite, React, Vue, etc.) and allows each frontend to define its own custom email template design.

### Key Features
- ✅ Non-blocking form submissions (instant response)
- ✅ Async email sending in background (1-3 seconds)
- ✅ Custom email template designs per application
- ✅ Optional user emails + required admin emails
- ✅ Cross-application support (Vite, React, Next.js, Vue, etc.)
- ✅ Full CORS support for cross-domain requests
- ✅ Dynamic sender names (customizable per app)
- ✅ Secure (credentials on backend only)

### Architecture

```
Frontend App (Vite/React/Next.js)
         ↓
    sendEmail()
         ↓
    fetch() to API
         ↓
Backend API (Next.js)
         ↓
    Nodemailer
         ↓
    Gmail SMTP
         ↓
    User & Admin Inboxes
```

---

## How It Works

### Complete Flow

```
1. User fills form (Frontend)
   ↓
2. User clicks Submit (Frontend)
   ↓
3. Form data collected (Frontend)
   ↓
4. Email template generated (Frontend)
   ↓
5. sendEmail() called (Frontend)
   ↓
6. API request sent (Frontend → Backend)
   ↓
7. Backend validates data
   ↓
8. Backend returns immediately (< 100ms)
   ↓
9. Form closes instantly (Frontend)
   ↓
10. Backend sends emails in background (1-3 seconds)
   ↓
11. User receives confirmation
```

### Response Times
- Form submission: < 100ms (instant)
- Email sending: 1-3 seconds (background)
- User experience: No delay perceived

---

## Backend Setup

### Step 1: Environment Variables

Create `.env` file in your Next.js project root:

```env
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**For Gmail:**
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Generate app password (16 characters)
4. Copy and paste into `SMTP_PASS`

### Step 2: Install Dependencies

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

### Step 3: Verify API Files

Check that these files exist:
- ✅ `app/api/send-email/route.ts` - API endpoint
- ✅ `lib/email-service.ts` - Email service utility

### Step 4: Start Backend Server

```bash
npm run dev
```

Look for message: "Email transporter ready"

---

## Frontend Setup

### Step 1: Copy Email Service

Copy `lib/email-service.ts` from backend to your frontend project:

**For Vite/React:**
```
src/
  lib/
    email-service.ts  ← Copy here
```

**For Next.js:**
```
lib/
  email-service.ts  ← Already included
```

### Step 2: Know Your API Endpoint

The API is hosted on your backend server:

```
https://your-domain.com/api/send-email
```

**Examples:**
- Local: `http://localhost:3000/api/send-email`
- Production: `https://rareviewit.com/api/send-email`
- Staging: `https://staging.rareviewit.com/api/send-email`

### Step 3: No Installation Needed

The frontend doesn't need any special dependencies. The `sendEmail()` function uses native `fetch()` API which works in all modern browsers.

---

## Creating Email Templates

### Step 1: Define Template Design Function

Create a function that takes form data and returns HTML:

```typescript
function myEmailTemplate(data: Record<string, any>, title: string): string {
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

  // Return HTML template
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
          </div>
        </div>
      </body>
    </html>
  `;
}
```

### Step 2: Add Helper Functions

```typescript
// Format label from camelCase to readable text
function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

// Format value for display
function formatValue(value: any): string {
  if (value === null || value === undefined) return "-";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}
```

### Step 3: Customize Design

Edit the CSS to match your brand:
- Colors: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);`
- Fonts: `font-family: 'Your Font', sans-serif;`
- Spacing: `padding: 30px;`
- Logo: `<img src="your-logo.png" />`

---

## Using the API

### Step 1: Import Email Service

```typescript
import { sendEmail } from "@/lib/email-service";
// or for Vite/React:
// import { sendEmail } from "./lib/email-service";
import { useState } from "react";
```

### Step 2: Create Form Handler

```typescript
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Extract form data
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      alert("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    // Send emails via backend API
    await sendEmail({
      formData: data,
      
      // User receives thank you email (optional)
      userEmail: {
        enabled: true,
        recipientEmail: data.email,
        subject: "Thank you for contacting us",
        template: "", // Will be generated by templateDesign
      },
      
      // Admin receives submission (required)
      adminEmail: {
        recipientEmail: "admin@company.com",
        subject: `New Contact Form from ${data.name}`,
        template: "", // Will be generated by templateDesign
      },
      
      // Who the email is from (required)
      senderName: "My Company",
      
      // Your custom email design (optional)
      templateDesign: myEmailTemplate,
      
      // Backend API endpoint (required for cross-domain)
      apiUrl: "https://your-domain.com/api/send-email",
    });

    // Form submitted successfully
    setIsSubmitting(false);
    alert("Form submitted successfully!");
    (e.target as HTMLFormElement).reset();

  } catch (error) {
    console.error("Error:", error);
    setIsSubmitting(false);
    alert("Failed to submit form");
  }
};
```

### Step 3: Create Form JSX

```typescript
return (
  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label htmlFor="name">Name *</label>
      <input
        id="name"
        name="name"
        placeholder="Your Name"
        required
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label htmlFor="email">Email *</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="your@email.com"
        required
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        placeholder="+1 (555) 123-4567"
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label htmlFor="message">Message *</label>
      <textarea
        id="message"
        name="message"
        placeholder="Your message..."
        rows={6}
        required
        disabled={isSubmitting}
      />
    </div>

    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : "Send Message"}
    </button>
  </form>
);
```

---

## Complete Examples


### Full Contact Form Component (Vite/React)

```typescript
"use client";

import { sendEmail } from "./lib/email-service";
import { useState } from "react";

// Define your custom email template design
function myEmailTemplate(data: Record<string, any>, title: string): string {
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

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; }
          .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 30px; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 12px; border-bottom: 1px solid #e0e0e0; }
          .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"><h1>${title}</h1></div>
          <div class="content">
            <table>${rows}</table>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function formatValue(value: any): string {
  if (value === null || value === undefined) return "-";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        message: formData.get("message") as string,
      };

      if (!data.name || !data.email || !data.message) {
        alert("Please fill all required fields");
        setIsSubmitting(false);
        return;
      }

      await sendEmail({
        formData: data,
        userEmail: {
          enabled: true,
          recipientEmail: data.email,
          subject: "Thank you for contacting us",
          template: "",
        },
        adminEmail: {
          recipientEmail: "admin@company.com",
          subject: `New Contact from ${data.name}`,
          template: "",
        },
        senderName: "My Company",
        templateDesign: myEmailTemplate,
        apiUrl: "https://your-domain.com/api/send-email",
      });

      setIsSubmitting(false);
      alert("Form submitted successfully!");
      (e.target as HTMLFormElement).reset();

    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
      alert("Failed to submit form");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label htmlFor="name">Full Name *</label>
        <input
          id="name"
          name="name"
          placeholder="John Doe"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="email">Email Address *</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us more..."
          rows={6}
          required
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Send Message"}
      </button>

      <p className="text-sm text-gray-500 text-center">
        Your message will be sent instantly. You'll receive a confirmation email shortly.
      </p>
    </form>
  );
}
```

### How to Use This Component

**In your Vite/React app:**

```typescript
import { ContactForm } from "./components/ContactForm";

export default function Page() {
  return (
    <div>
      <h1>Contact Us</h1>
      <ContactForm />
    </div>
  );
}
```

**In your Next.js app:**

```typescript
import { ContactFormExample } from "@/components/contact-form-example";

export default function Page() {
  return (
    <div>
      <h1>Contact Us</h1>
      <ContactFormExample />
    </div>
  );
}
```

---

## API Reference

### POST /api/send-email

Sends emails asynchronously.

**Request Body:**

```json
{
  "formData": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "Hello, I'm interested in your services"
  },
  "userEmail": {
    "enabled": true,
    "recipientEmail": "john@example.com",
    "subject": "Thank you for contacting us",
    "template": "<h1>Thank you!</h1>..."
  },
  "adminEmail": {
    "recipientEmail": "admin@company.com",
    "subject": "New Form Submission",
    "template": "<h1>New Submission</h1>..."
  },
  "senderName": "My Company"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Form submitted successfully. Emails will be sent shortly."
}
```

**Response (400/500):**

```json
{
  "error": "Error message describing what went wrong"
}
```

### OPTIONS /api/send-email

CORS preflight request.

**Response Headers:**

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `formData` | Object | ✅ Yes | Form data to include in emails |
| `userEmail` | Object | ❌ No | User email configuration (optional) |
| `userEmail.enabled` | Boolean | ✅ Yes (if userEmail provided) | Enable/disable user email |
| `userEmail.recipientEmail` | String | ✅ Yes (if enabled) | User's email address |
| `userEmail.subject` | String | ✅ Yes (if enabled) | Email subject for user |
| `userEmail.template` | String | ✅ Yes (if enabled) | HTML template for user email |
| `adminEmail` | Object | ✅ Yes | Admin email configuration |
| `adminEmail.recipientEmail` | String | ✅ Yes | Admin's email address |
| `adminEmail.subject` | String | ✅ Yes | Email subject for admin |
| `adminEmail.template` | String | ✅ Yes | HTML template for admin email |
| `senderName` | String | ✅ Yes | Sender name (displayed in email "From" field) |
| `templateDesign` | Function | ❌ No | Custom template design function `(data, title) => string` |

---

## Troubleshooting

### Problem 1: CORS Error (Most Common)

**Error Message:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Cause:** Using relative URL instead of full API URL

**Solution:** Always use full backend API URL:

```typescript
// ✅ Correct
await sendEmail({
  formData: data,
  adminEmail: { /* ... */ },
  senderName: "My App",
  apiUrl: "https://your-domain.com/api/send-email", // Full URL
  templateDesign: myTemplate,
});

// ❌ Wrong
await sendEmail({
  formData: data,
  adminEmail: { /* ... */ },
  senderName: "My App",
  apiUrl: "/api/send-email", // Relative URL won't work
  templateDesign: myTemplate,
});
```

**Examples for different environments:**

```typescript
// Local development
apiUrl: "http://localhost:3000/api/send-email"

// Production
apiUrl: "https://rareviewit.com/api/send-email"

// Staging
apiUrl: "https://staging.rareviewit.com/api/send-email"
```

### Problem 2: Emails Not Sending

**Check 1: API URL is correct**

```typescript
// Test if API is accessible
fetch("https://your-domain.com/api/send-email", {
  method: "OPTIONS"
}).then(r => console.log("API accessible:", r.status));
```

**Check 2: Admin email is valid**

```typescript
adminEmail: {
  recipientEmail: "admin@company.com", // Must be valid email
  subject: "New Submission",
  template: "",
}
```

**Check 3: Sender name is provided**

```typescript
senderName: "My Company" // Required
```

**Check 4: Backend is running**
- Verify backend server is running
- Check backend logs for errors
- Verify SMTP credentials are set on backend

### Problem 3: Form Not Closing

**Issue:** Form stays open after submission

**Solution:** Ensure you're using `await`:

```typescript
// ✅ Correct
await sendEmail(options);
setIsSubmitting(false);

// ❌ Wrong
sendEmail(options); // Missing await
setIsSubmitting(false);
```

### Problem 4: Template Not Rendering

**Issue:** Email shows plain text instead of formatted table

**Solution:** Ensure `templateDesign` function is passed:

```typescript
// ✅ Correct
await sendEmail({
  formData: data,
  adminEmail: { /* ... */, template: "" }, // Empty template
  templateDesign: myEmailTemplate, // Function provided
});

// ❌ Wrong
await sendEmail({
  formData: data,
  adminEmail: { /* ... */, template: "<h1>Test</h1>" }, // Hardcoded
  // templateDesign not provided
});
```

### Problem 5: "senderName is required" Error

**Error Message:**
```json
{
  "error": "Sender name is required"
}
```

**Solution:** Always provide `senderName`:

```typescript
await sendEmail({
  formData: data,
  adminEmail: { /* ... */ },
  senderName: "My Company", // Required
  templateDesign: myTemplate,
  apiUrl: "https://your-domain.com/api/send-email",
});
```

### Problem 6: Testing Locally

**For local development:**

```typescript
// Use localhost API
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/send-email";

await sendEmail({
  formData: data,
  adminEmail: { /* ... */ },
  senderName: "My App",
  templateDesign: myTemplate,
  apiUrl: API_URL,
});
```

**Create `.env.local` file:**

```
REACT_APP_API_URL=http://localhost:3000/api/send-email
```

### Problem 7: Debugging

**Enable console logging:**

```typescript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    console.log("1. Form submitted");
    
    const data = { /* ... */ };
    console.log("2. Form data:", data);
    
    console.log("3. Calling sendEmail...");
    await sendEmail({
      formData: data,
      adminEmail: { /* ... */ },
      senderName: "My App",
      templateDesign: myTemplate,
      apiUrl: "https://your-domain.com/api/send-email",
    });
    
    console.log("4. sendEmail completed");
    setIsSubmitting(false);
    console.log("5. Form closed");
    
  } catch (error) {
    console.error("Error:", error);
  }
};
```

**Check browser DevTools:**
1. Open DevTools (F12)
2. Go to Network tab
3. Submit form
4. Look for `/api/send-email` request
5. Check response status and body

---

## Best Practices

### 1. Always Use Full API URL

```typescript
// ✅ Good
apiUrl: "https://your-domain.com/api/send-email"

// ❌ Bad
apiUrl: "/api/send-email"
```

### 2. Validate Form Data Before Sending

```typescript
// ✅ Good
if (!data.email || !data.name) {
  alert("Please fill all required fields");
  return;
}

await sendEmail(options);
```

### 3. Use Helper Functions for Templates

```typescript
// ✅ Good
function formatLabel(key) { /* ... */ }
function formatValue(value) { /* ... */ }

// ❌ Bad
template: `<td>${key.replace(/([A-Z])/g, " $1")}</td>`
```

### 4. Define Templates in Separate File

```typescript
// lib/email-templates.ts
export function myEmailTemplate(data, title) { /* ... */ }

// components/ContactForm.tsx
import { myEmailTemplate } from "@/lib/email-templates";
```

### 5. Use Environment Variables for API URL

```typescript
// .env.local
REACT_APP_API_URL=https://your-domain.com/api/send-email

// component
const apiUrl = process.env.REACT_APP_API_URL;
```

### 6. Handle Errors Gracefully

```typescript
try {
  await sendEmail(options);
  alert("Success!");
} catch (error) {
  console.error("Error:", error);
  alert("Failed to submit form");
}
```

### 7. Show Loading State

```typescript
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  setIsSubmitting(true);
  try {
    await sendEmail(options);
  } finally {
    setIsSubmitting(false);
  }
};
```

### 8. Test Email Rendering

Test emails in different email clients:
- Gmail
- Outlook
- Apple Mail
- Mobile clients

### 9. Keep Templates Responsive

```typescript
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 10. Use Inline Styles for Email Compatibility

```typescript
// ✅ Good - works in all email clients
<td style="padding: 12px; color: #333;">

// ❌ Bad - may not work
<style>.cell { padding: 12px; }</style>
<td class="cell">
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
  templateDesign: myEmailTemplate,
}
```

### API Endpoints

```
Local: http://localhost:3000/api/send-email
Production: https://your-domain.com/api/send-email
Staging: https://staging.your-domain.com/api/send-email
```

### Response Times

- Form submission: < 100ms (instant)
- Email sending: 1-3 seconds (background)
- User experience: No delay perceived

### File Locations

**Backend:**
- API: `app/api/send-email/route.ts`
- Service: `lib/email-service.ts`

**Frontend:**
- Service: `lib/email-service.ts` or `src/lib/email-service.ts`
- Example: `components/contact-form-example.tsx` or `src/components/ContactForm.tsx`

---

## Summary

### Frontend Responsibilities
- Collect form data
- Define email template design
- Call `sendEmail()` with API URL
- Show loading state
- Handle errors

### Backend Responsibilities
- Validate form data
- Send emails via Nodemailer
- Return immediately (non-blocking)
- Handle SMTP/Gmail configuration

### Key Benefits
- ⚡ Instant form submission (no waiting)
- 🎨 Custom email designs per application
- 📧 Optional user emails + required admin emails
- 🌍 Cross-domain support (Vite, React, Vue, etc.)
- 🔒 Secure (credentials on backend only)

### Next Steps

**For Backend:**
1. Set environment variables: `SMTP_USER`, `SMTP_PASS`
2. Install Nodemailer: `npm install nodemailer`
3. Verify API files exist
4. Start server: `npm run dev`

**For Frontend:**
1. Copy `lib/email-service.ts` to your project
2. Create custom email template design
3. Add form component to your page
4. Set correct API URL (backend endpoint)
5. Test with your email address
6. Deploy to production

---

**Version:** 2.0.0  
**Last Updated:** February 28, 2026  
**Status:** Production Ready  
**Complete Documentation**
