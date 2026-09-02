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

// Web Speech API, bölgeli (BCP-47) etiketleri bekler; generic 'tr' yerine
// 'tr-TR', 'en' yerine 'en-US' gibi eşleştirme sessiz hataların önüne geçer.
const LANG_ALIASES: Record<string, string> = {
  ar: 'ar-SA',
  bn: 'bn-IN',
  cs: 'cs-CZ',
  da: 'da-DK',
  de: 'de-DE',
  el: 'el-GR',
  en: 'en-US',
  es: 'es-ES',
  fa: 'fa-IR',
  fi: 'fi-FI',
  fr: 'fr-FR',
  he: 'he-IL',
  hi: 'hi-IN',
  hu: 'hu-HU',
  id: 'id-ID',
  it: 'it-IT',
  ja: 'ja-JP',
  ko: 'ko-KR',
  ms: 'ms-MY',
  nl: 'nl-NL',
  nb: 'no-NO',
  pl: 'pl-PL',
  pt: 'pt-BR',
  ro: 'ro-RO',
  ru: 'ru-RU',
  sv: 'sv-SE',
  th: 'th-TH',
  tr: 'tr-TR',
  uk: 'uk-UA',
  vi: 'vi-VN',
  zh: 'zh-CN',
};

function normalizeLang(lang: string): string {
  const code = lang.trim().toLowerCase();
  return LANG_ALIASES[code] ?? lang;
}

// getUserMedia hatalarini kullaniciya net ifade eden mesaja cevirir.
function micErrorMessage(err: unknown): string {
  const name = err instanceof DOMException ? err.name : '';
  switch (name) {
    case 'NotAllowedError':
    case 'PermissionDeniedError':
      return 'Mikrofon izni reddedildi. Adres çubuğundaki kilit simgesinden mikrofon iznini verip tekrar deneyin.';
    case 'NotFoundError':
    case 'DevicesNotFoundError':
      return 'Hiçbir mikrofon bulunamadı. Bir mikrofon bağlayıp tekrar deneyin.';
    case 'NotReadableError':
    case 'TrackStartError':
      return 'Mikrofon şu anda başka bir uygulama tarafından kullanılıyor veya kullanılamıyor.';
    case 'SecurityError':
    case 'TypeError':
      return 'Mikrofon erişimi güvenli bir bağlam gerektirir. Lütfen HTTPS üzerinden erişin.';
    case 'OverconstrainedError':
      return 'Mikrofon isteği karşılanamadı. Farklı bir mikrofon seçmeyi deneyin.';
    default:
      return 'Mikrofon açılamadı. Tarayıcı ayarlarından izinleri kontrol edip tekrar deneyin.';
  }
}

// Kullanıcının seçebileceği konuşma dilleri. 'auto' tarayıcının dilini kullanır.
const LANG_OPTIONS = [
  { value: 'auto', label: 'Otomatik (tarayıcı dili)' },
  { value: 'tr-TR', label: 'Türkçe (Türkiye)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'de-DE', label: 'Deutsch (Deutschland)' },
  { value: 'es-ES', label: 'Español (España)' },
  { value: 'es-MX', label: 'Español (México)' },
  { value: 'fr-FR', label: 'Français (France)' },
  { value: 'it-IT', label: 'Italiano (Italia)' },
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'nl-NL', label: 'Nederlands (Nederland)' },
  { value: 'pl-PL', label: 'Polski (Polska)' },
  { value: 'ru-RU', label: 'Русский (Россия)' },
  { value: 'ja-JP', label: '日本語 (日本)' },
  { value: 'ko-KR', label: '한국어 (대한민국)' },
  { value: 'zh-CN', label: '中文（简体）' },
  { value: 'ar-SA', label: 'العربية (السعودية)' },
] as const;

