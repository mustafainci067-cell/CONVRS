'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useLocale } from 'next-intl';
import { ConverterShell, ConverterHeading, ErrorBanner } from './ConverterShell';

const subscribeNoop = () => () => {};

type UiLocale = 'en' | 'tr' | 'de' | 'es';
type EngineMode = 'speech' | 'whisper';

type UiStrings = {
  fromLabel: string;
  toLabel: string;
  modeLabel: string;
  modeLive: string;
  modeWhisper: string;
  modeAutoNote: string;
  statusReady: string;
  statusListening: string;
  statusRecording: string;
  statusLoadingModel: (pct: number) => string;
  statusTranscribing: string;
  langLabel: string;
  autoLang: string;
  btnStart: string;
  btnStop: string;
  btnStopAndTranscribe: string;
  btnClear: string;
  btnCopy: string;
  btnCopied: string;
  btnSwitchWhisper: string;
  placeholderListening: string;
  placeholderRecording: string;
  placeholderTranscribing: string;
  placeholderIdleLive: string;
  placeholderIdleWhisper: string;
  whisperHint: string;
  errHttps: string;
  errNotAllowed: string;
  errAudioCapture: string;
  errNetwork: string;
  errLangUnsupported: string;
  errGeneric: (code: string) => string;
  errStartFailed: string;
  errTimeout: string;
  errCopyFailed: string;
  errMicNotFound: string;
  errMicInUse: string;
  errWhisperFailed: (msg: string) => string;
  errNoAudio: string;
};

