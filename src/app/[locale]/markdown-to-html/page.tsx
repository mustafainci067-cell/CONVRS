import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import MarkdownToHtml from '@/components/converters/MarkdownToHtml';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Markdown to HTML Converter',
    description:
      'Convert Markdown to clean HTML, or bring HTML back to Markdown. Output is sanitized against XSS. Runs in your browser.',
    path: '/markdown-to-html',
  });
}

export default function MarkdownToHtmlPage() {
  return <MarkdownToHtml />;
}
