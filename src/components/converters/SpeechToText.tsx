'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ConverterShell, ConverterHeading, ErrorBanner } from './ConverterShell';

// SpeechRecognition tipleri tarayici API'sine ozeldir; lib.dom'de kismi destek verir.
type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onstart: (() => void) | null;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      length: number;
      [index: number]: { transcript: string; confidence: number };
    };
  };
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export default function SpeechToText() {
  // Tarayıcı desteğini render zamanında bir kez hesapla (effect içinde setState yok)
  const [isSupported] = useState(() => Boolean(getSpeechRecognition()));
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const transcriptRef = useRef('');

  useEffect(() => {
    // Bileşen kaldırıldığında dinlemeyi durdur
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  const updateTranscript = (text: string) => {
    transcriptRef.current = text;
    setTranscript(text);
  };

  const handleStart = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR) return; // desteklenmiyorsa zaten "Desteklenmiyor" ekrani gosterilir
    setErrorMsg(null);
    setCopied(false);

    // Mevcut tanımayı sıfırla ve yenile
    recognitionRef.current?.abort();

    const recognition = new SR();
    recognitionRef.current = recognition;

    // Tarayıcı diline göre ayarla (next-intl locale'inden bağımsız)
    recognition.lang = typeof navigator !== 'undefined' ? navigator.language || 'tr-TR' : 'tr-TR';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setErrorMsg(
          'Mikrofon erişimi reddedildi. Tarayıcı ayarlarından mikrofon iznini verip tekrar deneyin.'
        );
      } else if (event.error === 'no-speech') {
        // Sessizlik normaldir; dinlemeye devam et
      } else if (event.error !== 'aborted') {
        setErrorMsg(`Konuşma tanıma hatası: ${event.error}`);
      }
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      let finalText = transcriptRef.current;
      let interimText = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += (finalText ? ' ' : '') + result[0].transcript;
        } else {
          interimText += result[0].transcript;
        }
      }

      const combined = (finalText + (interimText ? ' ' + interimText : '')).trim();
      updateTranscript(combined);
    };

    recognition.start();
  }, []);

  const handleStop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const handleClear = useCallback(() => {
    recognitionRef.current?.abort();
    updateTranscript('');
    setIsListening(false);
    setCopied(false);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!transcript) return;
    try {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setErrorMsg('Metin kopyalanamadı. Lütfen manuel seçip kopyalayın.');
    }
  }, [transcript]);

  if (!isSupported) {
    return (
      <ConverterShell from="Mikrofon" to="Metin">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 9v4m0 4h.01M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Tarayıcınız Konuşma Tanımayı Desteklemiyor
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Bu özellik Chrome, Edge ve Safari&apos;nin güncel sürümlerinde çalışır. Lütfen desteklenen bir
            tarayıcıya geçin.
          </p>
        </div>
      </ConverterShell>
    );
  }

  return (
    <ConverterShell from="Mikrofon" to="Metin">
      <ConverterHeading
        title="Sesi Metne Çevirici"
        description="Mikrofon üzerinden konuşun; konuşmalarınız anlık olarak ekranda yazıya dökülsün. Dökülen metni tek tıkla kopyalayın."
      />

      <div className="flex w-full flex-col items-center gap-5">
        {/* Durum göstergesi */}
        <div className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-100/50 px-4 py-3 dark:border-zinc-800/60 dark:bg-zinc-900/40">
          <div className="flex items-center gap-2.5">
            <span
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                isListening
                  ? 'animate-pulse bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                  : 'bg-zinc-400 dark:bg-zinc-600'
              }`}
            />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
              {isListening ? 'Dinleniyor...' : 'Hazır'}
            </span>
          </div>
          <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
            Web Speech API
          </span>
        </div>

        {/* Kontroller */}
        <div className="flex w-full items-center justify-center gap-3">
          {!isListening ? (
            <button
              type="button"
              onClick={handleStart}
              className="flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3.5 font-medium text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-500 active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M12 8v4m0 4h.01M12 3a6 6 0 016 6v4a6 6 0 11-12 0V9a6 6 0 016-6zM5.6 14a10 10 0 0012.8 0"
                />
              </svg>
              Başlat
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStop}
              className="flex items-center gap-2 rounded-full bg-red-600 px-8 py-3.5 font-medium text-white shadow-lg shadow-red-600/25 transition-all hover:bg-red-500 active:scale-95"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
                <rect x="2" y="2" width="12" height="12" rx="1" />
              </svg>
              Durdur
            </button>
          )}

          {transcript && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3.5 font-medium text-zinc-700 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.87 12.18A2 2 0 0116.14 21H7.86a2 2 0 01-1.99-1.82L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Temizle
            </button>
          )}
        </div>

        {errorMsg && <ErrorBanner message={errorMsg} />}

        {/* Metin kutusu */}
        <div className="w-full space-y-3">
          <div className="relative min-h-[200px] w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-inner dark:border-zinc-800 dark:bg-zinc-900/60">
            {transcript ? (
              <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                {transcript}
              </p>
            ) : (
              <p className="font-mono text-sm leading-relaxed text-zinc-400 dark:text-zinc-600">
                {isListening
                  ? 'Konuşmaya başlayın... metin anlık olarak burada görünecek.'
                  : 'Konuşulanları yazıya dökmeye başlamak için "Başlat" butonuna tıklayın ve konuşun.'}
              </p>
            )}
            {isListening && transcript && (
              <span className="pointer-events-none absolute right-4 bottom-3 inline-block h-4 w-2 animate-pulse rounded-sm bg-red-500" />
            )}
          </div>

          {transcript && (
            <button
              type="button"
              onClick={handleCopy}
              disabled={copied}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-medium shadow-lg transition-all active:scale-[0.99] disabled:opacity-80 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-600 text-white hover:bg-emerald-500'
              }`}
            >
              {copied ? (
                <>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Kopyalandı!
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M16 5h2a2 2 0 012 2v12a2 2 0 01-2 2H8m6-12h4m-4 4h4"
                    />
                  </svg>
                  Metni Kopyala
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </ConverterShell>
  );
}