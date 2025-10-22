//lib/webllm/engine.ts

import * as webllm from "@mlc-ai/web-llm"

let engine: webllm.MLCEngine | null = null
let isInitializing = false

export async function initEngine(
  model = "Llama-3.1-8B-Instruct-q4f16_1",
  onProgress?: (progress: webllm.InitProgressReport) => void,
): Promise<webllm.MLCEngine> {
  if (engine) return engine

  if (isInitializing) {
    // Wait for initialization to complete
    while (isInitializing) {
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    return engine!
  }

  isInitializing = true

  try {
    engine = await webllm.CreateMLCEngine(model, {
      initProgressCallback: onProgress,
    })

    return engine
  } finally {
    isInitializing = false
  }
}

export async function* streamChat(
  messages: Array<{ role: string; content: string }>,
  options: {
    temperature?: number
    maxTokens?: number
  } = {},
): AsyncGenerator<string> {
  if (!engine) {
    throw new Error("Engine not initialized")
  }

  const chunks = await engine.chat.completions.create({
    messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxTokens ?? 1024,
    stream: true,
  })

  for await (const chunk of chunks) {
    const content = chunk.choices[0]?.delta?.content
    if (content) {
      yield content
    }
  }
}

export function isEngineReady(): boolean {
  return engine !== null
}

export async function resetEngine(): Promise<void> {
  if (engine) {
    await engine.resetChat()
  }
}