const UI_TEXT: Record<UiLocale, UiStrings> = {
  en: {
    fromLabel: 'Microphone',
    toLabel: 'Text',
    modeLabel: 'Engine',
    modeLive: 'Live (Web Speech)',
    modeWhisper: 'Offline AI (Whisper)',
    modeAutoNote:
      'Opera, Brave, and Firefox do not include a built-in speech server, so Offline AI (Whisper) was selected automatically.',
    statusReady: 'Ready',
    statusListening: 'Listening...',
    statusRecording: 'Recording...',
    statusLoadingModel: (pct) => `Loading AI model (${pct}%)...`,
    statusTranscribing: 'Transcribing audio...',
    langLabel: 'Spoken Language',
    autoLang: 'Auto-detect',
    btnStart: 'Start',
    btnStop: 'Stop',
    btnStopAndTranscribe: 'Stop & Transcribe',
    btnClear: 'Clear',
    btnCopy: 'Copy Text',
    btnCopied: 'Copied!',
    btnSwitchWhisper: 'Switch to Offline AI (Whisper)',
    placeholderListening: 'Start speaking... your words will appear here live.',
    placeholderRecording: 'Recording audio... click "Stop & Transcribe" when you finish speaking.',
    placeholderTranscribing: 'Processing your speech inside the browser...',
    placeholderIdleLive: 'Click "Start" and speak to transcribe your voice in real time.',
    placeholderIdleWhisper:
      'Click "Start" to record, then click "Stop & Transcribe". Runs 100% locally in your browser.',
    whisperHint:
      'Runs 100% inside your browser (works in Opera, Brave, Firefox, Chrome & Edge). First run downloads the ~40 MB Whisper AI model once and caches it.',
    errHttps: 'Microphone access requires a secure HTTPS connection.',
    errNotAllowed:
      'Microphone permission was denied. Allow microphone access from the address bar lock icon and try again.',
    errAudioCapture:
      'Could not capture microphone audio. Make sure a microphone is connected and not in use by another app.',
    errNetwork:
      'Speech service connection failed (network error). Opera/Brave block cloud speech servers — switch to Offline AI (Whisper) below.',
    errLangUnsupported: 'The selected language is not supported in this mode. Please choose another language.',
    errGeneric: (code) => `Speech recognition error: ${code}`,
    errStartFailed: 'Could not start speech recognition. Please try again.',
    errTimeout:
      'Speech recognition service did not respond. Try switching to Offline AI (Whisper) mode below.',
    errCopyFailed: 'Could not copy text. Please select and copy manually.',
    errMicNotFound: 'No microphone was found. Connect a microphone and try again.',
    errMicInUse: 'The microphone is currently used by another application.',
    errWhisperFailed: (msg) => `Whisper AI transcription failed: ${msg}`,
    errNoAudio: 'Recording was too short or silent. Please speak a bit longer and try again.',
  },
  tr: {
    fromLabel: 'Mikrofon',
    toLabel: 'Metin',
    modeLabel: 'Motor',
    modeLive: 'Canlı (Web Speech)',
    modeWhisper: 'Çevrimdışı AI (Whisper)',
    modeAutoNote:
      'Opera, Brave ve Firefox yerleşik konuşma servisi sunmadığı için Çevrimdışı AI (Whisper) modu otomatik seçildi.',
    statusReady: 'Hazır',
    statusListening: 'Dinleniyor...',
    statusRecording: 'Kaydediliyor...',
    statusLoadingModel: (pct) => `AI modeli yükleniyor (%${pct})...`,
    statusTranscribing: 'Metne çevriliyor...',
    langLabel: 'Konuşma Dili',
    autoLang: 'Otomatik algıla',
    btnStart: 'Başlat',
    btnStop: 'Durdur',
    btnStopAndTranscribe: 'Durdur ve Çevir',
    btnClear: 'Temizle',
    btnCopy: 'Metni Kopyala',
    btnCopied: 'Kopyalandı!',
    btnSwitchWhisper: 'Çevrimdışı AI (Whisper) Moduna Geç',
    placeholderListening: 'Konuşmaya başlayın... metin anlık olarak burada görünecek.',
    placeholderRecording: 'Ses kaydediliyor... konuşmanız bitince "Durdur ve Çevir" butonuna tıklayın.',
    placeholderTranscribing: 'Konuşmanız tarayıcınızın içinde yazıya dökülüyor...',
    placeholderIdleLive: 'Konuşulanları anlık yazıya dökmek için "Başlat" butonuna tıklayın ve konuşun.',
    placeholderIdleWhisper:
      'Kaydetmek için "Başlat", bitirince "Durdur ve Çevir" butonuna tıklayın. %100 tarayıcınızda çalışır.',
    whisperHint:
      'Opera, Brave, Firefox, Chrome ve Edge dahil tüm tarayıcılarda %100 cihaz içi çalışır. İlk kullanımda ~40 MB Whisper modeli bir kez indirilir ve önbelleğe alınır.',
    errHttps: 'Mikrofon erişimi güvenli bağlantı (HTTPS) gerektirir.',
    errNotAllowed:
      'Mikrofon izni reddedildi. Adres çubuğundaki kilit simgesinden mikrofon iznini verip tekrar deneyin.',
    errAudioCapture:
      'Mikrofon yakalanamadı. Bir mikrofonun bağlı olduğundan ve başka bir uygulama tarafından kilitlenmediğinden emin olun.',
    errNetwork:
      'Konuşma tanıma servisine bağlanılamadı (ağ hatası). Opera/Brave gibi tarayıcılarda aşağıdaki Çevrimdışı AI (Whisper) modunu kullanın.',
    errLangUnsupported: 'Seçilen konuşma dili bu modda desteklenmiyor. Lütfen farklı bir dil seçin.',
    errGeneric: (code) => `Konuşma tanıma hatası: ${code}`,
    errStartFailed: 'Konuşma tanıma başlatılamadı. Lütfen tekrar deneyin.',
    errTimeout:
      'Konuşma tanıma servisi yanıt vermedi. Aşağıdaki butonla Çevrimdışı AI (Whisper) moduna geçebilirsiniz.',
    errCopyFailed: 'Metin kopyalanamadı. Lütfen manuel seçip kopyalayın.',
    errMicNotFound: 'Hiçbir mikrofon bulunamadı. Bir mikrofon bağlayıp tekrar deneyin.',
    errMicInUse: 'Mikrofon şu anda başka bir uygulama tarafından kullanılıyor.',
    errWhisperFailed: (msg) => `Whisper AI çözümleme hatası: ${msg}`,
    errNoAudio: 'Kayıt çok kısa veya sessizdi. Lütfen biraz daha uzun konuşup tekrar deneyin.',
  },
  de: {
    fromLabel: 'Mikrofon',
    toLabel: 'Text',
    modeLabel: 'Engine',
    modeLive: 'Live (Web Speech)',
    modeWhisper: 'Offline-KI (Whisper)',
    modeAutoNote:
      'Opera, Brave und Firefox bieten keinen integrierten Sprachserver, daher wurde Offline-KI (Whisper) automatisch gewählt.',
    statusReady: 'Bereit',
    statusListening: 'Hört zu...',
    statusRecording: 'Aufnahme...',
    statusLoadingModel: (pct) => `KI-Modell wird geladen (${pct} %)...`,
    statusTranscribing: 'Wird transkribiert...',
    langLabel: 'Gesprochene Sprache',
    autoLang: 'Automatisch erkennen',
    btnStart: 'Starten',
    btnStop: 'Stoppen',
    btnStopAndTranscribe: 'Stoppen & Transkribieren',
    btnClear: 'Leeren',
    btnCopy: 'Text kopieren',
    btnCopied: 'Kopiert!',
    btnSwitchWhisper: 'Zu Offline-KI (Whisper) wechseln',
    placeholderListening: 'Sprechen Sie los... Ihr Text erscheint hier in Echtzeit.',
    placeholderRecording: 'Aufnahme läuft... klicken Sie nach dem Sprechen auf „Stoppen & Transkribieren“.',
    placeholderTranscribing: 'Ihre Sprache wird lokal im Browser verarbeitet...',
    placeholderIdleLive: 'Klicken Sie auf „Starten“ und sprechen Sie, um Sprache live in Text umzuwandeln.',
    placeholderIdleWhisper:
      'Klicken Sie auf „Starten“ zum Aufnehmen und danach auf „Stoppen & Transkribieren“. Läuft zu 100 % im Browser.',
    whisperHint:
      'Läuft zu 100 % im Browser (Opera, Brave, Firefox, Chrome & Edge). Beim ersten Start wird das ~40 MB große Whisper-Modell einmalig geladen und zwischengespeichert.',
    errHttps: 'Der Mikrofonzugriff erfordert eine sichere HTTPS-Verbindung.',
    errNotAllowed:
      'Mikrofonberechtigung verweigert. Erlauben Sie den Zugriff über das Schloss-Symbol in der Adressleiste.',
    errAudioCapture:
      'Kein Mikrofonsignal erfasst. Prüfen Sie, ob ein Mikrofon angeschlossen und nicht von einer anderen App belegt ist.',
    errNetwork:
      'Sprachdienst nicht erreichbar (Netzwerkfehler). Wechseln Sie unten in den Offline-KI-Modus (Whisper).',
    errLangUnsupported: 'Die gewählte Sprache wird in diesem Modus nicht unterstützt.',
    errGeneric: (code) => `Spracherkennungsfehler: ${code}`,
    errStartFailed: 'Spracherkennung konnte nicht gestartet werden. Bitte erneut versuchen.',
    errTimeout:
      'Der Sprachdienst hat nicht geantwortet. Wechseln Sie unten zu Offline-KI (Whisper).',
    errCopyFailed: 'Text konnte nicht kopiert werden. Bitte manuell kopieren.',
    errMicNotFound: 'Kein Mikrofon gefunden. Schließen Sie ein Mikrofon an und versuchen Sie es erneut.',
    errMicInUse: 'Das Mikrofon wird derzeit von einer anderen Anwendung verwendet.',
    errWhisperFailed: (msg) => `Whisper-KI-Fehler: ${msg}`,
    errNoAudio: 'Die Aufnahme war zu kurz oder stumm. Bitte sprechen Sie etwas länger.',
  },
  es: {
    fromLabel: 'Micrófono',
    toLabel: 'Texto',
    modeLabel: 'Motor',
    modeLive: 'En vivo (Web Speech)',
    modeWhisper: 'IA sin conexión (Whisper)',
    modeAutoNote:
      'Opera, Brave y Firefox no incluyen servidor de voz integrado, por lo que se seleccionó IA sin conexión (Whisper) automáticamente.',
    statusReady: 'Listo',
    statusListening: 'Escuchando...',
    statusRecording: 'Grabando...',
    statusLoadingModel: (pct) => `Cargando modelo IA (${pct}%)...`,
    statusTranscribing: 'Transcribiendo audio...',
    langLabel: 'Idioma hablado',
    autoLang: 'Detectar automáticamente',
    btnStart: 'Iniciar',
    btnStop: 'Detener',
    btnStopAndTranscribe: 'Detener y transcribir',
    btnClear: 'Limpiar',
    btnCopy: 'Copiar texto',
    btnCopied: '¡Copiado!',
    btnSwitchWhisper: 'Cambiar a IA sin conexión (Whisper)',
    placeholderListening: 'Empieza a hablar... el texto aparecerá aquí en tiempo real.',
    placeholderRecording: 'Grabando audio... pulsa «Detener y transcribir» al terminar de hablar.',
    placeholderTranscribing: 'Procesando tu voz localmente en el navegador...',
    placeholderIdleLive: 'Pulsa «Iniciar» y habla para transcribir tu voz al instante.',
    placeholderIdleWhisper:
      'Pulsa «Iniciar» para grabar y luego «Detener y transcribir». Funciona 100 % en tu navegador.',
    whisperHint:
      'Funciona 100 % en tu navegador (Opera, Brave, Firefox, Chrome y Edge). La primera vez descarga el modelo Whisper (~40 MB) una sola vez y lo guarda en caché.',
    errHttps: 'El acceso al micrófono requiere una conexión segura HTTPS.',
    errNotAllowed:
      'Permiso de micrófono denegado. Permite el acceso desde el candado en la barra de direcciones.',
    errAudioCapture:
      'No se pudo capturar el micrófono. Comprueba que esté conectado y libre.',
    errNetwork:
      'Error de red con el servicio de voz. Cambia al modo IA sin conexión (Whisper) abajo.',
    errLangUnsupported: 'El idioma seleccionado no es compatible en este modo.',
    errGeneric: (code) => `Error de reconocimiento de voz: ${code}`,
    errStartFailed: 'No se pudo iniciar el reconocimiento de voz. Inténtalo de nuevo.',
    errTimeout:
      'El servicio de voz no respondió. Prueba a cambiar al modo IA sin conexión (Whisper) abajo.',
    errCopyFailed: 'No se pudo copiar el texto. Cópialo manualmente.',
    errMicNotFound: 'No se encontró ningún micrófono. Conecta uno e inténtalo de nuevo.',
    errMicInUse: 'Otra aplicación está usando el micrófono en este momento.',
    errWhisperFailed: (msg) => `Error de Whisper IA: ${msg}`,
    errNoAudio: 'La grabación fue demasiado corta o silenciosa. Habla un poco más e inténtalo de nuevo.',
  },
};

