import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import SqlFormatter from '@/components/converters/SqlFormatter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'SQL Formatter & Minifier',
    description:
      'Format complex SQL queries with proper indentation or minify them to a single line. Runs entirely in your browser.',
    path: '/sql-formatter',
  });
}

export default function SqlFormatterPage() {
  return <SqlFormatter />;
}
