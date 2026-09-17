import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import XmlToCsv from '@/components/converters/XmlToCsv';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'XML to CSV Converter',
    description:
      'Flatten repeated XML records into a CSV table, or wrap CSV rows into well-formed XML. Runs in your browser.',
    path: '/xml-to-csv',
  });
}

export default function XmlToCsvPage() {
  return <XmlToCsv />;
}
