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

  useCase: (category) => {
    switch (category) {
      case "image":
        return "People rely on image conversion for everyday tasks: shrinking photos for the web, preparing assets for print or e-commerce, or matching a platform's required format. Because the work happens locally, you keep full control over quality and your originals are never sent anywhere.";
      case "document":
        return "Document conversion matters whenever a file has to cross a boundary — when a client opens a different office suite, an upload form accepts only one format, or a report must print identically everywhere. Doing it in the browser removes the riskiest step: handing your document to an unknown server.";
      case "developer":
        return "Browser-based utilities earn their place by being controllable. You see exactly what goes in, you get exactly what comes out, and you can re-run the tool as often as you like without trading your data for it. It fits naturally between your editor and your terminal.";
      case "text":
        return "Most text work is quick and repetitive. This tool removes the repetitive part — fixing case, measuring length or comparing versions — so you can focus on what the text actually says. Because everything is processed locally, even confidential drafts stay private.";
      case "media":
        return "Media files are the heaviest and most sensitive things you handle. Processing them in place means the audio or video never crosses the network: no upload progress bar, no server logs, no copy left behind — just the result on your device.";
      default:
        return "Small utilities earn trust by being instant and predictable. With everything running locally, the answer you see is the answer you get — no waiting, no tracking, and nothing sent to a server.";
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