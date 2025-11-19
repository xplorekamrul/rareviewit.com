// lib/webllm/engine.ts
import * as webllm from "@mlc-ai/web-llm"

let engine: webllm.MLCEngine | null = null
let isInitializing = false

const APP_CONFIG = webllm.prebuiltAppConfig

function supportedModelIds(): string[] {
  return (APP_CONFIG?.model_list ?? []).map((m) => m.model_id)
}
function isSupported(id?: string) { return !!id && supportedModelIds().includes(id!) }
function pickDefaultModel() {
  const list = APP_CONFIG?.model_list ?? []
  return list.find((m) => /llama|qwen|phi/i.test(m.model_id))?.model_id ?? list[0]?.model_id ?? ""
}

export async function initEngine(preferredModelId?: string, onProgress?: (p: webllm.InitProgressReport) => void) {
  if (engine) return engine
  if (isInitializing) { while (isInitializing) await new Promise(r => setTimeout(r, 100)); return engine! }
  isInitializing = true
  try {
    const modelId = isSupported(preferredModelId) ? preferredModelId! : pickDefaultModel()
    engine = await webllm.CreateMLCEngine(modelId, { appConfig: APP_CONFIG, initProgressCallback: onProgress })
    return engine
  } finally { isInitializing = false }
}

export async function* streamChat(
  messages: webllm.ChatCompletionMessageParam[],
  options: { temperature?: number; maxTokens?: number } = {}
): AsyncGenerator<string> {
  if (!engine) throw new Error("Engine not initialized")
  const chunks = await engine.chat.completions.create({
    messages, temperature: options.temperature ?? 0.5, max_tokens: options.maxTokens ?? 256, stream: true,
  })
  for await (const c of chunks) {
    const s = c.choices[0]?.delta?.content
    if (s) yield s
  }
}

export function isEngineReady() { return engine !== null }

/** Try to stop the current generation. */
export async function cancelGeneration() {
  if (!engine) return
  // Newer web-llm exposes interruptGenerate; fallback to resetChat.
  const anyEngine = engine as any
  if (typeof anyEngine.interruptGenerate === "function") await anyEngine.interruptGenerate()
  else await engine.resetChat()
}
