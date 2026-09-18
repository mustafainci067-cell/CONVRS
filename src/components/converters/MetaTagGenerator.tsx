'use client';

import { useState, useMemo } from 'react';
import { ConverterHeading, ConverterShell } from './ConverterShell';

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

function escapeAttr(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [author, setAuthor] = useState('');

  const generatedCode = useMemo(() => {
    const tags: string[] = [];
    if (title) tags.push(`<meta name="title" content="${escapeAttr(title)}" />`);
    if (description) tags.push(`<meta name="description" content="${escapeAttr(description)}" />`);
    if (keywords) tags.push(`<meta name="keywords" content="${escapeAttr(keywords)}" />`);
    if (author) tags.push(`<meta name="author" content="${escapeAttr(author)}" />`);

    if (title) tags.push(`<meta property="og:title" content="${escapeAttr(title)}" />`);
    if (description) tags.push(`<meta property="og:description" content="${escapeAttr(description)}" />`);
    if (ogImage) tags.push(`<meta property="og:image" content="${escapeAttr(ogImage)}" />`);
    tags.push('<meta property="og:type" content="website" />');

    if (title) tags.push(`<meta name="twitter:title" content="${escapeAttr(title)}" />`);
    if (description) tags.push(`<meta name="twitter:description" content="${escapeAttr(description)}" />`);
    if (ogImage) tags.push(`<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`);
    tags.push('<meta name="twitter:card" content="summary_large_image" />');

    return tags.join('\n');
  }, [title, description, keywords, ogImage, author]);

  return (
    <ConverterShell from="SEO" to="HTML" badge="Meta">
      <ConverterHeading
        title="Meta Tag (SEO) Generator"
        description="Generate HTML meta and Open Graph tags with a live Google search preview."
      />
      <div className="space-y-6">
        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Page Title</label>
            <input
              type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your page title"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30"
            />
            <p className="mt-1 text-xs text-zinc-400">{title.length}/60 chars</p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Meta Description</label>
            <textarea
              value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a short description"
              rows={3}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30"
            />
            <p className="mt-1 text-xs text-zinc-400">{description.length}/160 chars</p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Keywords</label>
            <input
              type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Open Graph Image URL</label>
            <input
              type="url" value={ogImage} onChange={(e) => setOgImage(e.target.value)}
              placeholder="https://example.com/og-image.jpg"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Author</label>
            <input
              type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author name"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30"
            />
          </div>
        </div>

        {/* Google preview */}
        {(title || description) && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
            <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">Google Search Preview</p>
            <div className="space-y-1">
              <p className="truncate text-sm text-blue-700 dark:text-blue-400">{title || 'Your page title'}</p>
              <p className="truncate text-xs text-emerald-700 dark:text-emerald-500">https://yoursite.com</p>
              <p className="line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">{description || 'Your meta description'}</p>
            </div>
          </div>
        )}

        {/* Generated code */}
        {generatedCode && (
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">Generated Meta Tags</span>
              <CopyButton value={generatedCode} />
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
              <code>{generatedCode}</code>
            </pre>
          </div>
        )}
      </div>
    </ConverterShell>
  );
}
