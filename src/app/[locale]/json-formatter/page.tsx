import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import JsonFormatter from '@/components/converters/JsonFormatter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'JSON Formatter & Validator',
    description:
      'Format messy JSON into clean, indented output, or validate it — with clear errors shown in your browser. No upload.',
    path: '/json-formatter',
  });
}

export default function JsonFormatterPage() {
  return <JsonFormatter />;
}
