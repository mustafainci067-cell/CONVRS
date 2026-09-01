'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ConverterShell, ConverterHeading, ErrorBanner } from './ConverterShell';

enum RecorderState {
  IDLE = 'idle',
  RECORDING = 'recording',
  PAUSED = 'paused',
  FINISHED = 'finished',
}

// Deterministik ses-seviyesi barlari — Math.random yok, her render'da ayni kalir
// (React purity kurali). Gorunum "canli" hissettirmek icin CSS animasyonu kullanilir.
const LEVEL_BARS = Array.from({ length: 28 }, (_, i) => ({
  height: 6 + ((i * 37) % 14),
  delay: `${(i % 5) * 0.08}s`,
  duration: `${0.45 + (i % 7) * 0.06}s`,
}));

export default function VoiceRecorder() {
  const [state, setState] = useState<RecorderState>(RecorderState.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [recordingMime, setRecordingMime] = useState<string>('audio/webm');
  const [duration, setDuration] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const baseDurationRef = useRef(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (recordingUrl) URL.revokeObjectURL(recordingUrl);
    };
  }, [recordingUrl]);

  const startTimer = () => {
    // baseDurationRef, duraklatma-öncesi saniyeyi tutar; boylece yeniden baslatmada
    // dogru zamandan devam edilir ve kapanan (stale) state kapana kalmaz.
    const base = baseDurationRef.current;
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setDuration(base + Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStart = useCallback(async () => {
    setErrorMsg(null);
    setRecordingUrl(null);
    setDuration(0);
    baseDurationRef.current = 0;
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Tarayici destegine gore MIME turu sec
      const mimeTypes = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
      const supportedMime = mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || '';

      const recorder = new MediaRecorder(stream, supportedMime ? { mimeType: supportedMime } : undefined);
      mediaRecorderRef.current = recorder;
      setRecordingMime(recorder.mimeType || 'audio/webm');

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        if (recordingUrl) URL.revokeObjectURL(recordingUrl);
        setRecordingUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      };

      recorder.start(250); // 250ms parçalar halinde topla
      setState(RecorderState.RECORDING);
      startTimer();
    } catch (err) {
      console.error('Mic error:', err);
      setErrorMsg(
        'Mikrofon erişimi reddedildi veya kullanılamıyor. Lütfen tarayıcı ayarlarından mikrofon iznini verin.'
      );
    }
  }, [recordingUrl]);

  const handlePause = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state !== 'recording') return;
    recorder.pause();
    // Duraklatma anindaki gecen sureyi sakla ki devam edince oradan sursun
    baseDurationRef.current = duration;
    stopTimer();
    setState(RecorderState.PAUSED);
  };

  const handleResume = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state !== 'paused') return;
    recorder.resume();
    setState(RecorderState.RECORDING);
    startTimer();
  };

  const handleStop = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;
    if (recorder.state === 'recording' || recorder.state === 'paused') {
      recorder.stop();
    }
    stopTimer();
    setState(RecorderState.FINISHED);
  };

  const handleReset = () => {
    if (recordingUrl) URL.revokeObjectURL(recordingUrl);
    setRecordingUrl(null);
    setState(RecorderState.IDLE);
    setDuration(0);
    baseDurationRef.current = 0;
    setErrorMsg(null);
  };

  const isRecording = state === RecorderState.RECORDING;
  const isPaused = state === RecorderState.PAUSED;
  const isActive = isRecording || isPaused;

  // Dosya uzantisi: webm->webm, mp4->m4a, ogg->ogg
  const extension = recordingMime.includes('mp4')
    ? 'm4a'
    : recordingMime.includes('ogg')
      ? 'ogg'
      : 'webm';
  const downloadName = `kayit-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.${extension}`;

  const recorderControls = (
    <div className="flex w-full items-center justify-center gap-4">
      {!isActive && state !== RecorderState.FINISHED && (
        <button
          type="button"
          onClick={handleStart}
          className="flex items-center gap-2 rounded-full bg-red-600 px-8 py-3 font-medium text-white shadow-lg shadow-red-600/25 transition-all hover:bg-red-500 active:scale-95 disabled:opacity-50"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="6" />
          </svg>
          Başla
        </button>
      )}

      {isRecording && (
        <button
          type="button"
          onClick={handlePause}
          className="flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3 font-medium text-white shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-400 active:scale-95"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
            <rect x="3" y="3" width="4" height="10" rx="1" />
            <rect x="9" y="3" width="4" height="10" rx="1" />
          </svg>
          Duraklat
        </button>
      )}

      {isPaused && (
        <button
          type="button"
          onClick={handleResume}
          className="flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3 font-medium text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-500 active:scale-95"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.5 3l9 5-9 5V3z" />
          </svg>
          Devam Et
        </button>
      )}

      {isActive && (
        <button
          type="button"
          onClick={handleStop}
          className="flex items-center gap-2 rounded-full bg-zinc-800 px-6 py-3 font-medium text-white shadow-lg transition-all hover:bg-zinc-700 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
            <rect x="2" y="2" width="12" height="12" rx="1" />
          </svg>
          Bitir
        </button>
      )}

      {state === RecorderState.FINISHED && (
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 rounded-full border border-zinc-300 px-8 py-3 font-medium text-zinc-700 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v6h6M20 20v-6h-6M5.6 14a8 8 0 101.4-6.5L4 10"
            />
          </svg>
          Yeni Kayıt
        </button>
      )}
    </div>
  );

  return (
    <ConverterShell from="Mikrofon" to="Ses Dosyası">
      <ConverterHeading
        title="Online Ses Kaydedici"
        description="Tarayıcınızdaki mikrofonu kullanarak ses kaydedin. Başlat, duraklat, devam et ve bitir — hiçbir veri cihazınızdan çıkmaz."
      />

      <div className="flex w-full flex-col items-center gap-6">
        {/* Kayıt gösterge paneli */}
        <div className="flex w-full flex-col items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-100/50 p-8 dark:border-zinc-800/60 dark:bg-zinc-900/40">
          {/* Seviye göstergesi */}
          <div className="flex h-10 items-center gap-1.5">
            {LEVEL_BARS.map((bar, i) => (
              <span
                key={i}
                className={
                  isRecording
                    ? 'w-1.5 rounded-full bg-red-500/70'
                    : 'h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700'
                }
                style={
                  isRecording
                    ? {
                        height: `${bar.height}px`,
                        animation: `pulse ${bar.duration} ease-in-out ${bar.delay} infinite`,
                      }
                    : undefined
                }
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            {(isRecording || isPaused) && (
              <span
                className={`h-3 w-3 rounded-full ${
                  isRecording
                    ? 'animate-pulse bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]'
                    : 'bg-amber-400'
                }`}
              />
            )}
            <span className="font-mono text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
              {formatTime(duration)}
            </span>
          </div>

          <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
            {isRecording
              ? '● Kayıt yapılıyor...'
              : isPaused
                ? 'II Duraklatıldı'
                : state === RecorderState.FINISHED
                  ? 'Kayıt tamamlandı'
                  : 'Hazır — Başlamak için tıklayın'}
          </p>
        </div>

        {recorderControls}

        {errorMsg && <ErrorBanner message={errorMsg} />}

        {state === RecorderState.FINISHED && recordingUrl && (
          <div className="flex w-full flex-col gap-4">
            <audio controls src={recordingUrl} className="w-full rounded-xl" />

            <div className="flex w-full items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/30 dark:bg-emerald-950/30">
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Recording Complete
              </span>
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                ● Ready
              </span>
            </div>

            <a
              href={recordingUrl}
              download={downloadName}
              className="w-full rounded-xl bg-emerald-600 py-3.5 text-center font-medium text-zinc-50 shadow-lg transition-all hover:bg-emerald-500"
            >
              Ses Kaydını İndir ({extension.toUpperCase()})
            </a>
          </div>
        )}
      </div>
    </ConverterShell>
  );
}