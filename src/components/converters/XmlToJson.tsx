'use client';

import { useState } from 'react';
import { jsonToXml, xmlToJson } from '@/lib/xml';
import {
  ConverterHeading,
  ConverterShell,
  DirectionToggle,
  ErrorBanner,
  type Accent,
} from './ConverterShell';

type XmlJsonMode = 'xml-to-json' | 'json-to-xml';

const AMBER_ACCENT: Accent = {
  dropzone:
    'border-amber-300 bg-amber-50 hover:border-amber-400 dark:border-amber-900/50 dark:bg-amber-950/10 dark:hover:border-amber-700/50',
  iconBox:
    'border-amber-200 bg-amber-100 text-amber-600 dark:border-amber-800/50 dark:bg-amber-900/40 dark:text-amber-400',
  button: 'bg-amber-600 text-white hover:bg-amber-500',
  resultCard: 'border-amber-200 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-950/30',
  pill: 'bg-amber-600 text-white shadow-[0_0_15px_rgba(217,119,6,0.4)]',
};

const CONFIGS: Record<
  XmlJsonMode,
  {
    from: string;
    to: string;
    title: string;
    description: string;
    swapWith: XmlJsonMode;
    toJsonDirection: boolean;
  }
> = {
  'xml-to-json': {
    from: 'XML',
    to: 'JSON',
    title: 'XML to JSON Converter',
    description:
      'Paste XML and watch valid JSON appear live — parsed with the browser native DOMParser.',
    swapWith: 'json-to-xml',
    toJsonDirection: true,
  },
  'json-to-xml': {
    from: 'JSON',
    to: 'XML',
    title: 'JSON to XML Converter',
    description: 'Paste JSON and watch valid, formatted XML appear live.',
    swapWith: 'xml-to-json',
    toJsonDirection: false,
  },
};

const PLACEHOLDERS = {
  xmlInput: 'XML içeriğini buraya yapıştırın...',
  xmlOutput: 'Dönüştürülen XML burada görünecek...',
  jsonInput: 'JSON içeriğini buraya yapıştırın...',
  jsonOutput: 'Dönüştürülen JSON burada görünecek...',
};

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 font-mono text-[11px] text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  );
}

export default function XmlToJson() {
  const [mode, setMode] = useState<XmlJsonMode>('xml-to-json');
  const config = CONFIGS[mode];
  const xmlIsInput = config.toJsonDirection;

  const [xml, setXml] = useState('');
  const [json, setJson] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const syncOutput = (input: string) => {
    if (xmlIsInput) {
      if (!input.trim()) {
        setJson('');
        setErrorMsg(null);
        return;
      }
      try {
        setJson(JSON.stringify(xmlToJson(input), null, 2));
        setErrorMsg(null);
      } catch (err) {
        setJson('');
        setErrorMsg(
          err instanceof Error ? `XML çözümlenemedi: ${err.message}` : 'XML çözümlenemedi'
        );
      }
    } else {
      if (!input.trim()) {
        setXml('');
        setErrorMsg(null);
        return;
      }
      try {
        setXml(jsonToXml(input));
        setErrorMsg(null);
      } catch (err) {
        setXml('');
        setErrorMsg(
          err instanceof Error ? `JSON çözümlenemedi: ${err.message}` : 'JSON çözümlenemedi'
        );
      }
    }
  };

  const handleXmlChange = (value: string) => {
    setXml(value);
    if (!xmlIsInput) return; // XML bu yönde yalnızca çıktıdır
    syncOutput(value);
  };

  const handleJsonChange = (value: string) => {
    setJson(value);
    if (xmlIsInput) return; // JSON bu yönde yalnızca çıktıdır
    syncOutput(value);
  };

  const handleSwap = () => {
    setMode(config.swapWith);
    setXml('');
    setJson('');
    setErrorMsg(null);
  };

  return (
    <ConverterShell from={config.from} to={config.to}>
      <DirectionToggle
        from={config.from}
        to={config.to}
        onSwap={handleSwap}
        accent={AMBER_ACCENT}
      />

      <ConverterHeading title={config.title} description={config.description} />

      <div className="flex w-full flex-col gap-3">
        <label className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            {xmlIsInput ? 'XML Input' : 'XML Output'}
          </span>
          <CopyButton value={xml} />
        </label>
        <textarea
          value={xml}
          readOnly={!xmlIsInput}
          onChange={(e) => handleXmlChange(e.target.value)}
          placeholder={xmlIsInput ? PLACEHOLDERS.xmlInput : PLACEHOLDERS.xmlOutput}
          rows={8}
          spellCheck={false}
          className="w-full resize-none rounded-2xl border border-amber-200 bg-amber-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-amber-400 dark:border-amber-900/50 dark:bg-amber-950/10 dark:text-zinc-100 dark:focus:border-amber-700/50"
        />

        <div className="flex items-center justify-center gap-2 py-1 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          <svg
            className="h-4 w-4 text-amber-500 dark:text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v14m0 0l-6-6m6 6l6-6"
            />
          </svg>
          <span>
            Girdi anında {xmlIsInput ? "JSON'a" : "XML'e"} dönüştürülür
          </span>
        </div>

        <label className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            {xmlIsInput ? 'JSON Output' : 'JSON Input'}
          </span>
          <CopyButton value={json} />
        </label>
        <textarea
          value={json}
          readOnly={xmlIsInput}
          onChange={(e) => handleJsonChange(e.target.value)}
          placeholder={xmlIsInput ? PLACEHOLDERS.jsonOutput : PLACEHOLDERS.jsonInput}
          rows={10}
          spellCheck={false}
          className="w-full resize-y rounded-2xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm leading-relaxed text-zinc-700 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300 dark:focus:border-zinc-600"
        />
      </div>

      {errorMsg && <ErrorBanner message={errorMsg} />}
    </ConverterShell>
  );
}