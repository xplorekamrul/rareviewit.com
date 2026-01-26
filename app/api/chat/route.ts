// app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import { NextResponse } from "next/server";
import path from 'path';

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

// Load corpus data once at startup
let corpusData: any = null;

function loadCorpusData() {
   if (!corpusData) {
      try {
         const corpusPath = path.join(process.cwd(), 'public', 'chatbot', 'corpus.json');
         const corpusContent = fs.readFileSync(corpusPath, 'utf8');
         corpusData = JSON.parse(corpusContent);
      } catch (error) {
         console.error('Failed to load corpus data:', error);
         corpusData = { pages: [] }; // Fallback
      }
   }
   return corpusData;
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

      // 3. Load corpus data for context
      const corpus = loadCorpusData();
      const contextInfo = JSON.stringify(corpus, null, 2);

      // 4. Initialize Gemini
      // console.log("🟢 [API] Initializing Gemini AI...");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

      // 5. Create the Prompt with corpus context
      const prompt = `You are a helpful customer support bot for RareviewIt.com, a digital services company. 
Use the following website information to answer questions accurately:

${contextInfo}

Keep your answers short, friendly, and helpful. Use the provided information to give specific details about services, team, pricing, contact info, etc.

IMPORTANT: When users ask for links, pages, or how to contact admins/team, provide helpful text responses but mention that clickable buttons will appear below your message for easy navigation.

If asked about something not in the provided data, politely say you don't have that specific information but offer to help with what you do know.

User message: ${message}`;

      // 6. Generate Content
      // console.log("🟢 [API] Sending prompt to Google Gemini API...");
      const result = await model.generateContent(prompt);

      const responseText = result.response.text();
      // console.log("🟢 [API] Successfully received response from Gemini:", responseText);

      // 7. Return the response WITH CORS HEADERS
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
