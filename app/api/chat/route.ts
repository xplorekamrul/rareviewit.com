// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// === NEW: Added OPTIONS handler for CORS preflight requests ===
export async function OPTIONS() {
   return NextResponse.json({}, {
      headers: {
         "Access-Control-Allow-Origin": "*", // Allows any external website to access this API
         "Access-Control-Allow-Methods": "POST, OPTIONS",
         "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
   });
}

export async function POST(req: Request) {
   // console.log("🟢 [API] Request received at /api/chat");

   try {
      // 1. Parse the incoming request
      const body = await req.json();
      const { message } = body;
      // console.log("🟢 [API] Extracted message from user:", message);

      if (!message) {
         // console.warn("🟠 [API] No message provided in request body");
         return NextResponse.json({ error: "Message is required" }, { status: 400 });
      }

      // 2. Check for API Key
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
         // console.error("🔴 [API] ERROR: GEMINI_API_KEY is missing from .env file!");
         return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
      }

      // 3. Initialize Gemini
      // console.log("🟢 [API] Initializing Gemini AI...");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });    

      // 4. Create the Prompt
      const prompt = `You are a helpful customer support bot for a company called . 
    Keep your answers short, friendly, and helpful. 
    User message: ${message}`;

      // 5. Generate Content
      // console.log("🟢 [API] Sending prompt to Google Gemini API...");
      const result = await model.generateContent(prompt);

      const responseText = result.response.text();
      // console.log("🟢 [API] Successfully received response from Gemini:", responseText);

      // 6. Return the response WITH CORS HEADERS
      return NextResponse.json({ reply: responseText }, {
         headers: {
            "Access-Control-Allow-Origin": "*", // Essential for external React app fetch
         },
      });

   } catch (error: any) {
      console.error("🔴 [API] FATAL ERROR in Gemini API Route:", error.message);
      console.error("🔴 [API] Full Error Details:", error);
      return NextResponse.json({ error: "Failed to fetch AI response" }, { status: 500 });
   }
}