function getUiLocale(locale: string): UiLocale {
  return (['en', 'tr', 'de', 'es'].includes(locale) ? locale : 'en') as UiLocale;
}

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

// Opera, Opera GX, Brave, Vivaldi veya SpeechRecognition olmayan tarayicilarda
// yerleşik bulut konusma servisi bulunmadigi icin Whisper AI otomatik secilir.
function shouldPreferWhisper(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  if (!getSpeechRecognition()) return true;
  const ua = navigator.userAgent || '';
  const nav = navigator as unknown as { brave?: unknown };
  if (/OPR\/|Opera|Vivaldi/i.test(ua) || Boolean(nav.brave)) {
    return true;
  }
  return false;
}

// Web Speech API, bölgeli (BCP-47) etiketleri bekler.
const LANG_ALIASES: Record<string, string> = {
  ar: 'ar-SA',
  de: 'de-DE',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  it: 'it-IT',
  ja: 'ja-JP',
  ko: 'ko-KR',
  nl: 'nl-NL',
  pl: 'pl-PL',
  pt: 'pt-BR',
  ru: 'ru-RU',
  tr: 'tr-TR',
  zh: 'zh-CN',
};

function normalizeLang(lang: string): string {
  const code = lang.trim().toLowerCase();
  return LANG_ALIASES[code] ?? lang;
}

