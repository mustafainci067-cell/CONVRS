import type { Metadata } from 'next';
import MarkdownToHtml from '@/components/converters/MarkdownToHtml';

export const metadata: Metadata = {
  title: 'Markdown ↔ HTML — Convrs',
  description:
    'Convert Markdown to sanitized HTML, or HTML back to Markdown — with marked + DOMPurify + Turndown. 100% client-side.',
};

export default function MarkdownToHtmlPage() {
  return <MarkdownToHtml />;
}