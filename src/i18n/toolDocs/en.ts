// Faz 5 — Long-form SEO içerik motoru: İngilizce (kanonik) metinler.
// Kategoriye göre değişen paragraf/başlık slotları; araca özel detaylar
// index.ts tarafından config'e göre yerleştirilir.
import type { ToolDocPhrases } from "./types";

export const en: ToolDocPhrases = {
  title: (category, name, from, to) => {
    switch (category) {
      case "image":
        return `Why convert ${from} to ${to} in your browser?`;
      case "document":
        return `${from} → ${to}: a practical, privacy-safe guide`;
      case "media":
        return `${from} → ${to}: a complete walkthrough`;
      default:
        return `Understanding ${name}`;
    }
  },

  intro: (archetype, name, from, to) => {
    switch (archetype) {
      case "file":
        return `${name} takes your ${from} and turns it into ${to} — completely inside your browser. No install, no account, no watermark: you select or drop a file, review the settings, and download the result seconds later. Your files stay on your device.`;
      case "paste":
        return `${name} processes ${from} right where you are. Paste your input, review any options, and copy the ${to} output — no uploads, no account, no waiting on a server.`;
      default:
        return `${name} creates ${to} instantly in your browser. Set the options you need, generate, and copy or download the result — free, private, and done locally.`;
    }
  },

  useCase: (category, name, from, to) => {
    const src = from === "-na-" ? name : from;
    switch (category) {
      case "image":
        return `Teams and creators use ${name} to transform ${src} into ${to} for everyday production workflows: optimizing visuals for faster Core Web Vitals (LCP), preparing assets for print or e-commerce marketplaces, or satisfying strict CMS upload rules. Because the ${src} → ${to} conversion happens locally, you keep full control over pixel fidelity and your originals are never sent anywhere.`;
      case "document":
        return `Converting ${src} to ${to} with ${name} is essential whenever a file has to cross software boundaries — when a client opens a different office suite, an enterprise portal accepts only ${to}, or a financial/legal dataset must be ingested cleanly. Doing it in the browser removes the riskiest step: handing your confidential ${src} document to an unknown remote server.`;
      case "developer":
        return `Developers rely on ${name} to generate or transform ${to} deterministically without leaving the browser. You inspect the exact input, verify the ${to} output immediately, and re-run the operation as often as needed without pasting production tokens, schemas, or credentials into third-party APIs.`;
      case "text":
        return `Editorial and localization workflows often require transforming ${src} into ${to} accurately. ${name} eliminates manual formatting errors so you can focus on content quality, while keeping unpublished drafts and internal copy 100% inside local browser memory.`;
      case "media":
        return `Audio and video streams (${src} → ${to}) are the heaviest and most sensitive files you handle. Running ${name} locally means your media never crosses the network: no multi-gigabyte upload progress bar, no cloud transcoding queue, and no copy left behind — just the ${to} file ready on your device.`;
      default:
        return `${name} delivers instant, deterministic ${to} results directly in your browser tab. With everything running locally, the output you see is computed in real time on your device — with zero waiting, zero tracking, and nothing sent to a server.`;
    }
  },

  privacy: (name) =>
    `Privacy by construction: ${name} runs entirely in your device's memory. Your files, text and data are never uploaded, stored or logged by us — there is no server in the path.`,

  wasm: (name) =>
    `The heavy lifting uses WebAssembly: the same codec engines a desktop app would use are compiled to run inside your browser, so ${name} delivers desktop-grade results while the file stays on your device.`,

  features: (hasMedia, sizeLimitMb) => [
    ...(sizeLimitMb ? [`Up to ${sizeLimitMb} MB per file`] : []),
    ...(hasMedia
      ? ["WebAssembly codec engine — desktop-grade processing in the browser"]
      : []),
    "100% in-browser — nothing is uploaded",
    "No account or sign-up required",
    "Free to use, no watermarks",
    "Runs on desktop and mobile browsers",
    "Your source data is never stored or logged",
  ],
};