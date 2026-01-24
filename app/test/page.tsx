// components/Chatbot.tsx
"use client";
import { useState } from "react";

// Define TypeScript interfaces for our messages
interface Message {
  role: "user" | "bot";
  text: string;
}

export default function Chatbot() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    console.log("🔵 [Frontend] Send button clicked");

    if (!input.trim()) {
      console.warn("🟡 [Frontend] Input is empty, not sending.");
      return;
    }

    // 1. Update UI with user message
    const userMessage: Message = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    console.log("🔵 [Frontend] Sending request to /api/chat with message:", userMessage.text);

    try {
      // 2. Call the API Route
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      console.log("🔵 [Frontend] Response Status:", res.status);

      const data = await res.json();
      console.log("🔵 [Frontend] Data received from API:", data);

      if (!res.ok) {
        throw new Error(data.error || "Unknown API Error");
      }

      // 3. Update UI with Bot response
      setMessages([...updatedMessages, { role: "bot", text: data.reply }]);
      console.log("🔵 [Frontend] Successfully updated UI with bot response");

    } catch (error: any) {
      console.error("🔴 [Frontend] ERROR during fetch:", error.message);
      setMessages([...updatedMessages, { role: "bot", text: "Oops! Something went wrong. Check the console." }]);
    } finally {
      setLoading(false);
      console.log("🔵 [Frontend] Request completed, loading state cleared");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg bg-white text-black">
      <h2 className="text-xl font-bold mb-4 text-blue-600"> AI Support (TS)</h2>
      
      {/* Chat History Box */}
      <div className="h-80 overflow-y-auto mb-4 p-2 bg-gray-50 border rounded-md">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 rounded-md ${msg.role === "user" ? "bg-blue-100 ml-auto w-fit" : "bg-gray-200 mr-auto w-fit"}`}>
            <strong>{msg.role === "user" ? "You: " : "AI: "}</strong> {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-500 italic">AI is thinking (Check terminal logs)...</div>}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded-md focus:outline-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask a question..."
        />
        <button 
          onClick={sendMessage} 
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          Send
        </button>
      </div>
    </div>
  );
}