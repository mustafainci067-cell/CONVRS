import {
  pipeline,
  env,
} from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2/dist/transformers.min.js';

// Tarayici ortami ayarlari:
// - allowLocalModels=false: yalnizca Hugging Face Hub'dan cek
// - useBrowserCache=true: indirilen ~40MB Whisper modelini Cache API'de sakla
// - useWasmCache=false: ONNX WASM factory'sini blob: URL'e sarma, dogrudan
//   jsDelivr HTTPS uzerinden import et (Opera/Chromium blob import hatasini onler)
// - proxy=false & numThreads=1: COEP olmadan tum tarayicilarda calisir
env.allowLocalModels = false;
env.useBrowserCache = true;
env.useWasmCache = false;

if (env.backends?.onnx?.wasm) {
  env.backends.onnx.wasm.proxy = false;
  if (!self.crossOriginIsolated) {
    env.backends.onnx.wasm.numThreads = 1;
  }
}

const MODEL_ID = 'Xenova/whisper-tiny';

let transcriberPromise = null;

async function getTranscriber() {
  if (!transcriberPromise) {
    transcriberPromise = pipeline('automatic-speech-recognition', MODEL_ID, {
      dtype: 'q8',
      device: 'wasm',
      progress_callback: (info) => {
        if (info?.status === 'progress' && typeof info.progress === 'number') {
          self.postMessage({
            type: 'progress',
            progress: Math.min(100, Math.max(0, Math.round(info.progress))),
            file: info.file ?? '',
          });
        } else if (info?.status === 'ready') {
          self.postMessage({ type: 'ready' });
        }
      },
    }).catch((err) => {
      transcriberPromise = null;
      throw err;
    });
  }
  return transcriberPromise;
}

self.addEventListener('message', async (event) => {
  if (event.data?.type !== 'transcribe') return;
  const { audio, language } = event.data;

  try {
    const transcriber = await getTranscriber();
    self.postMessage({ type: 'transcribing' });

    const options = {
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