export default function SpeechToText() {
  // Tarayıcı desteğini render zamanında bir kez hesapla (effect içinde setState yok)
  const [isSupported] = useState(() => Boolean(getSpeechRecognition()));
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedLang, setSelectedLang] =
    useState<'auto' | (typeof LANG_OPTIONS)[number]['value']>('auto');
  const selectedLangRef = useRef(selectedLang);
  useEffect(() => {
    selectedLangRef.current = selectedLang;
  }, [selectedLang]);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const transcriptRef = useRef('');
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didStartRef = useRef(false);
  const stoppingRef = useRef(false);
  // Otomatik yeniden baslatma (onend) icin en guncel spawn fonksiyonunu tutar.
  const latestSpawnRef = useRef<() => void>(() => {});
  // Chrome, ayni `onresult` olayini (final + interim ayrimiyla) tekrar tekrar
  // atesleyebilir; bu ref, hangi sonucun zaten final olarak islendigini takip
  // ederek ayni metnin 2-3 kez ust uste eklenmesini onler.
  const finalizedUpToRef = useRef(-1);

  useEffect(() => {
    return () => {
      if (watchdogRef.current) clearTimeout(watchdogRef.current);
      recognitionRef.current?.abort();
    };
  }, []);

  const updateTranscript = (text: string) => {
    transcriptRef.current = text;
    setTranscript(text);
  };

  // Yeni bir recognition instance olusturur ve mevcut transcript'e ekleyerek devam eder.
  const spawnRecognition = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR) return;

    const prev = recognitionRef.current;
    if (prev) {
      prev.onstart = prev.onend = prev.onerror = prev.onresult = null;
      prev.abort();
    }
    if (watchdogRef.current) {
      clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }
    didStartRef.current = false;

    const recognition = new SR();
    recognitionRef.current = recognition;

    const rawLang =
      selectedLangRef.current === 'auto'
        ? typeof navigator !== 'undefined'
          ? navigator.language || 'tr-TR'
          : 'tr-TR'
        : selectedLangRef.current;
    recognition.lang = normalizeLang(rawLang);
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      if (recognitionRef.current !== recognition) return;
      didStartRef.current = true;
      if (watchdogRef.current) {
        clearTimeout(watchdogRef.current);
        watchdogRef.current = null;
      }
      setIsListening(true);
    };

    recognition.onend = () => {
      if (recognitionRef.current !== recognition) return;
      if (watchdogRef.current) {
        clearTimeout(watchdogRef.current);
        watchdogRef.current = null;
      }
      // Kullanici "Durdur" tikladiyse temizlik yap, durduralim.
      if (stoppingRef.current) {
        recognitionRef.current = null;
        setIsListening(false);
        return;
      }
      // Beklenmedik sonlanma (mobilde sik gorunur): kisa bekleme ile otomatik
      // yeniden baslat. Mevcut transcript korunur, kaldigi yerden devam eder.
      recognitionRef.current = null;
      setTimeout(() => {
        if (!stoppingRef.current) latestSpawnRef.current();
      }, 300);
    };

    recognition.onerror = (event) => {
      if (recognitionRef.current !== recognition) return;
      if (watchdogRef.current) {
        clearTimeout(watchdogRef.current);
        watchdogRef.current = null;
      }
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        stoppingRef.current = true;
        recognitionRef.current = null;
        setErrorMsg(
          'Mikrofon erişimi reddedildi. Tarayıcı ayarlarından mikrofon iznini verip tekrar deneyin.'
        );
        setIsListening(false);
        return;
      }
      // 'no-speech': Chrome sessizlikte sessizce kapatir; mobilde sik gorunur.
      // Otomatik yeniden baslatma onend tarafindan halledilir.
      // 'aborted': durdurma/tarayici kapama sirasinda normal.
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        setErrorMsg(`Konuşma tanıma hatası: ${event.error}`);
        stoppingRef.current = true;
        recognitionRef.current = null;
        setIsListening(false);
      }
    };

    recognition.onresult = (event) => {
      if (recognitionRef.current !== recognition) return;
      let finalText = transcriptRef.current;
      let interimText = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          const spoken = result[0].transcript;
          // Dedup: ayni cumle daha once eklenmismis mi kontrol et.
          // Bu, hem Chrome'un coklu onresult ateslemesini hem de
          // otomatik yeniden baslatma sirasindaki gecis sorunlarini onler.
          const alreadyIncluded =
            finalText.endsWith(spoken) || finalText.includes(spoken);
          if (!alreadyIncluded) {
            finalText += (finalText ? ' ' : '') + spoken;
          }
          if (i > finalizedUpToRef.current) {
            finalizedUpToRef.current = i;
          }
        } else {
          interimText += result[0].transcript;
        }
      }

      const combined = (finalText + (interimText ? ' ' + interimText : '')).trim();
      updateTranscript(combined);
    };

    recognition.start();

    // 4sn icinde onstart gelmezse Google speech servisi calismiyor olabilir.
    watchdogRef.current = setTimeout(() => {
      if (recognitionRef.current !== recognition) return;
      if (!didStartRef.current && !stoppingRef.current) {
        recognition.abort();
        recognitionRef.current = null;
        setIsListening(false);
        setErrorMsg(
          'Mikrofon açıldı ama konuşma tanıma servisi yanıt vermedi. Sayfayı yenileyip tekrar deneyin; kalıcıysa Chrome veya Edge tarayıcısını kullanın.'
        );
      }
    }, 4000);
  }, []);

  // En guncel spawnRecognition'u ref'e isaret et; onend icindeki
  // yeniden baslatma her zaman en yeni fonksiyonu cagirsin.
  useEffect(() => {
    latestSpawnRef.current = spawnRecognition;
  }, [spawnRecognition]);

  const handleStart = useCallback(async () => {
    setErrorMsg(null);
    setCopied(false);

    // Once mikrofon erisimini onayla.
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      } catch (err) {
        setErrorMsg(micErrorMessage(err));
        setIsListening(false);
        return;
      }
    } else {
      setErrorMsg(
        'Mikrofon erişimi kullanılamıyor. Deployed site (HTTPS) veya localhost üzerinden Chrome/Edge ile erişin.'
      );
      setIsListening(false);
      return;
    }

    stoppingRef.current = false;
    finalizedUpToRef.current = -1;
    spawnRecognition();
  }, [spawnRecognition]);

  const handleStop = useCallback(() => {
    stoppingRef.current = true;
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const handleClear = useCallback(() => {
    stoppingRef.current = true;
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

        {/* Konuşma dili seçici */}
        <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-100/50 px-4 py-3 dark:border-zinc-800/60 dark:bg-zinc-900/40">
          <label
            htmlFor="speech-voice-lang"
            className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500"
          >
            Konuşma Dili
          </label>
          <select
            id="speech-voice-lang"
            value={selectedLang}
            onChange={(e) => {
              if (isListening) handleStop();
              setSelectedLang(e.target.value as typeof selectedLang);
            }}
            className="max-w-[65%] rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-sm text-zinc-700 outline-none transition-colors focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:focus:border-emerald-500"
          >
            {LANG_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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
