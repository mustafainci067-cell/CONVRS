/// <reference lib="webworker" />

import { pipeline, env } from '@huggingface/transformers';

// Tarayici ortami ayarlari: yalnizca uzak Hugging Face modelini kullan,
// indirilen dosyalari tarayici Cache API'de sakla ve COEP gerektirmeyen tek
// is parcacikli WASM kullan (Opera, Brave, Firefox, Safari, Chrome, Edge uyumlu).
env.allowLocalModels = false;
env.useBrowserCache = true;
if (!self.crossOriginIsolated && env.backends?.onnx?.wasm) {
  env.backends.onnx.wasm.numThreads = 1;
}

const MODEL_ID = 'Xenova/whisper-tiny';

type TranscribeMessage = {
  type: 'transcribe';
  audio: Float32Array;
  language?: string;
};

type AsrOutput = { text?: string } | Array<{ text?: string }>;
type AsrPipeline = (
  audio: Float32Array,
  options?: Record<string, unknown>
) => Promise<AsrOutput>;

let transcriberPromise: Promise<AsrPipeline> | null = null;

async function getTranscriber(): Promise<AsrPipeline> {
  if (!transcriberPromise) {
    transcriberPromise = (
      pipeline('automatic-speech-recognition', MODEL_ID, {
        dtype: 'q8',
        device: 'wasm',
        progress_callback: (info: { status?: string; progress?: number; file?: string }) => {
          if (info.status === 'progress' && typeof info.progress === 'number') {
            self.postMessage({
              type: 'progress',
              progress: Math.min(100, Math.max(0, Math.round(info.progress))),
              file: info.file ?? '',
            });
          } else if (info.status === 'ready') {
            self.postMessage({ type: 'ready' });
          }
        },
      }) as Promise<unknown>
    )
      .then((fn) => fn as AsrPipeline)
      .catch((err) => {
        transcriberPromise = null;
        throw err;
      });
  }
  return transcriberPromise;
}

self.addEventListener('message', async (event: MessageEvent<TranscribeMessage>) => {
  if (event.data?.type !== 'transcribe') return;
  const { audio, language } = event.data;

  try {
    const transcriber = await getTranscriber();
    self.postMessage({ type: 'transcribing' });

    const options: Record<string, unknown> = {
      task: 'transcribe',
      chunk_length_s: 30,
      stride_length_s: 5,
    };
    if (language) {
      options.language = language;
    }

    const output = await transcriber(audio, options);
    const text = Array.isArray(output)
      ? output
          .map((o) => o?.text ?? '')
          .join(' ')
          .trim()
      : (output?.text ?? '').trim();

    self.postMessage({ type: 'result', text });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    self.postMessage({ type: 'error', message });
  }
});
