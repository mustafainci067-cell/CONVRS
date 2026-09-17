'use client';

import { useState } from 'react';
import { jsonToYaml, yamlToJson } from '@/lib/yaml';
import {
  ConverterHeading,
  ConverterShell,
  DirectionToggle,
  ErrorBanner,
  type Accent,
} from './ConverterShell';
import { cn } from '@/lib/utils';

const SKY_ACCENT: Accent = {
  dropzone:
    'border-sky-300 bg-sky-50 hover:border-sky-400 dark:border-sky-900/50 dark:bg-sky-950/10 dark:hover:border-sky-700/50',
  iconBox:
    'border-sky-200 bg-sky-100 text-sky-600 dark:border-sky-800/50 dark:bg-sky-900/40 dark:text-sky-400',
  button: 'bg-sky-600 text-white hover:bg-sky-500',
  resultCard: 'border-sky-200 bg-sky-50 dark:border-sky-900/30 dark:bg-sky-950/30',
  pill: 'bg-sky-600 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]',
};

type Mode = 'json-to-yaml' | 'yaml-to-json';

const PLACEHOLDERS: Record<Mode, { input: string; output: string }> = {
  'json-to-yaml': {
    input: '{\n  "name": "Convrs",\n  "tools": ["json", "yaml"]\n}',
    output: 'YAML çıktısı burada görünecek...',
  },
  'yaml-to-json': {
    input: 'name: Convrs\ntools:\n  - json\n  - yaml',
    output: 'JSON çıktısı burada görünecek...',
  },
};

function tryConvert(mode: Mode, input: string): { output: string; error: string | null } {
  if (!input.trim()) return { output: '', error: null };
  try {
    return { output: mode === 'json-to-yaml' ? jsonToYaml(input) : yamlToJson(input), error: null };
  } catch (err) {
    return {
      output: '',
      error: err instanceof Error ? err.message : 'Dönüştürme hatası.',
    };
  }
}

export default function JsonToYaml() {
  const [mode, setMode] = useState<Mode>('json-to-yaml');
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const isJsonToYaml = mode === 'json-to-yaml';
  const from = isJsonToYaml ? 'JSON' : 'YAML';
  const to = isJsonToYaml ? 'YAML' : 'JSON';

  // Canli donusum: saf fonksiyon her render'da yeniden calisir.
  const { output, error } = tryConvert(mode, input);

  const handleSwap = () => {
    // Iki yönlu: ciktiyi girdiye aktar, yeni yonde yeniden donustur
    if (output) {
      setInput(output);
    }
    setMode(isJsonToYaml ? 'yaml-to-json' : 'json-to-yaml');
    setCopied(false);
  };

  const copyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* pano erisimi reddedilebilir */
    }
  };

  const downloadOutput = () => {
    if (!output) return;
    const blob = new Blob([output], {
      type: isJsonToYaml ? 'text/yaml' : 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isJsonToYaml ? 'data.yaml' : 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ConverterShell from={from} to={to}>
      <DirectionToggle from={from} to={to} onSwap={handleSwap} accent={SKY_ACCENT} />

      <ConverterHeading
        title={isJsonToYaml ? 'JSON to YAML Converter' : 'YAML to JSON Converter'}
        description={
          isJsonToYaml
            ? 'Paste JSON and get clean, indented YAML instantly — ideal for configs and CI files. All parsing happens in your browser.'
            : 'Paste YAML and get formatted JSON instantly. Handles nested maps, lists, inline flows and block scalars — entirely client-side.'
        }
      />

      {error && <ErrorBanner message={error} />}

      <div className="flex w-full flex-col gap-4">
        {/* Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              {from} Girdi
            </span>
            <span className="font-mono text-[11px] text-zinc-400">{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={PLACEHOLDERS[mode].input}
            spellCheck={false}
            className="min-h-48 w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100"
          />
        </div>

        {/* Output */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              {to} Çıktı
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyOutput}
                disabled={!output}
                className={cn(
                  'rounded-lg px-2.5 py-1 font-mono text-[11px] transition-colors disabled:opacity-40',
                  'bg-zinc-200 text-zinc-600 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                )}
              >
                {copied ? 'Kopyalandı ✓' : 'Kopyala'}
              </button>
              <button
                type="button"
                onClick={downloadOutput}
                disabled={!output}
                className="rounded-lg px-2.5 py-1 font-mono text-[11px] transition-colors disabled:opacity-40 bg-sky-600 text-white hover:bg-sky-500"
              >
                İndir
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={PLACEHOLDERS[mode].output}
            spellCheck={false}
            className="min-h-48 w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-900 outline-none focus:border-sky-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100"
          />
        </div>
      </div>
    </ConverterShell>
  );
}