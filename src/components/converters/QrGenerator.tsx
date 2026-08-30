'use client';

import { useState } from 'react';
import { textToQrDataUrl } from '@/lib/qr';
import {
  ConvertButton,
  ConverterHeading,
  ConverterShell,
  ErrorBanner,
  ResultPanel,
  type Accent,
} from './ConverterShell';

const INDIGO_ACCENT: Accent = {
  dropzone:
    'border-indigo-300 bg-indigo-50 hover:border-indigo-400 dark:border-indigo-900/50 dark:bg-indigo-950/10 dark:hover:border-indigo-700/50',
  iconBox:
    'border-indigo-200 bg-indigo-100 text-indigo-600 dark:border-indigo-800/50 dark:bg-indigo-900/40 dark:text-indigo-400',
  button: 'bg-indigo-600 text-white hover:bg-indigo-500',
  resultCard: 'border-indigo-200 bg-indigo-50 dark:border-indigo-900/30 dark:bg-indigo-950/30',
  pill: 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]',
};

export default function QrGenerator() {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setErrorMsg('Lütfen QR koda dönüştürmek için bir metin veya URL girin.');
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);

    try {
      setQrDataUrl(await textToQrDataUrl(text.trim()));
    } catch (err) {
      console.error(err);
      setErrorMsg('QR kod oluşturulurken bir hata oluştu. Lütfen girdinizi kontrol edin.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ConverterShell from="Text" to="QR Code">
      <ConverterHeading
        title="QR Code Generator"
        description="Turn any text, URL, or message into a scannable QR code. Generated entirely in your browser."
      />

      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setQrDataUrl(null);
        }}
        placeholder="https://example.com or any text..."
        rows={4}
        className="w-full resize-none rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-zinc-800 shadow-sm outline-none placeholder:text-zinc-400 focus:border-indigo-400 dark:border-indigo-900/50 dark:bg-indigo-950/10 dark:text-zinc-100 dark:focus:border-indigo-700/50"
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {!qrDataUrl && (
        <ConvertButton onClick={handleGenerate} disabled={isGenerating} accent={INDIGO_ACCENT}>
          {isGenerating ? 'Generating...' : 'Generate QR Code'}
        </ConvertButton>
      )}

      {qrDataUrl && (
        <ResultPanel
          accent={INDIGO_ACCENT}
          href={qrDataUrl}
          downloadName="qr-code.png"
          label="Download QR Code"
        >
          <div className="flex justify-center rounded-xl border border-indigo-200 bg-white p-4 dark:border-indigo-900/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="Generated QR code" className="h-48 w-48" />
          </div>
        </ResultPanel>
      )}
    </ConverterShell>
  );
}