const LANG_OPTIONS = [
  { value: 'auto', label: null, whisper: undefined },
  { value: 'tr-TR', label: 'Türkçe (Türkiye)', whisper: 'turkish' },
  { value: 'en-US', label: 'English (US)', whisper: 'english' },
  { value: 'en-GB', label: 'English (UK)', whisper: 'english' },
  { value: 'de-DE', label: 'Deutsch (Deutschland)', whisper: 'german' },
  { value: 'es-ES', label: 'Español (España)', whisper: 'spanish' },
  { value: 'es-MX', label: 'Español (México)', whisper: 'spanish' },
  { value: 'fr-FR', label: 'Français (France)', whisper: 'french' },
  { value: 'it-IT', label: 'Italiano (Italia)', whisper: 'italian' },
  { value: 'pt-BR', label: 'Português (Brasil)', whisper: 'portuguese' },
  { value: 'nl-NL', label: 'Nederlands (Nederland)', whisper: 'dutch' },
  { value: 'pl-PL', label: 'Polski (Polska)', whisper: 'polish' },
  { value: 'ru-RU', label: 'Русский (Россия)', whisper: 'russian' },
  { value: 'ja-JP', label: '日本語 (日本)', whisper: 'japanese' },
  { value: 'ko-KR', label: '한국어 (대한민국)', whisper: 'korean' },
  { value: 'zh-CN', label: '中文（简体）', whisper: 'chinese' },
  { value: 'ar-SA', label: 'العربية (السعودية)', whisper: 'arabic' },
] as const;

type LangOptionValue = (typeof LANG_OPTIONS)[number]['value'];

function getWhisperLanguage(selected: LangOptionValue): string | undefined {
  const found = LANG_OPTIONS.find((o) => o.value === selected);
  return found?.whisper;
}

