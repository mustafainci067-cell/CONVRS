'use client';

import { useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import TurndownService from 'turndown';
import {
  ConverterHeading,
  ConverterShell,
  DirectionToggle,
  ErrorBanner,
  type Accent,
} from './ConverterShell';

const SKY_ACCENT: Accent = {
  dropzone:
    'border-sky-300 bg-sky-50 hover:border-sky-400 dark:border-sky-900/50 dark:bg-sky-950/10 dark:hover:border-sky-700/50',
  iconBox:
    'border-sky-200 bg-sky-100 text-sky-600 dark:border-sky-800/50 dark:bg-sky-900/40 dark:text-sky-400',
  button: 'bg-sky-600 text-white hover:bg-sky-500',
  resultCard: 'border-sky-200 bg-sky-50 dark:border-sky-900/30 dark:bg-sky-950/30',
  pill: 'bg-sky-600 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]',
};

type Direction = 'markdown-to-html' | 'html-to-markdown';

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

export default function MarkdownToHtml() {
  const [direction, setDirection] = useState<Direction>('markdown-to-html');
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isMdToHtml = direction === 'markdown-to-html';

  // marked varsayilan olarak senkron doner; cikti XSS'e karsi dompurify'dan gecer.
  // Bozuk/okunamayan girdi islenirken cokmesin diye butun donusumler try-catch altindadir.
  const toHtml = (value: string) => {
    if (!value.trim()) return '';
    try {
      return DOMPurify.sanitize(marked.parse(value) as string) as string;
    } catch (err) {
      console.error(err);
      setErrorMsg('Dosya işlenirken bir hata oluştu veya format desteklenmiyor.');
      return '';
    }
  };

  const toMarkdown = (value: string) => {
    if (!value.trim()) return '';
    try {
      return new TurndownService().turndown(value);
    } catch (err) {
      console.error(err);
      setErrorMsg('Dosya işlenirken bir hata oluştu veya format desteklenmiyor.');
      return '';
    }
  };

  const handleEdit = (value: string) => {
    setErrorMsg(null);
    if (isMdToHtml) {
      setMarkdown(value);
      setHtml(toHtml(value));
    } else {
      setHtml(value);
      setMarkdown(toMarkdown(value));
    }
  };

  const handleSwap = () => {
    const next: Direction = isMdToHtml ? 'html-to-markdown' : 'markdown-to-html';
    setErrorMsg(null);
    // Cikis artik girdi olur; yeni cikti o girdiden yeniden uretilir
    if (next === 'html-to-markdown') {
      setMarkdown(toMarkdown(html));
    } else {
      setHtml(toHtml(markdown));
    }
    setDirection(next);
  };

  const from = isMdToHtml ? 'Markdown' : 'HTML';
  const to = isMdToHtml ? 'HTML' : 'Markdown';
  const output = isMdToHtml ? html : markdown;

  const textareaBase =
    'w-full resize-y rounded-2xl p-4 font-mono text-sm leading-relaxed shadow-sm outline-none placeholder:font-sans placeholder:text-zinc-400';

  return (
    <ConverterShell from={from} to={to}>
      <DirectionToggle from={from} to={to} onSwap={handleSwap} accent={SKY_ACCENT} />

      <ConverterHeading
        title={isMdToHtml ? 'Markdown to HTML Converter' : 'HTML to Markdown Converter'}
        description={
          isMdToHtml
            ? 'Type Markdown on the left and watch sanitized HTML appear on the right — rendered and cleaned entirely in your browser.'
            : 'Paste HTML on the left and watch clean Markdown appear on the right — converted entirely in your browser.'
        }
      />

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2">
          <label className="flex items-center justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              {isMdToHtml ? 'Markdown' : 'HTML Input'}
            </span>
          </label>
          <textarea
            value={isMdToHtml ? markdown : html}
            onChange={(e) => handleEdit(e.target.value)}
            placeholder={
              isMdToHtml
                ? '# Başlık\n**Kalın** ve _italik_ yazın...'
                : '<h1>Başlık</h1>\n<p><strong>Kalın</strong> ve <em>italik</em>...</p>'
            }
            rows={14}
            spellCheck={false}
            className={[
              textareaBase,
              'border border-sky-200 bg-sky-50 text-zinc-800 focus:border-sky-400',
              'dark:border-sky-900/50 dark:bg-sky-950/10 dark:text-zinc-100 dark:focus:border-sky-700/50',
            ].join(' ')}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label className="flex items-center justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              {isMdToHtml ? 'HTML Output' : 'Markdown Output'}{' '}
              {isMdToHtml && (
                <span className="normal-case text-zinc-400 dark:text-zinc-600">(sanitized)</span>
              )}
            </span>
            <CopyButton value={output} />
          </label>
          <textarea
            value={output}
            readOnly
            placeholder={
              isMdToHtml
                ? 'Temizlenmiş HTML burada görünecek...'
                : 'Markdown burada görünecek...'
            }
            rows={14}
            spellCheck={false}
            className={[
              textareaBase,
              'border border-zinc-200 bg-zinc-50 text-zinc-700 focus:border-zinc-400',
              'dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300 dark:focus:border-zinc-600',
            ].join(' ')}
          />
        </div>
      </div>

      {errorMsg && <ErrorBanner message={errorMsg} />}
    </ConverterShell>
  );
}
