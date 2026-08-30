'use client';

import { useEffect, useState } from 'react';
import { decodeBase64, encodeBase64 } from '@/lib/base64';
import {
  ConvertButton,
  ConverterHeading,
  ConverterShell,
  DirectionToggle,
  ErrorBanner,
  ResultPanel,
  type Accent,
} from './ConverterShell';

type Base64Mode = 'encode' | 'decode';

const CYAN_ACCENT: Accent = {
  dropzone:
    'border-cyan-300 bg-cyan-50 hover:border-cyan-400 dark:border-cyan-900/50 dark:bg-cyan-950/10 dark:hover:border-cyan-700/50',
  iconBox:
    'border-cyan-200 bg-cyan-100 text-cyan-600 dark:border-cyan-800/50 dark:bg-cyan-900/40 dark:text-cyan-400',
  button: 'bg-cyan-600 text-white hover:bg-cyan-500',
  resultCard: 'border-cyan-200 bg-cyan-50 dark:border-cyan-900/30 dark:bg-cyan-950/30',
  pill: 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.4)]',
};

const CONFIGS: Record<
  Base64Mode,
  {
    title: string;
    description: string;
    inputLabel: string;
    outputLabel: string;
    placeholder: string;
    swapWith: Base64Mode;
    convert: (input: string) => string;
  }
> = {
  encode: {
    title: 'Text to Base64 Encoder',
    description:
      'Encode any text into Base64. UTF-8 safe, so Turkish characters and emoji survive the round trip.',
    inputLabel: 'Text',
    outputLabel: 'Base64',
    placeholder: 'Encode etmek istediğiniz metni buraya yazın...',
    swapWith: 'decode',
    convert: encodeBase64,
  },
  decode: {
    title: 'Base64 to Text Decoder',
    description: 'Decode a Base64 string back into readable, UTF-8 text.',
    inputLabel: 'Base64',
    outputLabel: 'Text',
    placeholder: 'Decode etmek istediğiniz Base64 metnini buraya yazın...',
    swapWith: 'encode',
    convert: decodeBase64,
  },
};

export default function Base64Encoder() {
  const [activeMode, setActiveMode] = useState<Base64Mode>('encode');
  const config = CONFIGS[activeMode];

  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const resetOutput = () => {
    setOutput(null);
    setDownloadUrl(null);
    setCopied(false);
    setErrorMsg(null);
  };

  const handleSwap = () => {
    setActiveMode(config.swapWith);
    setInput('');
    resetOutput();
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setErrorMsg(`Lütfen dönüştürmek için ${config.inputLabel} girin.`);
      return;
    }

    setErrorMsg(null);

    try {
      const result = config.convert(input);
      setOutput(result);
      setDownloadUrl(URL.createObjectURL(new Blob([result], { type: 'text/plain;charset=utf-8' })));
      setCopied(false);
    } catch (err) {
      setOutput(null);
      setErrorMsg(err instanceof Error ? err.message : 'Dönüştürme sırasında bir hata oluştu.');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
  };

  return (
    <ConverterShell from={config.inputLabel} to={config.outputLabel}>
      <DirectionToggle
        from={config.inputLabel}
        to={config.outputLabel}
        onSwap={handleSwap}
        accent={CYAN_ACCENT}
      />

      <ConverterHeading title={config.title} description={config.description} />

      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          resetOutput();
        }}
        placeholder={config.placeholder}
        rows={6}
        className="w-full resize-none rounded-2xl border border-cyan-200 bg-cyan-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-cyan-400 dark:border-cyan-900/50 dark:bg-cyan-950/10 dark:text-zinc-100 dark:focus:border-cyan-700/50"
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {!output && (
        <ConvertButton onClick={handleConvert} accent={CYAN_ACCENT}>
          {`Convert to ${config.outputLabel}`}
        </ConvertButton>
      )}

      {output && downloadUrl && (
        <ResultPanel
          accent={CYAN_ACCENT}
          href={downloadUrl}
          downloadName={`${activeMode === 'encode' ? 'encoded' : 'decoded'}.txt`}
          label={`Download ${config.outputLabel} File`}
        >
          <div className="flex flex-col gap-2">
            <pre className="max-h-56 w-full overflow-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-[11px] leading-relaxed break-all whitespace-pre-wrap text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
              {output}
            </pre>
            <button
              type="button"
              onClick={handleCopy}
              className="self-end rounded-lg border border-zinc-200 bg-white px-3 py-1.5 font-mono text-xs text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              {copied ? 'Copied ✓' : 'Copy to clipboard'}
            </button>
          </div>
        </ResultPanel>
      )}
    </ConverterShell>
  );
}