// Kaydedilen ses blob'unu Whisper'in bekledigi 16kHz mono Float32Array'e cevirir.
async function decodeBlobTo16kMono(blob: Blob): Promise<Float32Array> {
  const arrayBuffer = await blob.arrayBuffer();
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioCtx();
  try {
    const decoded = await ctx.decodeAudioData(arrayBuffer);
    const targetRate = 16000;
    const targetLength = Math.max(1, Math.ceil(decoded.duration * targetRate));
    const offline = new OfflineAudioContext(1, targetLength, targetRate);
    const source = offline.createBufferSource();
    source.buffer = decoded;
    source.connect(offline.destination);
    source.start(0);
    const rendered = await offline.startRendering();
    return rendered.getChannelData(0).slice();
  } finally {
    await ctx.close();
  }
}

function formatSeconds(sec: number): string {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function SpeechToText() {
  const locale = getUiLocale(useLocale());
  const ui = UI_TEXT[locale];

  // Istemci tarafinda tarayici kabiliyetlerini hidrasyon uyusmazligi olmadan oku.
  const hasWebSpeech = useSyncExternalStore(
    subscribeNoop,
    () => Boolean(getSpeechRecognition()),
    () => true
  );
  const autoPreferWhisper = useSyncExternalStore(
    subscribeNoop,
    () => shouldPreferWhisper(),
    () => false
  );

  const [manualMode, setManualMode] = useState<EngineMode | null>(null);
  const mode: EngineMode = manualMode ?? (autoPreferWhisper ? 'whisper' : 'speech');

  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [modelProgress, setModelProgress] = useState<number | null>(null);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [suggestWhisper, setSuggestWhisper] = useState(false);
  const [copied, setCopied] = useState(false);

  const [selectedLang, setSelectedLang] = useState<LangOptionValue>('auto');
  const selectedLangRef = useRef<LangOptionValue>(selectedLang);
  useEffect(() => {
    selectedLangRef.current = selectedLang;
  }, [selectedLang]);

  const uiRef = useRef(ui);
  useEffect(() => {
    uiRef.current = ui;
  }, [ui]);

  // Web Speech API ref'leri
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const finalTranscriptRef = useRef('');
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didStartRef = useRef(false);
  const stoppingRef = useRef(false);
  const mountedRef = useRef(true);
  const latestSpawnRef = useRef<() => void>(() => {});
  const finalizedUpToRef = useRef(-1);

  // Whisper (MediaRecorder + Worker) ref'leri
  const workerRef = useRef<Worker | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (watchdogRef.current) {
      clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
  }, []);

  const stopMediaStream = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stoppingRef.current = true;
      clearTimers();
      const rec = recognitionRef.current;
      if (rec) {
        rec.onstart = rec.onend = rec.onerror = rec.onresult = null;
        rec.abort();
        recognitionRef.current = null;
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.ondataavailable = null;
        mediaRecorderRef.current.onstop = null;
        mediaRecorderRef.current.stop();
      }
      stopMediaStream();
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [clearTimers, stopMediaStream]);

  const fullTranscript = [finalTranscript, interimTranscript].filter(Boolean).join(' ').trim();

  // Whisper Web Worker'i tembel (lazy) olustur — public/ altindan saf ES Module Worker
  // olarak yuklenir; boylece Turbopack classic-worker sarmali ve blob: dynamic import hatasi olusmaz.
  const ensureWorker = useCallback(() => {
    if (workerRef.current) return workerRef.current;
    const worker = new Worker('/whisper-worker.mjs', {
      type: 'module',
    });
    worker.onmessage = (
      event: MessageEvent<{
        type: 'progress' | 'ready' | 'transcribing' | 'result' | 'error';
        progress?: number;
        text?: string;
        message?: string;
      }>
    ) => {
      if (!mountedRef.current) return;
      const msg = event.data;
      if (msg.type === 'progress') {
        setModelProgress(msg.progress ?? 0);
      } else if (msg.type === 'ready' || msg.type === 'transcribing') {
        setModelProgress(null);
      } else if (msg.type === 'result') {
        setIsTranscribing(false);
        setModelProgress(null);
        const text = (msg.text ?? '').trim();
        if (text) {
          const next = finalTranscriptRef.current
            ? `${finalTranscriptRef.current} ${text}`
            : text;
          finalTranscriptRef.current = next;
          setFinalTranscript(next);
        } else {
          setErrorMsg(uiRef.current.errNoAudio);
        }
      } else if (msg.type === 'error') {
        setIsTranscribing(false);
        setModelProgress(null);
        setErrorMsg(uiRef.current.errWhisperFailed(msg.message ?? 'unknown'));
      }
    };
    worker.onerror = (err) => {
      if (!mountedRef.current) return;
      setIsTranscribing(false);
      setModelProgress(null);
      setErrorMsg(uiRef.current.errWhisperFailed(err.message || 'worker error'));
    };
    workerRef.current = worker;
    return worker;
  }, []);

  // ── Web Speech API (Canlı Mod) ─────────────────────────────────────────────
  const spawnRecognition = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR || !mountedRef.current) return;

    clearTimers();
    const prev = recognitionRef.current;
    if (prev) {
      prev.onstart = prev.onend = prev.onerror = prev.onresult = null;
      prev.abort();
    }

    didStartRef.current = false;
    finalizedUpToRef.current = -1;

    const recognition = new SR();
    recognitionRef.current = recognition;

    const rawLang =
      selectedLangRef.current === 'auto'
        ? typeof navigator !== 'undefined'
          ? navigator.language || 'en-US'
          : 'en-US'
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
      setInterimTranscript('');

      if (stoppingRef.current) {
        recognitionRef.current = null;
        setIsListening(false);
        return;
      }

      recognitionRef.current = null;
      restartTimerRef.current = setTimeout(() => {
        restartTimerRef.current = null;
        if (!stoppingRef.current && mountedRef.current) {
          latestSpawnRef.current();
        }
      }, 300);
    };

    recognition.onerror = (event) => {
      if (recognitionRef.current !== recognition) return;
      clearTimers();
      setInterimTranscript('');

      if (event.error === 'no-speech' || event.error === 'aborted') {
        return;
      }

      stoppingRef.current = true;
      recognitionRef.current = null;
      setIsListening(false);

      const t = uiRef.current;
      switch (event.error) {
        case 'not-allowed':
        case 'service-not-allowed':
          setErrorMsg(t.errNotAllowed);
          break;
        case 'audio-capture':
          setErrorMsg(t.errAudioCapture);
          break;
        case 'network':
          setErrorMsg(t.errNetwork);
          setSuggestWhisper(true);
          break;
        case 'language-not-supported':
          setErrorMsg(t.errLangUnsupported);
          break;
        default:
          setErrorMsg(t.errGeneric(event.error));
          break;
      }
    };

    recognition.onresult = (event) => {
      if (recognitionRef.current !== recognition) return;
      let appendedFinal = '';
      let liveInterim = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const piece = result[0]?.transcript?.trim() ?? '';
        if (!piece) continue;

        if (result.isFinal) {
          if (i > finalizedUpToRef.current) {
            appendedFinal += (appendedFinal ? ' ' : '') + piece;
            finalizedUpToRef.current = i;
          }
        } else {
          liveInterim += (liveInterim ? ' ' : '') + piece;
        }
      }

      if (appendedFinal) {
        const nextFinal = finalTranscriptRef.current
          ? `${finalTranscriptRef.current} ${appendedFinal}`
          : appendedFinal;
        finalTranscriptRef.current = nextFinal;
        setFinalTranscript(nextFinal);
      }
      setInterimTranscript(liveInterim);
    };

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setIsListening(false);
      setErrorMsg(uiRef.current.errStartFailed);
      return;
    }

    watchdogRef.current = setTimeout(() => {
      if (recognitionRef.current !== recognition) return;
      if (!didStartRef.current && !stoppingRef.current) {
        stoppingRef.current = true;
        recognition.abort();
        recognitionRef.current = null;
        setIsListening(false);
        setErrorMsg(uiRef.current.errTimeout);
        setSuggestWhisper(true);
      }
    }, 8000);
  }, [clearTimers]);

  useEffect(() => {
    latestSpawnRef.current = spawnRecognition;
  }, [spawnRecognition]);

  // ── Whisper AI (Çevrimdışı / Tüm Tarayıcılar Modu) ─────────────────────────
  const startWhisperRecording = useCallback(async () => {
    const t = uiRef.current;
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setErrorMsg(t.errHttps);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mountedRef.current) {
        stream.getTracks().forEach((tr) => tr.stop());
        return;
      }

      mediaStreamRef.current = stream;
      audioChunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : '';
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        stopMediaStream();
        clearTimers();
        setIsListening(false);

        const chunks = audioChunksRef.current;
        audioChunksRef.current = [];
        if (!mountedRef.current || chunks.length === 0) {
          setErrorMsg(uiRef.current.errNoAudio);
          return;
        }

        setIsTranscribing(true);
        try {
          const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
          const audioData = await decodeBlobTo16kMono(blob);
          if (!mountedRef.current) return;

          if (audioData.length < 1600) {
            setIsTranscribing(false);
            setErrorMsg(uiRef.current.errNoAudio);
            return;
          }

          const worker = ensureWorker();
          const whisperLang = getWhisperLanguage(selectedLangRef.current);
          worker.postMessage(
            { type: 'transcribe', audio: audioData, language: whisperLang },
            [audioData.buffer]
          );
        } catch (err) {
          if (!mountedRef.current) return;
          setIsTranscribing(false);
          setErrorMsg(
            uiRef.current.errWhisperFailed(err instanceof Error ? err.message : String(err))
          );
        }
      };

      // Kullanici konusurken modeli arka planda onceden isit (worker olusur)
      ensureWorker();

      recorder.start(250);
      setRecordSeconds(0);
      setIsListening(true);
      recordTimerRef.current = setInterval(() => {
        setRecordSeconds((s) => s + 1);
      }, 1000);
    } catch (err) {
      stopMediaStream();
      const name = err instanceof DOMException ? err.name : '';
      if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
        setErrorMsg(t.errNotAllowed);
      } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
        setErrorMsg(t.errMicNotFound);
      } else if (name === 'NotReadableError' || name === 'TrackStartError') {
        setErrorMsg(t.errMicInUse);
      } else {
        setErrorMsg(t.errAudioCapture);
      }
    }
  }, [clearTimers, ensureWorker, stopMediaStream]);

  // ── Ortak Kontroller ───────────────────────────────────────────────────────
  const handleStart = useCallback(() => {
    setErrorMsg(null);
    setSuggestWhisper(false);
    setCopied(false);

    if (typeof window !== 'undefined' && !window.isSecureContext) {
      setErrorMsg(uiRef.current.errHttps);
      return;
    }

    if (mode === 'whisper') {
      void startWhisperRecording();
    } else {
      stoppingRef.current = false;
      spawnRecognition();
    }
  }, [mode, spawnRecognition, startWhisperRecording]);

  const handleStop = useCallback(() => {
    clearTimers();
    if (mode === 'whisper') {
      const recorder = mediaRecorderRef.current;
      if (recorder && recorder.state !== 'inactive') {
        recorder.stop();
      } else {
        stopMediaStream();
        setIsListening(false);
      }
    } else {
      stoppingRef.current = true;
      try {
        recognitionRef.current?.stop();
      } catch {
        // zaten durmus olabilir
      }
      setIsListening(false);
    }
  }, [clearTimers, mode, stopMediaStream]);

  const handleClear = useCallback(() => {
    stoppingRef.current = true;
    clearTimers();
    const rec = recognitionRef.current;
    if (rec) {
      rec.onstart = rec.onend = rec.onerror = rec.onresult = null;
      rec.abort();
      recognitionRef.current = null;
    }
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.ondataavailable = null;
      recorder.onstop = null;
      recorder.stop();
    }
    stopMediaStream();
    finalTranscriptRef.current = '';
    setFinalTranscript('');
    setInterimTranscript('');
    setIsListening(false);
    setIsTranscribing(false);
    setModelProgress(null);
    setRecordSeconds(0);
    setErrorMsg(null);
    setSuggestWhisper(false);
    setCopied(false);
  }, [clearTimers, stopMediaStream]);

  const handleCopy = useCallback(async () => {
    if (!fullTranscript) return;
    try {
      await navigator.clipboard.writeText(fullTranscript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setErrorMsg(uiRef.current.errCopyFailed);
    }
  }, [fullTranscript]);

  const switchMode = useCallback(
    (nextMode: EngineMode) => {
      if (isListening) handleStop();
      setErrorMsg(null);
      setSuggestWhisper(false);
      setManualMode(nextMode);
    },
    [handleStop, isListening]
  );

  const statusText = isTranscribing
    ? modelProgress !== null
      ? ui.statusLoadingModel(modelProgress)
      : ui.statusTranscribing
    : isListening
      ? mode === 'whisper'
        ? `${ui.statusRecording} ${formatSeconds(recordSeconds)}`
        : ui.statusListening
      : ui.statusReady;

  return (
    <ConverterShell from={ui.fromLabel} to={ui.toLabel}>
      <ConverterHeading
        title="Speech to Text"
        description="Transcribe your voice directly in your browser."
      />

      <div className="flex w-full flex-col items-center gap-5">
        {/* Durum göstergesi */}
        <div className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-100/50 px-4 py-3 dark:border-zinc-800/60 dark:bg-zinc-900/40">
          <div className="flex items-center gap-2.5">
            <span
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                isListening
                  ? 'animate-pulse bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                  : isTranscribing
                    ? 'animate-pulse bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                    : 'bg-zinc-400 dark:bg-zinc-600'
              }`}
            />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {statusText}
            </span>
          </div>
          <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
            {mode === 'whisper' ? 'Whisper AI (WASM)' : 'Web Speech API'}
          </span>
        </div>

        {/* Motor seçici (Canlı vs Çevrimdışı Whisper AI) */}
        <div className="flex w-full flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-100/50 px-4 py-3 dark:border-zinc-800/60 dark:bg-zinc-900/40">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
              {ui.modeLabel}
            </span>
            <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-0.5 dark:border-zinc-800 dark:bg-zinc-900">
              {hasWebSpeech && (
                <button
                  type="button"
                  disabled={isTranscribing}
                  onClick={() => switchMode('speech')}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    mode === 'speech'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                  }`}
                >
                  {ui.modeLive}
                </button>
              )}
              <button
                type="button"
                disabled={isTranscribing}
                onClick={() => switchMode('whisper')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  mode === 'whisper'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                }`}
              >
                {ui.modeWhisper}
              </button>
            </div>
          </div>
          {autoPreferWhisper && mode === 'whisper' && (
            <p className="text-[11px] leading-relaxed text-emerald-700 dark:text-emerald-400">
              {ui.modeAutoNote}
            </p>
          )}
          {mode === 'whisper' && (
            <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              {ui.whisperHint}
            </p>
          )}
        </div>

        {/* Konuşma dili seçici */}
        <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-100/50 px-4 py-3 dark:border-zinc-800/60 dark:bg-zinc-900/40">
          <label
            htmlFor="speech-voice-lang"
            className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500"
          >
            {ui.langLabel}
          </label>
          <select
            id="speech-voice-lang"
            value={selectedLang}
            disabled={isTranscribing}
            onChange={(e) => {
              if (isListening) handleStop();
              setSelectedLang(e.target.value as LangOptionValue);
            }}
            className="max-w-[65%] rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-sm text-zinc-700 outline-none transition-colors focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:focus:border-emerald-500"
          >
            {LANG_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label ?? ui.autoLang}
              </option>
            ))}
          </select>
        </div>

        {/* Model indirme ilerleme çubuğu (yalnızca ilk Whisper çalıştırmasında) */}
        {isTranscribing && modelProgress !== null && (
          <div className="w-full space-y-1.5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-200"
                style={{ width: `${modelProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Kontroller */}
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          {!isListening ? (
            <button
              type="button"
              disabled={isTranscribing}
              onClick={handleStart}
              className="flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3.5 font-medium text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M12 8v4m0 4h.01M12 3a6 6 0 016 6v4a6 6 0 11-12 0V9a6 6 0 016-6zM5.6 14a10 10 0 0012.8 0"
                />
              </svg>
              {ui.btnStart}
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
              {mode === 'whisper' ? ui.btnStopAndTranscribe : ui.btnStop}
            </button>
          )}

          {fullTranscript && !isTranscribing && (
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
              {ui.btnClear}
            </button>
          )}
        </div>

        {errorMsg && (
          <div className="flex w-full flex-col items-center gap-2.5">
            <ErrorBanner message={errorMsg} />
            {suggestWhisper && mode === 'speech' && (
              <button
                type="button"
                onClick={() => switchMode('whisper')}
                className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-500/20 dark:text-emerald-300"
              >
                {ui.btnSwitchWhisper}
              </button>
            )}
          </div>
        )}

        {/* Metin kutusu */}
        <div className="w-full space-y-3">
          <div className="relative min-h-[200px] w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-inner dark:border-zinc-800 dark:bg-zinc-900/60">
            {fullTranscript ? (
              <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                {finalTranscript}
                {interimTranscript && (
                  <span className="text-zinc-400 dark:text-zinc-500">
                    {finalTranscript ? ' ' : ''}
                    {interimTranscript}
                  </span>
                )}
              </p>
            ) : (
              <p className="font-mono text-sm leading-relaxed text-zinc-400 dark:text-zinc-600">
                {isTranscribing
                  ? ui.placeholderTranscribing
                  : isListening
                    ? mode === 'whisper'
                      ? ui.placeholderRecording
                      : ui.placeholderListening
                    : mode === 'whisper'
                      ? ui.placeholderIdleWhisper
                      : ui.placeholderIdleLive}
              </p>
            )}
            {isListening && fullTranscript && (
              <span className="pointer-events-none absolute right-4 bottom-3 inline-block h-4 w-2 animate-pulse rounded-sm bg-red-500" />
            )}
          </div>

          {fullTranscript && (
            <button
              type="button"
              onClick={handleCopy}
              disabled={copied}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-medium text-white shadow-lg transition-all hover:bg-emerald-500 active:scale-[0.99] disabled:opacity-80"
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
                  {ui.btnCopied}
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
                  {ui.btnCopy}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </ConverterShell>
  );
}
