'use client';

import { useState } from 'react';
import { ConverterHeading, ConverterShell, ErrorBanner } from './ConverterShell';

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

/** JWT, base64url (RFC 4648) kullanir; atob icin standart base64'e cevir. */
function base64UrlDecode(input: string): string {
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) base64 += '=';
  return atob(base64);
}

/** Header/Payload segmentini decode edip okunakli JSON olarak doner; degilse hata verir. */
function decodeJsonSegment(part: string): string {
  if (!part) throw new Error('Eksik JWT bölümü.');
  let parsed: unknown;
  try {
    parsed = JSON.parse(base64UrlDecode(part));
  } catch {
    throw new Error('Segment geçerli JSON değil.');
  }
  return JSON.stringify(parsed, null, 2);
}

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [decoded, setDecoded] = useState<{
    header: string;
    payload: string;
    signature: string;
  } | null>(null);

  const handleChange = (value: string) => {
    setToken(value);
    const trimmed = value.trim();

    if (!trimmed) {
      setDecoded(null);
      setErrorMsg(null);
      return;
    }

    const parts = trimmed.split('.');
    if (parts.length !== 3) {
      setDecoded(null);
      setErrorMsg(
        'Geçersiz JWT. Token; nokta ile ayrılmış header, payload ve signature bölümlerinden oluşmalı.'
      );
      return;
    }

    try {
      setDecoded({
        header: decodeJsonSegment(parts[0]),
        payload: decodeJsonSegment(parts[1]),
        signature: parts[2],
      });
      setErrorMsg(null);
    } catch {
      setDecoded(null);
      setErrorMsg(
        'JWT çözümlenirken bir hata oluştu. Token geçersiz ya da bozuk olabilir.'
      );
    }
  };

  return (
    <ConverterShell from="JWT" to="Decoded">
      <ConverterHeading
        title="JWT Decoder"
        description="Paste a JWT token and read its Header and Payload as pretty JSON — decoded right in your browser with nothing but split and atob."
      />

      <textarea
        value={token}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Paste your JWT token here..."
        rows={5}
        spellCheck={false}
        className="w-full resize-none rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-4 font-mono text-sm text-zinc-800 shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400 focus:border-fuchsia-400 dark:border-fuchsia-900/50 dark:bg-fuchsia-950/10 dark:text-zinc-100 dark:focus:border-fuchsia-700/50"
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {decoded && (
        <div className="flex w-full flex-col gap-4">
          {[
            { label: 'Header', value: decoded.header },
            { label: 'Payload', value: decoded.payload },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-2">
              <label className="flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {label}
                </span>
                <CopyButton value={value} />
              </label>
              <pre className="max-h-64 w-full overflow-auto rounded-xl border border-fuchsia-200 bg-fuchsia-50 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap break-all text-zinc-700 dark:border-fuchsia-900/30 dark:bg-fuchsia-950/30 dark:text-zinc-300">
                {value}
              </pre>
            </div>
          ))}

          {decoded.signature && (
            <div className="flex flex-col gap-2">
              <label className="flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Signature
                </span>
                <CopyButton value={decoded.signature} />
              </label>
              <pre className="max-h-40 w-full overflow-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap break-all text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
                {decoded.signature}
              </pre>
            </div>
          )}
        </div>
      )}
    </ConverterShell>
  );
}
