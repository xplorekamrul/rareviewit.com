// lib/webllm/engine.ts
import * as webllm from "@mlc-ai/web-llm"

let engine: webllm.MLCEngine | null = null
let isInitializing = false

// Use WebLLM's prebuilt app config (bundled model_list)
const APP_CONFIG = webllm.prebuiltAppConfig

function supportedModelIds(): string[] {
  return (APP_CONFIG?.model_list ?? []).map((m) => m.model_id)
}

function isSupported(id?: string): boolean {
  if (!id) return false
  return supportedModelIds().includes(id)
}

function pickDefaultModel(): string {
  const list = APP_CONFIG?.model_list ?? []
  const preferred = list.find((m) => /llama|qwen|phi/i.test(m.model_id))?.model_id
  return preferred ?? list[0]?.model_id ?? ""
}

export function getSupportedModels(): string[] {
  return supportedModelIds()
}

export async function initEngine(
  preferredModelId?: string,
  onProgress?: (progress: webllm.InitProgressReport) => void,
): Promise<webllm.MLCEngine> {
  if (engine) return engine

  if (isInitializing) {
    while (isInitializing) {
      await new Promise((r) => setTimeout(r, 100))
    }
    return engine!
  }

  isInitializing = true
  try {
    const finalModelId = isSupported(preferredModelId) ? preferredModelId : pickDefaultModel()

    if (!finalModelId) {
      console.error("[WebLLM] No supported models found. Available:", getSupportedModels())
      throw new Error("No supported WebLLM models available in prebuilt appConfig.")
    }

    if (process.env.NODE_ENV !== "production") {
      console.info("[WebLLM] Supported models:", getSupportedModels())
      if (preferredModelId && preferredModelId !== finalModelId) {
        console.warn(`[WebLLM] Model "${preferredModelId}" not found. Using "${finalModelId}" instead.`)
      }
    }

    engine = await webllm.CreateMLCEngine(finalModelId, {
      appConfig: APP_CONFIG,
      initProgressCallback: onProgress,
    })
    return engine
  } finally {
    isInitializing = false
  }
}

export async function* streamChat(
  messages: webllm.ChatCompletionMessageParam[], // precise type to avoid tool_call_id issues
  options: { temperature?: number; maxTokens?: number } = {},
): AsyncGenerator<string> {
  if (!engine) throw new Error("Engine not initialized")

  const chunks = await engine.chat.completions.create({
    messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxTokens ?? 1024,
    stream: true,
  })

  for await (const chunk of chunks) {
    const content = chunk.choices[0]?.delta?.content
    if (content) yield content
  }
}

export function isEngineReady(): boolean {
  return engine !== null
}

export async function resetEngine(): Promise<void> {
  if (engine) await engine.resetChat()
}
